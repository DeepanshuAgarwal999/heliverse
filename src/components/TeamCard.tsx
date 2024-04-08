import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { axiosInstance } from '../lib/axios.instance'
import { AxiosError } from 'axios'
import { useToast } from './ui/use-toast'
import { useNavigate } from 'react-router-dom'

const TeamCard = ({ handleCloseModel, selectedPlayers, isOpen }: { handleCloseModel: () => void, selectedPlayers: Users[], isOpen: boolean }) => {
    const [name, setName] = useState<string>("");
    const { toast } = useToast()
    const navigate = useNavigate()

    const createTeam = async () => {
        try {
            const { data } = await axiosInstance.post('/team/register-team', { teamMembers: selectedPlayers, teamName: name })
            if (data) {
                toast({
                    title: "Team create Successfully"
                })
                navigate('/teams')
            }
        }
        catch (err) {
            if (err instanceof AxiosError && err.response && err.response.data && err.response.data.message) {
                toast({
                    title: err.response.data.message
                });
            } else {
                toast({
                    title: "An error occurred while Creating team",
                    variant:"destructive"
                });
            }
            navigate('/login')
        }

    }
    return (
        <>{
            isOpen &&
            <Card className='w-[300px] fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='flex justify-between items-center'>
                    <CardHeader><h1>Choose Team Name</h1></CardHeader>
                    <span className='text-lg pr-5 cursor-pointer' onClick={() => handleCloseModel()}>x</span>
                </div>
                <CardContent><Input type='text' placeholder='India' value={name} onChange={(e) => setName(() => e.target.value)} /></CardContent>
                <CardFooter
                ><Button onClick={() => createTeam()}>Create Team</Button>
                </CardFooter>
            </Card>
        }</>
    )
}

export default TeamCard