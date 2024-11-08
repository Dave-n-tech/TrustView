const Company = require("../models/companyModel");
const nodemailer = require("nodemailer");
const { generateReviewToken } = require("../utils/generateToken");
const { getById } = require("../models/userReviewModel");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.getAll();

    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "error getting companies", error: error });
  }
};

const getCompanyById = async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Company.getById(id);

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "error fetching company", error: error });
  }
};

const updateCompany = async (req, res) => {
  const id = req.params.id;
  //update company info
  const Keys = Object.keys(req.body);
  const values = Object.values(req.body);

  const getColumns = require("../utils/getUpdateColumns");

  const columns = getColumns(Keys);

  if (Keys.length === 0) {
    return res.status(400).json({ message: "No values provided for update" });
  }

  try {
    await Company.update(id, values, columns);
    res.json("Company updated successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const sendEmailToCustomer = async (req, res) => {

  const { customerEmail, title, message } = req.body;
  const { id } = req.params;
  let companyEmail;

  try {
    const company = await Company.getById(id);
    companyEmail = company.email;
  } catch (error) {
    res.status(500).json({ message: "an error occured", error: error });
  }


  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${companyEmail}`, //company email
    to: `${customerEmail}`,
    subject: `${title}`,
    html: `${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email: ", err);
      res.status(500).json({ message: "error sending email", error: err });
    } else {
      console.log("Email sent:", info);
      res.json({ message: "Email sent successfully", info });
    }
  });
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  updateCompany,
  sendEmailToCustomer,
};
