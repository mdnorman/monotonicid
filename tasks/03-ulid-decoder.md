# Task 03: ULID Decoder Implementation

## Overview
Implement ULID (Universally Unique Lexicographically Sortable Identifier) decoding functionality in the MonotonicID web application.

## Background
ULID is a 26-character string that encodes:
- 48-bit timestamp (milliseconds since Unix epoch)
- 80-bit randomness for uniqueness

ULID format: `01ARZ3NDEKTSV4RRFFQ69G5FAV`
- First 10 characters: timestamp (Base32 encoded)
- Last 16 characters: randomness (Base32 encoded)

## Requirements

### Functional Requirements
1. **ULID Detection**: Automatically detect if input is a valid ULID format
2. **Timestamp Extraction**: Extract and display the timestamp component
3. **Randomness Display**: Show the randomness component
4. **Human-Readable Date**: Convert timestamp to readable date/time format
5. **Validation**: Validate ULID format and provide clear error messages
6. **Multiple Formats**: Support both uppercase and lowercase ULID input

### Technical Requirements
1. **Integration**: Extend existing decoder interface in `packages/web/src/App.tsx`
2. **Type Safety**: Use TypeScript for all new code
3. **Testing**: Add comprehensive unit tests for ULID decoding logic
4. **Error Handling**: Graceful handling of invalid inputs
5. **Performance**: Efficient decoding without external dependencies if possible

## Implementation Details

### ULID Specification
- Length: exactly 26 characters
- Character set: Crockford's Base32 (0123456789ABCDEFGHJKMNPQRSTVWXYZ)
- Case insensitive
- Lexicographically sortable
- Timestamp: first 10 characters (48 bits)
- Randomness: last 16 characters (80 bits)

### Expected Output Format
```
ULID: 01ARZ3NDEKTSV4RRFFQ69G5FAV
├── Timestamp: 01ARZ3NDEK (1469918176385 ms)
├── Date: 2016-07-30T23:42:56.385Z
├── Randomness: TSV4RRFFQ69G5FAV
└── Valid: ✓
```

### Files to Modify
- `packages/web/src/App.tsx` - Add ULID decoding logic
- `packages/web/src/App.test.tsx` - Add ULID decoding tests
- Consider creating separate utility files for ULID logic

## Acceptance Criteria
- [ ] Valid ULID inputs are correctly decoded
- [ ] Invalid inputs show appropriate error messages
- [ ] Timestamp is correctly extracted and formatted
- [ ] Randomness component is displayed
- [ ] Both uppercase and lowercase inputs work
- [ ] Edge cases are handled (empty input, wrong length, invalid characters)
- [ ] Unit tests cover all functionality
- [ ] Integration with existing UI is seamless

## Branch
- Branch name: `task/03-ulid-decoder`
- Status: ✅ **COMPLETED**

## Notes
- ULID specification: https://github.com/ulid/spec
- Consider using existing ULID libraries or implement custom decoder
- Ensure compatibility with the existing monotonic ID decoder interface
