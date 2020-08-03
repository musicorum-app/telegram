import { TelegrafContext } from 'telegraf/typings/context'
import {SceneContextMessageUpdate} from "telegraf/typings/stage";
import userSetupScene from "../scenes/userSetup";
import {Nullable} from "../types";
import {getPreset} from "../database/driver";

export default async (ctx: SceneContextMessageUpdate) => {
  const msg = handleMessage(ctx)
  if (!ctx.from) return
  if (!msg) return ctx.replyWithMarkdown('*Please use /help to see how to use the command.*')
  const [method, arg] = msg
  if (method === 'add') {
    const preset = await getPreset(arg)
    if (!preset) return ctx.replyWithMarkdown('*This preset does not exist*')
    if (preset.user) return ctx.replyWithMarkdown('*This preset has already been used*')

    preset.user = ctx.from?.id.toString()
    await preset.save()
    await ctx.replyWithMarkdown('Good! Now i need an short name for this preset, so you can use it quicly')
    // TODO: create scene for that
  }
}

const handleMessage = (ctx: SceneContextMessageUpdate): Nullable<string[]> => {
  if (!ctx.message) return null
  if (!ctx.message.text) return null
  const { text } = ctx.message
  const args = text.split(' ')
  if (args.length !== 2) return null
  return args
}
