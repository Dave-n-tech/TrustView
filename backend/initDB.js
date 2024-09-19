const {pool} = require("./config/db")

const createCompanyTable = `
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    address VARCHAR(255),
    role ENUM('company', 'admin') NOT NULL DEFAULT 'company',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createCustomerReviewTable = `
CREATE TABLE IF NOT EXISTS customer_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyId INT,
    companyWebsite VARCHAR(255) NULL; //optional
    customerName VARCHAR(255),
    customerEmail VARCHAR(255),
    content TEXT NOT NULL,
    rating INT NOT NULL,
    tag ENUM('unverified', 'verified') NOT NULL DEFAULT 'verified',
    sentimentScore VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE
);
`;

const createUserReviewTable = `
CREATE TABLE IF NOT EXISTS user_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    companyId INT,
    companyWebsite VARCHAR(255) NULL;
    content TEXT NOT NULL,
    rating INT NOT NULL,
    sentimentScore VARCHAR(50),
    tag ENUM('unverified', 'verified') NOT NULL DEFAULT 'unverified',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);
`;

const createTables = async () => {
    try {
        await pool.query(createCompanyTable)
        await pool.query(createUserTable)
        await pool.query(createCustomerReviewTable)
        await pool.query(createUserReviewTable)

        console.log("Tables created successfully or already exists")
    } catch (error) {
       console.error("something went wrong: ", error) 
    }
}

createTables()