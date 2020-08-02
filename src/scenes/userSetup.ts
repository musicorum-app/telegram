import {BaseScene, Extra, Stage} from "telegraf";
import API from "../api/lastfm";

const regex = /^([a-zA-Z0-9_-]{2,15})$/
const name = 'USER_SETUP'
const userSetupScene = new BaseScene(name)

userSetupScene.on('text', async ctx => {
  if (!ctx.message) return
  const user = parseUser(ctx.message.text)
  if (!user) return ctx.reply("Please type a valid username!")

  const profile = await API.userGetInfo(user)

  await ctx.replyWithMarkdown(`Welcome *${profile.realname || profile.name}*!
Now you can use /help to learn more how to start using the bot!`)

  console.log(ctx.from)
  Stage.leave()
})

const parseUser = (text: string | undefined) => {
  if (!text) return null
  const words = text.split(' ')
  if (words.length > 1) return null
  if (!regex.test(text)) return null
  return regex.exec(text)![1]
}

export default {name, scene: userSetupScene}
