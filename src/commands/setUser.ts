import { TelegrafContext } from 'telegraf/typings/context'
import {SceneContextMessageUpdate} from "telegraf/typings/stage";
import userSetupScene from "../scenes/userSetup";
import {name} from "../scenes/setUser";

export default (ctx: SceneContextMessageUpdate) => {
  ctx.replyWithMarkdown(`Please send me your Last.fm username`)

  ctx.scene.enter(name)
}
