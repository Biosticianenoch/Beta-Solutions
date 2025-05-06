import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const COURSES_DIR = path.join(__dirname, '../../courses resorses');

// Helper: Map PDFs to course metadata (stub; in production, use DB or JSON)
const courseMeta = [
  {
    id: 'excel',
    title: 'Advanced Excel',
    description: 'Master advanced Excel functions for data analysis and business intelligence.',
    price: 25,
    pdf: 'Advanced Excel.pdf',
    instructor: 'DataQuest Team',
    status: 'published',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'python',
    title: 'Data Analysis With Python',
    description: 'Analyze data efficiently using Python and its powerful libraries.',
    price: 40,
    pdf: 'Data Analysis With Python.pdf',
    instructor: 'DataQuest Team',
    status: 'published',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // ...add more courses as needed, mapping filename to metadata
];

// GET /api/courses - List courses
router.get('/', (req, res) => {
  res.json(courseMeta);
});

// GET /api/courses/:id - Get course detail
router.get('/:id', (req, res) => {
  const course = courseMeta.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

// GET /api/courses/:id/resource - Download/View PDF
router.get('/:id/resource', (req, res) => {
  const course = courseMeta.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const filePath = path.join(COURSES_DIR, course.pdf);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Resource not found' });
  res.sendFile(filePath);
});

// POST /api/courses/:id/pay - Simulate payment
router.post('/:id/pay', (req, res) => {
  const course = courseMeta.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  // Here you would integrate with Stripe/PayPal/etc.
  // For now, just simulate payment success
  res.json({ success: true, message: 'Payment successful. Course unlocked.' });
});

export default router;
