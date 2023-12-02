"use client"

import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { XCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useTransition } from 'react'


export default function ConsoleHeaderPopover({ currentUser, instituteInitials }) {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="flex items-center justify-center">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button className="outline-none">
                            <ChevronDownIcon className="w-5 flex" aria-hidden="true"/>
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
                            <Popover.Panel className="absolute -left-24 z-10 mt-6 w-72 -translate-x-1/2 transform px-4 sm:px-0 bg-white">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-slate-300">
                                    <div className="relative bg-white">
                                        <div className="flex justify-start items-center lg:hidden p-4 space-x-2">
                                            <div className='flex justify-center items-center bg-blue-200 font-medium text-lg tracking-wide w-10 h-10 rounded-full ring-1 ring-gray-300 ring-offset-2 sm:ring-offset-4 ring-offset-slate-100'>
                                                {instituteInitials}
                                            </div>
                                            <div className="">
                                                <p className="font-medium text-gray-800 text-sm flex w-44 md:w-52 truncate">{currentUser.instituteName}</p>

                                                    <p className="flex bg-white justify-center font-medium text-xs text-center text-gray-500 hover:text-gray-700 cursor-pointer border rounded-md border-gray-200 p-1 active:bg-slate-100">Visit page</p>
                            
                                            </div>
                                        </div>
                                        <Link href="/">
                                            <p className='flex items-center w-full space-x-2 p-3 transition duration-150 ease-in-out focus:outline-none active:bg-slate-100'>
                                                <XCircleIcon className="ml-3 w-6 h-6 text-red-600" />
                                                <p className='font-medium text-gray-800 hover:text-gray-600'>Exit Console</p>
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="bg-gray-200 p-2"></div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}