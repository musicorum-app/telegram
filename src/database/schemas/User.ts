import { Schema, model } from 'mongoose'
import {UserDocument} from "../../types";

const User = new Schema({
  telegram: String,
  lastfm: String
})

export default model<UserDocument>('TelegramUser', User)
