import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return <>
        <div className='d-flex justify-content-center align-content-center'>
        <div className='not-found'>

            <div className='w-100 text-center'>
                <h1 className='fw-bolder'>404 Not Found</h1>
                <p className='py-4'>Your visited page not found. You may go home page.</p>
                <Link to={'/'}><button className='btn bg-main text-white'>Back to home page</button></Link>
            </div>
        </div>
        </div>

    </>
}
