const pool = require('../utils/pool');

module.exports = class Reaction {
  id;
  reaction_type;

  constructor({ id, reaction_type }) {
    this.id = id;
    this.reaction_type = reaction_type;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM reactions
      `);
    if (!rows[0]) return null;

    return rows.map((row) => new Reaction(row));
  }
};
