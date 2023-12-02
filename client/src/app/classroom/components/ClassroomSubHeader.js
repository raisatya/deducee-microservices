import Link from "next/link"

import { getCookies } from "@/actions/authServerActions";
import { redirect } from "next/navigation"

import { ChevronRightIcon } from "@heroicons/react/20/solid";

import ClassroomListMenu from "./ClassroomListMenu";

const ClassroomSubHeader = async ({ classroomName }) => {
    
    const currentUser = await getCookies();

    const res = await fetch(`http://localhost:5000/api/classroom/${currentUser.instituteId}/${currentUser.currentSession}`, {
        tags: ["allclassrooms"]
    });

    const classrooms = await res.json();
    
    return (
        <div className='w-full flex justify-center items-center gap-2 sm:gap-6 py-4 font-medium text-sm bg-white sticky top-14 sm:top-16'>
            <ClassroomListMenu classrooms={classrooms} selectedClassroomName={classroomName}/>        
        </div>
    )
}

export default ClassroomSubHeader