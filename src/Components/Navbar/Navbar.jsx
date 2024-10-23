import React, { useContext } from 'react'
import './Navbar.module.css'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'

export default function Navbar({ userData, logout }) {

    let { numberOfCartItem } = useContext(cartContext)

    function hideIconSearch() {
        let icon = document.getElementById('search-icon')
        icon.className = 'd-none'
        return icon
    }

    function showIconSearch() {
        let icon = document.getElementById('search-icon')
        icon.className = 'fa-solid fa-magnifying-glass position-absolute'
        return icon
    }



    return <>

        <nav
            className="navbar fixed-top navbar-expand-sm navbar-light bg-white "
        >
            <div className="container d-flex justify-align-content-between">
                <div>
                    <Link className="navbar-brand'" to="/"><h1 className='h5 fw-bolder'>Exclusive</h1></Link>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId"
                        aria-controls="collapsibleNavId"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="categories">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="brands">Brands</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="orders">Orders</Link>
                        </li>
                    </ul> : null}

                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        {userData === null ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                            <i className="fa-solid fa-person-circle-xmark align-content-center"></i>

                        </> : <>
                            <form className="d-flex position-relative align-items-center" role="search">
                                <input onChange={hideIconSearch} onMouseLeave={showIconSearch} className="search p-2" type="search" placeholder="What are you looking for?" aria-label="Search" />
                                <i id='search-icon' className="fa-solid fa-magnifying-glass position-absolute"></i>
                            </form>
                            <li className="nav-item">
                                <Link className="nav-link position-relative px-2" to="/cart">
                                    <i className='fas fa-shopping-cart fa-lg'></i>
                                    <span className='badge position-absolute top-0 end-0 bg-main text-white'>{numberOfCartItem}</span>
                                </Link>
                            </li>
                            <li className="nav-item d-flex">
                                <span onClick={logout} className=" cursor-pointer nav-link">Logout</span>

                                <div className='align-content-center'><Link to={'/userProfile'}><i className="fa-solid fa-person cursor-pointer mx-3" ></i></Link></div>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>

        {/*         
        <nav
            className="navbar fixed-top navbar-expand-sm navbar-light bg-light"
        >
            <div className="container">
                <Link className="navbar-brand'" to="/"><h1 className='fw-bolder'>Exclusive</h1></Link>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="categories">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="brands">Brands</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="orders">Orders</Link>
                        </li>
                    </ul> : null}

                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <i className='fab mx-2 fa-facebook'></i>
                            <i className='fab mx-2 fa-twitter'></i>
                            <i className='fab mx-2 fa-instagram'></i>
                            <i className='fab mx-2 fa-tiktok'></i>
                            <i className='fab mx-2 fa-linkedin'></i>
                            <i className='fab mx-2 fa-youtube'></i>
                        </li>
                        {userData === null ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                            <i className="fa-solid fa-person-circle-xmark align-content-center"></i>

                        </> : <>
                            <li className="nav-item">
                                <Link className="nav-link position-relative px-2" to="/cart">
                                    <i className='fas fa-shopping-cart fa-lg'></i>
                                    <span className='badge position-absolute top-0 end-0 bg-main text-white'>{numberOfCartItem}</span>
                                </Link>
                            </li>
                            <li className="nav-item d-flex">
                                <span onClick={logout} className=" cursor-pointer nav-link">Logout</span>

                                <i className="fa-solid fa-person align-content-center cursor-pointer"></i>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav> */}
    </>
}
