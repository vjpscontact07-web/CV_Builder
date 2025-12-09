import { Router } from 'express'
import { verifyPayment } from '../controllers/payment.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post('/verify', authenticate, verifyPayment)

export default router
