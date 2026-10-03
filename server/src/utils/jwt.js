import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';

// Production safety verification: ensure secrets are set and sufficiently strong (minimum 32 chars, ideally 64+ chars)
if (isProduction) {
  const accessSec = process.env.JWT_ACCESS_SECRET;
  const refreshSec = process.env.JWT_REFRESH_SECRET;
  if (!accessSec || accessSec.length < 32 || accessSec.includes('default') || accessSec.includes('your_')) {
    throw new Error('CRITICAL SECURITY ERROR: JWT_ACCESS_SECRET must be set to a strong 64-char random hex string in production.');
  }
  if (!refreshSec || refreshSec.length < 32 || refreshSec.includes('default') || refreshSec.includes('your_')) {
    throw new Error('CRITICAL SECURITY ERROR: JWT_REFRESH_SECRET must be set to a strong 64-char random hex string in production.');
  }
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'ais_dev_insecure_local_fallback_secret_never_use_in_prod';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ais_dev_insecure_local_fallback_refresh_secret_never_use_in_prod';
const ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRY }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRY }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};
