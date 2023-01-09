const express = require("express");

const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");
const {
  auth,
  validateBody,
  upload,
  changeAvatar,
} = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubSchema,
} = require("../../models/user");

router.post(
  "/register",
  validateBody(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.patch(
  "/",
  auth,
  validateBody(joiSubSchema),
  ctrlWrapper(ctrl.updateSub)
);

router.post(
  "/login",

  validateBody(joiLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  changeAvatar,
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
