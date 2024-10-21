import React, { useContext, useEffect, useState } from 'react'
import { brandContext } from '../../Context/BrandContext'
import { useParams } from 'react-router-dom';

export default function BrandDetails() {
    const [isloading, setisloading] = useState(false)
    let { getBrandDetails } = useContext(brandContext)
    let [brandDetails, setbrandDetails] = useState(false)
    let params = useParams()

    async function getbrand(brandId) {
        setisloading(true)
        let response = await getBrandDetails(brandId)
        setisloading(false)
        setbrandDetails(response.data.data)
    }

    useEffect(() => {
        getbrand(params.brandId)
    }, [])

    return <>
        <div className="row">

            {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : <div className='w-100'>
                <img height={400} src={brandDetails?.Image?.secure_url} className='w-100' alt="" />
                <h2 className='text-center'>{brandDetails.name}</h2>
            </div>
            }
        </div>
    </>
}
