"use server"

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getCookies } from './authServerActions';


export const addGeneralNotices = async (notice, currentUser) => {

    if (!notice.noticeTitle || !notice.noticeBody) return;

    const newNotice = {
        noticeTitle: notice.noticeTitle,
        noticeBody: notice.noticeBody,
        publishedBy: currentUser.fullName,
        publisherId: currentUser.userId,
        role: currentUser.role
    }

    await fetch(`http://localhost:5000/api/notices/generalnotice/${currentUser.instituteId}/${currentUser.currentSession}/create`, {
        method: "POST",
        body: JSON.stringify(newNotice),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("generalnotices");
    redirect('/notices/generalnotices');
}

export const addClassroomNotices = async (notice, classroomId, classroomName, currentUser) => {

    if (!notice.noticeTitle || !notice.noticeBody) return;

    const newNotice = {
        noticeTitle: notice.noticeTitle,
        noticeBody: notice.noticeBody,
        publishedBy: currentUser.fullName,
        publisherId: currentUser.userId,
        role: currentUser.role
    }

    await fetch(`http://localhost:5000/api/notices/classroomnotice/${currentUser.instituteId}/${classroomId}/${currentUser.currentSession}/create`, {
        method: "POST",
        body: JSON.stringify(newNotice),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag(`classroomnotices/${currentUser.instituteId}/${classroomId}`);
    redirect(`/notices/classroomnotices/${classroomId}/${classroomName}`);
}


//Server Action to delete General Notice
export const deleteGeneralNotice = async (id) => {
    await fetch(`http://localhost:5000/api/notices/generalnotice/${id}/delete`, {
        method: "DELETE",
    });

    revalidateTag("generalnotices");
    redirect('/notices/generalnotices');
}

//Server Action to delete Classroom Notice
export const deleteClassroomNotice = async (id, classroomId, classroomName) => {

    const currentUser = await getCookies();

    await fetch(`http://localhost:5000/api/notices/classroomnotice/${id}/delete`, {
        method: "DELETE",
    });

    revalidateTag(`classroomnotices/${currentUser.instituteId}/${classroomId}`);
    redirect(`/notices/classroomnotices/${classroomId}/${classroomName}`);
}