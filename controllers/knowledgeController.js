const Knowledge = require('../models/Knowledge');

exports.createKnowledge = async (req, res) => {
  try {
    const { content, tags, conversationId } = req.body;
    const knowledge = new Knowledge({
      user: '64c0e1e6af5e24f7b3e9135f', // 一時的に固定のユーザーIDを使用
      content,
      tags,
      source: conversationId
    });
    await knowledge.save();
    res.status(201).json(knowledge);
  } catch (error) {
    console.error('Error creating knowledge:', error);
    res.status(500).json({ message: 'Error creating knowledge', error: error.message });
  }
};

exports.getKnowledge = async (req, res) => {
  try {
    const knowledge = await Knowledge.find({ user: '64c0e1e6af5e24f7b3e9135f' }); // 一時的に固定のユーザーIDを使用
    res.status(200).json(knowledge);
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ message: 'Error fetching knowledge', error: error.message });
  }
};

exports.searchKnowledge = async (req, res) => {
  try {
    const { query } = req.query;
    const knowledge = await Knowledge.find({
      user: '64c0e1e6af5e24f7b3e9135f', // 一時的に固定のユーザーIDを使用
      $text: { $search: query }
    });
    res.status(200).json(knowledge);
  } catch (error) {
    console.error('Error searching knowledge:', error);
    res.status(500).json({ message: 'Error searching knowledge', error: error.message });
  }
};