const { pool } = require("../config/db");

const User = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  async getByEmail(email){
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0]
  },

  async getByName(name) {
    const [rows] = await pool.query("SELECT * FROM users WHERE name = ?", [name]);
    return rows[0]
  },

  async create(userData) {
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      userData
    );
    return result.insertId;
  },

  async update(id, userData) {
    await pool.query("UPDATE users SET ? WHERE id = ?", [userData, id]);
  },

  async deleteId(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
  },
};

module.exports = User;
