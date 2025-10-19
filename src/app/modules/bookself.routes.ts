import express from 'express';

import {
  createContact,
  deleteContact,
  getContactById,
  getContactInformation,
} from './bookself.controller';
import { login, signup } from './authentication.controller';

const router = express.Router();
// !Routes for the users
router.post("/add-contact-information", createContact);
router.get("/get-contact-information", getContactInformation);
router.get("/get-individual-contact/:id", getContactById)
router.delete("/delete-contact/:id", deleteContact)

router.post("/signup", signup);
router.post("/login", login);

export default router;