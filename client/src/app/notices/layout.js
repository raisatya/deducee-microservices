import ConsoleHeader from '../components/global/ConsoleHeader'

function NoticesLayout({ children }) {
  return (
    <div>
      <ConsoleHeader activeconsolenavigationtab="1" />
      {children}
    </div>
  )
}

export default NoticesLayout