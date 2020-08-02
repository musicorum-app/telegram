import {session, Stage, Telegraf} from 'telegraf'
// import Sentry from '@sentry/node'

// Commands
import start from './commands/start'
import userSetupScene from "./scenes/userSetup";

// Sentry.init({ dsn: process.env.SENTRY_DSN })
const bot = new Telegraf(process.env.BOT_TOKEN!)

// Scenes
const stage = new Stage([userSetupScene.scene])
bot.use(session())
// @ts-ignore
bot.use(stage.middleware())

// Commands
// @ts-ignore
bot.start(start)

bot.launch()
