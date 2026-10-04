import jwt from 'jsonwebtoken';

// Production safety: ensure JWT secrets are set before any token is issued.
// This runs at module load time — if secrets are missing the server will crash
// immediately with a clear message instead of silently issuing weak tokens.
const validateSecrets = () => {
  const env = process.env.NODE_ENV;
  if (env !== 'production') return; // dev/test: allow fallback secrets

  const accessSec = process.env.JWT_ACCESS_SECRET;
  const refreshSec = process.env.JWT_REFRESH_SECRET;

  if (!accessSec || accessSec.length < 32 || accessSec.includes('default') || accessSec.includes('your_')) {
    throw new Error(
      'CRITICAL SECURITY ERROR: JWT_ACCESS_SECRET is missing or too weak. ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"'
    );
  }
  if (!refreshSec || refreshSec.length < 32 || refreshSec.includes('default') || refreshSec.includes('your_')) {
    throw new Error(
      'CRITICAL SECURITY ERROR: JWT_REFRESH_SECRET is missing or too weak. ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"'
    );
  }
};

validateSecrets();

const ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ||
  'ais_dev_insecure_local_fallback_secret_never_use_in_prod';

const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  'ais_dev_insecure_local_fallback_refresh_secret_never_use_in_prod';

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
