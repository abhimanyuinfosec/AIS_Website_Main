import express from 'express';
import prisma from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Check DB heartbeat
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      success: true,
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'Abhimanyu InfoSec REST Engine',
      database: 'Connected',
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'DEGRADED',
      timestamp: new Date().toISOString(),
      service: 'Abhimanyu InfoSec REST Engine',
      database: 'Disconnected',
      error: error.message,
    });
  }
});

export default router;
