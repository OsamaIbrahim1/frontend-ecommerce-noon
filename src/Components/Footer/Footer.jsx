import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {

    return <>
        <footer>

            <div className='d-flex justify-content-between bg-black p-5 mt-4 main-section'>
                <div className='col-md-2 section'>
                    <Link to={'/'}><p className='footer-content'>Exclusive</p></Link>
                    <Link to={'/'}><p className='footer-content'>Subscribe</p></Link>
                    <Link to={'/'}><p className='footer-content'>Get 10% off your first order</p></Link>
                    <div className='footer-input position-relative'>
                        <input className='w-100' type="text" name="yourmail" id="yourmail" placeholder='Enter your email' />
                        <i className="fa-regular fa-paper-plane position-absolute"></i>
                    </div>
                </div>
                <div className='col-md-2 section'>
                    <Link to={'/'}><p className='footer-content'>Support</p></Link>
                    <Link to={'/'}><p className='footer-content'>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p></Link>
                    <Link to={'/'}><p className='footer-content'>exclusive@gmail.com</p></Link>
                    <Link to={'/'}><p className='footer-content'>+88015-88888-9999</p></Link>
                </div>
                <div className='col-md-2 section'>
                    <Link to={'/'}><p className='footer-content'>Account</p></Link>
                    <Link to={'/'}><p className='footer-content'>My Account</p></Link>
                    <Link to={'/'}><p className='footer-content'>Login / Register</p></Link>
                    <Link to={'/'}><p className='footer-content'>Cart</p></Link>
                    <Link to={'/'}><p className='footer-content'>Wishlist</p></Link>
                    <Link to={'/'}><p className='footer-content'>Shop</p></Link>
                </div>
                <div className='col-md-2 section'>
                    <Link to={'/'}><p className='footer-content'>Quick Link</p></Link>
                    <Link to={'/'}><p className='footer-content'>Privacy Policy</p></Link>
                    <Link to={'/'}><p className='footer-content'>Terms Of Use</p></Link>
                    <Link to={'/'}><p className='footer-content'>FAQ</p></Link>
                    <Link to={'/'}><p className='footer-content'>Contact</p></Link>
                </div>
                <div className='col-md-2 section'>
                    <Link to={'/'}><p className='footer-content'>Download App</p></Link>
                    <Link to={'/'}>  <p className='footer-content small'>Save $3 with App New User Only</p></Link>
                    <Link to={'/'}><p className='footer-content'>Get 10% off your first order</p></Link>
                </div>

            </div>
            <div className='footer-hr'></div>
            <div className='footer-copy-write bg-black d-flex justify-content-center pt-2 text-center'>
                <p>&copy;</p> <p>Copyright Rimel 2022. All right reserved</p>
            </div>
        </footer>

    </>
}
