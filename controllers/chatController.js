const Conversation = require('../models/Conversation');
const { generateResponse } = require('../services/openaiService');

exports.startChat = async (req, res) => {
  try {
    const conversation = new Conversation({
      user: '64c0e1e6af5e24f7b3e9135f', // 一時的に固定のユーザーIDを使用
      messages: []
    });
    await conversation.save();
    res.status(201).json({ conversationId: conversation._id });
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ message: 'Error starting conversation', error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, message } = req.body;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // ユーザーメッセージを追加
    conversation.messages.push({ role: 'user', content: message });

    // AI応答を生成
    const aiResponse = await generateResponse(conversation.messages);

    // AI応答を追加
    conversation.messages.push({ role: 'assistant', content: aiResponse });

    await conversation.save();

    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};