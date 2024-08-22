import { current } from '@reduxjs/toolkit'
import React from 'react'

import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className='text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>The&nbsp;</span>
                        <span className='text-slate-700 font-semibold'>Estates</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center w-32 sm:w-60' >
                    <input type="text" placeholder='Search...' className='bg-transparent outline-none' />
                    <FaSearch className='text-slate-600' />
                </form>
                <ul className='flex gap-4'>
                    <Link to="/"><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
                    <Link to="/about"><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
                    <Link to="/profile">
                        {
                            currentUser ? (
                                <img src={currentUser.avatar} className='rounded-full h-7 w-7 object-cover '/>
                            ): <li className = 'text-slate-700 hover:underline'>Sign In</li>
                        }
                </Link>
            </ul>
        </div>
        </header >
    )
}
