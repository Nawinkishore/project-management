"use client"
import { Kanban, List, History, Table, Filter, Share2Icon, Search } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/project/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
    activeTab: string;
    setActiveTab: (tabName: string) => void;
}

type TabProps = {
    name: string;
    icon: React.ReactNode;
    activeTab: string;
    setActiveTab: (tabName: string) => void;
}

const TabButton = ({ name, icon, activeTab, setActiveTab }: TabProps) => {
    const isActive = activeTab === name;
    return (
        <button className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-2.25 after:left-0 after:h-1 after:w-full hover:text-blue-600 cursor-pointer sm:px-2  lg:px-4
            ${isActive ? 'text-blue-600 after:bg-blue-600 ' : ''}`}
            onClick={() => setActiveTab(name)}
        >
            {icon}
            <span>{name}</span>
        </ button>
    )
}

export default function ProjectHeader({ activeTab, setActiveTab }: Props) {
    // const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    return (
        <div className='px-4 xl:px-6'>
            <div className='pb-6 pt-6 lg:pb-4 lg:pt-8'>
                <Header name='Product Design Development' />
                {/* Tabs */}
                <div className='flex flex-wrap-reverse gap-2 border-y pb-2 pt-2  md:items-center'>
                    <div className='flex flex-1 items-center gap-2 md:gap-4'>
                        <TabButton name='Board' icon={<Kanban className='h-5 w-5' />} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name='List' icon={<List className='h-5 w-5' />} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name='Table' icon={<Table className='h-5 w-5' />} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton name='Activity' icon={<History className='h-5 w-5' />} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button
                            className='text-gray-500 hover:text-gray-600 '
                            variant={'ghost'}
                        >
                            <Filter className=' h-5 w-5' />
                        </Button>
                        <Button
                            className='text-gray-500 hover:text-gray-600'
                            variant={'ghost'}
                        >
                            <Share2Icon className=' h-5 w-5' />
                        </Button>
                        <div className='relative'>
                            <Search  className='absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4'/>
                            <Input
                                type='text'
                                placeholder='Search Task'
                                className='rounded-md pl-8'
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}