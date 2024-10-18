import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function FeaturedProducts() {
    const [products, setProducts] = useState([])
    const { addToCart, setnumberOfCartItem } = useContext(cartContext)

    async function addProduct(productId, quantity) {
        let response = await addToCart(productId, quantity)
        // console.log("response:", response.data.data.products)
        if (response?.data?.success) {
            setnumberOfCartItem(response.data.data.products.length)
            toast.success(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15
                },
                className: 'toast-success',
            })
        } else {
            toast.error(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15
                },
                className: 'toast-error',
            })
        }
    }

    async function getProducts() {
        let { data } = await axios.get("https://e-cmmerce-noon-5.onrender.com/product/getProduct", {
            headers: {
                'accesstoken': 'accesstoken_' + localStorage.getItem('userToken')
            }
        })
        setProducts(data.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return <>
        <div className="row">
            {products.map(product => <div key={product._id} className="gy-4 col-md-3">

                <div className="product  px-2 py-3 cursor-pointer">
                    <Link to={`/getProductById/${product._id}`}>
                        <img className='w-100' height={300} src={product.Images[0].secure_url} alt="" />
                        <h3 className='h4 text-center fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                        <h3 className='h5 fw-bolder'>{product.desc}</h3>
                        <h3 className='h6 fw-bolder'>stock : {product.stock}</h3>
                        <h3 className='h6 fw-bolder'>discount : {product.discount}%</h3>
                        <h3 className='h6 fw-bolder'>price :<s> {product.basePrice?.toFixed(2)} EGP</s></h3>
                        <div className="d-flex justify-content-between">
                            <span className='text-muted'> {product.appliedPrice?.toFixed(2)} EGP</span>
                            <span>
                                <i className='fas fa-star rating-color'></i>
                                {product.rate}
                            </span>
                        </div>
                    </Link>
                    <button onClick={() => addProduct(product._id, 1)} className='btn bg-main text-white w-100 '>+ Add</button>
                </div>

            </div>)}
        </div >

    </>

}
