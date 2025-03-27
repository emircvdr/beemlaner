import { sql } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  text,
  uuid,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar("email", { length: 255 }),
  name: text("name"),
  fullname: text("fullname"),
  avatar_url: text("avatar_url"),
  username: text("username"),
  avatar_options: jsonb("avatar_options"),
  is_setup_profile: boolean("is_setup_profile").default(false),
});
