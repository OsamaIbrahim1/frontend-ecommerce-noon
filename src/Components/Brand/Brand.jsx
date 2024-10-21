import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productContext } from '../../Context/ProductContext'
import { Helmet } from 'react-helmet'
// import { brandContext } from '../../Context/BrandContext'



export default function Brand() {
    let { getProductsForBrand } = useContext(productContext)
    // const { getBrandsForCategory } = useContext(brandContext)
    const [brands, setbrands] = useState([])
    const [isloading, setisloading] = useState(false)

    async function getBrands() {
        setisloading(true)
        const { data } = await axios.get(`https://e-cmmerce-noon-5.onrender.com/brand/getBrands`, {
            headers: {
                'accesstoken': 'accesstoken_' + localStorage.getItem('userToken')
            }
        })
        setbrands(data.data)
        setisloading(false)
    }

    async function Brands(brandId) {
        let response = await getProductsForBrand(brandId)
        if (response?.data?.success) {
            setbrands(response.data.data)
        }
    }

    useEffect(() => {
        getBrands()
    }, [])

    return <>
        <Helmet>
            <title>Brands</title>
        </Helmet>
        <div className="row">
            {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : brands?.map((brand => <div key={brand._id} className="brand cursor-pointer col-md-4 px-2 py-3 gy-3">
                <Link to={`/brandDetails/${brand._id}`}>
                    <img className='w-100' height={200} src={brand.Image.secure_url} alt="" />
                    <h3 className='h6 py-3 text-center'>{brand.name}</h3>
                </Link>
                <div className='text-center'>
                    <button onClick={() => Brands(brand._id)} className='btn bg-outline-main'>products</button>
                </div>
            </div>
            ))}
        </div>
    </>
}
