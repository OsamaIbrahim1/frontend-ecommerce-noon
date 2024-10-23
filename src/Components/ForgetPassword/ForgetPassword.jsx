import axios from 'axios'
import React, { useState } from 'react'
import * as Yup from 'yup'
import image from '../../assets/images/pexels-asphotograpy-230544.jpg'
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function ForgetPassword() {
    const [isloading, setisloading] = useState(false)
    const [messageError, setmessageError] = useState('')
    let navigate = useNavigate()

    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('enter valid email'),
    })

    async function forgetPassword(values) {
        console.log(values)
        setisloading(true)
        let response = await axios.post(`https://e-cmmerce-noon-5.onrender.com/auth/forgetPassword`, values).catch((err) => {
            setisloading(false)
            setmessageError(`Error : ${err.response.data.error_msg}`)
        })
        console.log(response.data)
        setisloading(false)
        if (response.data.success) {
            setisloading(false)
            toast.success('verify your mail', {
                duration: 2000,
                style: {
                    fontSize: 15
                },
                className: 'toast-success',
            })
            // navigate(`/resetPassword/`)
        }
    }

    let formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: forgetPassword
    })
    return <>
        <Helmet>
            <title>Forget Password</title>
        </Helmet>
        <div className='d-flex justify-content-between '>

            <div className='w-50 d-flex align-items-center p-2'>
                <img src={image} className='w-100 align-items-center login-image' alt="" />
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center p-3'>

                <div>
                    <h3 className='fw-bolder mb-3'>forget password </h3>
                    <p className='mb-4'>Enter your details below</p>

                    {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}

                    <form onSubmit={formik.handleSubmit}>
                        <input placeholder='email' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                        {formik.errors.email && formik.touched.email ? <p className='alert-message'>{formik.errors.email}</p> : null}
                        <div className="hr mb-2"></div>

                        <div className='buttons-login d-flex align-items-center justify-content-between'>
                            {isloading ? <button type='button' className='btn bg-main text-white '><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>forget password</button>}
                        </div>


                    </form>
                </div>

            </div>
        </div>

    </>
}
