const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [String],
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  },
}, { timestamps: true });

module.exports = mongoose.model('Knowledge', knowledgeSchema);