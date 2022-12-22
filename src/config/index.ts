import * as dotenv from 'dotenv';
dotenv.config();

export enum EnvVars {
  PORT = 'PORT',
  JWT_SECRET = 'JWT_SECRET',
  COOKIE_SECRET = 'COOKIE_SECRET',
  ORIGIN = 'ORIGIN',
}

export function safeGetEnvVar(name: EnvVars): string {
  const variable = process.env[name];

  if (!variable) {
    throw new Error(`[ERROR][CONFIG] ${name} not defined in env`);
  }

  return variable;
}
