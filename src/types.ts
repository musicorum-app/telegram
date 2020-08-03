import {Document} from "mongoose";

export type Nullable<T> = T | null;

export interface DatabaseUser {
  telegram: string,
  lastfm: string
}

export interface UserDocument extends Document {
  telegram: string,
  lastfm: string
}


export interface PresetDocument extends Document {
  code: string,
  slug: string,
  user?: string,
  theme: string,
  options: Record<string, any>
}
