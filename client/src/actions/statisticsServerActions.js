"use server"

import { revalidateTag } from "next/cache"

export const registerAttendance = async (attendanceData, classroomId, studentId, currentUser, isPresent) => {

    if (!attendanceData.attendanceTakenOn) return;

    const newAttendanceData = {
        attendanceTakenOn: attendanceData.attendanceTakenOn,
        attendanceTakenById: currentUser.userId,
        attendanceTakenByName: currentUser.fullName,
        subjectName: attendanceData.subjectName,
        subjectCode: attendanceData.subjectCode,
        isPresent
    }
    
    await fetch(`http://localhost:5000/api/classroom/${currentUser.instituteId}/${currentUser.currentSession}/${classroomId}/${studentId}/attendance/create`, {
        method: "POST",
        body: JSON.stringify(newAttendanceData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("attendancedata");
}