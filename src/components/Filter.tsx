import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface FilterProps {
    setGender: React.Dispatch<React.SetStateAction<string>>
    setAvailable: React.Dispatch<React.SetStateAction<string>>
    setDomain: React.Dispatch<React.SetStateAction<string>>
}
const FilterByGender: string[] = [
    "male", "female", "polygender", "bigender"
]

const FilterByDomain: string[] = [
    "finance", "marketing", "Management", "Business Development", "UI Designing", "Sales", "IT"
]

const Filter = ({ setGender, setAvailable, setDomain }: FilterProps) => {
    const handleReset = (): void => {
        setGender("")
        setAvailable("")
        setDomain("")
    }
    return (
        <div className='flex-col flex gap-6 sm:gap-10 mx-auto'>
            {/* fillter for gender */}
            <Select onValueChange={(value) => setGender(value)}>
                <SelectTrigger >
                    <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                    {FilterByGender.map((gender) => (
                        <div key={gender}>
                            <SelectItem value={gender}>{gender}</SelectItem>
                        </div>
                    ))}
                </SelectContent>
            </Select>
            {/* filter availability */}
            <Select onValueChange={(value) => setAvailable(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose Availability" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"true"}>Available</SelectItem>
                    <SelectItem value={"false"}>Not Available</SelectItem>
                </SelectContent>
            </Select>

            {/* filter on basis of domain */}

            <Select onValueChange={(value) => setDomain(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                    {FilterByDomain.map((domain) => (
                        <div key={domain}>
                            <SelectItem value={domain}>{domain}</SelectItem>
                        </div>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleReset}>Reset</Button>
            <Button> <Link to={'/create-team'} className='block w-full'>Create Player</Link></Button>
        </div>
    )
}

export default Filter