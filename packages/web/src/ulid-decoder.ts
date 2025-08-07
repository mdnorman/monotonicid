// ULID Decoder Implementation
// Based on ULID specification: https://github.com/ulid/spec

// Crockford's Base32 alphabet (case insensitive)
const BASE32_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const BASE32_MAP: { [key: string]: number } = {};

// Initialize Base32 character mapping
for (let i = 0; i < BASE32_ALPHABET.length; i++) {
  BASE32_MAP[BASE32_ALPHABET[i]] = i;
  BASE32_MAP[BASE32_ALPHABET[i].toLowerCase()] = i;
}

export interface ULIDDecodeResult {
  isValid: boolean;
  ulid?: string;
  timestamp?: number;
  timestampHex?: string;
  date?: string;
  randomness?: string;
  randomnessHex?: string;
  error?: string;
}

/**
 * Validates if a string is a valid ULID format
 */
export function isValidULID(input: string): boolean {
  if (!input || input.length !== 26) {
    return false;
  }

  // Check if all characters are valid Base32
  for (const char of input.toUpperCase()) {
    if (!(char in BASE32_MAP)) {
      return false;
    }
  }

  return true;
}

/**
 * Decodes a Base32 string to a number (for timestamp part)
 */
function decodeBase32Timestamp(base32: string): number {
  let result = 0;
  for (const char of base32.toUpperCase()) {
    result = (result * 32) + BASE32_MAP[char];
  }
  return result;
}

/**
 * Decodes a Base32 string to hex (for randomness part)
 */
function decodeBase32ToHex(base32: string): string {
  let result = '';
  let buffer = 0;
  let bitsLeft = 0;

  for (const char of base32.toUpperCase()) {
    buffer = (buffer << 5) | BASE32_MAP[char];
    bitsLeft += 5;

    while (bitsLeft >= 8) {
      const byte = (buffer >> (bitsLeft - 8)) & 0xFF;
      result += byte.toString(16).padStart(2, '0');
      bitsLeft -= 8;
    }
  }

  return result.toUpperCase();
}

/**
 * Decodes a ULID string and extracts its components
 */
export function decodeULID(input: string): ULIDDecodeResult {
  if (!input) {
    return {
      isValid: false,
      error: 'Please enter a ULID'
    };
  }

  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return {
      isValid: false,
      error: 'Please enter a ULID'
    };
  }

  if (!isValidULID(trimmedInput)) {
    if (trimmedInput.length !== 26) {
      return {
        isValid: false,
        error: `Invalid ULID length: ${trimmedInput.length} characters (expected 26)`
      };
    }

    // Find invalid characters
    const invalidChars = [];
    for (const char of trimmedInput.toUpperCase()) {
      if (!(char in BASE32_MAP)) {
        invalidChars.push(char);
      }
    }

    return {
      isValid: false,
      error: `Invalid characters in ULID: ${[...new Set(invalidChars)].join(', ')}`
    };
  }

  try {
    const ulid = trimmedInput.toUpperCase();

    // Extract timestamp (first 10 characters)
    const timestampPart = ulid.substring(0, 10);
    const timestamp = decodeBase32Timestamp(timestampPart);

    // Extract randomness (last 16 characters)
    const randomnessPart = ulid.substring(10);
    const randomnessHex = decodeBase32ToHex(randomnessPart);

    // Convert timestamp to date
    const date = new Date(timestamp).toISOString();

    // Convert timestamp to hex for display
    const timestampHex = timestamp.toString(16).toUpperCase().padStart(12, '0');

    return {
      isValid: true,
      ulid,
      timestamp,
      timestampHex,
      date,
      randomness: randomnessPart,
      randomnessHex,
    };
  } catch (error) {
    return {
      isValid: false,
      error: `Failed to decode ULID: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Formats the decode result for display
 */
export function formatULIDResult(result: ULIDDecodeResult): string {
  if (!result.isValid) {
    return `❌ Error: ${result.error}`;
  }

  return `✅ Valid ULID

ULID: ${result.ulid}
├── Timestamp: ${result.ulid?.substring(0, 10)} (${result.timestamp} ms)
├── Timestamp Hex: 0x${result.timestampHex}
├── Date: ${result.date}
├── Randomness: ${result.randomness}
└── Randomness Hex: 0x${result.randomnessHex}`;
}
