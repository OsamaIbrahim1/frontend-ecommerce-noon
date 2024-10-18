import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { orderContext } from '../../Context/OrderContext'
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function CheckOut() {
    const { convertCartToOrder, onlinePayment } = useContext(orderContext);
    const { getLoggedUserCart } = useContext(cartContext);

    const [isloading, setisloading] = useState(false)

    async function getCart() {
        let response = await getLoggedUserCart()
        console.log(response)
    }

    async function handleSubmit(values) {
        setisloading(true)
        let response = await convertCartToOrder(values)
        if (response?.data?.success) {
            let responsePayment = await onlinePayment(response.data.data._id)
            window.location.href = responsePayment.data.data.url
            setisloading(false)
            toast.success(response.data.message, {
                duration: 2000,
                style: {
                    fontSize: 15
                },
                className: 'toast-success',
            })
        }
    }

    let formik = useFormik({
        initialValues:
        {
            // couponCode: "",
            paymentMethod: "",
            phoneNumbers: "",
            address: "",
            city: "",
            postalCode: "",
            country: ""
        },
        onSubmit: handleSubmit
    })

    useEffect(() => {
        getCart()
    }, [])
    return <>
        <Helmet>
            <title>Checkout</title>
        </Helmet>
        {isloading ? <div className='text-center'> <i className='fas fa-spin fa-2x fa-spinner text-main position-absolute'></i></div> : <div className="w-50 py-5 mx-auto">
            <form onSubmit={formik.handleSubmit}>
                <select className="form-select" aria-label="Default select example" name="paymentMethod" value={formik.values.paymentMethod} onChange={formik.handleChange} >
                    <option value='Cash' >Cash</option>
                    <option value='Stripe'>Stripe</option>
                    <option value='Paymob'>Paymob</option>
                </select>

                <div className="d-flex justify-content-between my-2 align-items-center">
                    <label htmlFor="phoneNumbers">phone :</label> <button className='btn bg-outline-main'>add new number</button>
                </div>
                <input required type="tel" onChange={formik.handleChange} className='form-control mb-3' name="phoneNumbers" value={formik.values.phoneNumbers} id="phoneNumbers" />

                <label htmlFor="address">address :</label>
                <input required type="text" onChange={formik.handleChange} className='form-control mb-3' name="address" value={formik.values.address} id="address" />

                <label htmlFor="country">country :</label>
                <input required type="text" onChange={formik.handleChange} className='form-control mb-3' name="country" value={formik.values.country} id="country" />

                <label htmlFor="city">city :</label>
                <input required type="text" onChange={formik.handleChange} className='form-control mb-3' name="city" value={formik.values.city} id="city" />

                <label htmlFor="postalCode">postalCode :</label>
                <input required type="text" onChange={formik.handleChange} className='form-control mb-3' name="postalCode" value={formik.values.postalCode} id="postalCode" />
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-dark' >Back</button>
                    <button type='submit' onClick={() => handleSubmit(formik.values)} className='btn bg-outline-main w-25'>Pay</button>
                </div>
            </form>

        </div>}
    </>
}
