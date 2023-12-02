import { getCookies } from "@/actions/authServerActions"

import { ChevronDownIcon } from "@heroicons/react/20/solid";

import UpdateTeacherDataModal from "../components/modals/UpdateTeacherDataModal";
import RegisterTeacherModal from "../components/modals/RegisterTeacherModal";
import AdministerSubHeader from "../components/subheaders/AdministerSubHeader";

const AdministerTeacherPage = async () => {

    const currentUser = await getCookies();

    const res = await fetch(`http://localhost:5000/api/institute/${currentUser.instituteId}/teachers`, {
        tags: ["registeredTeachers"]
    });

    const registeredTeachers = await res.json();

    return (
        <div className="w-full max-w-6xl mx-auto scroll-smooth">
            <AdministerSubHeader activeTab="3" />
            <div className="border rounded-lg mt-3 mb-8">
                <div className="flex justify-between items-center gap-4 font-medium bg-gray-100 p-3">
                    <div className="flex justify-start items-center gap-4">
                        <p className="px-4 py-1 bg-blue-600 text-white rounded-lg cursor-default">{currentUser.instituteName}</p>
                        <p className="flex items-center">Session: {currentUser.currentSession} <ChevronDownIcon className="w-5 h-5" /></p>
                    </div>
                </div>
                <div className="px-2 sm:px-6 py-3">
                    <p className="font-medium text-lg p-2">Teachers</p>
                    <div>
                        <div className="grid grid-cols-6 gap-1 bg-gray-700 text-white p-3 rounded-t-lg">
                            <div className="col-span-3">
                                <p className="font-medium">Name</p>
                            </div>
                            <div className="col-span-1">
                                <p className="font-medium">Designation</p>
                            </div>
                            <div className="hidden sm:flex col-span-1">
                                <p className="font-medium">Gender</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium">Actions</p>
                            </div>
                        </div>
                        <div className="border border-t-0 border-gray-400 rounded-b-lg divide-y">
                            {registeredTeachers.map(item => (
                                <div key={item.id} className="grid grid-cols-6 gap-1 px-3 py-2">
                                    <div className="col-span-3">
                                        <p className="font-medium px-4">{item.fullName}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <p className="font-medium">{item.designation}</p>
                                    </div>
                                    <div className="hidden sm:flex sm:col-span-1">
                                        <p className="font-medium">{item.gender}</p>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                    <UpdateTeacherDataModal currentUser={currentUser} teacherDetails={item} />
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center items-center p-3">
                            <RegisterTeacherModal currentUser={currentUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdministerTeacherPage