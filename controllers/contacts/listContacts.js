const { Contact } = require("../../models");
const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = [false, true] } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
