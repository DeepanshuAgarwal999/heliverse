import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from './ui/pagination';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationComp = ({ totalPages, currentPage, setCurrentPage }: PaginationProps) => {
    const handlePagination = (index: number): void => {
        setCurrentPage(index)
    }
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
        }
    }
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }
    const renderPaginationItems = () => {
        const items: JSX.Element[] = [];

        const startPage = Math.max(1, currentPage - 4);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Button key={i} onClick={() => handlePagination(i)} className={cn("cursor-pointer", currentPage === i ? "bg-muted text-black" : "")}>
                    {i}
                </Button>
            );
        }

        return items;
    };
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        aria-label="Go to next page"
                        disabled={currentPage === 1}
                        onClick={() => handlePrev()} className={cn("gap-1 pr-2.5")}
                        size="default">
                        <ChevronLeft className="h-4 w-4" /><span className='max-sm:hidden'>Previous</span>
                    </Button>
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <Button
                        aria-label="Go to next page"
                        disabled={currentPage === totalPages}
                        onClick={() => handleNext()} className={cn("gap-1 pl-2.5")}
                        size="default">
                        <span className='max-sm:hidden'>Next</span> <ChevronRight className="h-4 w-4" />
                    </Button>

                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}

export default PaginationComp