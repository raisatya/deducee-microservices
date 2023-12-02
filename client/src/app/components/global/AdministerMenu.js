"use client"
import Link from 'next/link';

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function AdministerMenu() {
    return (
        <div className="">
            <Menu as="div" className="relative">
                <div>
                    <Menu.Button className="flex justify-center items-center max-w-xs sm:max-w-md gap-2 rounded-full cursor-pointer bg-gradient-to-r from-amber-600 to-orange-600 ml-2 sm:ml-6 px-4 py-1 space-x-1 text-sm font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Administer
                        <ChevronDownIcon
                            className="h-5 w-5 hover:text-gray-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute -right-10 mt-2 p-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg text-gray-900 ring-1 ring-black/5 focus:outline-none">

                                <Link href="/administer/classroom">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : ''
                                                    } group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                                            >
                                                Classroom
                                                <span><ChevronRightIcon className='w-5 h-5' /></span>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Link>
                        <Link href="/administer/admin">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-violet-500 text-white' : ''
                                            } group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                                    >
                                        Administrator
                                        <span><ChevronRightIcon className='w-5 h-5' /></span>
                                    </button>
                                )}
                            </Menu.Item>
                        </Link>
                        <Link href="/administer/teacher">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-violet-500 text-white' : ''
                                            } group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                                    >
                                        Teacher
                                        <span><ChevronRightIcon className='w-5 h-5' /></span>
                                    </button>
                                )}
                            </Menu.Item>
                        </Link>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}