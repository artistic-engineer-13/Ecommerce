const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {
    console.log('Cookies:', req.cookies)
    console.log('Token:', req.cookies.token)
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Token expired or invalid' })
  }
}

module.exports = protect