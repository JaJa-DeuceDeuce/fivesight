import { type } from 'arktype'

// Input coming from the client
export const TodoInput = type({
  title: 'string',
  completed: 'boolean?'
})
export type TodoInput = typeof TodoInput.infer

// Shape of a Todo returned by the API
export const TodoResponse = type({
  id: 'number',
  title: 'string',
  completed: 'boolean'
})
export type TodoResponse = typeof TodoResponse.infer
