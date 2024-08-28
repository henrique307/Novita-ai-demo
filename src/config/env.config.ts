import { configDotenv } from "dotenv";

configDotenv();

const envConfig = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  NOVITA_AI_APIKEY: process.env.NOVITA_AI_APIKEY,
};

for (let [key, value] of Object.entries(envConfig)) {
  if (!value) throw new Error(`Variavel ${key} não foi definida`);
}

export { envConfig };
