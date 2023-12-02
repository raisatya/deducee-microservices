import Link from "next/link"

import { getCookies } from "@/actions/authServerActions";
import { redirect } from "next/navigation"

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import ConsoleHeader from "../components/global/ConsoleHeader";

const ClassroomPage = async () => {

    const currentUser = await getCookies();

    if (currentUser.role === 'student') redirect("/");

    const res = await fetch(`http://localhost:5000/api/classroom/${currentUser.instituteId}/${currentUser.currentSession}`, {
        tags: ["allclassrooms"]
    });

    const classrooms = await res.json();

    return (
        <div>
            <ConsoleHeader activeconsolenavigationtab="2" />
            <div className="w-full max-w-6xl mx-auto pb-8">
                <div className="flex flex-col justify-start items-center p-2">
                    {classrooms.map(item => (
                        <div key={item.id}>
                            <Link href={`/classroom/${item.id}/${item.classroomName}`}>
                                <div className="flex justify-between items-center w-screen max-w-xs sm:max-w-sm p-4 m-1 font-medium border border-slate-200 rounded-lg bg-white shadow-sm hover:bg-gray-100 active:bg-slate-50">
                                    <p className="text-sm">{item.classroomName}</p>
                                    <ChevronRightIcon className="w-5 h-5" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ClassroomPage