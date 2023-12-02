"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useTransition } from 'react'

import { registerClassroom } from "@/actions/administerServerActions"

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'

export default function RegisterClassroomModal({ currentUser }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [classroomName, setClassroomName] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleChange = (event) => {
        setClassroomName(event.target.value);
    }

    const handleClear = (event) => {
        event.preventDefault();
        setClassroomName("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        startTransition(() => registerClassroom(classroomName, currentUser.instituteId, currentUser.currentSession));
        setClassroomName("");
        setIsOpen(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="flex justify-center items-center w-screen max-w-xs sm:max-w-sm p-2 m-2 bg-blue-700 text-sm text-white font-medium border border-slate-200 rounded-lg hover:bg-indigo-600 active:bg-indigo-500"
            >
                <PlusIcon className="w-5 h-5"/> Register new classroom
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="flex justify-between items-center text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Register new classroom!
                                        <button onClick={closeModal} className=''><XMarkIcon className="w-5 h-5"/></button>
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit} className="h-full space-y-3 text-sm font-medium">
                                        <div className="text-base my-2">Session: {currentUser.currentSession}</div>
                                        <div>
                                            <label className="font-medium px-2">Classroom Name</label>
                                            <input
                                                name="classroomName"
                                                id="newClassroomName"
                                                type="text"
                                                value={classroomName}
                                                onChange={handleChange}
                                                required className="px-6 py-2 mt-1 w-full border-2 border-gray-400 rounded-lg font-medium" />
                                        </div>
                                        <div className="flex justify-end items-center space-x-3 my-4 font-medium text-sm">
                                            <button onClick={handleClear} className="px-6 py-2 rounded-lg bg-gray-100">Clear</button>
                                            <button type="submit" className="flex justify-center items-center bg-blue-700 px-6 py-2 text-white rounded-lg">
                                                {isPending ?
                                                    <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-white"></div> : null
                                                }
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
