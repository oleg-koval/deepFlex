export const deepGet = (
  obj: any,
  path: string,
  defaultValue: any = undefined,
) => {
  if (path === '') return obj
  return path
    .split('.')
    .reduce(
      (o, key) => (o && o[key] !== undefined ? o[key] : defaultValue),
      obj,
    )
}

export const deepSet = (obj: any, path: string, value: any): any => {
  const keys = path.split('.')
  const [head, ...tail] = keys

  if (!head) return value

  const objCopy = { ...obj }

  return {
    ...objCopy,
    [head]: deepSet(objCopy[head] || {}, tail.join('.'), value),
  }
}

export function deepDelete(obj: any, path: string[]): any {
  if (path.length === 0) {
    return undefined
  }

  const [head, ...rest] = path

  if (rest.length === 0) {
    if (obj && typeof obj === 'object' && head !== undefined && head in obj) {
      const { [head]: _, ...newObj } = obj
      return newObj
    }
    return obj
  }

  if (obj && typeof obj === 'object' && head !== undefined) {
    const newValue = deepDelete(obj[head as keyof typeof obj], rest)
    if (newValue === undefined) {
      const { [head]: _, ...newObj } = obj as Record<string, unknown>
      return newObj
    } else {
      return { ...obj, [head]: newValue }
    }
  }

  return obj
}
