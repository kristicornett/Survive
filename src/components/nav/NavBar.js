import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
    const localSurviveUser = localStorage.getItem('survive_user')
    const localSurviveObject = JSON.parse(localSurviveUser)
    const navigate = useNavigate()

    return (
        <div className='navbar w-full'>
        <ul className='flex w-full shadow-xl font-mono font-bold 
        space-x-20 p-6 lg:px-8 ml-16 place-content-evenly content-evenly
        type="button" inline-flex rounded-md p-2 text-gray-300
        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
         ">' aria-controls="mobile-menu" aria-expanded="false">
             <li className='navbar__item active hover:text-green-600'>
                <Link className='navbar__link' to='/'>Home Page</Link>
            </li>
            <li className='navbar__item active hover:text-green-600'>
                <Link className='navbar__link' to='/zombies'>Zombie Sightings</Link>
            </li>
            <li className='navbar__item active hover:text-green-600'>
                <Link className='navbar__link' to='/trades'>Trade Offers</Link>
            </li>
            <li className='navbar__item active hover:text-green-600'>
                <Link className='navbar__link' to='/towns'>Towns</Link>
            </li>
            <li className='navbar__item active hover:text-green-600'>
                <Link className='navbar__link' to='/parks'>Parks</Link>
            </li>

            {
                localStorage.getItem('survive_user')
                ? <li className='navbar__item navbar__logout hover:text-green-600'>
                    <Link className='navbar__link' to='' onClick={() => {
                        localStorage.removeItem('survive_user')
                        navigate('/', {replace: true})
                    }}>Logout</Link>
                </li>
                : ''
            }
        </ul>
        </div>
    )
}

