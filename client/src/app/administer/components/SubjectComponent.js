import RegisterSubjectModal from "./modals/RegisterSubjectModal";

import { PlusIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import UpdateSubjectDataModal from "./modals/UpdateSubjectDataModal";

const SubjectComponent = async ({ currentUser, classroomdata }) => {

    const res = await fetch(`http://localhost:5000/api/institute/${currentUser.instituteId}/teachers`, {
        tags: ["registeredTeachers"]
    });

    const registeredTeachers = await res.json();

    return (
        <div className="px-2 sm:px-6 py-3">
            <p className="font-medium text-lg p-2">Subjects</p>
            <div className="flex gap-2 flex-wrap justify-center sm:px-3">
                {classroomdata.subjects.map(item => (
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
                            <UpdateSubjectDataModal currentUser={currentUser} classroomId={classroomdata.id} registeredTeachers={registeredTeachers} subjectDetails={item} />
                        </div>
                    </div>
                ))}
                <div className="flex flex-col justify-center items-center py-5 border border-gray-400 rounded-lg w-40 sm:w-52 space-y-3">
                    <div className="border rounded-full p-5">
                        <PlusIcon className="w-7 h-7" />
                    </div>
                    <RegisterSubjectModal currentUser={currentUser} classroomId={classroomdata.id} registeredTeachers={registeredTeachers} />
                </div>
            </div>
        </div>
    )
}

export default SubjectComponent