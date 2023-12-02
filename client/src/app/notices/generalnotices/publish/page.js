import { getCookies } from "@/actions/authServerActions"
import { redirect } from "next/navigation"

import GeneralNoticePublishForm from "../../components/forms/GeneralNoticePublishForm"
import NoticesSubHeader from "../../components/header/NoticesSubHeader";

const PublishGeneralNoticePage = async () => {

    const currentUser = await getCookies();

    if(currentUser.role == 'student') redirect("/");

    return (
        <div className="w-full max-w-6xl mx-auto">
            <NoticesSubHeader activeTab="1" classroomName="" currentUser={currentUser} linkAddress="/notices/generalnotices/publish" disabled={true} />
            <GeneralNoticePublishForm currentUser={currentUser} />
        </div>
    )
}

export default PublishGeneralNoticePage