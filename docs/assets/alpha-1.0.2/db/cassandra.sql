CREATE TABLE "user" (
  "id" bigint PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "messages" (
  "id" text,
  "conference_id" text,
  "text" text NOT NULL,
  "owner_id" bigint,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY ("id", "conference_id")
);

CREATE TABLE "messages_by_conference_id" (
  "id" text NOT NULL,
  "conference_id" text,
  "text" text NOT NULL,
  "owner_id" bigint,
  "created_at" timestamptz DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY ("conference_id", "created_at")
);

ALTER TABLE "messages" ADD FOREIGN KEY ("owner_id") REFERENCES "user" ("id");

ALTER TABLE "messages_by_conference_id" ADD FOREIGN KEY ("owner_id") REFERENCES "user" ("id");
