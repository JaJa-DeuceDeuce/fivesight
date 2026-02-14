import { db, eq } from "@fivesight/db"
import { games } from "@fivesight/db/schema/game";
import { CreateGameInput, CreateGameResponse, GetGameInput, GetGameResponse } from "./model";

const CODE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789"

export class GameService {
  static async createGame(data: CreateGameInput, hostUserId: string): Promise<CreateGameResponse> {
    const now = new Date();

    if (data.mode === 'single') {
      const [row] = await db
        .insert(games)
        .values({
          mode: "single",
          status: "active",
          hostUserId,
          createdAt: now,
        })
        .returning({
          id: games.id,
          mode: games.mode,
          status: games.status,
        });

      if (!row) throw new Error("Failed to create game");

      return {
        gameId: row.id,
        mode: row.mode,
        status: row.status
      }
    }

    const joinCode = await this.generateUniqueJoinCode();
    const password = data.password?.trim() || null;
    const [row] = await db
      .insert(games)
      .values({
        mode: "multi",
        status: "waiting",
        joinCode,
        passwordHash: password ? Bun.password.hashSync(password) : null,
        hostUserId,
        guestUserId: null,
      })
      .returning({
        id: games.id,
        mode: games.mode,
        status: games.status,
        joinCode: games.joinCode
      });

    if (!row) throw new Error("Failed to create game");

    return {
      gameId: row.id,
      mode: row.mode,
      status: row.status,
      joinCode: row.joinCode ?? undefined,
    }
  }

  static async getGame(data: GetGameInput): Promise<GetGameResponse> {
    const gameId = data.gameId;

    const [game] = await db
      .select()
      .from(games)
      .where(eq(games.id, gameId))
      .limit(1);

    if (!game) throw new Error("Failed to find game");

    return game;
  }

  private static makeJoinCode(length = 6) {
    let out = "";
    for (let i = 0; i < length; i++) {
      out += CODE_CHARACTERS[Math.floor(Math.random() * CODE_CHARACTERS.length)];
    }

    return out;
  };

  private static async generateUniqueJoinCode(): Promise<string> {
    for (let i = 0; i < 10; i++) {
      const code = this.makeJoinCode(6);

      const existing = await db
        .select({ joinCode: games.joinCode })
        .from(games)
        .where(eq(games.joinCode, code));
    }
    throw new Error("Failed to generate join code");
  }
}
