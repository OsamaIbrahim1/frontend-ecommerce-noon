import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'

export default function Products() {

    const [products, setproducts] = useState([])
    const [isloading, setisloading] = useState(false)
    const { addToCart } = useContext(cartContext)


    async function getProducts() {
        setisloading(true)
        const { data } = await axios.get(`https://e-cmmerce-noon-5.onrender.com/product/getProduct`, {
            headers: {
                'accesstoken': 'accesstoken_' + localStorage.getItem('userToken')
            }
        })
        setproducts(data.data)
        setisloading(false)
    }

    async function addProduct(productId, quantity) {
        let response = await addToCart(productId, quantity)

        if (response?.data?.success) {
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

    useEffect(() => {
        getProducts()
    }, [])

    return <>
        <Helmet>
            <title>Products</title>
        </Helmet>
        <div className="row">
            {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main position-absolute'></i></div> : products?.map((product => <div key={product._id} className="product cursor-pointer col-md-3 px-2 py-3 gy-3">
                <Link to={`/getProductById/${product._id}`}>
                    <img className='w-100' height={300} src={product.Images[0].secure_url} alt="" />
                    <h3 className='h4 text-center fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                    <p className='fw-bolder'>{product.desc}</p>
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
            ))}
        </div >
    </>
}
