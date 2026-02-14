import { gameInsertSchema, gameModeEnum, gameSelectSchema, gameStatusEnum, playerColorEnum } from '@fivesight/db/schema/game';
import { type } from 'arktype';

export const CreateGameInput = type({
  mode: type.enumerated(...gameModeEnum.enumValues),
  "password?": "string",
  "hostColor?": type.enumerated(...playerColorEnum.enumValues)
})
export type CreateGameInput = typeof CreateGameInput.infer;

export const CreateGameResponse = type({
  gameId: gameInsertSchema.get("id"),
  mode: type.enumerated(...gameModeEnum.enumValues),
  status: type.enumerated(...gameStatusEnum.enumValues),
  "joinCode?": "string",
  "expiresAt?": "string.date.parse"
})
export type CreateGameResponse = typeof CreateGameResponse.infer;

export const GetGameInput = type({
  gameId: gameInsertSchema.get("id")
})
export type GetGameInput = typeof GetGameInput.infer;

export const GetGameResponse = gameSelectSchema;
export type GetGameResponse = typeof GetGameResponse.infer;

// Web socket stuff
export const AuthenticateMessage = type({
  type: "'authenticate'",
  payload: {
    userId: "string > 0",
  },
});
export const CreateGameMessage = type({
  type: "'create_game'",
  payload: CreateGameInput
})
export const ClientMessage = type([
  AuthenticateMessage,
  CreateGameMessage
])
export type ClientMessage = typeof ClientMessage.infer;


// server ws
export const GameCreatedMessage = type({
  type: "'game_created'",
  payload: CreateGameResponse
});
export const ErrorMessage = type({
  type: "'error'",
  payload: {
    message: "string",
    "code?": "string"
  }
})
export const ServerMessage = type([
  GameCreatedMessage,
  ErrorMessage
]);
export type ServerMessage = typeof ServerMessage.infer;
