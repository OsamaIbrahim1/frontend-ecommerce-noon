import React, { useContext, useEffect, useState } from 'react'
import { orderContext } from '../../Context/OrderContext'
import { Helmet } from 'react-helmet'
// import { Link, useNavigate } from 'react-router-dom'

export default function Order() {
    let { getAllOrdersUser } = useContext(orderContext)
    const [orders, setorders] = useState([])
    // const [isloading, setisloading] = useState(false)
    // let navigate = useNavigate()

    async function getOrdersUser() {
        // setisloading(true)
        let response = await getAllOrdersUser()
        setorders(response.data.data)
    }

    useEffect(() => {
        getOrdersUser()
    }, [])

    return <>
        <Helmet>
            <title>Your Orders</title>
        </Helmet>
        <div className='row'>
            <h1>Orders : </h1>
            <Link to={'/'}>
                {orders?.map((order) => <div key={order._id} className='order cursor-pointer px-2 py-3  d-flex'>
                    <div className='col-md-4 mt-4'>
                        {order.orderItems.map((item) => <>
                            <h4 className='h6 fw-bolder'>title : {item.title}</h4>
                            <h4 className='h6 fw-bolder'>quantity : {item.quantity}</h4>

                        </>

                        )}
                    </div>
                    <div className='col-md-4'>
                        <h4 className='h4 text-center'>{order.orderStatus}</h4>
                    </div>
                    <div className='col-md-4 mt-4 '>
                        <h4 className='h6 fw-bolder'>payment method : {order.paymentMethod}</h4>
                        <h4 className='h6 fw-bolder'>is paid: {`${order.isPaid}`}</h4>
                        <h4 className='h6 fw-bolder'>is delivered: {`${order.isDelivered}`}</h4>
                        <h4 className='h6 fw-bolder'>total price: {order.totalPrice}</h4>
                        <button className='btn bg-outline-main start-0'>more detailes</button>
                    </div>
                </div>
                )}
            </Link>
        </div>
    </>
}
