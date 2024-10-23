import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function UserProfile() {
    let { getUserData, deleteAccount } = useContext(userContext)
    let [user, setuser] = useState(null)
    let [isloading, setisloading] = useState(false)
    let navigate = useNavigate()


    async function getData() {
        setisloading(true)
        let response = await getUserData()

        if (response.data.success) {
            setuser(response.data.data)
            setisloading(false)
        } else {
            navigate('/')
        }
    }

    async function deleteUser() {
        try {

            setisloading(true)
            let response = await deleteAccount()
            setisloading(false)
            if (response.data.success) {
                setuser(null)
                toast.success(response.data.message, {
                    duration: 2000,
                    style: {
                        fontSize: 15
                    },
                    className: 'toast-success',
                })
                navigate('/register')
            } else {
                toast.success(response.data.message, {
                    duration: 2000,
                    style: {
                        fontSize: 15
                    },
                    className: 'toast-success',
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        {isloading ? <div className='text-center '> <i className='fas fa-spin fa-2x fa-spinner text-main'></i></div> : <div className='row-data row p-4'>
            <div className='text-center'>  <button onClick={deleteUser} className='btn bg-main text-white'>Delete Account</button></div>
            <h2 className='data py-3' >User Name : {user?.username}</h2>
            <h2 className='data py-3' >Email : {user?.email}</h2>
            <h2 className='data py-3' >Phone Number : {user?.phoneNumber}</h2>
            <h2 className='data py-3' >Role : {user?.role}</h2>
            <h2 className='data py-3' >Age : {user?.age}</h2>
            <h2 className='data py-3' >Address : {user?.address}</h2>
            <div className='d-flex justify-content-between mt-4'>
                <Link to={'/update'}><button className='btn bg-main text-white'>Updata Data</button></Link>
                <Link to={'/changePassword'}><button className='btn bg-main text-white'>Change Password</button></Link>
            </div>
        </div>}
    </>
}
