import { db } from "@vercel/postgres";
import { titles } from "@/seed/titles";

// ⬇️ Create tables and insert movie data
export async function seedTitles() {
  const client = await db.connect();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS titles (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      synopsis VARCHAR(255) NOT NULL,
      released INT NOT NULL,
      genre VARCHAR(255) NOT NULL
    );
  `;

  for (const title of titles) {
    try {
      await client.sql`
        INSERT INTO titles (id, title, synopsis, released, genre)
        VALUES (${title.id}, ${title.title}, ${title.synopsis}, ${title.released}, ${title.genre})
        ON CONFLICT (id) DO NOTHING;
      `;
    } catch (error) {
      console.error(`❌ Error inserting title: ${title.id}`, error);
    }
  }

  console.log("✅ Titles table seeded.");
}

export async function seedFavorites() {
  const client = await db.connect();
  await client.sql`
    CREATE TABLE IF NOT EXISTS favorites (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title_id UUID NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (title_id) REFERENCES titles(id)
    );
  `;
  console.log("✅ Favorites table created.");
}

export async function seedWatchLater() {
  const client = await db.connect();
  await client.sql`
    CREATE TABLE IF NOT EXISTS watchLater (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title_id UUID NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (title_id) REFERENCES titles(id)
    );
  `;
  console.log("✅ WatchLater table created.");
}

export async function seedActivity() {
  const client = await db.connect();
  await client.sql`
    CREATE TABLE IF NOT EXISTS activities (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      timestamp TIMESTAMP DEFAULT NOW(),
      title_id UUID NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      activity VARCHAR(255) NOT NULL,
      FOREIGN KEY (title_id) REFERENCES titles(id)
    );
  `;
  console.log("✅ Activities table created.");
}

// Optional transaction helpers
export async function commit() {
  const client = await db.connect();
  await client.sql`COMMIT;`;
  console.log("✅ Commit complete.");
}

export async function rollback() {
  const client = await db.connect();
  await client.sql`ROLLBACK;`;
  console.log("🔁 Rollback complete.");
}
