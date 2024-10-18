import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
    let navigate = useNavigate()

    let { addToCart, getLoggedUserCart, removeItem, clearCart } = useContext(cartContext)
    const [cartDetailes, setcartDetailes] = useState(null)
    const [isloading, setisloading] = useState(false)

    async function getCart() {
        setisloading(true)
        let response = await getLoggedUserCart()
        setisloading(false)
        if (response?.data?.success) {
            setcartDetailes(response.data.data)
        } else {
            toast.loading(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15,
                },
                className: 'toast-success',
            })
            navigate('/products')
        }
    }

    async function deleteItem(productId) {
        setisloading(true)
        let response = await removeItem(productId)
        console.log(response)
        setisloading(false)
        if (response?.data?.success) {
            if (response.data.data.products.length === 0) {
                navigate('/products')
            } else {
                setcartDetailes(response.data.data)
            }
            toast.success(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15
                },
                className: 'toast-success',
            })
        } else {
            toast.error(response.data.error_msg, {
                duration: 2000,
                style: {
                    fontSize: 15
                },
                className: 'toast-error',
            })
        }
    }

    async function updateProductQuantity(productId, quantity) {
        let response = await addToCart(productId, quantity)
        setcartDetailes(response.data.data)

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

    async function removeAllItems(cartId) {
        setisloading(true)
        let response = await clearCart(cartId)
        if (!response?.data?.data?.success) {
            setcartDetailes(null)
            setisloading(false)
            toast.success(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15
                },
                className: 'toast-success',
            })
            navigate('/products')
        }

    }

    useEffect(() => {
        getCart()
    }, [])

    return <>
        {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main position-absolute'></i></div> :
            <div className="row">
                <Helmet>
                    <title>Cart Details</title>
                </Helmet>
                {cartDetailes ? <div className="bg-main-light p-4 my-4">
                    <div className='text-end'>
                        <button onClick={() => removeAllItems(cartDetailes._id)} className='btn bg-outline-main'>clear Cart</button>
                    </div>
                    <h3>Shop Cart : </h3>
                    <h3 className='text-main'>Total Cart Price : {cartDetailes?.subTotal?.toFixed(2)} EGP</h3>
                    {cartDetailes?.products.map((product) => <div key={product.productId} className='row align-items-center border-bottom py-2'>
                        <div className='col-md-1'>
                            <img src={product.coverImage} className='w-100' height={90} alt="" />
                        </div>
                        <div className='col-md-11 d-flex justify-content-between align-items-center'>
                            <div>
                                <h2 className='h6'>{product.title}</h2>
                                <h3 className='h6 text-main'>price : {product.finalPrice.toFixed(2)} </h3>
                                {isloading ? <button disabled className='btn m-0 p-0'><i className='fa-regular text-main fa-trash-can'></i> Remove</button> : <button onClick={() => deleteItem(product.productId)} className='btn m-0 p-0'><i className='fa-regular text-main fa-trash-can'></i> Remove</button>}
                            </div>
                            <div>
                                <button onClick={() => updateProductQuantity(product.productId, product.quantity + 1)} className='btn border-main btn-sm'>+</button>
                                <span className='mx-2'>{product.quantity}</span>
                                {product.quantity === 1 ? <button onClick={() => deleteItem(product.productId)} className='btn border-main btn-sm'>-</button> : <button onClick={() => updateProductQuantity(product.productId, product.quantity - 1)} className='btn border-main btn-sm'>-</button>}
                            </div>

                        </div>
                    </div>)}
                    <button className='btn bg-main my-3'>
                        <Link className='text-white' to={'/checkout'}>
                            checkout
                        </Link>
                    </button>
                </div > : null
                }
            </div>}
    </>
}
