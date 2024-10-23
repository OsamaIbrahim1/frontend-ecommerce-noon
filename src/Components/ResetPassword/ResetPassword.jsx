import React, { useEffect, useState } from 'react'
import styles from './ResetPassword.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import image from '../../assets/images/pexels-asphotograpy-230544.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'


export default function ResetPassword() {
    let navigate = useNavigate()
    const [messageError, setmessageError] = useState('')
    const [isloading, setisloading] = useState(false)
    let params = useParams()

    async function resetPassword(values) {
        let response = await axios.post(`https://e-cmmerce-noon-5.onrender.com/auth/resetPassword/${params.token}`, values).catch((err) => {
            setisloading(false)
            setmessageError(`Error : ${err.response.data.error_msg}`)
        })
        if (response.data.success) {
            setisloading(false)
            navigate('/login')
        }

    }

    let validationSchema = Yup.object({
        newPassword: Yup.string().required('passwored is required').min(6, 'password minLength is 6').max(15, 'password maxLength is 15'),
    })

    let formik = useFormik({
        initialValues: {
            newPassword: '',
        },
        validationSchema,
        onSubmit: resetPassword
    })


    // useEffect(() => {
    //     resetPassword(params.token)
    // }, [])

    return <>
        <Helmet>
            <title>Reset Password</title>
        </Helmet>

        <div className='d-flex justify-content-between '>

            <div className='w-50 d-flex align-items-center p-2'>
                <img src={image} className='w-100 align-items-center login-image' alt="" />
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center p-3'>

                <div>
                    <h3 className='fw-bolder mb-3'>Log in to Exclusive</h3>
                    <p className='mb-4'>Enter your details below</p>

                    {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}

                    <form onSubmit={formik.handleSubmit}>

                        <input placeholder='new password' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.newPassword} type="password" name='newPassword' id='newPassword' />
                        {formik.errors.newPassword && formik.touched.newPassword ? <p className='alert-message'>{formik.errors.newPassword}</p> : null}
                        <div className="hr mb-2"></div>

                        <div className='buttons-login d-flex align-items-center justify-content-between'>
                            {isloading ? <button type='button' className='btn bg-main text-white '><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Save Password</button>}
                        </div>


                    </form>
                </div>

            </div>
        </div>

    </>
}
