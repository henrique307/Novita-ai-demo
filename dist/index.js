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
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("./config/env.config");
const grammy_1 = require("grammy");
const novita_ai_1 = require("./apis/novita.ai");
const botToken = env_config_1.envConfig.BOT_TOKEN;
const bot = new grammy_1.Bot(botToken);
// Register listeners to handle messages
bot.on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const content = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
    if (!content)
        throw new Error("Conteudo da mensagem não foi recebido");
    const resposta = yield (0, novita_ai_1.NovitaAi)(content);
    yield ctx.reply(resposta);
}));
// Start the bot (using long polling)
bot.start({ onStart: (botinfo) => { console.log("locked and loaded"); } });
