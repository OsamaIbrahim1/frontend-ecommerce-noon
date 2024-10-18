import React from 'react'
import logo1 from '../../assets/images/blog-img-1.jpeg'
import logo2 from '../../assets/images/blog-img-2.jpeg'
import logo3 from '../../assets/images/banner-4.jpeg'

export default function MainSlider() {

    return <>
        <div id="carouselExample" className="carousel slide py-2">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={logo3} className="d-block w-100" height={500} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={logo1} className="d-block w-100" height={500} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={logo2} className="d-block w-100" height={500} alt="..." />
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
    </>
}
