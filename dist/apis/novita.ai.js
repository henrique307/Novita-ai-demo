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
        // context.push(...contextAdition);
        return chatCompletionRes.choices[0].message.content;
    });
}
