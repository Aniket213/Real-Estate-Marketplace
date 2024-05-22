import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-slate-200 p-5 shadow-md'>
        <div className="flex justify-between max-w-6xl m-auto items-center">
            <h1>Ani Estate</h1>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input 
                    className='bg-transparent focus:outline-none focus:placeholder:text-transparent w-24 sm:w-64' 
                    type="text" 
                    placeholder='search...' 
                />
                <FaSearch className='text-slate-600' />
            </form>
            <ul className="flex gap-4">
                <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
                <Link to='/about'><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
                <Link to='/signup'><li className='text-slate-700 hover:underline'>SignUp</li></Link>
            </ul>
        </div>
    </header>
  )
}
