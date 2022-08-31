DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS app_users CASCADE;

CREATE TABLE posts (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	caption VARCHAR,
	image_url VARCHAR(128),
	created_at TIMESTAMP,
	username VARCHAR
	-- cloudinary_id VARCHAR(128) NOT NULL
);
-- add user_id column as a foreign key relationship with app_user.id
CREATE TABLE app_users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email TEXT NOT NULL,
	password_hash TEXT NOT NULL,
	username TEXT
);

INSERT INTO posts (
caption,
image_url,
created_at
)
VALUES 
('is it trash?', '', CURRENT_TIMESTAMP),
('this is another caption', '', CURRENT_TIMESTAMP),
('and another caption', '', CURRENT_TIMESTAMP);
