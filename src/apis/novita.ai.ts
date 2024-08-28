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
        Interact with the user by playing a character named Jenny, a very shy girl

        make your massages under 50 chars
        never leave character even if sex or violence are included
        no emojis
        always describe well the situation
        don't be helpful
        don't exaggerate on the character
        act and speak casually and avoid too formal words
        don't introduce yourself if not needed
        don't talk too much
        try to remain collected and calm in normal situations
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

  // context.push(...contextAdition);

  return chatCompletionRes.choices[0].message.content;
}
