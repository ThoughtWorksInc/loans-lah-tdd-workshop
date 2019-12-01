import express from 'express'

const path = require('path');
const fs = require('fs');

const router = express.Router();


router.get('/info', async (req, res) => {
  var info = path.resolve(__dirname, "..", "git.json");
  fs.readFile(info, (err, content) => {
    if (err) res.status(404).send();
    res.send(JSON.parse(content));
  });
})

module.exports = router;