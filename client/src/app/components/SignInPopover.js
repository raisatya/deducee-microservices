"use client"

import { signInAdmin, signInStudent, signInTeacher } from '@/actions/authServerActions'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useTransition, useState } from 'react'

export default function SignInPopover() {
    const [isPending, startTransition] = useTransition();
    const [buttonUserType, setButtonUserType] = useState("");

    const handleSignInAdmin = () => {
        setButtonUserType('admin');
        startTransition(() => signInAdmin());
    }

    const handleSignInTeacher = () => {
        setButtonUserType('teacher');
        startTransition(() => signInTeacher());
    }

    const handleSignInStudent = () => {
        setButtonUserType('student');
        startTransition(() => signInStudent());
    }

    return (
        <div className="flex items-center justify-center">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 outline-none"
                        >
                            <span>Sign In</span>
                            <ChevronDownIcon
                                className="ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80"
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-10 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-4 sm:px-0 bg-white">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-slate-300">
                                    <div className="relative grid gap-8 bg-white p-7">
                                        <button
                                            onClick={() => handleSignInAdmin()}
                                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        >
                                            {isPending && buttonUserType == 'admin' ?
                                                <div className="w-12 h-12 border-2 border-dashed mr-2 rounded-full animate-spin border-[#FB923C]"></div> :
                                                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-[#FFEDD5]'><p className="font-display text-2xl text-[#FB923C]">A</p></div>
                                            }

                                            <div className="ml-4">
                                                <p className="text-base font-medium text-gray-900">
                                                    Sign in as administrator
                                                </p>
                                                <p className="text-left text-sm text-gray-500">
                                                    Role: Admin
                                                </p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleSignInTeacher()}
                                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        >
                                            {isPending && buttonUserType == 'teacher' ?
                                                <div className="w-12 h-12 border-2 border-dashed mr-2 rounded-full animate-spin border-[#FB923C]"></div> :
                                                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-[#FFEDD5]'><p className="font-display text-2xl text-[#FB923C]">T</p></div>
                                            }

                                            <div className="ml-4">
                                                <p className="text-base font-medium text-gray-900">
                                                    Sign in as teacher
                                                </p>
                                                <p className="text-left text-sm text-gray-500">
                                                    Role: Teacher
                                                </p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleSignInStudent()}
                                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        >
                                            {isPending && buttonUserType == 'student' ?
                                                <div className="w-12 h-12 border-2 border-dashed mr-2 rounded-full animate-spin border-[#FB923C]"></div> :
                                                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-[#FFEDD5]'><p className="font-display text-2xl text-[#FB923C]">S</p></div>
                                            }

                                            <div className="ml-4">
                                                <p className="text-base font-medium text-gray-900">
                                                    Sign in as student
                                                </p>
                                                <p className="text-left text-sm text-gray-500">
                                                    Role: Student
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="bg-gray-200 p-2">

                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}