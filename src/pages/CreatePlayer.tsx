import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { axiosInstance } from '../lib/axios.instance'
import { useToast } from '../components/ui/use-toast'
import { AxiosError } from 'axios'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

const updateGender: string[] = [
    "male", "female", "polygender", "bigender"
]

const updateDomain: string[] = [
    "finance", "marketing", "Management", "Business Development", "UI Designing", "Sales", "IT"
]

const CreatePlayer = () => {
    const [values, setValue] = useState({
        email: "",
        first_name: "",
        last_name: "",
        available: "false",
        gender: "male",
        avatar: "",
        domain: "Finance"
    })
    const { toast } = useToast();
    const navigate = useNavigate();


    const handleOnchange = (e: any) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleCreatePlayer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!values.email || !values.avatar || !values.gender || !values.domain || !values.available || !values.first_name) {

                toast({
                    title: "Except last name All fields are mandatory"
                })
                return;
            }
            const { data } = await axiosInstance.post('/create-player',
                values
            )
            if (data) {
                toast({
                    title: "Player created Successfully",
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
                    title: "An error occurred while registering "
                });
            }
        }
    }

    return (
        <Card className='w-[280px] sm:w-[360px] md:w-[420px] mx-auto mt-10'>
            <CardHeader className='text-xl font-semibold'>
                Create Player
            </CardHeader>
            <CardDescription className='pl-6 pb-4'>Create player to make team !!</CardDescription>
            <CardContent >
                <form onSubmit={(e) => handleCreatePlayer(e)} className='flex flex-col gap-4'>
                    <Input type='email' value={values.email} placeholder='Email address' name='email' onChange={(e) => handleOnchange(e)} />

                    <Input type='text' value={values.first_name} placeholder='First name' name='first_name' onChange={(e) => handleOnchange(e)} />

                    <Input type='text' value={values.last_name} placeholder='Last name' name='last_name' onChange={(e) => handleOnchange(e)} />

                    <Input type='text' value={values.avatar} placeholder='Avatar' name='avatar' onChange={(e) => handleOnchange(e)} />

                    <Select onValueChange={(value) => handleOnchange({ target: { name: 'domain', value } })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={`${values.domain}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {updateDomain.map((domain) => (
                                <div key={domain}>
                                    <SelectItem value={domain}>{domain}</SelectItem>
                                </div>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleOnchange({ target: { name: 'gender', value } })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={`${values.gender}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {updateGender.map((gender) => (
                                <div key={gender}>
                                    <SelectItem value={gender}>{gender}</SelectItem>
                                </div>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleOnchange({ target: { name: 'available', value } })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"true"}>Available</SelectItem>
                            <SelectItem value={"false"}>Not Available</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button className='self-center' type='submit'>Create Player</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreatePlayer