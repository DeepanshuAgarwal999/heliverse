import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { axiosInstance } from '../lib/axios.instance';
import { Pencil } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

type UpdatePlayerFormProp = {
    user: Users
}
const updateGender: string[] = [
    "male", "female", "polygender", "bigender"
]

const updateDomain: string[] = [
    "finance", "marketing", "Management", "Business Development", "UI Designing", "Sales", "IT"
]

const UpdatePlayerForm = ({ user }: UpdatePlayerFormProp) => {

    const [values, setValue] = useState({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        available: user.available,
        gender: user.gender || "male",
        avatar: user.avatar || "",
        domain: user.domain || "Finance"
    })
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleOnchange = (e: any) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleUpdatePlayer = async () => {
        try {
            setIsLoading(true)
            if (!values.email || !values.avatar || !values.gender || !values.domain || !values.available || !values.first_name) {
                toast({
                    title: "Except last name All fields are mandatory"
                })
                return;
            }
            const { data } = await axiosInstance.put(`/update-player/${user._id}`,
                values
            )
            if (data) {
                toast({
                    title: "User updated successfully",
                })
                navigate(0)
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
        finally {
            setIsLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Pencil className="w-6 cursor-pointer hover:text-yellow-500" /></DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col gap-1'>
                <DropdownMenuLabel>Update User</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
                <DropdownMenuItem>
                    <Button className='mx-auto bg-green-500' onClick={handleUpdatePlayer}>Save</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UpdatePlayerForm