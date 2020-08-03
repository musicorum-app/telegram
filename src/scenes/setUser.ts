import {BaseScene} from "telegraf";
import API, {UserProfile} from "../api/lastfm";
import {defineUser} from "../database/driver";
import {SceneContextMessageUpdate} from "telegraf/typings/stage";
import {Nullable} from "../types";

const regex = /^([a-zA-Z0-9_-]{2,15})$/
export const name = 'SET_USER'
const setUserScene = new BaseScene(name)

setUserScene.on('text', async ctx => {
  const profile = await setUserAction(ctx)
  if (!profile) return ctx.reply("Please type a valid username!")

  await ctx.replyWithMarkdown(`Username changed!`)

  await ctx.scene.leave()
})

export const setUserAction = async (ctx: SceneContextMessageUpdate): Promise<Nullable<UserProfile>> => {
  if (!ctx.message) return null
  const user = parseUser(ctx.message.text)
  if (!user) return null

  const profile = await API.userGetInfo(user)

  await defineUser(ctx.from?.id + '', user)
  return profile
}

const parseUser = (text: string | undefined) => {
  if (!text) return null
  const words = text.split(' ')
  if (words.length > 1) return null
  if (!regex.test(text)) return null
  return regex.exec(text)![1]
}

export default {name, scene: setUserScene}
