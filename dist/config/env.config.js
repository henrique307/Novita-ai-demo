"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const envConfig = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    NOVITA_AI_APIKEY: process.env.NOVITA_AI_APIKEY,
};
exports.envConfig = envConfig;
for (let [key, value] of Object.entries(envConfig)) {
    if (!value)
        throw new Error(`Variavel ${key} não foi definida`);
}
