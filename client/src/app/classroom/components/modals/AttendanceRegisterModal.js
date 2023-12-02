"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useTransition, useCallback } from 'react'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { registerAttendance } from '@/actions/statisticsServerActions'

export default function AttendanceRegisterModal({ currentUser, classroomdata }) {
    let [isOpen, setIsOpen] = useState(false)
    const [subjectSelected, setSubjectSelected] = useState(false);

    function closeModal() {
        setSubjectSelected(false);
        setInputs({
            attendanceTakenOn: "",
            subjectName: "",
            subjectCode: "",
        });
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [isPending, startTransition] = useTransition();
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [present, setPresent] = useState(false);

    const [inputs, setInputs] = useState({
        attendanceTakenOn: "",
        subjectName: "",
        subjectCode: "",
    });

    const handleChange = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }, [setInputs]);

    const handleChangeSubject = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        for (let i = 0; i < classroomdata.subjects.length; i++) {
            if (classroomdata.subjects[i].subjectCode == value) {
                setInputs(values => ({ ...values, subjectName: classroomdata.subjects[i].subjectName }));
                break;
            }
        }
    }, [setInputs]);

    const handleClear = (event) => {
        event.preventDefault();
        setInputs({
            attendanceTakenOn: "",
            subjectName: "",
            subjectCode: "",
        });
    }

    const handleContinue = (event) => {
        event.preventDefault();
        if (inputs.subjectName !== "" && inputs.attendanceTakenOn !== "") {
            setSubjectSelected(true);
        }
    }

    const handleSubmit = (event, studentId, classroomId, isPresent) => {
        event.preventDefault();
        setSelectedStudentId(studentId);
        setPresent(isPresent);
        startTransition(() => registerAttendance(inputs, classroomId, studentId, currentUser, isPresent))
    }

    const attendanceDiv = subjectSelected ? (
        <div className="h-full space-y-3 font-medium p-3">
            <div className='flex justify-between items-center gap-3'>
                <div className="">Subject: {inputs.subjectName}</div>
                <div className="">Session: {currentUser.currentSession}</div>
            </div>
            <div className="">Date and Time: {inputs.attendanceTakenOn}</div>

            {classroomdata.students.map(item => (
                <div key={item._id} className='flex justify-between items-center border rounded-lg p-3'>
                    <p>{item.fullName}</p>
                    <div className="flex justify-end items-center space-x-3 text-sm">
                        <button onClick={(event) => handleSubmit(event, item._id, classroomdata.id, true)} className="flex justify-center items-center bg-blue-700 px-6 py-2 text-white rounded-lg">
                            {isPending && (selectedStudentId == item._id) && present == true ?
                                <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-white"></div> : null
                            }
                            Present
                        </button>
                        <button onClick={(event) => handleSubmit(event, item._id, classroomdata.id, false)} className="flex justify-center items-center bg-red-700 px-6 py-2 text-white rounded-lg">
                            {isPending && (selectedStudentId == item._id) && present == false ?
                                <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-white"></div> : null
                            }
                            Absent
                        </button>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className="h-full space-y-3 text-sm font-medium">
            <div className="text-base my-2">Session: {currentUser.currentSession}</div>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <label className="px-2">Select Subject</label>
                    <select
                        name="subjectCode"
                        id="attendancesubjectcode"
                        value={inputs.subjectCode || ""}
                        onChange={handleChangeSubject}
                        className="form-select form-select-md appearance-none w-full mt-1 py-2 px-6 bg-white border-2 border-gray-400 outline-none rounded-lg ease-in-out" aria-label="Default select example"
                        required>
                        <option className='font-medium' value="">Open this select menu</option>
                        {classroomdata.subjects.map((item) => (
                            <option key={item._id} className="font-medium" value={item.subjectCode}>{item.subjectName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <label className="px-2">Date and Time</label>
                    <input
                        name="attendanceTakenOn"
                        id="attendanceTakenOn"
                        type="datetime-local"
                        value={inputs.attendanceTakenOn || ""}
                        onChange={handleChange}
                        required className="px-6 py-2 mt-1 w-full border-2 border-gray-400 rounded-lg" />
                </div>
            </div>
            <div className="flex justify-end items-center space-x-3 pt-4 text-sm">
                <button onClick={handleClear} className="px-6 py-2 rounded-lg bg-gray-100">Clear</button>
                <button onClick={handleContinue} className="flex justify-center items-center bg-blue-700 px-6 py-2 text-white rounded-lg">
                    Continue
                </button>
            </div>
        </div>
    )

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="font-medium text-sm bg-blue-600 text-white rounded-lg px-4 py-1"
            >
                Attendance
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
                                        Add Attendance!
                                        <button onClick={closeModal} className=''><XMarkIcon className="w-5 h-5" /></button>
                                    </Dialog.Title>
                                    {attendanceDiv}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
