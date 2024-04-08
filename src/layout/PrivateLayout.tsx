import React, { useEffect } from 'react'
import { selectCurrentUser } from '../redux/slices/user.slice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/ui/use-toast'

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
    const { userDetails } = useSelector(selectCurrentUser)
    const navigate = useNavigate();
    const { toast } = useToast();
    useEffect(() => {
        if (!userDetails) {
            toast({
                title: "Login required"
            })
            navigate('/login')
        }
    }, [])
    return (
        <>{children}</>
    )
}

export default PrivateLayout