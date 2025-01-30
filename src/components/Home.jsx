import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const [editText, setEditText] = useState(null)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
      .then(res =>{
        if(!res.ok){
          throw new Error(`HTTP Error! Status: ${res.status}`) 
        }
        return res.json();
      })
      .then(data =>{
        setData(data)
        console.log('Fetch Data', data);
      })
      .catch(error =>{
        console.log('Fetch error ', error);
      })
    }, [])
    
   useEffect(()=>{

    if(editText){
  
      setName(editText.name);
      setUsername(editText.username);
      setEmail(editText.email);
      setCity(editText.address.city);
  
    }
   },[editText])
  
    const editHandler = (item) =>{
      const form = document.querySelector(".form")
        form.style.display = "block"
        const user=data.find((user)=>user.id ===item);
        setEditText(user)
    }
  
    const deleteHandler =(id) => {
      if(window.confirm("Are you sure want to delete data")){
        setData(data.filter((item) => item.id !== id));
      }
    };
  
    const submitHandler = (e) =>{
      e.preventDefault();
      const updateuser= {...editText, name, email, username, city}
      const update = data.map((user)=> user.id === updateuser.id  ? updateuser : user  )
      setData(update);
      document.querySelector(".form").style.display = 'none'
    }
  
    const closeHandler = () =>{
      document.querySelector(".form").style.display = "none"
    }

    const handleShowUser= (id)=>{
      navigate(`/user/${id}`)
    }
  
    
    return (
      <div className='w-screen h-screen flex items-center justify-center flex-col gap-10 relative'>
        <h1 className='text-5xl'>User List</h1>
        <table className='w-[70vw] border text-center shadow-xl shadow-emerald-950/50'>
          <thead className='  bg-slate-900  '>
            <tr className='text-white'>
              <th className='py-2 border border-slate-100 text-xl font-semibold'>Id</th>
              <th className='py-2 border border-slate-100 text-xl font-semibold'>Name</th>
              <th className='py-2 border border-slate-100 text-xl font-semibold'>Username</th>
              <th className='py-2 border border-slate-100 text-xl font-semibold'>Email</th>
              <th className='py-2 border border-slate-100 text-xl font-semibold'>City</th>
              <th className='py-2 border border-slate-100 text-xl font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-zinc-100'>
            {data.map((item)=>(
               <tr key={item.id} onClick={()=>handleShowUser(item.id)} className='border hover:bg-zinc-200'>
                <td className='border border-grey-300 py-[7px]'>{item.id}</td>
                <td className='py-[7px] '>{item.name}</td>
                <td className='border border-grey-300 py-[7px]'>{item.username}</td>
                <td className='border border-grey-300 py-[7px]'>{item.email}</td>
                <td className='border border-grey-300 py-[7px]'>{item.address.city}</td>
                <td onClick={(e)=>e.stopPropagation()} className='border border-grey-300 py-[7px]'><button onClick={()=>editHandler(item.id)} className=' py-1 px-4 rounded border hover:bg-blue-100'>Edit</button> <button onClick={()=>deleteHandler(item.id)} className=' py-1 px-4 rounded border hover:bg-blue-100'>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='form absolute hidden'>
        <form onSubmit={submitHandler} className='flex flex-col w-auto h-auto bg-slate-100 border rounded-lg px-5 py-8'>
          <label htmlFor="name"> Name: <br />
            <input className='border rounded px-2 mb-3 bg-zinc-200' type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
          </label>
          <label htmlFor="username"> UserName: <br />
            <input className='border rounded px-2 mb-3 bg-zinc-200' type="text"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </label>
          <label htmlFor="email"> Email: <br />
            <input className='border rounded px-2 mb-3 bg-zinc-200' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </label>
          <label htmlFor="address">Address: <br />
            <input className='border rounded px-2 mb-3 bg-zinc-200' type="text"  value={city} onChange={(e)=>setCity(e.target.value)}/>
          </label><br />
          <div className='flex gap-4'>
            <button className='w-fit py-1 px-6 border rounded '>Save</button>
            <button onClick={()=>closeHandler()} className='w-fit py-1 px-6 border rounded '>Cancel</button>
          </div>
        </form>
        </div>
      </div>
    )
}

export default Home