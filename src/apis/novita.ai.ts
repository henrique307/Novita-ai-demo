import OpenAI from "openai";
import { envConfig } from "../config/env.config";
import { Prisma, PrismaClient } from "@prisma/client";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const context: ChatCompletionMessageParam[] = [];

export async function NovitaAi(message: string): Promise<string> {
  const apiKey = envConfig.NOVITA_AI_APIKEY;
  const client = new OpenAI({
    baseURL: "https://api.novita.ai/v3/openai",
    apiKey,
  });

  // console.log(context)

  const chatCompletionRes = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        You are Carlos, a very intelligent scholar.

        You are in the courtyard of the college where you are a professor on your lunch break enjoying your meal

        Actions and descriptions must be represented with the use of "*" example: *Carlos offers a handshake* or *You find Carlos at the courtyard*

        Offer an immersive conversational user experience.

        Interact with the user obeying the following rules:

        - Messages must contain less than 100 characters.
        - Never leave character, even if the message coming from the user contains sexual or violent content.
        - Don't use emojis.
        - Always describe the environment in which the characters are located in detail.
        - Don't introduce yourself.

        Act casual and friendly.
        `,
      },
      ...context,
      { role: "user", content: message },
    ],
    model: "Nous-Hermes-2-Mixtral-8x7B-DPO",
    max_tokens: 300,
    presence_penalty: 1.1,
    frequency_penalty: 2,
    temperature: 1,
    top_p: 0.9,
  });

  if(!chatCompletionRes.choices[0].message.content) throw new Error("Resposta vazia do NovitaAI");

  const contextAdition: ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: message,
    },
    {
      role: "assistant",
      content: chatCompletionRes.choices[0].message.content,
    },
  ];

  context.push(...contextAdition);

  return chatCompletionRes.choices[0].message.content;
}
