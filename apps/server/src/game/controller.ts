import { Elysia } from 'elysia';
import { GameService } from './service';
import { type } from 'arktype';
import { CreateGameInput, CreateGameResponse } from './model';

export const gameController = new Elysia({ prefix: "/game" })
  .derive(() => ({
    userId: null as string | null,
    authenticated: false,
  }))
  .post("/create", async ({ body }) => {
    try {
      const newGame = await GameService.createGame(body.gameData, body.hostUserId);
      return {
        success: true,
        error: null,
        payload: {
          data: newGame
        }
      }
    } catch (err) {
      return {
        success: false,
        error: {
          message: JSON.stringify(err)
        },
        payload: null
      }
    }
  }, {
    body: type({
      gameData: CreateGameInput,
      hostUserId: "string"
    }),
    response: type({
      success: "boolean",
      error: type({
        message: "string",
        "code?": "string",
      }).or(type.null),
      payload: type({
        data: CreateGameResponse
      }).or(type.null)
    })
  })
  .ws("/:gameId/ws", {
    params: type({
      gameId: "string.uuid.v7"
    }),
    async open(ws) {
      const { gameId } = ws.data.params;
      const game = await GameService.getGame({gameId});
      
      if (!game) {
        ws.send({ type: "Error", message: "Game not found"});
        ws.close();
        return;
      }
      
      ws.subscribe(`game_${gameId}`);
      
    }

  })
