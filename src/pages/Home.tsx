import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios.instance'
import SearchBar from '../components/SearchBar'
import PaginationComp from '../components/PaginationComp'
import UsersCard from '../components/UsersCard'
import TeamCard from '../components/TeamCard'
import Filter from '../components/Filter'
import { AxiosError } from 'axios'
import { useToast } from '../components/ui/use-toast'
import Loader from '../components/shared/Loader'

type UsersType = {
  users: Users[],
  totalPages: number
  message: string,
  success: boolean
}

const Home = () => {
  const [showUsers, setShowUsers] = useState<Users[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // pagination states
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1);

  const [selectedPlayers, setSelectedPlayers] = useState<Users[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // filters state 
  const [search, setSearch] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [available, setAvailable] = useState<string>("");
  const [domain, setDomain] = useState<string>("")

  const { toast } = useToast();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoading(true)
        const { data } = await axiosInstance.get(`/allplayers?page=${currentPage}&available=${available}&gender=${gender}&search=${search}&domain=${domain}`);
        const res = data as UsersType
        if (res) {
          setShowUsers(res.users)
          setTotalPage(res.totalPages)
        }
      }
      catch (err) {
        if (err instanceof AxiosError && err.response && err.response.data && err.response.data.message) {
          toast({
            title: err.response.data.message
          });
        } else {
          toast({
            title: "An error occurred while getting users",
            variant: "destructive"
          });
        }
      }
      finally {
        setIsLoading(false)
      }
    }
    getAllUsers()
  }, [currentPage, gender, available, domain, search])


  useEffect(() => {
    if (selectedPlayers.length === 5) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedPlayers]);

  const handleCloseModel = () => {
    setIsOpen(false)
    setSelectedPlayers([])
  }



  return (
    <>
      <TeamCard handleCloseModel={handleCloseModel} selectedPlayers={selectedPlayers} isOpen={isOpen} />
      <main className='flex flex-col sm:flex-row'>
        <div className='sm:border-r pt-20 px-4 w-[300px] mx-auto flex flex-col'>
          <div className='mb-8 w-full'><SearchBar setSearch={setSearch} /></div>
          <Filter setGender={setGender} setAvailable={setAvailable} setDomain={setDomain} />
        </div>
        <div className='flex-1 h-screen overflow-y-scroll pt-20 flex flex-col justify-around'>
          <div className='flex flex-wrap justify-center gap-6'>
            {isLoading ? <Loader /> : (showUsers && showUsers.length !== 0) ? showUsers?.map((user) => (
              <UsersCard
                key={user._id}
                user={user}
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                setShowUsers={setShowUsers}
              />)) :
              <>
                <h1 className='text-2xl font-semibold'>No users Found !!</h1>
              </>}
          </div>
          <div className='my-10'>
            <PaginationComp currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
