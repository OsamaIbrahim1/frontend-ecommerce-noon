import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function Login({ saveUserData }) {
    let navigate = useNavigate()

    const [isloading, setisloading] = useState(false)
    const [messageError, setmessageError] = useState('')

    async function handleLogin(values) {
        setisloading(true)
        let { data } = await axios.post('https://e-cmmerce-noon-5.onrender.com/auth/signin', values).catch((err) => {
            setisloading(false)
            setmessageError(`Error : ${err.response.data.error_msg}`)
        })
        if (data.success) {
            localStorage.setItem('userToken', data.data.token)
            saveUserData()
            setisloading(false)
            navigate('/')
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('enter valid email'),
        password: Yup.string().required('passwored is required').min(6, 'password minLength is 6').max(15, 'password maxLength is 15'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin
    })

    return <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className="w-75 mx-auto py-4">
            <h3>Login Now : </h3>
            {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

                {isloading ? <button type='buttn' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}

            </form>
        </div>
    </>
}
