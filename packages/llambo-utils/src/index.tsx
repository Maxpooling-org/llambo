import { LLM } from "@llambo/core";
const { OpenAI } = LLM;
const model = new OpenAI.Completion({
  apiKey: "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",
  model: "text-davinci-003",
  temperature: 0.7,
});
model.generate({ prompt: "hello bro , i am a distiguished software" });
