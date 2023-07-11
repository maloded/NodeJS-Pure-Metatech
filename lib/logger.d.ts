declare module 'node:fs' {
  import { WriteStream } from 'node:stream';

  export function createWriteStream(
    path: string,
    options?: { flags?: string },
  ): WriteStream;
}

declare module 'node:util' {
  export function format(...args: any[]): string;
  export function inspect(value: any): string;
}

declare module 'node:path' {
  export function join(...paths: string[]): string;
  export function dirname(path: string): string;
}

declare interface LoggerOptions {
  logPath: string;
}

declare class Logger {
  constructor(logPath: string);

  close(): Promise<void>;

  write(
    type?: 'info' | 'debug' | 'error' | 'system' | 'access',
    s: string,
  ): void;

  log(...args: any[]): void;

  dir(...args: any[]): void;

  debug(...args: any[]): void;

  error(...args: any[]): void;

  system(...args: any[]): void;

  access(...args: any[]): void;
}

declare const logger: Logger;

export default logger;
