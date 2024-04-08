import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { axiosInstance } from '../lib/axios.instance'
import { useToast } from '../components/ui/use-toast'
import { AxiosError } from 'axios'

const SignUp = () => {
  const [values, setValue] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: ""
  })
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!values.email || !values.password || !values.first_name) {
        toast({
          title: "Except last name All fields are mandatory"
        })
        return;
      }
      const { data } = await axiosInstance.post('/api/auth/register',
        values
      )
      if (data) {
        toast({
          title: "Registered Successfully",
          description: "Please Login to start creating Team"
        })
        navigate('/login')
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
          title: "An error occurred while registering "
        });
      }
    }
  }

  return (
    <Card className='w-[280px] sm:w-[360px] md:w-[420px] mx-auto mt-20'>
      <CardHeader className='text-xl font-semibold'>
        SignUp
      </CardHeader>
      <CardDescription className='pl-6 pb-4'>Already Registered? <Link to={'/login'} className=''>Login Now</Link></CardDescription>
      <CardContent >
        <form onSubmit={(e) => handleSignUp(e)} className='flex flex-col gap-4'>
          <Input type='email' placeholder='Email address' name='email' value={values.email} onChange={(e) => handleOnchange(e)} className='bg-muted dark:bg-[#1c1c1c]' />

          <Input type='text' placeholder='First name' name='first_name' value={values.first_name} onChange={(e) => handleOnchange(e)} className='bg-muted dark:bg-[#1c1c1c]' />

          <Input type='text' placeholder='Last name' name='last_name' value={values.last_name} onChange={(e) => handleOnchange(e)} className='bg-muted dark:bg-[#1c1c1c]' />
          
          <Input type='password' placeholder='Password' name='password' value={values.password} onChange={(e) => handleOnchange(e)} className='bg-muted dark:bg-[#1c1c1c]' />
          <Button className='self-center' type='submit'>SignUp</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUp