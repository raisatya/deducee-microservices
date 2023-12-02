import ConsoleHeader from '@/app/components/global/ConsoleHeader';
import ClassroomSubHeader from '../../components/ClassroomSubHeader';

function ClassroomSubLayout({ children, params }) {

    const classroomName = params.classroomName.replaceAll("%20", " ");
    return (
        <div>
            <ConsoleHeader activeconsolenavigationtab="2" />
            <div className="w-full max-w-6xl mx-auto">
                <ClassroomSubHeader classroomName={classroomName} />
                {children}
            </div>
        </div>
    )
}

export default ClassroomSubLayout