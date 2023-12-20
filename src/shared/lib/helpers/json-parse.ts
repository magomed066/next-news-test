export function parseJSON<T>(value: string | null): T | undefined {
    try {
      return JSON.parse(value ?? '') as T
    } catch {
      // eslint-disable-next-line no-console
      console.log('parsing error on', { value })
      return undefined
    }
  }
