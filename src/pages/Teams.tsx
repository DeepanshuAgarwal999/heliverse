import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios.instance'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import UsersCard from '../components/UsersCard';
import { cn } from '../lib/utils';
import { MailIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

interface TeamsProps {
  _id: string;
  teamMembers: Users[];
  teamName: string;
  createdBy: string;
  createdAt: Date
}

const Teams = () => {
  const [teams, setTeams] = useState<TeamsProps[] | undefined>([])
  const { toast } = useToast()

  useEffect(() => {
    const getTeams = async () => {
      try {
        const { data } = await axiosInstance.get("/team/get-team");
        const res = data.teams as TeamsProps[]
        if (res) {
          setTeams(res)
        }
        console.log(data)
      }
      catch (err) {
        if (err instanceof AxiosError && err.response && err.response.data && err.response.data.message) {
          toast({
            title: err.response.data.message
          });
        } else {
          toast({
            title: "An error occurred while Deleting in"
          });
        }
      }
    }
    getTeams()
  }, [])

  const handleDeleteTeam = async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/team/delete-team/${id}`)
      if (data) {
        if (teams?.length !== 0) {
          setTeams(prevTeams => prevTeams?.filter(team => team._id !== id));
        }
        toast({
          title: "Team deleted successfully"
        })
      }
      else {
        toast({
          title: "Unable to process request",
          variant: "destructive"
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
          title: "An error occurred while Deleting in"
        });
      }
    }
  }
  if (teams && teams?.length === 0) {
    return <div className='flex flex-col gap-5 justify-center h-[calc(100vh-300px)] text-2xl  items-center font-semibold'>No team found. create some team
      <Link to={'/'}><Button>Create team</Button></Link>
    </div>

  }
  return (
    <div className='container'>
      <h1 className='text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl my-10 font-semibold tracking-wider'>Your Teams</h1>
      <div className='flex flex-col gap-4'>
        {teams && teams.length !== 0 && teams.map((team, i) => (
          <div key={team._id}>
            <Card>
              <Collapsible>
                <div className='flex items-center justify-between pr-4'>
                  <CollapsibleTrigger>
                    <CardHeader className='text-xl font-semibold italic capitalize'>
                      {i + 1}) {team.teamName}
                    </CardHeader>
                  </CollapsibleTrigger>
                  <Button onClick={() => handleDeleteTeam(team._id)}>Delete</Button>
                </div>
                <CollapsibleContent>
                  <CardContent className='flex flex-wrap max-md:justify-center gap-5 '>
                    {team.teamMembers && team.teamMembers.length !== 0 && team.teamMembers.map((member) => (
                      <Card key={member._id} className='w-[260px] sm:w-[300px]'>
                        <CardContent>
                          <div className={cn("mx-auto p-4 line-clamp-1 flex items-center gap-4")}>
                            <h1>{member.first_name} {member.last_name}</h1>
                            <img src={member.avatar} alt={member.first_name} className='w-8' /></div>
                          <div className='pt-6 pb-2'>
                            <h1 className='flex gap-2'><MailIcon className='w-4' /> <span className='line-clamp-2'>{member.email}</span></h1>
                          </div>
                          <h1 className=''>Domain: {member.domain}</h1>
                          <h1>Gender: {member.gender}</h1>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams