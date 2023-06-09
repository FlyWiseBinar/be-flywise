const { User } = require("../../models");

const whoamiService = async (id) => {
  const data = await User.findOne({
    where: { id },
  });

  return data;
};

module.exports = {
  whoamiService,
};
