import { CommandContext, Context } from "grammy";
import { envConfig } from "./config/env.config";
import markdownit from "markdown-it";

import { Bot } from "grammy";
import { NovitaAi } from "./apis/novita.ai";

const botToken = envConfig.BOT_TOKEN!;

const bot = new Bot(botToken);
const md = markdownit();

// Register listeners to handle messages
bot.on("message:text", async (ctx: Context) => {
  const content = ctx.message?.text;

  if (!content) throw new Error("Conteudo da mensagem não foi recebido");

  const resposta = await NovitaAi(content);

  await ctx.reply(resposta);
});

// Start the bot (using long polling)
bot.start({onStart: (botinfo) => {console.log("locked and loaded")}});
