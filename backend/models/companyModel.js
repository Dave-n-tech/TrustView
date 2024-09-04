const { pool } = require("../config/db");

const Company = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM companies");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM companies WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async getByEmail(email){
    const [rows] = await pool.query("SELECT * FROM companies WHERE email = ?", [email]);
    return rows[0]
  },

  async getByName(name) {
    const [rows] = await pool.query("SELECT * FROM companies WHERE name = ?", [name]);
    return rows[0]
  },

  async create(companyData) {
    const [result] = await pool.query(
      "INSERT INTO companies (name, email, password, phone_number, address, role) VALUES (?, ?, ?, ?, ?, ?)",
      companyData
    );
    return result.insertId;
  },

  async update(id, companyData) {
    await pool.query("UPDATE companies SET ? WHERE id = ?", [companyData, id]);
  },

  async deleteId(id) {
    await pool.query("DELETE FROM companies WHERE id = ?", [id]);
  },
};

module.exports = Company;
