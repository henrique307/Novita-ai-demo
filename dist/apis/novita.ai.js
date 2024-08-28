"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NovitaAi = NovitaAi;
const openai_1 = __importDefault(require("openai"));
const env_config_1 = require("../config/env.config");
const context = [];
function NovitaAi(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = env_config_1.envConfig.NOVITA_AI_APIKEY;
        const client = new openai_1.default({
            baseURL: "https://api.novita.ai/v3/openai",
            apiKey,
        });
        // console.log(context)
        const chatCompletionRes = yield client.chat.completions.create({
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
        if (!chatCompletionRes.choices[0].message.content)
            throw new Error("Resposta vazia do NovitaAI");
        const contextAdition = [
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
    });
}
