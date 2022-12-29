const Jimp = require("jimp");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const changeAvatar = async (req, res, next) => {
  const awatar = await Jimp.read(req.file.path);
  awatar.resize(250, 250).write(`${tempDir}/${req.file.originalname}`);
  next();
};

module.exports = changeAvatar;
