const Company = require("../models/companyModel");

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

module.exports = {
  updateCompany
};
