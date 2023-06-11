import chalk from "chalk";
import { Configuration, OpenAIApi, CreateCompletionResponse } from "openai";

export type OpenAIChatModels =
  | "gpt-4"
  | "gpt-4-0314"
  | "gpt-4-32k"
  | "gpt-4-32k-0314"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-0301";
export type OpenAICompletionModels =
  | "text-davinci-003"
  | "text-davinci-002"
  | "text-curie-001"
  | "text-babbage-001"
  | "text-ada-001";
export interface OpenAIChatParams {
  apiKey?: string;
  model: OpenAIChatModels;
  temperature?: number;
}
export interface OpenAICompletionParams {
  apiKey?: string;
  model: OpenAICompletionModels;
  temperature?: number;
}
export interface createCompletionParams {
  prompt?: string;
}
interface message {
  role: "user" | "system" | "assistant";
  content: string;
  name?: string;
}
export interface createChatCompletionParams {
  messages: Array<message>;
  stream?: boolean;
}
export class Completion {
  private apiKey?: string;
  private modelName: OpenAICompletionModels;
  private temperature: number;
  openai: OpenAIApi;
  private validateTemperature(temperature?: number) {
    if (!temperature) {
      return 1;
    }
    if (temperature > 1 || temperature < 0) {
      console.warn(
        chalk.yellow(
          `WARNING: Invalid "temperature" value! The temperature parameter must be a float between 0 and 1. Using the default value of 1.`
        )
      );
      return 1;
    }
    return temperature;
  }
  constructor(params: OpenAICompletionParams) {
    this.apiKey = params.apiKey ?? process.env["OPENAI_API_KEY"];
    this.modelName = params.model;
    this.temperature = this.validateTemperature(params.temperature);
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async generate(params: createCompletionParams) {
    const response = await this.openai.createCompletion({
      model: this.modelName,
      prompt: params.prompt,
      temperature: this.temperature,
    });
    console.log(response.data);
  }
}

export class Chat {
  private apiKey?: string;
  private modelName: OpenAIChatModels;
  private temperature: number;
  openai: OpenAIApi;
  private validateTemperature(temperature?: number) {
    if (!temperature) {
      return 1;
    }
    if (temperature > 1 || temperature < 0) {
      console.warn(
        chalk.yellow(
          `WARNING: Invalid "temperature" value! The temperature parameter must be a float between 0 and 1. Using the default value of 1.`
        )
      );
      return 1;
    }
    return temperature;
  }
  constructor(params: OpenAIChatParams) {
    this.apiKey = params.apiKey ?? process.env["OPENAI_API_KEY"];
    this.modelName = params.model;
    this.temperature = this.validateTemperature(params.temperature);
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async generate(params: createCompletionParams) {
    const response = await this.openai.createCompletion({
      model: this.modelName,
      prompt: params.prompt,
      temperature: this.temperature,
    });
    console.log(response.data);
  }
}
