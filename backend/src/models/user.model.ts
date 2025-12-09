import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  phone?: string
  passwordHash?: string
  provider?: string
  providerId?: string
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  passwordHash: { type: String },
  provider: { type: String, default: 'local' },
  providerId: { type: String, required: false }
}, { timestamps: true })

export default model<IUser>('User', UserSchema)
