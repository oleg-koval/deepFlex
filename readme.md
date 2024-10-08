# deepFlex

`deepFlex` is a TypeScript utility library that simplifies deep object manipulation, combining functional programming principles with easy-to-use, immutable operations.

## Features

- Immutability by default for all operations
- Deep get, set, delete, and merge utilities
- Works seamlessly with objects and arrays
- Strong TypeScript type inference for nested paths
- Functional programming style with currying

## Installation

```bash
npm install deepflex
```

## Usage

```javascript
import { deepGet, deepSet, deepDelete, deepMerge } from 'deepflex'

// Example data
const obj = { a: { b: { c: 42 } } }

// Get deeply nested value
const value = deepGet(obj, 'a.b.c', 0)

// Set a deeply nested value
const newObj = deepSet(obj, 'a.b.d', 100)

// Delete a deeply nested property
const updatedObj = deepDelete(newObj, 'a.b.c')

// Merge two objects deeply
const mergedObj = deepMerge(obj, { a: { b: { e: 50 } } })
```
