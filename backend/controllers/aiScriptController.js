import { Configuration, OpenAIApi } from "openai";
import asyncHandler from "express-async-handler";

const getAiScript = asyncHandler(async (req, res) => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: req.params.topic,
      temperature: 0.1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 1,
    });
    console.log(response.data);
    res.json(response.data.choices[0].text);
  });

  export {getAiScript}