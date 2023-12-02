"use client"

import { signOutUser } from '@/actions/authServerActions'
import { Popover, Transition } from '@headlessui/react'
import { Cog8ToothIcon, ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { Fragment, useTransition } from 'react'


export default function LogoutPopover() {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="flex items-center justify-center">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button className="outline-none">
                            <div className="flex-col justify-center items-center rounded-lg text-gray-800 hover:text-black active:bg-slate-100 p-1">
                                <Cog8ToothIcon
                                    className="h-7 w-7 transition duration-150 ease-in-out group-hover:text-opacity-80"
                                    aria-hidden="true"
                                />
                                <ChevronDownIcon
                                    className="ml-1 h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80"
                                    aria-hidden="true"
                                />
                            </div>
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
                            <Popover.Panel className="absolute -left-7 z-10 mt-3 w-36 -translate-x-1/2 transform px-4 sm:px-0 bg-white">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-slate-300">
                                    <div className="relative bg-white">
                                        <button
                                            onClick={() => startTransition(() => signOutUser())}
                                            className='flex items-center w-full space-x-2 p-2 transition duration-150 ease-in-out focus:outline-none active:bg-slate-100'>
                                            {isPending ?
                                                <div className="ml-3 w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-[#FB923C]"></div> :
                                                <ArrowRightOnRectangleIcon className="ml-3 w-6 h-6 text-red-600" />
                                            }
                                            <p className='font-medium hover:text-gray-600'>Logout</p>
                                        </button>
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