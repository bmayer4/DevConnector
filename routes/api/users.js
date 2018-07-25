const express = require('express');
const router = express.Router();  //see explanation at lecture 8, 5 mins

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({ message: 'Users works!' });
})

module.exports = router;  //export for server.js to pick it up

