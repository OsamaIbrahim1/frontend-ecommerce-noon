import axios from 'axios'
import React, { useEffect, useState } from 'react'
import logo1 from '../../assets/images/blog-img-1.jpeg'
import logo2 from '../../assets/images/blog-img-2.jpeg'
import logo3 from '../../assets/images/banner-4.jpeg'
import { Link } from 'react-router-dom';

export default function CategorySlider() {
    let [categories, setcategories] = useState([])
    const [isloading, setisloading] = useState(false)

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
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return <>
        {/* {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : <Slider className='mb-4' {...settings}>
                {categories?.map((category) => <div className='p-1' key={category._id}>
                    <img className='w-100' height={200} src={category.Image.secure_url} alt="" />
                    <h2 className='h6 pt-2'>{category.name}</h2>
                </div>)}
            </Slider>} */}
        {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : <div className='d-flex justify-content-between'>

            <div className='col-2 main-category-home'>
                {categories?.map((category) => <div className='p-1 category-home' key={category._id}>
                    <Link to={`/categoryDetails/${category._id}`}>
                        <h2 className='h6 pt-2'>{category?.name}</h2>
                    </Link>
                </div>)}
            </div>



            <div id="carouselExample" className="carousel slide py-2 col-9">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={logo3} className="d-block w-100" height={350} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={logo1} className="d-block w-100" height={350} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={logo2} className="d-block w-100" height={350} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>}
    </>
}
