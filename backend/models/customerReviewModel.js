const { pool } = require("../config/db");

const customerReview = {
  async getAll() {
    const [rows] = await pool.query(`SELECT * FROM customer_reviews`);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM customer_reviews WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  },

  async create(reviewData) {
    const [result] = await pool.query(
      `INSERT INTO customer_reviews (companyId, tokenId, customerName, customerEmail, content, rating, tag, sentimentScore) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      reviewData
    );
    return result.insertId;
  },

  async update(id, reviewData) {
    await pool.query(`UPDATE customer_reviews SET ? WHERE id = ?`, [reviewData, id]);
  },

  async deleteById(id) {
    await pool.query(`DELETE FROM customer_reviews WHERE id = ?`, [id]);
  },
};

module.exports = customerReview;
