import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns.helpers";

export const workspaceInvites = pgTable("workspace_invites", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  workspaceId: uuid("workspace_id").notNull(),
  senderId: uuid("sender_id").notNull(),
  receiverId: uuid("receiver_id").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull().default("user"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  isAccepted: boolean("is_accepted").notNull().default(false),
  acceptedAt: timestamp("accepted_at"),
  ...timestamps,
});
