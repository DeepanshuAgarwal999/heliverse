import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import Layout from './layout/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Teams from './pages/Teams'
import PrivateLayout from './layout/PrivateLayout'
import CreatePlayer from './pages/CreatePlayer'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/teams' element={<PrivateLayout><Teams /></PrivateLayout>} />
        <Route path='/create-team' element={<PrivateLayout><CreatePlayer /></PrivateLayout>}/>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  )
}

export default App