"use client"

import { useState, useTransition } from "react"
import { registerClassroom } from "@/actions/administerServerActions"

const ClassroomRegisterForm = ({ currentUser }) => {

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
    }

    return (
        <form onSubmit={handleSubmit} className="h-full space-y-3 text-sm font-medium">
            <div className="text-base mb-2">Session: {currentUser.currentSession}</div>
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
    )
}

export default ClassroomRegisterForm