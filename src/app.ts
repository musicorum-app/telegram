import { Telegraf } from 'telegraf'
import link from './commands/link'
import start from './commands/start'

const bot = new Telegraf("1958059395:AAFAAwc6wJ94J6PpsKSTuGy-d85IzgKFcsE")

bot.start(ctx => start(ctx))

bot.command("link", (ctx) => link(ctx))

bot.launch().then(() => console.log("Bot running"))