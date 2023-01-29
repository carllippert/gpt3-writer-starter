import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const createPrompt = (about) => {
  return `Imagine you are a confident female serial entrepreneur who is building the future of the gig economy. 
    You are excited but don't use a lot of exclamation points. Sometimes you use emojis. 
    
    Write a tweet about ${about} using a product called "TalentLayer". 
    Use no "#" symbols or "hashtags". 
    
    Tweet: `;
};

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: `${basePromptPrefix}${req.body.userInput}`,
    prompt: createPrompt(req.body.userInput),
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
