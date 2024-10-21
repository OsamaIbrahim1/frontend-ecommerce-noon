import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'


export default function ProductDetails() {
    let [productDetails, setProductDetails] = useState(null)
    const [isloading, setisloading] = useState(false)
    const { addToCart } = useContext(cartContext)

    let params = useParams()

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    async function addProduct(productId) {
        let response = await addToCart(productId)

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

    async function getProductDetails(id) {
        setisloading(true)
        let { data } = await axios.get(`https://e-cmmerce-noon-5.onrender.com/product/getProductById/${id}`)
        setProductDetails(data.data)
        setisloading(false)
    }


    useEffect(() => {
        getProductDetails(params.productId)
    }, [params.productId])


    return <>
        <Helmet>
            <title>Product Details</title>
        </Helmet>
        <div className="row justify-content-center align-items-center py-3">
            {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : <>
                <div className="col-md-4">
                    {productDetails?.Images.length === 1 ? <img className='w-100' height={450} src={productDetails?.Images[0].secure_url} alt="" /> : <Slider {...settings}>
                        {productDetails?.Images.map((image) => < img key={image.public_id} className='w-100' height={450} src={image.secure_url} alt="" />)}
                    </Slider>}
                </div>
                <div className="col-md-8">
                    <h3>{productDetails?.title}</h3>
                    <p className="text-muted p-2">{productDetails?.desc}</p>

                    <h3 className='h6 fw-bolder'>discount : {productDetails?.discount}%</h3>
                    <h3 className='h6 fw-bolder'>stock : {productDetails?.stock}</h3>
                    <h3 className='h6 fw-bolder'>colors : [ {productDetails?.specs.color.join(' , ')} ]</h3>
                    <h3 className='h6 fw-bolder'>size : [ {productDetails?.specs.size.join(' , ')} ]</h3>
                    <h3 className='h6 fw-bolder'>price :<s> {productDetails?.basePrice?.toFixed(2)} EGP</s></h3>
                    <div className="d-flex justify-content-between">
                        <span className='text-muted'> {productDetails?.appliedPrice?.toFixed(2)} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color'></i>
                            {productDetails?.rate}
                        </span>
                    </div>

                    <button onClick={() => addProduct(productDetails._id)} className='btn bg-main text-white w-100 '>+ Add</button>
                </div>
            </>}

        </div >
    </>
}
