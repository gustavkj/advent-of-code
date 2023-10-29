import assert from 'assert';

const aocSessionCookie = process.env.AOC_SESSION_COOKIE;

assert(aocSessionCookie, 'AOC_SESSION_COOKIE needs to be set');

const config = {
  aocSessionCookie,
};

export default config;
