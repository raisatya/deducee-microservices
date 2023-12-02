"use client"
import Link from 'next/link';

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function ClassroomListMenu({ classrooms, selectedClassroomName }) {
    return (
        <div className="text-center">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="border flex justify-center items-center max-w-xs sm:max-w-md gap-2 rounded-full px-6 sm:px-12 py-2 cursor-pointer text-sm font-medium text-blue-700">
                        {selectedClassroomName}
                        <ChevronDownIcon
                            className="h-5 w-5 text-black hover:text-gray-600"
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
                    <Menu.Items className="absolute -right-4 mt-2 w-56 max-h-96 overflow-y-scroll origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {classrooms.map(item => (
                            <div key={item.id} className="px-1 py-1 ">
                                <Link href={`/classroom/${item.id}/${item.classroomName}`}>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                                            >
                                                {item.classroomName}
                                                <span><ChevronRightIcon className='w-5 h-5'/></span>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Link>
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}