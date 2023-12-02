"use client"

import { useState, useCallback, useTransition } from "react"

import { addGeneralNotices } from "@/actions/noticesServerActions";
import { InformationCircleIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid"

const GeneralNoticePublishForm = ({ currentUser }) => {

    const [inputs, setInputs] = useState({
        noticeTitle: "",
        noticeBody: ""
    });

    const handleChange = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }, [setInputs]);

    const handleClear = (event) => {
        event.preventDefault();
        setInputs({
            noticeTitle: "",
            noticeBody: ""
        });
    }

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (event) => {
        event.preventDefault();
        startTransition(() => addGeneralNotices(inputs, currentUser));
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-end items-start space-y-4 bg-white px-6 pt-3 border rounded-lg">
            <p className="inline-flex items-center font-medium text-sm">General Notices <span><ChevronRightIcon className="h-5 w-5 mr-1" /></span>Publish</p>
            <div className="grow rounded-2xl w-full space-y-4">
                <div className="flex flex-col justify-start space-y-4 w-full h-full">
                    <div className="flex-0">
                        {/**Put this in a form or a client component */}
                        <div className="flex justify-start items-center space-x-1">
                            <div className="grow relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                <input
                                    name="noticeTitle"
                                    id="noticeTitle"
                                    type="text"
                                    value={inputs.noticeTitle || ""}
                                    onChange={handleChange}
                                    placeholder="Notice Title..."
                                    required
                                    className="w-full bg-transparent pb-3  border-b-2 border-gray-300 dark:placeholder-gray-400 dark:border-gray-600 invalid:border-red-400 outline-none font-medium transition" />
                            </div>
                            <div className="group relative w-max">
                                <InformationCircleIcon className="w-6 text-slate-600 cursor-pointer" />

                                <span
                                    className="pointer-events-none absolute top-9 -right-4 w-max bg-slate-600 text-white px-3 py-1 border border-gray-300 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    Maximum of 1000 letters only.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grow">
                        <textarea
                            name="noticeBody"
                            id="noticeBody"
                            type="text"
                            value={inputs.noticeBody || ""}
                            onChange={handleChange}
                            placeholder="Notice body..."
                            rows={7}
                            required
                            className="w-full bg-transparent p-3 rounded-md  border-2 border-gray-300 dark:placeholder-gray-400 dark:border-gray-600 outline-none  invalid:border-red-400 transition h-full font-display" />
                    </div>
                </div>
            </div>
            <div className="flex-0 w-full">
                <div className="flex justify-end mb-4 space-x-3">
                    <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex justify-center items-center rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75"
                    >
                        <XMarkIcon className="w-4 mr-1" />Clear All
                    </button>
                    <button type="submit" className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 active:bg-blue-500 text-white rounded-lg py-2 px-6 shadow-md font-medium">
                        {isPending ?
                            <div className="w-6 h-6 border-2 border-dashed mr-2 rounded-full animate-spin border-white"></div> : null
                        }
                        Publish Notice
                    </button>
                </div>
            </div>
        </form>
    );
}

export default GeneralNoticePublishForm