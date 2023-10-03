import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import WorkoutArea from "./components/WorkoutArea"
import { useState } from "react"

function App() {

  const baseURI = "https://workoutapi-fjcr.onrender.com/api";
  const [token, setToken] = useState("")
  const [hasLoggedIn, setLoginStatus] = useState(false)

  return(
    <>
      <Navbar/>
      <Home hasLoggedIn={hasLoggedIn}/>
      {!hasLoggedIn &&
      <Login 
        setToken={setToken}
        baseURI={baseURI}
        setLoginStatus={setLoginStatus}/>}
      {hasLoggedIn && <WorkoutArea
                       token={token}
                       baseURI={baseURI}/>}

    </>
  )
}

export default App
