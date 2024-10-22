import React, { useContext, useEffect, useState } from 'react'
import styles from './CategoryDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { categoryContext } from '../../Context/CategoryContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
export default function CategoryDetails() {
    let [productDetails, setproductDetails] = useState(null)
    let [isloading, setisloading] = useState(false)
    let navigate = useNavigate()

    const params = useParams()
    const { getCategoryById } = useContext(categoryContext)

    async function getCategory(categoryId) {
        setisloading(true)
        const response = await getCategoryById(categoryId)
        if (response?.data?.success) {
            setproductDetails(response.data.data)
            setisloading(false)
            toast.success(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15,
                },
                className: 'toast-success',
            })
        } else {
            toast.error(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15,
                },
                className: 'toast-success',
            })
            navigate('/')
        }
    }

    useEffect(() => {
        getCategory(params.categoryId)
    }, [])

    return <>

        <Helmet>
            <title>Category Details</title>
        </Helmet>
        {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main position-absolute'></i></div> : <div>
            <img src={productDetails?.Image?.secure_url} className='w-100' height={400} alt="" />
            <h1 className='fw-bolder text-center'>{productDetails.name}</h1>
        </div>}


    </>
}
