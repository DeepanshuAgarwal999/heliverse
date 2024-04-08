import { useTheme } from '../theme-provider'
import Logo from './Logo';
import { Button } from '../ui/button';
import { LogOutIcon, Moon, SunIcon, User, UsersRoundIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logOut, selectCurrentUser } from '../../redux/slices/user.slice';
import { toast, useToast } from '../ui/use-toast';
import { Avatar } from '../avatar';


const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { userDetails } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate()
  const handleLogout = (): void => {
    dispatch(logOut())
    toast({
      title: "Logout Successfully",
    })
    navigate('/')
  }
  return (
    <div className='py-3 px-4 sm:px-8 flex items-center bg-background border-b justify-between sticky left-0 top-0 z-50'>
      <Logo />
      <div className='flex items-center gap-2'> {theme === "dark" ? <Button className='px-2 bg-transparent' onClick={() => setTheme("light")}><Moon className='scale-90 invert' /> </Button> : <Button className='px-2 bg-transparent' onClick={() => setTheme("dark")}><SunIcon className='scale-75 invert' /> </Button>
      }
        {userDetails ? <>
          <NavLink to={'/teams'} className='text-lg font-semibold'>
            <UsersRoundIcon className='w-4' />
          </NavLink>
          <Avatar className='flex items-center bg-muted dark:bg-slate-700 justify-center'>
            <h1 className='text-lg'>{userDetails.first_name[0].toLocaleUpperCase()}</h1>
          </Avatar>
          <Button onClick={() => handleLogout()} ><span className='max-md:hidden'>Logout</span> <LogOutIcon className='md:hidden w-4' /></Button>

        </>
          :
          <div className='flex gap-2'>
            <Link to={'/login'}><Button>Login</Button></Link>
            <Link to={'/signup'}><Button>Register</Button></Link></div>}
      </div>

    </div>
  )
}

export default Navbar