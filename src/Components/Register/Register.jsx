import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

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
            role: '',
            age: ''
        },
        validationSchema,
        onSubmit: handleRegister

    })

    return <>
        <Helmet>
            <title>Register</title>
        </Helmet>
        <div className="w-75 mx-auto py-4">
            <h3>Register Now : </h3>
            {messageError.length > 0 ? <div className='alert alert-danger'>{messageError}</div> : null}

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">User Name</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.username} type="text" name='username' id='username' />
                {formik.errors.username && formik.touched.username ? <div className='alert alert-danger'>{formik.errors.username}</div> : null}

                <label htmlFor="email">Email</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

                <label htmlFor="phoneNumber">Phone Number</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phoneNumber} type="tel" name='phoneNumber' id='phoneNumber' />
                {formik.errors.phoneNumber && formik.touched.phoneNumber ? <div className='alert alert-danger'>{formik.errors.phoneNumber}</div> : null}

                <label htmlFor="address">Address</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.address} type="text" name='address' id='address' />
                {formik.errors.address && formik.touched.address ? <div className='alert alert-danger'>{formik.errors.address}</div> : null}

                <label htmlFor="role">Role</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.role} type="text" name='role' id='role' />
                {formik.errors.role && formik.touched.role ? <div className='alert alert-danger'>{formik.errors.role}</div> : null}

                <label htmlFor="age">Age</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.age} type="text" name='age' id='age' />
                {formik.errors.age && formik.touched.age ? <div className='alert alert-danger'>{formik.errors.age}</div> : null}

                {isloading ? <button type='buttn' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}

            </form>
        </div>

    </>
}
