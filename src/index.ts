import { encode } from './encode'
import { decode } from './decode'

function curry(fn: (str: string, base: 32 | 36 | 58) => string, base: 32 | 36 | 58) {
  return (param: string) => fn(param, base)
}

export * from './encode'
export * from './decode'
export const base32 = {
  encode: curry(encode, 32),
  decode: curry(decode, 32),
}
export const base36 = {
  encode: curry(encode, 36),
  decode: curry(decode, 36),
}
export const base58 = {
  encode: curry(encode, 58),
  decode: curry(decode, 58),
}
