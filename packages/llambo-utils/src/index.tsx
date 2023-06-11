import { LLM } from "@llambo/core";
const { OpenAI } = LLM;
const model = new OpenAI.Completion({
  apiKey: "1234",
  model: "text-davinci-003",
  temperature: 0.7,
});
model.generate({ prompt: "hello bro , i am a distiguished software" });
