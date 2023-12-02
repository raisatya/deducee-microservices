import ConsoleHeader from '../components/global/ConsoleHeader'

function AdministerLayout({ children }) {
    return (
        <div>
            <ConsoleHeader activeconsolenavigationtab="" />
            {children}
        </div>
    )
}

export default AdministerLayout