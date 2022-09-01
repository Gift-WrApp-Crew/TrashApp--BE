const pool = require('../utils/pool');

module.exports = class Post {
  id;
  caption;
  image_url;
  created_at;
  username;
  trash_reaction;
  treasure_reaction;

  constructor({
    id,
    caption,
    image_url,
    created_at,
    username,
    trash_reaction,
    treasure_reaction,
  }) {
    this.id = id;
    this.caption = caption;
    this.image_url = image_url;
    this.created_at = created_at;
    this.username = username;
    this.trash_reaction = trash_reaction;
    this.treasure_reaction = treasure_reaction;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    if (!rows[0]) return null;

    return rows.map((row) => new Post(row));
  }

  static async insert({
    caption,
    image_url,
    created_at = new Date().toDateString(),
    username,
    trash_reaction = 0,
    treasure_reaction = 0,
  }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (caption, image_url, created_at, username, trash_reaction, treasure_reaction) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        caption,
        image_url,
        created_at,
        username,
        trash_reaction,
        treasure_reaction,
      ]
    );
    return new Post(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM posts
      WHERE id=$1
      `,
      [id]
    );
    return new Post(rows[0]);
  }

  static async updateById(id, attrs) {
    const post = await Post.getById(id);
    if (!post) return null;
    const { caption, created_at, trash_reaction, treasure_reaction } = {
      ...post,
      ...attrs,
    };
    const { rows } = await pool.query(
      `
      UPDATE posts
      SET caption = $2, created_at = $3, trash_reaction = $4, treasure_reaction = $5
      WHERE id=$1
      RETURNING *
      `,
      [id, caption, created_at, trash_reaction, treasure_reaction]
    );
    return new Post(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM posts
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );
    return new Post(rows[0]);
  }
};
