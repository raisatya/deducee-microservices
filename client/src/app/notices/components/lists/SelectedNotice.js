"use client"

import moment from 'moment/moment';
import DeleteNoticeModal from '../modals/DeleteNoticeModal';

const SelectedNotice = ({ selectedNotice, currentUser, classroomId, classroomName, setIsSelected }) => {

    return (
            <div className='px-2 mb-10'>
                <p className='text-2xl px-3 leading-normal font-medium text-black'>{selectedNotice.noticeTitle}</p>
                <p className='whitespace-pre-wrap text-slate-700 p-3 text-justify'>{selectedNotice.noticeBody}</p>
                <div className='flex justify-between items-center mt-1 text-slate-500'>
                    <p className="px-3">~Posted by {selectedNotice.publishedBy} <span className='border rounded-lg px-2 text-xs'>{selectedNotice.role}</span></p>
                    <p className="px-3">{moment(selectedNotice.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                </div>
                <div className='flex justify-end p-3'>
                    {(currentUser.uniqueId === selectedNotice.publisherId) || (currentUser.role == 'admin') ?
                        <DeleteNoticeModal id={selectedNotice.id} classroomId={classroomId} classroomName={classroomName} setIsSelected={setIsSelected}/> : null
                    }
                </div>
            </div>
    )
}

export default SelectedNotice;