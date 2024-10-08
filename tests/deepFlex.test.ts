import { deepGet, deepSet, deepDelete } from '../src/deepFlex'

describe('deepGet', () => {
  const testCases = [
    {
      description: 'should return the value at a deep nested path',
      obj: { a: { b: { c: 42 } } },
      path: 'a.b.c',
      defaultValue: 0,
      expected: 42,
    },
    {
      description: 'should return the default value if path does not exist',
      obj: { a: { b: { c: 42 } } },
      path: 'a.b.d',
      defaultValue: 0,
      expected: 0,
    },
    {
      description:
        'should return undefined when path does not exist and no default value is provided',
      obj: { a: { b: { c: 42 } } },
      path: 'a.b.d',
      defaultValue: undefined,
      expected: undefined,
    },
    {
      description: 'should return the whole object if path is empty',
      obj: { a: { b: { c: 42 } } },
      path: '',
      defaultValue: null,
      expected: { a: { b: { c: 42 } } },
    },
  ]

  testCases.forEach(({ description, obj, path, defaultValue, expected }) => {
    test(description, () => {
      expect(deepGet(obj, path, defaultValue)).toEqual(expected)
    })
  })
})

describe('deepSet', () => {
  const testCases = [
    {
      description: 'should set a deeply nested value',
      obj: { a: { b: { c: 42 } } },
      path: 'a.b.d',
      value: 100,
      expected: { a: { b: { c: 42, d: 100 } } },
    },
    {
      description: 'should create intermediate paths if they do not exist',
      obj: { a: {} },
      path: 'a.b.c',
      value: 50,
      expected: { a: { b: { c: 50 } } },
    },
    {
      description: 'should not mutate the original object',
      obj: { a: { b: { c: 42 } } },
      path: 'a.b.d',
      value: 100,
      expectedOriginal: { a: { b: { c: 42 } } },
      expectedNew: { a: { b: { c: 42, d: 100 } } },
    },
  ]

  testCases.forEach(
    ({ description, obj, path, value, expected, expectedOriginal }) => {
      test(description, () => {
        const result = deepSet(obj, path, value)
        expect(result).toEqual(expected)
        if (expectedOriginal) {
          expect(obj).toEqual(expectedOriginal) // Immutability check
        }
      })
    },
  )
})

describe('deepDelete', () => {
  const testCases = [
    {
      description: 'should delete a deeply nested property',
      obj: { a: { b: { c: 42, d: 100 } } },
      path: 'a.b.c',
      expected: { a: { b: { d: 100 } } },
    },
    {
      description: 'should not throw when deleting non-existent property',
      obj: { a: { b: { d: 100 } } },
      path: 'a.b.c',
      expected: { a: { b: { d: 100 } } },
    },
    {
      description: 'should not mutate the original object when deleting',
      obj: { a: { b: { c: 42, d: 100 } } },
      path: 'a.b.c',
      expectedOriginal: { a: { b: { c: 42, d: 100 } } },
      expectedNew: { a: { b: { d: 100 } } },
    },
  ]

  testCases.forEach(
    ({ description, obj, path, expected, expectedOriginal }) => {
      test(description, () => {
        const result = deepDelete(obj, [path])
        expect(result).toEqual(expected)
        if (expectedOriginal) {
          expect(obj).toEqual(expectedOriginal) // Immutability check
        }
      })
    },
  )
})
