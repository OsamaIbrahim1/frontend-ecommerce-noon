import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
import image from '../../assets/images/pexels-asphotograpy-230544.jpg'
import axios from 'axios'


export default function UpdateAccount() {
    let headers = {
        accesstoken: "accesstoken_" + localStorage.getItem("userToken"),
    };
    let navigate = useNavigate()
    const [isloading, setisloading] = useState(false)
    const [messageError, setmessageError] = useState('')

    async function handleUpdateAccount(values) {
        try {
            setisloading(true)
            // let valuesObj = {}
            if (!values.username) {
                delete values.username
            }
            if (!values.email) {
                delete values.email
            }
            if (!values.age) {
                delete values.age
            }
            if (!values.address) {
                delete values.address
            }
            if (!values.phoneNumber) {
                delete values.phoneNumber
            }

            console.log("values:", values)

            let response = await axios.put(
                "https://e-cmmerce-noon-5.onrender.com/auth/update",
                values,
                {
                    headers,
                }
            ).catch((err) => {
                setisloading(false)
                console.log(err)
                setmessageError(`Error : ${err.response.data.error_msg}`)
            })
            console.log("response.data: ", response.data)
            if (response.data.success) {
                setisloading(false)
                navigate('/userProfile')
            }
        } catch (error) {
            console.log(error)
        }
    }

    let validationSchema = Yup.object({
        username: Yup.string().min(3, 'name minLength is 3').max(10, 'name maxLength is 10'),
        email: Yup.string().email('enter valid email'),
        phoneNumber: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone number should be 11 number'),
        address: Yup.string(),
        age: Yup.number().min(16).max(80)
    })

    let formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phoneNumber: '',
            age: '',
            address: ''
        },
        validationSchema,
        onSubmit: handleUpdateAccount

    })



    return <>
        <Helmet>
            <title>Update Account</title>
        </Helmet>

        <div className='d-flex justify-content-between'>

            <div className='w-50 d-flex align-items-center p-2'>
                <img src={image} className='w-100 align-items-center login-image' alt="" />
            </div>
            <div className="col-md-4 p-3">
                <h3 className='fw-bolder mb-3'>Update account data</h3>
                <p className='mb-4'>Enter your details below</p>

                {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}

                <form onSubmit={formik.handleSubmit}>
                    <input placeholder='username' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.username} type="text" name='username' id='username' />
                    {formik.errors.username && formik.touched.username ? <p className='alert-message'>{formik.errors.username}</p> : null}
                    <div className="hr mb-2"></div>
                    <input placeholder='email' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                    {formik.errors.email && formik.touched.email ? <p className='alert-message'>{formik.errors.email}</p> : null}

                    <div className="hr mb-2"></div>
                    <input placeholder='phoneNumber' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phoneNumber} type="tel" name='phoneNumber' id='phoneNumber' />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? <p className='alert-message'>{formik.errors.phoneNumber}</p> : null}

                    <div className="hr mb-2"></div>
                    <input placeholder='address' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.address} type="text" name='address' id='address' />
                    {formik.errors.address && formik.touched.address ? <p className='alert-message'>{formik.errors.address}</p> : null}

                    <div className="hr"></div>

                    <input placeholder='age' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.age} type="text" name='age' id='age' />
                    {formik.errors.age && formik.touched.age ? <p className='alert-message'>{formik.errors.age}</p> : null}
                    <div className="hr mb-2"></div>
                    <div className='update-button d-flex justify-content-between'>

                        {isloading ? <button type='buttn' className='btn bg-main text-white '><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' className='btn bg-main text-white'>Update Data</button>}
                        <Link to={'/userProfile'}><button className='btn bg-dark text-white'>Back</button></Link>
                    </div>
                </form>
            </div>
        </div>
    </>
}
