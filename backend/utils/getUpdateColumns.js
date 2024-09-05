const getUpdateColumns = (keys) => {
  const formattedProperties = keys
    .map((key) => {
      return (key += " = ?");
    })
    .join(", ");

  return formattedProperties;
};

module.exports = getUpdateColumns;
