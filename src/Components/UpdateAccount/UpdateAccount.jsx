import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'

export default function UpdateAccount() {
    let { handleUpdateAccount } = useContext(userContext)
    let navigate = useNavigate()
    const [isloading, setisloading] = useState(false)
    const [messageError, setmessageError] = useState('')

    async function handleUpdateData() {
        let response = await handleUpdateAccount().catch((err) => {
            setmessageError(`Error : ${err.response.data.error_msg}`);
        });
        console.log(response)
    }

    let validationSchema = Yup.object({
        username: Yup.string().required('username is required').min(3, 'name minLength is 3').max(10, 'name maxLength is 10'),
        email: Yup.string().required('email is required').email('enter valid email'),
        phoneNumber: Yup.string().required('phone number is required').matches(/^01[0125][0-9]{8}$/, 'phone number should be 11 number'),
        address: Yup.string().required('address is required'),
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
        onSubmit: handleUpdateData

    })



    return <>
        <Helmet>
            <title>Update Account</title>
        </Helmet>

        <div className='d-flex justify-content-between'>

            <div className='w-50 '>
                <img src={image} className='w-100 align-items-center' alt="" />
            </div>
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
                    <input placeholder='phoneNumber' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phoneNumber} type="tel" name='phoneNumber' id='phoneNumber' />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? <p className='alert-message'>{formik.errors.phoneNumber}</p> : null}

                    <div className="hr mb-2"></div>
                    <input placeholder='address' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.address} type="text" name='address' id='address' />
                    {formik.errors.address && formik.touched.address ? <p className='alert-message'>{formik.errors.address}</p> : null}

                    <div className="hr"></div>

                    <input placeholder='age' onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.age} type="text" name='age' id='age' />
                    {formik.errors.age && formik.touched.age ? <p className='alert-message'>{formik.errors.age}</p> : null}
                    <div className="hr mb-2"></div>

                    {isloading ? <button type='buttn' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}

                </form>
            </div>

        </div>

    </>
}
