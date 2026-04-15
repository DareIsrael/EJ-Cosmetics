/**
 * Sanitize user input to prevent NoSQL injection.
 * Strips MongoDB query operators ($gt, $ne, $regex etc.) from objects.
 */
export function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }

  if (input !== null && typeof input === 'object') {
    const sanitized = {};
    for (const key of Object.keys(input)) {
      // Block keys that start with $ (MongoDB operators)
      if (key.startsWith('$')) {
        continue;
      }
      sanitized[key] = sanitizeInput(input[key]);
    }
    return sanitized;
  }

  return input;
}

/**
 * Validate that a string is a valid MongoDB ObjectId.
 */
export function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Sanitize and trim string inputs, with optional max length.
 */
export function sanitizeString(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
}
