DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	caption VARCHAR,
	image_url VARCHAR(128) NOT NULL
	-- cloudinary_id VARCHAR(128) NOT NULL
);

INSERT INTO posts (
caption,
image_url
)
VALUES 
('is it trash?', ''),
('this is another caption', ''),
('and another caption', '');