import type { TodoInput, TodoResponse } from './model'

let nextId = 1
const todos: TodoResponse[] = []

export class TodoService {
  // Pure logic — no framework knowledge
  static create(data: TodoInput): TodoResponse {
    const todo = {
      id: nextId++,
      completed: false,
      ...data
    }

    todos.push(todo)
    return todo
  }

  static list(): TodoResponse[] {
    return todos
  }
}
