import {session, Stage, Telegraf} from 'telegraf'
// import Sentry from '@sentry/node'

// Commands
import start from './commands/start'
import userSetupScene from "./scenes/userSetup";
import {connectDatabase} from "./database/driver";
import setUser from "./commands/setUser";
import setUserScene from "./scenes/setUser";
import generate from "./commands/generate";

// Scenes
const stage = new Stage([userSetupScene.scene, setUserScene.scene])

// Sentry.init({ dsn: process.env.SENTRY_DSN })
async function initiate() {
  await connectDatabase()
  const bot = new Telegraf(process.env.BOT_TOKEN!)
  bot.use(session())
  // @ts-ignore
  bot.use(stage.middleware())

  // Commands
  // @ts-ignore
  bot.start(start)
  // @ts-ignore
  bot.command('setuser', setUser)
  // @ts-ignore
    bot.command('generate', generate)

  bot.launch()
}

initiate()
