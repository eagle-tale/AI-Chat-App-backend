const Conversation = require('../models/Conversation');
const Knowledge = require('../models/Knowledge');
const { generateResponse, extractKnowledgeFromText } = require('../services/openaiService');

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

    // ナレッジの抽出と保存
    try {
      const knowledgeContent = await extractKnowledgeFromText(aiResponse);
      if (knowledgeContent) {
        const knowledge = new Knowledge({
          user: '64c0e1e6af5e24f7b3e9135f', // 一時的に固定のユーザーIDを使用
          content: knowledgeContent,
          source: conversationId
        });
        await knowledge.save();
      }
    } catch (knowledgeError) {
      console.error('Error extracting or saving knowledge:', knowledgeError);
      // ナレッジの抽出や保存に失敗しても、チャットの応答は返す
    }

    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};