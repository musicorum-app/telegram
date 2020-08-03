import {BaseScene} from "telegraf";
import {setUserAction} from "./setUser";

const name = 'USER_SETUP'
const userSetupScene = new BaseScene(name)

userSetupScene.on('text', async ctx => {
  const profile = await setUserAction(ctx)
  if (!profile) return ctx.reply("Please type a valid username!")

  await ctx.replyWithMarkdown(`Welcome *${profile.realname || profile.name}*!
Now you can use /help to learn more how to start using the bot!

You can also use /setuser to change your Last.fm username later!`)

  await ctx.scene.leave()
})

export default {name, scene: userSetupScene}
