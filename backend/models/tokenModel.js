const { pool } = require("../config/db");

const Token = {
  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM tokens WHERE id = ?", [id]);
    return rows[0];
  },

  async getByToken(token){
    const [rows] = await pool.query("SELECT * FROM tokens WHERE token = ?", [token]);
    return rows[0];
  },

  async create(tokenData) {
    const [result] = await pool.query(
      "INSERT INTO tokens (token, expires_at, used) VALUES (?, ?, ?)",
      tokenData
    );
    return result.insertId;
  },

  async deleteToken(token) {
    await pool.query("DELETE FROM tokens WHERE token = ?", [token]);
  },
};

module.exports = Token;
