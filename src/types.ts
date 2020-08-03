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
