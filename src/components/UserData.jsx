import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";

const UserData = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const {id} = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => 
      res.json())
     .then(data => {
      setData(data)
      setLoading(false)
      console.log(data);
      
     }) 
     .catch(error =>{
      console.log("Error Fetching Data" , error);
      
     })
  }, [id])

  if (loading) {
    return <p>Loading....</p>
  }

  return (
    <>
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-10'>
      <h1 className='text-5xl'>User Data</h1>
      <div className='w-[26vw] border rounded-xl shadow-xl shadow-emerald-950/50 px-6 py-6'>
        <h2 className='text-4xl mb-8 text-blue-700'>{data.name}</h2>
        <h2 className='text-md mb-1'><span className=' font-semibold text-black'> Id: </span > {data.id}</h2>
        <h2 className='text-md mb-1 text-zinc-700'><span className=' font-semibold text-black'> Username: </span > {data.username}</h2>
        <h2 className='text-md mb-1 text-zinc-700'><span className=' font-semibold text-black'> Email: </span >{data.email}</h2>
        <h2 className='text-md mb-1 text-zinc-700'><span className=' font-semibold text-black'> Phone: </span >{data.phone}</h2>
        <h2 className='text-md mb-1 text-zinc-700'><span className=' font-semibold text-black'> Website: </span >{data.website}</h2>
        <h2 className='text-md mb-1 text-zinc-700'><span className=' font-semibold text-black'> Address: </span >{data.address?.street}, {data.address?.city}</h2>
        <h2 className='text-md mb-1 text-zinc-700'><span className=' font-semibold text-black'> Company: </span >{data.company?.name}</h2>
      </div>
    </div>
    <Link to="/"><h5 className='flex absolute items-center gap-2 top-[80vh] left-[20vw] font-semibold text-lg border rounded-md px-4 py-1 shadow-xl shadow-emerald-950/50'><GoArrowLeft /> Back Page</h5>
    </Link>
    </>
  )
}

export default UserData