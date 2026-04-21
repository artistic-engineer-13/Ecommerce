const router = require('express').Router();
const Product = require('../models/product');
const protect = require('../middleware/protect')

// get prod route
router.get('/products', async(req,res)=>{
    try {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(400).json({msg:'Something Went Wrong!'});
    }
})

// create new prod route
router.post('/products', protect, async(req,res)=>{
    try {
      console.log('User:', req.user)        // ADD THIS
      console.log('Body:', req.body)        // ADD THIS
        if (req.user.role !== 'seller') {
        return res.status(403).json({ msg: 'Only sellers can add products' })
      }
        const {name,desc,price,img} = req.body;
        const product = await Product.create({name,desc,price,img,createdBy: req.user._id});
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({msg:'Something Went Wrong!'});
    }
})

// show prod route
router.get('/products/:id', async (req, res) => {
  try {
    // const {id} = req.params;
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ msg: 'Something Went Wrong!' })
  }
})

// del prod route
router.delete('/products/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to delete this product' })
    }

    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ msg: 'Something Went Wrong!' })
  }
})

//edit prod route
router.put('/products/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to edit this product' })
    }

    const { name, desc, img, price } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, desc, img, price },
      { new: true }
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(400).json({ msg: 'Something Went Wrong!' })
  }
})


module.exports = router;