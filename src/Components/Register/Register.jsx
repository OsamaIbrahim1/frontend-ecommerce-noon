import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import image from '../../assets/images/pexels-asphotograpy-230544.jpg'

export default function Register() {
    let navigate = useNavigate()

    const [isloading, setisloading] = useState(false)
    const [messageError, setmessageError] = useState('')

    async function handleRegister(values) {
        setisloading(true)
        let { data } = await axios.post('https://e-cmmerce-noon-5.onrender.com/auth/signup', values).catch((err) => {
            setisloading(false)
            setmessageError(`Error : ${err.response.data.error_msg}`)
        })
        if (data.success) {
            setisloading(false)
            navigate('/login')
        }
    }

    let validationSchema = Yup.object({
        username: Yup.string().required('username is required').min(3, 'name minLength is 3').max(10, 'name maxLength is 10'),
        email: Yup.string().required('email is required').email('enter valid email'),
        password: Yup.string().required('passwored is required').min(6, 'password minLength is 6').max(15, 'password maxLength is 15'),
        phoneNumber: Yup.string().required('phone number is required').matches(/^01[0125][0-9]{8}$/, 'phone number should be 11 number'),
        address: Yup.string().required('address is required'),
        role: Yup.string().required("Role is required"),
        age: Yup.number().required('age is required').min(16).max(80)
    })

    let formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: '',
            role: 'user',
            age: ''
        },
        validationSchema,
        onSubmit: handleRegister

    })

    return <>
        <Helmet>
            <title>Register</title>
        </Helmet>
        <div className='d-flex justify-content-between'>

            <div className='w-50 '>
                <img src={image} className='w-100 align-items-center' alt="" />
            </div>
            {/* <div className="w-75 mx-auto py-4"> */}
            <div className="col-md-4">
                <h3 className='fw-bolder mb-3'>Create an account </h3>
                <p className='mb-4'>Enter your details below</p>

                {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}

                <form onSubmit={formik.handleSubmit}>
                    <input placeholder='username' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.username} type="text" name='username' id='username' />
                    {formik.errors.username && formik.touched.username ? <p className='alert-message'>{formik.errors.username}</p> : null}
                    <div className="hr mb-2"></div>
                    <input placeholder='email' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                    {formik.errors.email && formik.touched.email ? <p className='alert-message'>{formik.errors.email}</p> : null}

                    <div className="hr mb-2"></div>
                    <input placeholder='password' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
                    {formik.errors.password && formik.touched.password ? <p className='alert-message'>{formik.errors.password}</p> : null}

                    <div className="hr mb-2"></div>
                    <input placeholder='phoneNumber' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phoneNumber} type="tel" name='phoneNumber' id='phoneNumber' />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? <p className='alert-message'>{formik.errors.phoneNumber}</p> : null}

                    <div className="hr mb-2"></div>
                    <input placeholder='address' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.address} type="text" name='address' id='address' />
                    {formik.errors.address && formik.touched.address ? <p className='alert-message'>{formik.errors.address}</p> : null}

                    <div className="hr"></div>
                    {/* <input placeholder='role' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.role} type="text" name='role' id='role' />
                    {formik.errors.role && formik.touched.role ? <div className='alert alert-danger'>{formik.errors.role}</div> : null}
                    <hr /> */}

                    <input placeholder='age' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.age} type="text" name='age' id='age' />
                    {formik.errors.age && formik.touched.age ? <p className='alert-message'>{formik.errors.age}</p> : null}
                    <div className="hr mb-2"></div>

                    {isloading ? <button type='buttn' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}

                </form>
            </div>

        </div>
    </>
}
