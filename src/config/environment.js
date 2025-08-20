// Environment configuration
// This file centralizes all environment-specific settings

const environment = {
  development: {
    API_BASE_URL: 'http://localhost:3001/api',
    DEBUG: true,
    LOG_LEVEL: 'debug',
  },
  production: {
    API_BASE_URL: 'https://api.mustafakhan.xyz',
    DEBUG: false,
    LOG_LEVEL: 'error',
  },
  test: {
    API_BASE_URL: 'http://localhost:3001/api',
    DEBUG: true,
    LOG_LEVEL: 'debug',
  },
};

const currentEnv = process.env.NODE_ENV || 'development';
const config = environment[currentEnv];

export default config;

// Environment-specific exports
export const API_BASE_URL = config.API_BASE_URL;
export const DEBUG = config.DEBUG;
export const LOG_LEVEL = config.LOG_LEVEL;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  ENABLE_PWA: process.env.REACT_APP_ENABLE_PWA === 'true',
  ENABLE_OFFLINE: process.env.REACT_APP_ENABLE_OFFLINE === 'true',
};
