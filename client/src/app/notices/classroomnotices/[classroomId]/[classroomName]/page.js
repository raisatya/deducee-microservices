import { getCookies } from "@/actions/authServerActions";

import moment from "moment/moment";
import NoticesSubHeader from "../../../components/header/NoticesSubHeader"
import NoticesList from "@/app/notices/components/lists/NoticesList";

export default async function ClassroomNotices({ params }) {

    const currentUser = await getCookies();

    const res = await fetch(`http://localhost:5000/api/notices/classroomnotices/${currentUser.instituteId}/${params.classroomId}/${currentUser.currentSession}`, {
        cache: "no-store",
        tags: [`classroomnotices/${currentUser.instituteId}/${params.classroomId}`]
    });

    const classroomnotices = await res.json();
    const classroomName = params.classroomName.replaceAll("%20", " ");

    return (
        <div className="w-full max-w-6xl mx-auto">
            <NoticesSubHeader activeTab="2" classroomName={classroomName} currentUser={currentUser} linkAddress={`/notices/classroomnotices/${params.classroomId}/${params.classroomName}/publish`} disabled={false}/>
            <NoticesList notices={classroomnotices} currentUser={currentUser} classroomId={params.classroomId} classroomName={params.classroomName}/>
        </div>
    )
}