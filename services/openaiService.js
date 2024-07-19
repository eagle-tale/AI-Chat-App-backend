const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateResponse = async (messages) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
};

exports.extractKnowledge = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "あなたは与えられたテキストから重要な知識や情報を抽出する専門家です。テキストに含まれる重要な事実や概念を簡潔に要約してください。" },
        { role: "user", content: `以下のテキストから重要な知識や情報を抽出してください：\n\n${text}` }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error extracting knowledge:', error);
    throw error;
  }
};