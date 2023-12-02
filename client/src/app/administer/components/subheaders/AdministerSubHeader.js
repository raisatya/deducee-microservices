import Link from "next/link"

import { PlusCircleIcon } from '@heroicons/react/24/outline';

const AdministerSubHeader = ({ activeTab }) => {
    return (
        <div className='w-full flex justify-center items-center gap-2 sm:gap-4 py-4 font-medium text-sm bg-white sticky top-14 sm:top-16'>
            <Link href="/administer/classroom">
                <div className={`${activeTab == "1" ? 'text-blue-700' : 'text-gray-600'} px-6 sm:px-12 py-2 cursor-pointer border rounded-full hover:text-blue-700`}>
                    <p className="flex items-center gap-1">Classrooms</p>
                </div>
            </Link>
            <Link href="/administer/admin">
                <div className={`${activeTab == "2" ? 'text-blue-700' : 'text-gray-600'} px-6 sm:px-12 py-2 cursor-pointer border rounded-full hover:text-blue-700`}>
                    <p className="flex items-center gap-1">Admins</p>
                </div>
            </Link>
            <Link href="/administer/teacher">
                <div className={`${activeTab == "3" ? 'text-blue-700' : 'text-gray-600'} px-6 sm:px-12 py-2 cursor-pointer border rounded-full hover:text-blue-700`}>
                    <p className="flex items-center gap-1">Teachers</p>
                </div>
            </Link>
        </div>
    )
}

export default AdministerSubHeader