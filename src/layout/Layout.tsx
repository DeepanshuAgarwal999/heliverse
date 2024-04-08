import React from 'react'
import Navbar from '../components/widgets/Navbar'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from '../components/ui/toaster'
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className='flex-1'>
                    {children}
                </div>
            </div>
            <Toaster />
        </ThemeProvider>
    )
}

export default Layout