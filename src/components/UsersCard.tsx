import { MailIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { cn } from "../lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/user.slice";
import { AxiosError } from "axios";
import { axiosInstance } from "../lib/axios.instance";
import UpdatePlayerForm from "./UpdatePlayerForm";

interface UsersCardProps {
    user: Users
    selectedPlayers?: Users[] | undefined
    setSelectedPlayers?: React.Dispatch<React.SetStateAction<Users[]>>
    setShowUsers?: React.Dispatch<React.SetStateAction<Users[]>>
}
const UsersCard: React.FC<UsersCardProps> = ({ user, selectedPlayers, setSelectedPlayers, setShowUsers }) => {
    const { first_name, last_name, email, gender, avatar, domain, available } = user;
    const { toast } = useToast();
    const { userDetails } = useSelector(selectCurrentUser)

    const isActive = selectedPlayers?.includes(user)
    const handleSelectedPlayer = (selectedMember: Users) => {
        if (!setSelectedPlayers || !selectedPlayers) {
            return;
        }

        if (selectedPlayers && selectedPlayers.length > 4) {
            toast({
                title: "You can add only 5 players at a time",
            });
            return;
        }
        const selectedDomains = selectedPlayers?.map(player => player.domain);

        if (!selectedPlayers || !selectedPlayers.includes(selectedMember)) {
            if (selectedDomains && selectedDomains.includes(selectedMember.domain)) {
                toast({
                    title: "Each selected member must have a unique domain",
                });
                return;
            }
            setSelectedPlayers(prevSelectedPlayers => [...prevSelectedPlayers, selectedMember]);
            toast({
                title: `Need ${5 - (selectedPlayers!.length + 1)} more players to form team`
            })
        } else {
            const players = selectedPlayers.filter((playerId) => playerId._id !== selectedMember._id)
            setSelectedPlayers(players)
        }
    };
    const handleDeletePlayer = async () => {
        try {
            if (!user || !user._id) {
                return;
            }
            const { data } = await axiosInstance.delete(`/delete-player/${user._id}`)
            if (data) {
                toast({
                    title: "user deleted successfully",
                    variant:"destructive"
                })
                setShowUsers!(prevUsers => prevUsers?.filter(player => player._id !== user._id));
            }
            else {
                toast({
                    title: "Unable to delete user"
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
                    title: "An error occurred while getting users"
                });
            }
        }
    }
    return (
        <Card className='w-[260px] sm:w-[300px] dark:bg-[#1c1c1c] group'>
            <CardHeader>
                <CardTitle>{first_name}&nbsp;{last_name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={cn("mx-auto  w-[60px] rounded-full border-4 dark:border-white my-2", isActive ? "dark:border-green-500 border-green-500" : "")}><img src={avatar} alt={first_name} className='group-hover:animate-anim-img' /></div>
                <div className='pt-6 pb-2'>
                    <h1 className='flex gap-2'><MailIcon className='w-4' /> <span className='text-ellipsis overflow-hidden'>{email}</span></h1>
                </div>
                <h1 className=''>Domain: {domain}</h1>
                <h1>Gender: {gender}</h1>
            </CardContent>
            <CardFooter>
                <div className="flex gap-2 items-center justify-between w-full">
                    {
                        available ? <Button onClick={() => handleSelectedPlayer(user)}>{isActive ? "Added" : "Available"}</Button> : <Button disabled={!available}>Not Available</Button>
                    }
                    {
                        userDetails && <div className="flex gap-2"><UpdatePlayerForm user={user}/> <Trash2 className="w-6 cursor-pointer hover:text-red-500" onClick={handleDeletePlayer} /></div>
                    }
                </div>
            </CardFooter>
        </Card >
    )
}
export default UsersCard