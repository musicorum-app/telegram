import { Schema, model } from 'mongoose'
import {PresetDocument} from "../../types";

const Preset = new Schema({
  code: String,
  slug: String,
  user: String,
  theme: String,
  options: Object
})

export default model<PresetDocument>('Preset', Preset)
