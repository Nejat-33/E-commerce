
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import UserDashboard from "../component/user/userdashboard"


function Userpage() {
  const locate = useLocation()
  const [activebar, setActivebar] = useState<string>(locate.state?.tab || 'order')

  useEffect(() => {
    const tab = locate.state?.tab
    if (tab && tab !== activebar) {
      // apply the incoming tab then clear the location state
      setActivebar(tab)
      window.history.replaceState({}, document.title)
    }
    // if there's no tab in location.state we do nothing
  }, [locate.state, activebar])

  return (
    <div>
      <UserDashboard initialTab={activebar} />
    </div>
  )
}

export default Userpage
