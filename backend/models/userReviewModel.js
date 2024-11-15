const { pool } = require("../config/db");

const userReview = {
  async getAll() {
    const [rows] = await pool.query(
      "SELECT * FROM user_reviews ORDER BY createdAt DESC"
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM user_reviews WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async getByUserId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM user_reviews WHERE userId = ? ORDER BY createdAt DESC",
      [id]
    );
    return rows;
  },

  async getByCompanyId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM user_reviews WHERE companyId = ? ORDER BY createdAt DESC",
      [id]
    );
    return rows;
  },

  async create(reviewData) {
    const [result] = await pool.query(
      "INSERT INTO user_reviews (companyId, userId, title, content, rating, tag, sentimentScore) VALUES (?, ?, ?, ?, ?, ?, ?)",
      reviewData
    );
    return result.insertId;
  },

  async update(id, reviewData, columns) {
    await pool.query(`UPDATE user_reviews SET ${columns} WHERE id = ?`, [
      ...reviewData,
      id,
    ]);
  },

  async deleteById(id) {
    await pool.query("DELETE FROM user_reviews WHERE id = ?", [id]);
  },
};

module.exports = userReview;
