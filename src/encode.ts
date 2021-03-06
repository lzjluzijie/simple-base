import alphabet from './alphabet/constants'

export function encode(source: string, base: 32 | 36 | 58) {
  if (source === '') {
    return ''
  }

  const buffer = source.split('').map(char => char.charCodeAt(0))

  const digits = [0]
  let carry: number
  let i = 0
  let j: number

  while (i < buffer.length) {
    j = 0
    while (j < digits.length) {
      digits[j] <<= 8
      j++
    }
    digits[0] += buffer[i]
    carry = 0
    j = 0
    while (j < digits.length) {
      digits[j] += carry
      carry = (digits[j] / base) | 0
      digits[j] %= base
      j++
    }
    while (carry) {
      digits.push(carry % base)
      carry = (carry / base) | 0
    }
    i++
  }

  i = 0
  while (buffer[i] === 0 && i < buffer.length - 1) {
    digits.push(0)
    i++
  }

  // add padding for base32
  if (base === 32) {
    let result = digits
      .reverse()
      .map(digit => alphabet[base][digit])
      .join('')

    while (result.length % 8 !== 0) {
      result += '='
    }
    return result
  }

  return digits
    .reverse()
    .map(digit => alphabet[base][digit])
    .join('')
}
