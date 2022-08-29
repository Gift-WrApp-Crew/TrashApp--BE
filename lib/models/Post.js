const pool = require('../utils/pool');

module.exports = class Post {
  id;
  caption;

  constructor({ id, caption }) {
    this.id = id;
    this.caption = caption;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    console.log('rows', rows);
    if (!rows[0]) return null;

    return rows.map((row) => new Post(row));
  }

  static async insert({ caption }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (caption) VALUES ($1) RETURNING *',
      [caption]
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
    const { caption } = { ...post, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE posts
      SET caption = $2
      WHERE id=$1
      RETURNING *
      `, [id, caption]
    );
    return new Post(rows[0]);
  }
};
