module.exports = function (name) {
    return `import { useState, useEffect } from 'react'

/**
 * ${name} Hook
 * Custom React hook for reusable logic
 */
export function ${name}() {
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Hook logic here
    // Example: fetch data, subscribe to events, etc.
  }, [])

  const reset = () => {
    setState(null)
    setError(null)
    setLoading(false)
  }

  return {
    state,
    loading,
    error,
    setState,
    setLoading,
    setError,
    reset
  }
}
`;
};
