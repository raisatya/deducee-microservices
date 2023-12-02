import { getCookies } from "@/actions/authServerActions";

import moment from "moment/moment";
import NoticesSubHeader from "../components/header/NoticesSubHeader"
import NoticesList from "../components/lists/NoticesList";

const GeneralNoticesPage = async () => {

  const currentUser = await getCookies();

  const res = await fetch(`http://localhost:5000/api/notices/generalnotices/${currentUser.instituteId}/${currentUser.currentSession}`, {
    cache: "no-store",
    tags: ["generalnotices"]
  });

  const generalnotices = await res.json();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <NoticesSubHeader activeTab="1" classroomName="" currentUser={currentUser} linkAddress="/notices/generalnotices/publish" disabled={false} />
      <NoticesList notices={generalnotices} currentUser={currentUser} classroomId={null} classroomName={null}/>
    </div>
  )
}

export default GeneralNoticesPage