import { Schema, model, Document, Types } from 'mongoose'

export interface ICV extends Document {
  userId: Types.ObjectId
  title: string
  layout: string
  data: any
  isPaid: boolean
  thumbnail?: string
  createdAt?: Date
  updatedAt?: Date
}

const CVSchema = new Schema<ICV>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'My CV' },
  layout: { type: String, default: 'layout-1' },
  data: { type: Schema.Types.Mixed, default: {} },
  isPaid: { type: Boolean, default: false },
  thumbnail: { type: String }
}, { timestamps: true })

export default model<ICV>('CV', CVSchema)
