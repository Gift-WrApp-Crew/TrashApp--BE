const pool = require('../utils/pool');

module.exports = class Post {
  id;
  caption;
  image_url;
  created_at;

  constructor({ id, caption, image_url, created_at, username }) {
    this.id = id;
    this.caption = caption;
    this.image_url = image_url;
    this.created_at = created_at;
    this.username = username;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    if (!rows[0]) return null;

    return rows.map((row) => new Post(row));
  }

  static async insert({ caption, image_url, created_at, username }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (caption, image_url, created_at, username) VALUES ($1, $2, $3, $4) RETURNING *',
      [caption, image_url, created_at, username]
    );
    return new Post(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM posts
      WHERE id=$1
      `, [id]
    );
    return new Post(rows[0]);
  }

  static async updateById(id, attrs) {
    const post = await Post.getById(id);
    if (!post) return null;
    const { caption, created_at } = { ...post, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE posts
      SET caption = $2
      WHERE id=$1
      RETURNING *
      `, [id, caption, created_at]
    );
    return new Post(rows[0]);
  }
};
