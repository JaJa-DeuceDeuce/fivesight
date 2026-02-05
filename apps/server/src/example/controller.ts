import { Elysia } from 'elysia'
import { TodoService } from './service'
import { TodoInput, TodoResponse } from './model'

export const todoController = new Elysia({ prefix: '/todo' })
  // GET /todo/list
  .get(
    '/list',
    () => {
      return TodoService.list()
    },
    {
      // Elysia can use ArkType schemas directly
      response: {
        200: TodoResponse.array()
      }
    }
  )

  // POST /todo
  .post(
    '/',
    ({ body }) => {
      // At this point `body` is already validated and typed
      return TodoService.create(body)
    },
    {
      // ArkType handles request validation
      body: TodoInput,

      // Optional but recommended:
      // validates *your output* so bugs fail loudly
      response: {
        201: TodoResponse
      }
    }
  )
