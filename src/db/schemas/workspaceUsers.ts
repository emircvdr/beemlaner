import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns.helpers";

export const workspaceUsers = pgTable("workspace_users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  workspaceId: uuid("workspace_id").notNull(),
  userId: uuid("user_id").notNull(),
  role: varchar("role", { length: 255 }).notNull().default("user"),
  ...timestamps,
});
