import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="" className='rounded-full object-cover h-24 w-24 cursor-pointer self-center mt-2' />
        <input type="text" placeholder='username' className='border p-3 outline-none rounded-lg' id='username'/>
        <input type="email" placeholder='email' className='border p-3 outline-none rounded-lg' id='email'/>
        <input type="text" placeholder='password' className='border p-3 outline-none rounded-lg' id='password'/>
        <button className='bg-slate-700 rounded-lg p-3 uppercase text-white hover:opacity-90'>Update</button>
      </form>
      <div className='flex mt-5 justify-between '>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
