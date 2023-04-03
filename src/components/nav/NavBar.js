import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
    const localSurviveUser = localStorage.getItem('survive_user')
    const localSurviveObject = JSON.parse(localSurviveUser)
    const navigate = useNavigate()

    return (
        <div className='navbar w-full flex'>
        <div className='navbar__home flex-none active hover:text-green-600'><Link className='navbar__link' to='/'>Home Page</Link></div>
        <div className='flex-1'>
        <ul className='flex justify-evenly w-full
    
         ' aria-controls="mobile-menu" aria-expanded="false">
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
            </ul>
            </div>
            <div className='navbar__logout w-32 active hover:text-green-600'>
            {
                localStorage.getItem('survive_user')

                ? 
                    <Link className='navbar__link' to='' onClick={() => {
                        localStorage.removeItem('survive_user')
                        navigate('/', {replace: true})
                    }}>Logout</Link>
                
                : ''
            }
        </div>
        </div>
    )
}

