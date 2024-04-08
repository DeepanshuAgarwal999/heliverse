import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';

interface SearchBarProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearch }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const search = async (value: string): Promise<any> => {
        setSearch(() => value)
    };

    const debouncedSearch = useRef(debounce(async (criteria: string): Promise<void> => {
        await search(criteria);
    }, 400)).current;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchValue(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [])

    return (
        <div className='flex items-center justify-between gap-2 bg-muted dark:bg-[#1c1c1c] mx-auto rounded-lg px-2'>
            <Input
                className='bg-transparent border-none '
                type='text'
                value={searchValue}
                onChange={handleInputChange}
                placeholder='Search Player...'
            />
            <Search className='w-5 mr-2' />
        </div>
    );
};

export default SearchBar;
