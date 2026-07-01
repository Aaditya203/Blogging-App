import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import  SignUp  from "./pages/SignUp"
import './App.css'
import SignIn from './pages/SignIn'
import Blogs from './pages/Blogs'
import Explore from './pages/Explore'
import Categories from './pages/Categories'
import About from './pages/About'
import Write from './pages/Write'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'sonner'
import FullBlog from './pages/FullBlog'
import EditBlog from './pages/EditBlog'
import Profile from './pages/Profile'
import MyBlogsPage from './pages/MyBlogsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><Blogs/></ProtectedRoute>}/>
        <Route path='/profile/blogs' element={<ProtectedRoute><MyBlogsPage/></ProtectedRoute>}/>
        <Route path='/home' element={<ProtectedRoute><Blogs/></ProtectedRoute>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/blog/:id' element={<FullBlog/>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/blog/edit/:id' element={<ProtectedRoute><EditBlog/></ProtectedRoute>}/>
        <Route path='/write' element={
          <ProtectedRoute>
            <Write/>
          </ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
