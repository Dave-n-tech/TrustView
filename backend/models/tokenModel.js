const { pool } = require("../config/db");

const Token = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM tokens");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM tokens WHERE id = ?", [id]);
    return rows[0];
  },

  async create(tokenData) {
    const [result] = await pool.query(
      "INSERT INTO tokens (token, expires_at, used) VALUES (?, ?, ?)",
      tokenData
    );
    return result.insertId;
  },

  async update(id, tokenData) {
    await pool.query("UPDATE tokens SET ? WHERE id = ?", [tokenData, id]);
  },

  async deleteId(id) {
    await pool.query("DELETE FROM tokens WHERE id = ?", [id]);
  },
};

module.exports = Token;
