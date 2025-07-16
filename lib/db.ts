// lib/db.ts
import { Generated } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

// Main Database interface definition
export interface Database {
  titles: TitlesTable;
  users: UsersTable;
  favorites: FavoritesTable;
  watchlater: WatchLaterTable;
  activities: ActivitiesTable;
}

// Individual table types
export interface TitlesTable {
  id: Generated<string>;
  title: string;
  synopsis: string; // ✅ fixed typo from "synposis" to "synopsis"
  released: number;
  genre: string;
}

export interface UsersTable {
  id: Generated<string>;
  name: string;
  email: string;
  password: string;
}

export interface FavoritesTable {
  id: Generated<string>;
  title_id: string;
  user_id: string;
}

export interface WatchLaterTable {
  id: Generated<string>;
  title_id: string;
  user_id: string;
}

export interface ActivitiesTable {
  id: Generated<string>;
  timestamp: Date;
  title_id: string;
  user_id: string;
  activity: "FAVORITED" | "WATCH_LATER";
}

// Create Kysely client
export const db = createKysely<Database>();
