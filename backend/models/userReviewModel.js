const { pool } = require("../config/db");

const userReview = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM user_reviews')
    return rows
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM user_reviews WHERE id = ?', [id]);
    return rows[0]
  },

  async create(reviewData) {
    const [result] = await pool.query('INSERT INTO user_reviews (companyId, userId, content, rating, tag, sentimentScore) VALUES (?, ?, ?, ?, ?, ?)', reviewData)
    return result.insertId
  },

  async update(id, reviewData) {
    await pool.query('UPDATE user_reviews SET ? WHERE id = ?', [reviewData, id]);
  },

  async deleteById(id) {
    await pool.query('DELETE FROM user_reviews WHERE id = ?', [id]);
  },
};

module.exports = userReview;
