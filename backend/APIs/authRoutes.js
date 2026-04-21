const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({ name, email, password: hashedPassword,role  })
    console.log(user);

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,        // change to true in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    res.status(400).json({ msg: 'Something Went Wrong!' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,        // change to true in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    res.status(400).json({ msg: 'Something Went Wrong!' })
  }
})

router.post('/logout', (req,res) =>{
  res.clearCookie('token');
  res.status(200).json({msg: 'Logged out successfully'})
})

module.exports = router