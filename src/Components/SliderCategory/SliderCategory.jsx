import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'

export default function SliderCategory() {

    let [categories, setcategories] = useState([])
    const [isloading, setisloading] = useState(false)
    let navigate = useNavigate()

    async function getCategories() {
        try {
            setisloading(true)
            let { data } = await axios.get(`https://e-cmmerce-noon-5.onrender.com/category/categories`, {
                headers: {
                    'accesstoken': 'accesstoken_' + localStorage.getItem('userToken')
                }
            })
            setcategories(data.data)
            setisloading(false)
        } catch (error) {
            console.log(error)
            navigate('/register')
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return <>

        {isloading ? <div className='text-center'></div> : <>

            <h2 className='fw-bolder'>Categories</h2>
            <Slider className='mb-4 category-slider' {...settings}>
                {categories?.map((category) => <div className='p-1' key={category._id}>
                    <img className='w-100' height={200} src={category.Image.secure_url} alt="" />
                    <h2 className='h6 pt-2'>{category.name}</h2>
                </div>)}
            </Slider>
        </>
        }
    </>
}
