import React, { useContext, useEffect, useState } from 'react'
import { brandContext } from './../../Context/BrandContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function BrandsCtegory() {
    let { getBrandsForCategory } = useContext(brandContext)
    const [brands, setbrands] = useState([])
    const [isloading, setisloading] = useState(false)
    let navigate = useNavigate()
    let params = useParams()

    async function getBrandsCategory(categoryId) {
        setisloading(true)
        let response = await getBrandsForCategory(categoryId)
        setisloading(false)
        if (response.data.success) {
            if (response.data.data.length) {
                setbrands(response.data.data)
            } else {
                toast.loading('not exist Brand for this Category', {
                    duration: 2000,
                    style: {
                        fontSize: 15,
                    },
                    className: 'toast-success',
                })
                navigate('/categories')
            }
        }
    }

    useEffect(() => {
        getBrandsCategory(params.categoryId)
    }, [])
    return <>
        <div className="row">
            {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : brands?.map((brand) => <div key={brand._id} className='brand cursor-pointer py-3 col-md-4 gy-4'>
                <Link to={`/brandDetails/${brand._id}`}>
                    <img className='w-100' height={200} src={brand.Image.secure_url} alt="" />
                    <h3 className='text-center py-3'>{brand.name}</h3>
                </Link>
                <Link to={`/productsBrand/${brand._id}`}><button className='btn bg-main text-white'>Products</button></Link>
            </div>
            )}
        </div>
    </>
}
