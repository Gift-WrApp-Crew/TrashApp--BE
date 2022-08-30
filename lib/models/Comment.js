const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  post_id;
  text;
  timestamp;
  user_id;

  constructor({ id, post_id, text, timestamp, user_id }) {
    this.id = id;
    this.post_id = post_id;
    this.text = text;
    this.timestamp = timestamp;
    this.user_id = user_id;
  }

  static async createComment({ text, user_id, post_id }) {
    const { rows } = await pool.query(
      `INSERT INTO comments (
        text,
        user_id,
        post_id
				) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [text, user_id, post_id]
    );

    return new Comment(rows[0]);
  }

  static async getAllCommentsByPostId(post_id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM comments
      WHERE post_id = $1`,
      [post_id]
    );

    return rows.map((row) => new Comment(row));
  }
};
