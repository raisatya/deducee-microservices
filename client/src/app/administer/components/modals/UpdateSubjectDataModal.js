"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useTransition, useCallback } from 'react'

import { updateSubject } from '@/actions/administerServerActions'

import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function UpdateSubjectDataModal({ currentUser, classroomId, registeredTeachers, subjectDetails }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [isPending, startTransition] = useTransition();

    const [inputs, setInputs] = useState({
        subjectName: subjectDetails.subjectName,
        subjectCode: subjectDetails.subjectCode,
        assignedTeacherName: subjectDetails.assignedTeacherName,
        assignedTeacherId: subjectDetails.assignedTeacherId
    });

    const handleChange = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }, [setInputs]);

    const handleChangeTeacher = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        for (let i = 0; i < registeredTeachers.length; i++) {
            if (registeredTeachers[i].id == value) {
                setInputs(values => ({ ...values, assignedTeacherName: registeredTeachers[i].fullName }));
                break;
            }
        }
    }, [setInputs]);

    const handleClear = (event) => {
        event.preventDefault();
        setInputs({
            subjectName: subjectDetails.subjectName,
            subjectCode: subjectDetails.subjectCode,
            assignedTeacherName: subjectDetails.assignedTeacherName,
            assignedTeacherId: subjectDetails.assignedTeacherId
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        startTransition(() => updateSubject(inputs, currentUser.instituteId, currentUser.currentSession, classroomId));
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="flex items-center border rounded-lg px-6 py-2 text-sm font-medium text-blue-700">
                <PencilSquareIcon className='w-4 h-4 mr-1' />
                Edit <span className='hidden sm:flex'>Data</span>
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
                                        Update subject details!
                                        <button onClick={closeModal} className=''><XMarkIcon className="w-5 h-5" /></button>
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit} className="h-full space-y-3 text-sm font-medium">
                                        <div className="text-base my-2">Session: {currentUser.currentSession}</div>
                                        <div className="text-base my-2">Subject code: {subjectDetails.subjectCode}</div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="col-span-2">
                                                <label className="px-2">Select Teacher</label>
                                                <select
                                                    name="assignedTeacherId"
                                                    id="assignedTeacherId"
                                                    value={inputs.assignedTeacherId || ""}
                                                    onChange={handleChangeTeacher}
                                                    className="form-select form-select-md appearance-none w-full mt-1 py-2 px-6 bg-white border-2 border-gray-400 outline-none rounded-lg ease-in-out" aria-label="Default select example"
                                                    required>
                                                    <option className='font-medium' value="">Open this select menu</option>
                                                    {registeredTeachers.map((item) => (
                                                        <option key={item.id} className="font-medium" value={item.id}>{item.fullName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="col-span-2">
                                                <label className="px-2">Subject's Name</label>
                                                <input
                                                    name="subjectName"
                                                    id="newSubjectName"
                                                    type="text"
                                                    value={inputs.subjectName || ""}
                                                    onChange={handleChange}
                                                    required className="px-6 py-2 mt-1 w-full border-2 border-gray-400 rounded-lg" />
                                            </div>

                                        </div>
                                        <div className="flex justify-end items-center space-x-3 pt-4 text-sm">
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
