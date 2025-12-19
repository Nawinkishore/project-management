"use client"
import { useGetTasks } from '@/features/tasks/api';
import React from 'react'
import Header from '../Header';
import { Task } from '@/schemas/task.schema';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
type ListProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const index = ({id, setIsModalNewTaskOpen}: ListProps) => {
  const {data:tasks ,isLoading,error} = useGetTasks(Number(id));
  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error loading tasks</div>
  console.log(tasks);
  return (
    <div className='px-4 pb-8 xl:px-6'>
      <div className='pt-5'>
        <Header name='List' />
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
        {tasks?.map((task:Task) => (
          <Card key={task.id} className='p-4 flex flex-col gap-1'>
            {task.attachments && task.attachments.length > 0 && (
                   <Image
                     src={`/${task.attachments[0].fileURL}`}
                     alt={task.attachments[0].fileName as string}
                     width={400}
                     height={200}
                     className="h-auto w-full rounded-t-md"
                   />
                 )}
            <strong>ID:<span className='text-sm font-normal'>{task.id}</span></strong>
            <strong>Title: <span className='text-sm font-normal'>{task.title}</span></strong>
            <strong>Description: <span className='text-sm font-normal'>{task.description}</span></strong>
            <strong>Status: <span className='text-sm font-normal'>{task.status}</span></strong>
            <strong>Priority: <span className='text-sm font-normal'>{task.priority}</span></strong>
            <strong>Tags: <span className='text-sm font-normal'>{task.tags}</span></strong>
            <strong>StartDate: <span className='text-sm font-normal'>{format(new Date(task.startDate as string), 'P')}</span></strong>
            <strong>DueDate: <span className='text-sm font-normal'>{format(new Date(task.dueDate as string), 'P')}</span></strong>
            <strong>Author: <span className='text-sm font-normal'>{task.author?.username}</span></strong>
            <strong>Assignee: <span className='text-sm font-normal'>{task.assignee?.username}</span></strong>
            


            
            



          </Card>
        ))}
      </div>
    </div>
  )
}
export default index