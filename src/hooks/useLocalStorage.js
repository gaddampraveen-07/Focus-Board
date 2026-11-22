import { useState, useEffect } from 'react';

/**
 * Custom hook to synchronize state with window.localStorage
 * Handles JSON serialization, SSR/browser checks, and corrupt data recovery.
 *
 * @param {string} key - LocalStorage key
 * @param {*} initialValue - Fallback value if key doesn't exist
 * @returns {[any, Function]} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      const parsed = JSON.parse(item);
      // Ensure if initialValue is an array, parsed must also be an array
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
        console.warn(`LocalStorage key "${key}" was expected to be an array. Resetting to initial.`);
        return initialValue;
      }
      return parsed;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
