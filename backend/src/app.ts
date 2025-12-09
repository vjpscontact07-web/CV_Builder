import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'
import cvRoutes from './routes/cv'
import googleRoutes from './routes/google'


const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,   
  credentials: true                  
}))
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/cvs', cvRoutes)
app.use('/api/auth/google', googleRoutes)
app.use('/api/payment', require('./routes/payment').default)

// health
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

// connect DB
const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/cv-builder'
mongoose.connect(MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

export default app
