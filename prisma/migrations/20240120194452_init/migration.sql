-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "base_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "user_id" TEXT,
    CONSTRAINT "Url_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Url" ("base_url", "id", "short_url", "user_id") SELECT "base_url", "id", "short_url", "user_id" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_base_url_key" ON "Url"("base_url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
