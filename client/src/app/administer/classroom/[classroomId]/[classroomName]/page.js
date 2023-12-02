import { getCookies } from "@/actions/authServerActions"

import AdministerSubHeader from "@/app/administer/components/subheaders/AdministerSubHeader"
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import RegisterStudentModal from "../../../components/modals/RegisterStudentModal";
import UpdateStudentModal from "../../../components/modals/UpdateStudentDataModal";
import SubjectComponent from "@/app/administer/components/SubjectComponent";

const AdminsterClassroomUpdatePage = async ({ params }) => {

    const currentUser = await getCookies();

    const res = await fetch(`http://localhost:5000/api/classroom/${currentUser.instituteId}/${currentUser.currentSession}/${params.classroomId}`, {
        tags: ["allclassrooms"]
    });

    const classroomdata = await res.json();

    const classroomName = params.classroomName.replaceAll("%20", " ");

    return (
        <div className="w-full max-w-6xl mx-auto scroll-smooth">
            <AdministerSubHeader activeTab="1" />
            <div className="border rounded-lg mt-3 mb-8">
                <div className="flex justify-between items-center gap-4 font-medium bg-gray-100 p-3">
                    <div className="flex justify-start items-center gap-4">
                        <p className="px-4 py-1 bg-blue-600 text-white rounded-lg cursor-default">{classroomdata.classroomName}</p>
                        <p className="flex items-center">Session: {classroomdata.session} <ChevronDownIcon className="w-5 h-5" /></p>
                    </div>
                    <div className="flex justify-end items-center">
                        <p className="">{classroomdata.disabled ? "Disabled" : "Active"}</p>
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
                            {classroomdata.students.map(item => (
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
                                        <UpdateStudentModal currentUser={currentUser} studentDetails={item} classroomId={params.classroomId} classroomName={classroomName} />
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center items-center p-3">
                                <RegisterStudentModal currentUser={currentUser} classroomId={params.classroomId} classroomName={classroomName}/>
                            </div>
                        </div>
                    </div>
                </div>
                <SubjectComponent currentUser={currentUser} classroomdata={classroomdata} />
            </div>
        </div>
    )
}

export default AdminsterClassroomUpdatePage