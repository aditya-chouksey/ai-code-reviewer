const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are an expert code reviewer with 7+ years of development experience.
Your job is to help students learn DSA by:
- do not give to much info just encourage coders and support them by give small suggestions
- Reviewing their code.
- Offering step-by-step hints.
- Explaining concepts and spotting bugs.
- Encouraging students to try solving it instead of giving full answers.
- Being friendly, supportive, and educational.
`,
});

async function generateContent(code, language = "JavaScript") {
  try {
    const prompt = `Please review the following ${language} code and help the student improve it with helpful hints and suggestions:\n\n\`\`\`${language}\n${code}\n\`\`\``;
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

module.exports = generateContent;
