import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { axiosInstance } from '../lib/axios.instance'
import { useToast } from '../components/ui/use-toast'
import { AxiosError } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setCredentials } from '../redux/slices/user.slice'

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector(selectCurrentUser)

  useEffect(() => {
    if (userDetails) {
      navigate('/')
    }
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        toast({
          title: "All fields are mandatory"
        })
        return;
      }
      const { data } = await axiosInstance.post('/api/auth/login', {
        email, password
      })
      if (data) {
        dispatch(setCredentials(data))
        toast({
          title: "Login Successfully"
        })
        navigate('/')
        return;
      }
      else {
        return toast({
          title: "Invalid details"
        })
      }
    }
    catch (err) {
      if (err instanceof AxiosError && err.response && err.response.data && err.response.data.message) {
        toast({
          title: err.response.data.message
        });
      } else {
        toast({
          title: "An error occurred while logging in"
        });
      }
    }
  }

  return (
    <Card className='w-[280px] sm:w-[360px] md:w-[420px] mx-auto mt-20'>
      <CardHeader className='text-xl font-semibold'>
        Login
      </CardHeader>
      <CardDescription className='pl-6 pb-4'>New to Heliverse? <Link to={'/signup'} className=''>SignUp Now</Link></CardDescription>
      <CardContent >
        <form onSubmit={(e) => handleLogin(e)} className='flex flex-col gap-4'>
          <Input type='email' placeholder='Email address' onChange={(e) => setEmail(() => e.target.value)} className='bg-muted dark:bg-[#1c1c1c]' />
          <Input type='password' placeholder='Password' onChange={(e) => setPassword(() => e.target.value)} className='bg-muted dark:bg-[#1c1c1c]' />
          <Button className='self-center' type='submit'>Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login