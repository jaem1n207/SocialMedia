const express = require('express');
const router = express.Router();

/* addPostAPI */
router.post('/post', (req, res) => {
  res.json({ id: 1, content: 'hello' });
});

/* removePostAPI */
router.delete('/post', (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
