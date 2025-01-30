import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import UserData from '../components/UserData'

const route = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Home/>}></Route>
          <Route path='/user/:id' element ={<UserData/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default route