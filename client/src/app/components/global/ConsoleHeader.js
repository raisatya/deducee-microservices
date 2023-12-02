import Link from "next/link"
import { redirect } from "next/navigation"
import { getCookies } from "@/actions/authServerActions"
import ConsoleHeaderPopover from "./ConsoleHeaderPopover"
import AdministerMenu from "./AdministerMenu"

const ConsoleHeader = async ({ activeconsolenavigationtab }) => {

    const currentUser = await getCookies();
    if (currentUser === null) redirect('/');

    const instituteInitials = currentUser.instituteName.at(0) + currentUser.instituteName.at(currentUser.instituteName.indexOf(" ") + 1);
    const avatarInitials = currentUser.fullName.at(0) + currentUser.fullName.at(currentUser.fullName.indexOf(" ") + 1);

    let classroomLink;

    if(currentUser.role == 'student') {
        classroomLink = `/classroom/${currentUser.classroomId}/${currentUser.classroomName}`;
    } else {
        classroomLink = '/classroom';
    }

    return (
        <div className="flex justify-between items-center w-full px-2 md:px-8 border-b sticky top-0 z-10 bg-white">
            <div className="flex justify-start items-center divide-x-0 lg:divide-x">
                <div className="hidden lg:flex lg:justify-center lg:items-center md:px-4 space-x-2 py-2">
                    <div className='flex justify-center items-center bg-blue-200 font-medium text-lg tracking-wide w-10 h-10 rounded-full ring-1 ring-gray-300 ring-offset-2 sm:ring-offset-4 ring-offset-slate-100'>
                        {instituteInitials}
                    </div>
                    <div className="">
                        <p className="font-medium text-gray-800 text-sm flex">{currentUser.instituteName}</p>
                        <Link href="/institute">
                            <p className="flex bg-white justify-center font-medium text-xs text-center text-gray-500 hover:text-gray-700 cursor-pointer border rounded-md border-gray-200 p-1 active:bg-slate-100">Visit page</p>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center sm:px-4">
                    <Link href="/notices/generalnotices">
                        <div className={`flex gap-2 cursor-pointer py-4 px-2 md:py-6 md:px-4 border-b-2 ${activeconsolenavigationtab == "1" ? 'border-blue-500' : 'border-transparent'} hover:border-blue-500`}>
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400">
                                    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="hidden sm:flex font-semibold text-base text-gray-700 dark:text-teal-300">Notices</h4>
                        </div>
                    </Link>
                    <Link href={classroomLink}>
                        <div className={`flex gap-2 cursor-pointer py-4 px-2 md:py-6 md:px-3 border-b-2 ${activeconsolenavigationtab == "2" ? 'border-blue-500' : 'border-transparent'} hover:border-blue-500`}>
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400">
                                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="hidden sm:flex font-semibold text-base text-gray-700 dark:text-teal-300">Classroom</h4>
                        </div>
                    </Link>
                    {currentUser.role === 'admin' &&
                        <AdministerMenu/>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center px-2 space-x-2 cursor-pointer">
                <div className="hidden md:flex md:flex-col">
                    <p className="font-medium text-gray-800 text-sm max-w-xs truncate">{currentUser.fullName}</p>
                    <div className="flex justify-end items-end space-x-1">
                        <p className="font-medium text-xs text-right text-gray-500">{currentUser.role}</p>
                    </div>
                </div>
                <div className='flex justify-center items-center bg-blue-200 font-medium text-lg tracking-wide w-10 h-10 rounded-full ring-1 ring-gray-300 ring-offset-2 sm:ring-offset-4 ring-offset-slate-100'>
                    {avatarInitials}
                </div>
                <ConsoleHeaderPopover currentUser={currentUser} instituteInitials={instituteInitials} />
            </div>
        </div>
    )
}

export default ConsoleHeader