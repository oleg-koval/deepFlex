export const deepGet = (
  obj: any,
  path: string,
  defaultValue: any = undefined,
) => {
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

  return {
    ...obj,
    [head]: deepSet(obj[head] || {}, tail.join('.'), value),
  }
}

export const deepDelete = (obj: any, path: string[]): any => {
  const [head, ...tail] = path

  if (!head) return obj

  if (tail.length === 0) {
    const { [head]: _, ...rest } = obj
    return rest
  }

  return {
    ...obj,
    [head]: deepDelete(obj[head] || {}, tail),
  }
}
