import { getCookies } from "@/actions/authServerActions"
import { redirect } from "next/navigation"

import NoticesSubHeader from "@/app/notices/components/header/NoticesSubHeader";
import ClassroomNoticePublishForm from "@/app/notices/components/forms/ClassroomNoticePublishForm";

const PublishClassroomNoticePage = async ({ params }) => {

    const currentUser = await getCookies();

    if(currentUser.role === 'student') redirect("/");
    
    const classroomId = params.classroomId;
    const classroomName = params.classroomName.replaceAll("%20", " ");

    return (
        <div className="w-full max-w-6xl mx-auto">
            <NoticesSubHeader activeTab="2" classroomName={classroomName} currentUser={currentUser} linkAddress={`/notices/classroomnotices/${classroomId}/${classroomName}/publish`} disabled={true} />
            <ClassroomNoticePublishForm currentUser={currentUser} classroomId={classroomId} classroomName={classroomName}/>
        </div>
    )
}

export default PublishClassroomNoticePage