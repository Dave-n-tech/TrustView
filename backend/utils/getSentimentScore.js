const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const getSentimentScore = async (review) => {
  const prompt = `Analyze the sentiment of the review given below using the content and rating.\n${review}\nThe output should be in the a JSON format- {sentiment, score} (where sentiment is either positive, negative or neutral and score is a value between 1 and 10 where positive = 7 and above, negative = 3 and below and neutral = 4 - 6)`;
  let value;
  try {
    const result = await model.generateContent(prompt);
    value = result.response.text();
  } catch (error) {
    console.error("Error getting sentiment from Gemini: ", error);
  }

  //clean up json text to remove special characters or redundant strings
  value = value
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/.*\{/, "{")
    .replace(/```/g, "")
    .replace(/^json\s*/, "");

  //convert result to json
  const jsonData = JSON.parse(value);

  return jsonData;
};

module.exports = {
  getSentimentScore
};
