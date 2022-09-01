DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS app_users CASCADE;
DROP TABLE IF EXISTS reactions CASCADE;
DROP TABLE IF EXISTS reactions_to_posts CASCADE;

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


INSERT INTO posts (
caption,
image_url,
created_at,
username,
trash_reaction,
treasure_reaction
)

VALUES 
('Is it trash?', 'https://res.cloudinary.com/trashapp/image/upload/v1662065521/fwaes34gwzackabxdvyr.png', CURRENT_TIMESTAMP, '', 0, 0),
('Is it trash?', 'https://res.cloudinary.com/trashapp/image/upload/v1662065563/bqvwhl6qr6m6jmcthxmm.png', CURRENT_TIMESTAMP, '', 0, 0),
('Is it trash?', 'https://res.cloudinary.com/trashapp/image/upload/v1662065592/k0y4b8s92rm7jcnehtd8.png', CURRENT_TIMESTAMP, '', 0, 0);

INSERT INTO reactions (
	reaction_type
)

VALUES
('trash-emoji'),
('treasure-emoji');


