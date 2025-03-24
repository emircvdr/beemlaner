import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns.helpers";

export const workspaces = pgTable("workspaces", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  adminId: uuid("admin_id").notNull(),
  icon: varchar("icon", { length: 255 }),
  color: varchar("color", { length: 255 }),
  plan: varchar("plan", { length: 255 }).notNull().default("free"),
  ...timestamps,
});
