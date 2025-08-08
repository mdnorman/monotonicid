import { describe, it, expect } from 'vitest'
import { isValidULID, decodeULID, formatULIDResult } from './ulid-decoder'

describe('ULID Decoder', () => {
  describe('isValidULID', () => {
    it('should validate correct ULID format', () => {
      expect(isValidULID('01ARZ3NDEKTSV4RRFFQ69G5FAV')).toBe(true)
      expect(isValidULID('01BX5ZZKBKACTAV9WEVGEMMVRZ')).toBe(true)
    })

    it('should accept lowercase ULIDs', () => {
      expect(isValidULID('01arz3ndektsv4rrffq69g5fav')).toBe(true)
      expect(isValidULID('01bx5zzkbkactav9wevgemmvrz')).toBe(true)
    })

    it('should reject invalid length', () => {
      expect(isValidULID('')).toBe(false)
      expect(isValidULID('01ARZ3NDEKTSV4RRFFQ69G5FA')).toBe(false) // 25 chars
      expect(isValidULID('01ARZ3NDEKTSV4RRFFQ69G5FAVX')).toBe(false) // 27 chars
    })

    it('should reject invalid characters', () => {
      expect(isValidULID('01ARZ3NDEKTSV4RRFFQ69G5FAI')).toBe(false) // contains 'I'
      expect(isValidULID('01ARZ3NDEKTSV4RRFFQ69G5FAL')).toBe(false) // contains 'L'
      expect(isValidULID('01ARZ3NDEKTSV4RRFFQ69G5FAO')).toBe(false) // contains 'O'
      expect(isValidULID('01ARZ3NDEKTSV4RRFFQ69G5FAU')).toBe(false) // contains 'U'
    })

    it('should handle null and undefined', () => {
      expect(isValidULID(null as unknown as string)).toBe(false)
      expect(isValidULID(undefined as unknown as string)).toBe(false)
    })
  })

  describe('decodeULID', () => {
    it('should decode a valid ULID correctly', () => {
      const result = decodeULID('01ARZ3NDEKTSV4RRFFQ69G5FAV')

      expect(result.isValid).toBe(true)
      expect(result.ulid).toBe('01ARZ3NDEKTSV4RRFFQ69G5FAV')
      expect(result.timestamp).toBe(1469922850259)
      expect(result.date).toBe('2016-07-30T23:54:10.259Z')
      expect(result.randomness).toBe('TSV4RRFFQ69G5FAV')
      expect(result.error).toBeUndefined()
    })

    it('should decode lowercase ULID correctly', () => {
      const result = decodeULID('01arz3ndektsv4rrffq69g5fav')

      expect(result.isValid).toBe(true)
      expect(result.ulid).toBe('01ARZ3NDEKTSV4RRFFQ69G5FAV')
      expect(result.timestamp).toBe(1469922850259)
      expect(result.date).toBe('2016-07-30T23:54:10.259Z')
    })

    it('should handle empty input', () => {
      const result = decodeULID('')

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Please enter a ULID')
    })

    it('should handle whitespace input', () => {
      const result = decodeULID('   ')

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Please enter a ULID')
    })

    it('should handle invalid length', () => {
      const result = decodeULID('01ARZ3NDEKTSV4RRFFQ69G5FA')

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Invalid ULID length: 25 characters (expected 26)')
    })

    it('should handle invalid characters', () => {
      const result = decodeULID('01ARZ3NDEKTSV4RRFFQ69G5FAI')

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Invalid characters in ULID: I')
    })

    it('should handle multiple invalid characters', () => {
      const result = decodeULID('01ARZ3NDEKTSV4RRFFQ69G5ILO')

      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Invalid characters in ULID:')
      expect(result.error).toContain('I')
      expect(result.error).toContain('L')
      expect(result.error).toContain('O')
    })

    it('should trim whitespace from input', () => {
      const result = decodeULID('  01ARZ3NDEKTSV4RRFFQ69G5FAV  ')

      expect(result.isValid).toBe(true)
      expect(result.ulid).toBe('01ARZ3NDEKTSV4RRFFQ69G5FAV')
    })

    it('should decode timestamp correctly for edge cases', () => {
      // Test with minimum timestamp (all zeros)
      const minResult = decodeULID('0000000000TSV4RRFFQ69G5FAV')
      expect(minResult.isValid).toBe(true)
      expect(minResult.timestamp).toBe(0)
      expect(minResult.date).toBe('1970-01-01T00:00:00.000Z')

      // Test with a known timestamp
      const knownResult = decodeULID('01BX5ZZKBKACTAV9WEVGEMMVRZ')
      expect(knownResult.isValid).toBe(true)
      expect(knownResult.timestamp).toBeGreaterThan(0)
    })
  })

  describe('formatULIDResult', () => {
    it('should format valid ULID result correctly', () => {
      const result = decodeULID('01ARZ3NDEKTSV4RRFFQ69G5FAV')
      const formatted = formatULIDResult(result)

      expect(formatted).toContain('✅ Valid ULID')
      expect(formatted).toContain('ULID: 01ARZ3NDEKTSV4RRFFQ69G5FAV')
      expect(formatted).toContain('Timestamp: 01ARZ3NDEK (1469922850259 ms)')
      expect(formatted).toContain('Date: 2016-07-30T23:54:10.259Z')
      expect(formatted).toContain('Randomness: TSV4RRFFQ69G5FAV')
      expect(formatted).toContain('Timestamp Hex:')
      expect(formatted).toContain('Randomness Hex:')
    })

    it('should format invalid ULID result correctly', () => {
      const result = decodeULID('invalid')
      const formatted = formatULIDResult(result)

      expect(formatted).toContain('❌ Error:')
      expect(formatted).toContain('Invalid ULID length')
    })

    it('should format error with invalid characters', () => {
      const result = decodeULID('01ARZ3NDEKTSV4RRFFQ69G5FAI')
      const formatted = formatULIDResult(result)

      expect(formatted).toContain('❌ Error:')
      expect(formatted).toContain('Invalid characters in ULID')
    })
  })

  describe('Edge Cases', () => {
    it('should handle maximum valid timestamp', () => {
      // Maximum 48-bit timestamp would be FFFFFFFFFFFF in hex
      // But we need to use valid Base32 characters
      const result = decodeULID('7ZZZZZZZZZ0000000000000000')
      expect(result.isValid).toBe(true)
      expect(result.timestamp).toBeGreaterThan(0)
    })

    it('should handle all valid Base32 characters', () => {
      const validChars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
      const testULID = validChars.substring(0, 26)
      const result = decodeULID(testULID)
      expect(result.isValid).toBe(true)
    })

    it('should preserve case in error messages', () => {
      const result = decodeULID('01arz3ndektsv4rrffq69g5fai')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('I')
    })
  })
})
