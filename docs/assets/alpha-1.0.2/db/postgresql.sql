CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "users_auth" (
  "id" bigint PRIMARY KEY,
  "email" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "users_favorites_rooms" (
  "user_id" bigserial,
  "room_id" bigserial,
  PRIMARY KEY ("user_id", "room_id")
);

CREATE TABLE "rooms" (
  "id" bigserial PRIMARY KEY,
  "name" text NOT NULL,
  "owner_id" bigint NOT NULL,
  "modified_at" timestamptz NOT NULL DEFAULT (now()),
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "rooms_auth" (
  "id" bigint PRIMARY KEY,
  "password" text
);

CREATE TABLE "rooms_settings" (
  "id" bigint PRIMARY KEY,
  "visibility" boolean NOT NULL DEFAULT true
);

CREATE TABLE "conferences" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "description" text,
  "room_id" bigint,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "conferences_settings" (
  "id" text PRIMARY KEY,
  "enable_audio" boolean NOT NULL DEFAULT true,
  "enable_video" boolean NOT NULL DEFAULT true
);

CREATE TABLE "tags" (
  "id" bigserial PRIMARY KEY,
  "name" text NOT NULL
);

ALTER TABLE "users_auth" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "users_favorites_rooms" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users_favorites_rooms" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "rooms_auth" ADD FOREIGN KEY ("id") REFERENCES "rooms" ("id");

ALTER TABLE "rooms_settings" ADD FOREIGN KEY ("id") REFERENCES "rooms" ("id");

ALTER TABLE "conferences" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("id");

ALTER TABLE "conferences_settings" ADD FOREIGN KEY ("id") REFERENCES "conferences" ("id");

CREATE TABLE "rooms_tags" (
  "rooms_id" bigserial,
  "tags_id" bigserial,
  PRIMARY KEY ("rooms_id", "tags_id")
);

ALTER TABLE "rooms_tags" ADD FOREIGN KEY ("rooms_id") REFERENCES "rooms" ("id");

ALTER TABLE "rooms_tags" ADD FOREIGN KEY ("tags_id") REFERENCES "tags" ("id");

