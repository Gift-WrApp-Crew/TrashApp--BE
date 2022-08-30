DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS app_users CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE posts (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	caption VARCHAR,
	image_url VARCHAR(128)
	-- cloudinary_id VARCHAR(128) NOT NULL
);
-- add user_id column as a foreign key relationship with app_user.id
CREATE TABLE app_users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email TEXT NOT NULL,
	password_hash TEXT NOT NULL,
	username TEXT
);

CREATE TABLE comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  --post_ID make not nulll!!!!
  post_id INT,
  text TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  --user make not nulll!!!!
  user_id INT 
  -- FOREIGN KEY (user_id) REFERENCES app_users(id),
  -- FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO posts (
caption,
image_url
)

VALUES 
('is it trash?', ''),
('this is another caption', ''),
('and another caption', '');

INSERT INTO comments (
text
)

VALUES 
('');
