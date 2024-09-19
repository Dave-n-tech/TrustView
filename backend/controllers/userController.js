const User = require("../models/userModel");

const updateUser = async (req, res) => {
  const id = req.params.id;
  //update user info
  const Keys = Object.keys(req.body);
  const values = Object.values(req.body);

  const getColumns = require("../utils/getUpdateColumns");

  const columns = getColumns(Keys);

  if (Keys.length === 0) {
    return res.status(400).json({ message: "No values provided for update" });
  }

  try {
    await User.update(id, values, columns);
    res.json("User updated successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  updateUser,
};
