import { Router } from 'express'
import { authenticate } from '../middleware/auth.middleware'
import {
  createCV, getCVs, getCV, updateCV, deleteCV
} from '../controllers/cv.controller'

const router = Router()
router.use(authenticate)

router.get('/', getCVs)       // GET /api/cvs?page=1&limit=10
router.post('/', createCV)    // create
router.get('/:id', getCV)     // get single
router.put('/:id', updateCV)  // update
router.delete('/:id', deleteCV) // delete

export default router
