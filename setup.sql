DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS app_users CASCADE;
DROP TABLE IF EXISTS reactions CASCADE;
DROP TABLE IF EXISTS reactions_to_posts CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE posts (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	caption VARCHAR,
	image_url VARCHAR(128),
	created_at TIMESTAMP,
	username VARCHAR,
  trash_reaction BIGINT,
  treasure_reaction BIGINT
);

CREATE TABLE app_users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email TEXT NOT NULL,
	password_hash TEXT NOT NULL,
	username TEXT
);


CREATE TABLE favorites (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	app_user_id BIGINT,
	FOREIGN KEY (app_user_id) REFERENCES app_users(id),
	post_id BIGINT,
	FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO posts (
caption,
image_url,
created_at,
username,
trash_reaction,
treasure_reaction
)


VALUES
('trash-emoji'),
('treasure-emoji');


