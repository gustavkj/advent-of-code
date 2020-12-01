import assert from 'assert';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const aocSessionCookie = process.env.AOC_SESSION_COOKIE;

assert(aocSessionCookie, 'AOC_SESSION_COOKIE needs to be set');

const config = {
  aocSessionCookie: process.env.AOC_SESSION_COOKIE as string,
};

export default config;
