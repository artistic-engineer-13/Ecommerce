import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from '../Product/Product';

const AllProducts = () => {

    const [products,setproducts] = useState([]);

    async function getProducts() {
        const res = await axios.get('http://localhost:4444/products')
        console.log(res.data);
        setproducts(res.data);

    }

    useEffect(()=>{
        getProducts();
    },[])

  return (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold text-zinc-900 mb-6">All Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </div>
  </div>
)
}

export default AllProducts