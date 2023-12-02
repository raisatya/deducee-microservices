import Link from "next/link"

import { PlusCircleIcon } from '@heroicons/react/24/outline';

const NoticesSubHeader = ({ activeTab, classroomName, currentUser, linkAddress, disabled }) => {
  return (
    <div className='w-full flex justify-center items-center gap-2 sm:gap-4 py-4 font-medium text-sm bg-white sticky top-14 sm:top-16'>
      <Link href="/notices/generalnotices">
        <div className={`${activeTab == "1" ? 'text-blue-700' : 'text-gray-600'} px-6 sm:px-12 py-2 cursor-pointer border rounded-full hover:text-blue-700`}>
          <p className="flex items-center gap-1">General <span className="hidden sm:flex">Notices</span></p>
        </div>
      </Link>
      {currentUser.role == 'student' ? 
        <Link href={`/notices/classroomnotices/${currentUser.classroomId}/${currentUser.classroomName}`}>
          <div className={`${activeTab == "2" ? 'text-blue-700' : 'text-gray-600'} px-6 sm:px-12 py-2 cursor-pointer border rounded-full hover:text-blue-700`}>
              <p className="flex items-center gap-1">{currentUser.classroomName}<span className="hidden sm:flex">Notices</span></p>
          </div>
        </Link> :
        <div className="flex justify-start items-center gap-2 sm:gap-4">
        <Link href="/notices/classroomnotices">
            <div className={`${activeTab == "2" ? 'text-blue-700' : 'text-gray-600'} px-6 sm:px-12 py-2 cursor-pointer border rounded-full hover:text-blue-700`}>
            {classroomName == "" ?
              <p className="flex items-center gap-1">Classroom<span className="hidden sm:flex">Notices</span></p>
              :
              <p className="flex items-center gap-1">{classroomName}<span className="hidden sm:flex">Notices</span></p>
            }
          </div>
        </Link> 
          <Link href={linkAddress}>
            <button className={`group inline-flex items-center rounded-full bg-gradient-to-r from-green-600 to-emerald-700 px-4 py-2 space-x-1 text-sm font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${disabled ? 'cursor-not-allowed' : ''}`}>
              <PlusCircleIcon className='w-5 h-5' />
              <span className="hidden sm:flex">Add</span>
              <span>Notice</span>
            </button>
          </Link>
        </div> 
    }
      
    </div>
  )
}

export default NoticesSubHeader