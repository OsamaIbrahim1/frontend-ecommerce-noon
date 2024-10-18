import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'


export default function Categories() {

    const [categories, setcategories] = useState([])
    const [isloading, setisloading] = useState(false)

    async function getCategories() {
        setisloading(true)
        let { data } = await axios.get(`https://e-cmmerce-noon-5.onrender.com/category/categories`, {
            headers: {
                'accesstoken': 'accesstoken_' + localStorage.getItem('userToken')
            }
        })
        setcategories(data.data)
        setisloading(false)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return <>
        <Helmet>
            <title>Categories</title>
        </Helmet>
        <div className="row">
            {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : categories?.map((category => <div key={category._id} className="category cursor-pointer col-md-4 px-2 py-3 gy-3">
                <img className='w-100' height={200} src={category.Image.secure_url} alt="" />
                <h3 className='h5 py-3 text-center'>{category.name}</h3>
                <div className='d-flex justify-content-between'>
                    <button className='btn bg-main text-white'>products</button>
                    <button className='btn bg-outline-main '>sub category</button>
                    <button className='btn bg-main text-white'>brands</button>
                </div>
            </div>
            ))}
        </div>
    </>
}
