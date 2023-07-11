declare module 'node:crypto' {
  export * from 'crypto';
}

declare interface ScryptParams {
  N: number;
  r: number;
  p: number;
  maxmem: number;
}

declare interface DeserializedHash {
  params: { [key: string]: number };
  salt: Buffer;
  hash: Buffer;
}

declare const SCRYPT_PREFIX: string;
declare const SCRYPT_PARAMS: ScryptParams;
declare const SALT_LEN: number;
declare const KEY_LEN: number;

declare const serializeHash: (hash: Buffer, salt: Buffer) => string;
declare const parseOptions: (options: string) => { [key: string]: number };
declare const deserializeHash: (phcString: string) => DeserializedHash;

declare const hashPassword: (password: string) => Promise<string>;
declare const validatePassword: (
  password: string,
  serHash: string,
) => Promise<boolean>;

declare const jsonParse: (buffer: Buffer) => any;
declare const receiveBody: (req: any) => Promise<string>;

declare const exports: {
  hashPassword: (password: string) => Promise<string>;
  validatePassword: (password: string, serHash: string) => Promise<boolean>;
  jsonParse: (buffer: Buffer) => any;
  receiveBody: (req: any) => Promise<string>;
};

export = exports;
