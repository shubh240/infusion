const { decryption, checkBodyInline, checkToken, checkApiKey } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const socialModel = require('./social.model');
const social_rules = require('./rules/social.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Socail                                //
//////////////////////////////////////////////////////////////////////


router.post("/add-post", checkApiKey, decryption, checkBodyInline(social_rules["add-post"]), socialModel?.Social?.addPost);

router.post("/post-details", checkApiKey, decryption, socialModel?.Social?.postListing);

router.post("/edit-post/:id", checkApiKey, checkToken, decryption, socialModel?.Social?.editPost);

router.post("/delete-startup-details", checkApiKey, checkToken, decryption, socialModel?.Social?.deleteStartUp);

module.exports = router;