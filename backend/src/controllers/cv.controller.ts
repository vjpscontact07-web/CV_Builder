import { Request, Response } from 'express'
import CV from '../models/cv.model'
import { AuthRequest } from '../middleware/auth.middleware'

export const createCV = async (req: AuthRequest, res: Response) => {
  try {
    const { title, layout, data, thumbnail } = req.body
    // Basic validation
    if (!title) return res.status(400).json({ message: 'Title is required' })

    const cv = await CV.create({
      userId: req.userId,
      title,
      layout: layout || 'layout-1',
      data: data || {}, // Allow empty data initially
      thumbnail
    })
    res.status(201).json(cv)
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' })
  }
}

export const getCVs = async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.max(1, Number(req.query.limit) || 10)
    const skip = (page - 1) * limit
    const cvs = await CV.find({ userId: req.userId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
    res.json({ data: cvs, page, limit })
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
}

import { isValidObjectId } from 'mongoose'

export const getCV = async (req: AuthRequest, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Invalid ID' })
    const cv = await CV.findById(req.params.id)
    if (!cv || cv.userId.toString() !== req.userId) return res.status(404).json({ message: 'Not found' })
    res.json(cv)
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
}

export const updateCV = async (req: AuthRequest, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Invalid ID' })
    const cv = await CV.findById(req.params.id)
    if (!cv || cv.userId.toString() !== req.userId) return res.status(404).json({ message: 'Not found' })
    cv.set(req.body)
    await cv.save()
    res.json(cv)
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
}

export const deleteCV = async (req: AuthRequest, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Invalid ID' })
    const cv = await CV.findById(req.params.id)
    if (!cv || cv.userId.toString() !== req.userId) return res.status(404).json({ message: 'Not found' })
    await cv.deleteOne()
    res.json({ message: 'Deleted' })
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
}
