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
};
