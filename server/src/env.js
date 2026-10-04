// This module must be the very first import in server.js.
// In Node.js ESM, all imports are hoisted and evaluated before any top-level
// code, so calling dotenv.config() inside server.js runs too late for modules
// that read process.env at their own module-load time (e.g. jwt.js, db.js).
import dotenv from 'dotenv';
dotenv.config();
