import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <Link to={'/'} className='text-xl sm:text-3xl 2xl:text-4xl font-semibold tracking-wider '>
            Heli<span className="text-orange-600 ">verse</span>
        </Link>
    )
}

export default Logo