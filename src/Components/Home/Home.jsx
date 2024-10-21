import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
// import MainSlider from './../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import SliderCategory from '../SliderCategory/SliderCategory';
export default function Home() {
    return <>
        <Helmet>
            <title>Home</title>
        </Helmet>
        
        <CategorySlider />

        <SliderCategory />

        <FeaturedProducts />

    </>
}