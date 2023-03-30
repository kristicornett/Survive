import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByEmail } from "../../repos/ApiManager"
import './Login.css'

export const Login = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        return getUserByEmail(email)
        .then(foundUsers => {
            if (foundUsers.length === 1){
                const user = foundUsers[0]
                localStorage.setItem('survive_user', JSON.stringify({
                    id: user.id,
                    name: user.name

                }))

                navigate('/')
            } else {
                window.alert('Invalid Login')
            }
        })
    }

    return (
        <main className='container--login'>
            <div className='w-full'> 
            <h1 className='text-6xl p-14 decoration-8 text-center text-green-600 text-shadow shadow-indigo-500 font-bold'>Survive.net</h1>
             </div>
            <div className='w-full h-screen flex login-main'>
                <div className='w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-purple-700'>
                    <div className='login-form flex flex-row justify-center items-center'>
                        <div className='login-form-body p-10 inline-block'>
                        <form className='' onSubmit={handleLogin}>
                            
                            <div className='text-green-600'>
                            <h2 className='text-2xl font-bold  p-2 px-4 py-3 text-center mb-7'>Sign In</h2>
                            
                            <fieldset className='pb-4'>
                                <label className='font-semibold pb-6 px-4 mb-4 rounded-lg w-full focus:border-indigo-600 focus:bg-white focus:outline-indigo-500 flex-col ml-4' htmlFor='inputEmail'>Email address</label>
                                <input type='email'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                className='form-control'
                                placeholder='Email address'
                                required autoFocus />
                            </fieldset>
                            </div>
                            
                            <fieldset>
                                <div className=' p-4 pb-6'>
                                <button className='rounded-full bg-slate-200 w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-green-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2' type='submit'>
                                    Sign in
                                </button>
                                <Link className='rounded-full bg-slate-200 w-36 pt-1, m-3 px-4 py-1.5 text-sm text-purple-600 font-semibold rounded-full border border-green-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2' to='/register'>Join Survive.net</Link>
                                </div>
                            </fieldset>
                        </form>
                        </div>

                    </div>

                </div>
                <div className='w-1/2'>
                <img className='login-zombie' src='https://th-thumbnailer.cdn-si-edu.com/snh4FaR_sMYm--hsrr25bYyuxJ8=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/78/b8/78b8f64e-f6fa-4428-bdec-bac86dc144b3/zombie.jpg'/>
                </div>
            </div>
        </main>
        
    )
}