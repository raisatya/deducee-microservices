import Link from 'next/link'

import { getCookies } from "@/actions/authServerActions"

import AdministerSubHeader from "../components/subheaders/AdministerSubHeader"
import RegisterClassroomModal from '../components/modals/RegisterClassroomModal';

const AdministerClassroomListPage = async () => {

    const currentUser = await getCookies();

    const res = await fetch(`http://localhost:5000/api/classroom/${currentUser.instituteId}/${currentUser.currentSession}`, {
        tags: ["allclassrooms"]
    });

    const classrooms = await res.json();

    return (
        <div className="w-full max-w-6xl mx-auto">
            <AdministerSubHeader activeTab="1" />
            <div className='flex flex-col justify-start items-center divide-y'>
                <RegisterClassroomModal currentUser={currentUser} />
                <div className="flex flex-col justify-start items-center p-2">
                    <div className='flex justify-start w-full px-1 pb-1'>
                        <p className="font-medium text-sm px-2 py-1 bg-gray-200 rounded-lg">Active Classes</p>
                    </div>
                    {classrooms.map(item => (
                        <div key={item.id}>
                            <Link href={`/administer/classroom/${item.id}/${item.classroomName}`}>
                                <div className="flex justify-between items-center w-screen max-w-xs sm:max-w-sm p-4 m-1 font-medium border border-slate-200 rounded-lg bg-white shadow-sm hover:bg-gray-100 active:bg-slate-50">
                                    <p className="text-sm">{item.classroomName}</p>
                                    <button className='px-2 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-medium text-white'>Update</button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdministerClassroomListPage