"use client"

import { useState } from 'react'
import moment from 'moment/moment';
import SelectedNotice from './SelectedNotice';

import { XMarkIcon, XCircleIcon } from '@heroicons/react/24/solid';

const NoticesList = ({ notices, currentUser, classroomId, classroomName }) => {

    const [isSelected, setIsSelected] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState({
        id: "",
        noticeTitle: "",
        noticeBody: "",
        publishedBy: "",
        publisherId: "",
        role: "",
        createdAt: "",
    })

    const handleClick = (id, noticeTitle, noticeBody, publishedBy, publisherId, role, createdAt) => {
        setSelectedNotice({
            id,
            noticeTitle,
            noticeBody,
            publishedBy,
            publisherId,
            role,
            createdAt
        });
        setIsSelected(true);
    }

    let noticesDiv = isSelected ? (
        <>
        <div className='flex justify-end items-center pt-2'>
                <button onClick={() => setIsSelected(false)} className="inline-flex gap-1 items-center border rounded-lg px-3 text-sm py-1 font-medium mx-6"><XMarkIcon className='w-4 h-4'/>Close</button>
        </div>
            <SelectedNotice selectedNotice={selectedNotice} currentUser={currentUser} classroomId={classroomId} classroomName={classroomName} setIsSelected={setIsSelected}/>
        </>
    ) : (
            <div className="p-2 space-y-2">
                {notices.map((item) => (
                    <div onClick={() => handleClick(item.id, item.noticeTitle, item.noticeBody, item.publishedBy, item.publisherId, item.role, item.createdAt)} key={item.id} className='border rounded-lg'>
                        <div className='hover:bg-gray-100 p-2 cursor-pointer'>
                            <div className='flex justify-between items-center'>
                                <p className='text-md pt-2 px-2 leading-normal font-medium text-black truncate'>{item.noticeTitle}</p>
                                <p className='text-sm pt-2 px-2 text-slate-500'>{moment(item.createdAt).format('L')}</p>
                            </div>
                            <p className='truncate text-sm text-slate-500 py-1 px-2'>{item.noticeBody}</p>
                            <p className='px-2 mt-1 text-sm text-slate-500'>~Posted by {item.publishedBy} <span className='border rounded-lg px-2 text-xs'>{item.role}</span></p>
                        </div>
                    </div>
                ))}
                <div className='flex items-center justify-center pt-6 pb-10'>
                    <p className='text-slate-500'>No more notices!</p>
                </div>
            </div>
    )

    return noticesDiv;
}

export default NoticesList;