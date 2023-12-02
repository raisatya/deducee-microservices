import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useTransition } from 'react'

import { deleteGeneralNotice, deleteClassroomNotice } from '@/actions/noticesServerActions'

export default function DeleteNoticeModal({ id, classroomId, classroomName, setIsSelected }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (noticeId, classroomId) => {
        if (classroomId == null)
            startTransition(() => deleteGeneralNotice(noticeId));
        else
            startTransition(() => deleteClassroomNotice(noticeId, classroomId, classroomName));
        setIsOpen(false);
        setIsSelected(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="text-sm font-medium hover:underline hover:underline-offset-2"
            >
                Delete Notice
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Delete Notice!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            This notice will be permanently deleted. Do you still want to delete it?
                                        </p>
                                    </div>

                                    <div className="flex justify-end items-center space-x-3 mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center items-center rounded-md border border-transparent bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => handleSubmit(id, classroomId)}
                                        >
                                            {isPending ?
                                                <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-white"></div> : null
                                            }
                                            Delete
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
