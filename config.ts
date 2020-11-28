import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {
  aocSessionCookie: process.env.AOC_SESSION_COOKIE || '',
};

export default config;
