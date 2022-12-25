const express = require("express");

const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { contacts: ctrl } = require("../../controllers");

const { auth, validateBody, validateFavorite } = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateBody(joiSchema), ctrlWrapper(ctrl.addContact));

router.patch(
  "/:contactId/favorite",
  validateFavorite(statusJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateBody(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
