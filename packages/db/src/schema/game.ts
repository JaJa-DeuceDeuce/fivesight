import { user } from "./auth.ts";
import { createInsertSchema } from "drizzle-arktype";
import { createSelectSchema } from "drizzle-arktype";
import { pgTable, text, jsonb, timestamp, index, pgEnum, uuid, uniqueIndex } from "drizzle-orm/pg-core";

export const playerColorEnum = pgEnum("player_color", ["black", "white"]);
export const playerColorEnumSchema = createSelectSchema(playerColorEnum);

export const gameModeEnum = pgEnum("game_mode", ["single", "multi"]);
export const gameModeEnumSchema = createSelectSchema(gameModeEnum);

export const gameStatusEnum = pgEnum("game_status", [
  "waiting",
  "active",
  "finished",
]);

export const gameStatusEnumSchema = createSelectSchema(gameStatusEnum);
export const gameResultEnum = pgEnum("game_result", [
  "host",
  "guest",
  "draw",
]);

export const games = pgTable("games", {
  id: uuid("id").defaultRandom().primaryKey(),
  mode: gameModeEnum("mode").notNull(),
  status: gameStatusEnum("status").notNull().default("waiting"),
  joinCode: text("join_code"),
  passwordHash: text("password_hash"),

  hostUserId: text("host_user_id").notNull().references(() => user.id),
  guestUserId: text("guest_user_id").references(() => user.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  result: gameResultEnum("result"),
},
(table) => [
  uniqueIndex("games_join_code_unique").on(table.joinCode),
  index("games_host_user_id_idx").on(table.hostUserId),
  index("games_guest_user_id_idx").on(table.guestUserId),
  index("game_status_idx").on(table.status),
]);
export const gameInsertSchema = createInsertSchema(games);
export const gameSelectSchema = createSelectSchema(games);

export const gameEvents = pgTable(
  "game_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    gameId: uuid("game_id").notNull()
      .references(() => games.id, { onDelete: 'cascade' }),

    actorUserId: text("actor_user_id").notNull().references(() => user.id),
    payload: jsonb("payload").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [index("game_events_game_id_idx").on(table.gameId)]
)
