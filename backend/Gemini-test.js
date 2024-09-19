const { GoogleGenerativeAI } = require("@google/generative-ai");

const api_key = "AIzaSyCP9HJvhwfTc3ZJhIj5xTDGipnbLXYQ1eo";

const genAI = new GoogleGenerativeAI(api_key);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const runAI = async () => {
  const sentence =
    "Cleanliness, nice AC, wifi was good, just that many passengers were speaking too loud either on the phone or among themselves, no respect for personal spaces or common quiet environment. Also the tight/small over head compartments needs to be advertised in bigger scale, many passengers came with over size carry on and contributed in delays, and or taking more seating spaces onboard.company should find away to emphasize the carry on policy in advertising and before passenger booking.";

  const prompt = `Analyze the sentiment of the review given below.\n${sentence}\nThe output should be in the a JSON format- {sentiment, score} (where sentiment is either positive, negative or neutral and score is a value between 1 and 10 where positive = 7 and above, negative = 3 and below and neutral = 3 - 7)`;

  const result = await model.generateContent(prompt);
  let value = result.response.text();
  console.log(value);

  value = value
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/.*\{/, "{")
    .replace(/```/g, "")
    .replace(/^json\s*/, "");

  const jsonData = JSON.parse(value);
  console.log(jsonData);
};

runAI();
