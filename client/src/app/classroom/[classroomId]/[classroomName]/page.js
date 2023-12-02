import { getCookies } from "@/actions/authServerActions"

import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import AttendanceRegisterModal from "../../components/modals/AttendanceRegisterModal";


const ClassroomDetailsPage = async ({ params }) => {

    const currentUser = await getCookies();

    const res = await fetch(`http://localhost:5000/api/classroom/${currentUser.instituteId}/${currentUser.currentSession}/${params.classroomId}`, {
        tags: ["allclassrooms"]
    });

    const classroomdata = await res.json();

    const studentTableDiv = classroomdata.students.length > 0 ? (
        classroomdata.students.map(item => (
            <div key={item._id} className="grid grid-cols-6 gap-1 px-3 py-2">
                <div className="col-span-1">
                    <p className="font-medium px-4">{item.rollNo}</p>
                </div>
                <div className="col-span-3">
                    <p className="font-medium">{item.fullName}</p>
                </div>
                <div className="hidden sm:flex sm:col-span-1">
                    <p className="font-medium">{item.gender}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <button>View Profile</button>
                </div>
            </div>
        ))
    ) : (
        <div className="flex justify-center p-6">
            No students registered yet!
        </div>
    )

    const subjectDiv = classroomdata.subjects.length > 0 ? (
        classroomdata.subjects.map(item => (
            <div key={item._id} className="flex flex-col justify-between items-center py-5 border border-gray-400 rounded-lg w-40 sm:w-52 space-y-3">
                <div className="flex flex-col justify-start items-center font-medium text-sm space-y-3 text-center">
                    <div className='flex justify-center items-center bg-blue-700 text-white tracking-wide p-2 rounded-full ring-1 ring-gray-300 ring-offset-2 sm:ring-offset-4 ring-offset-slate-100'>
                        {item.subjectCode}
                    </div>
                    <p className="px-2">{item.subjectName}</p>
                </div>
                <div className="flex flex-col justify-center items-center space-y-3">
                    <div className="flex justify-center items-center space-x-2 bg-gray-200 px-3 py-1 rounded-lg">
                        <UserCircleIcon className="w-5 h-5" />
                        <p className="text-sm font-medium cursor-pointer truncate">{item.assignedTeacherName}</p>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <div className="flex justify-center border w-full rounded-lg p-6">
            No subjects registered yet!
        </div>
    )

    return (
        <div className="border rounded-lg mt-3 mb-8">
            <div className="flex justify-between items-center gap-4 font-medium bg-gray-100 p-3">
                <div className="flex justify-start items-center gap-4">
                    <p className="px-4 py-1 bg-blue-600 text-white rounded-lg cursor-default">{classroomdata.classroomName}</p>
                    <p className="flex items-center">Session: {classroomdata.session} <ChevronDownIcon className="w-5 h-5" /></p>
                </div>
                <div className="flex justify-end items-center">
                    <AttendanceRegisterModal currentUser={currentUser} classroomdata={classroomdata} />
                </div>
            </div>
            <div className="px-2 sm:px-6 py-3">
                <p className="font-medium text-lg p-2">Students</p>
                <div>
                    <div className="grid grid-cols-6 gap-1 bg-gray-700 text-white p-3 rounded-t-lg">
                        <div className="col-span-1">
                            <p className="font-medium">Roll No</p>
                        </div>
                        <div className="col-span-3">
                            <p className="font-medium">Name</p>
                        </div>
                        <div className="hidden sm:flex col-span-1">
                            <p className="font-medium">Gender</p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium">Actions</p>
                        </div>
                    </div>
                    <div className="border border-t-0 border-gray-400 rounded-b-lg divide-y">
                        {studentTableDiv}
                    </div>
                </div>
            </div>
            <div className="px-2 sm:px-6 py-3">
                <p className="font-medium text-lg p-2">Subjects</p>
                <div className="flex gap-2 flex-wrap justify-center sm:px-3">
                    {subjectDiv}
                </div>
            </div>
        </div>
    )
}

export default ClassroomDetailsPage