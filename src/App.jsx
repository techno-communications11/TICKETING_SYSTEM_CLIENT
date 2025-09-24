import React from 'react'
import Routing from './Routing/Routing'
import { ToastContainer } from 'react-toastify'
import GlobalInstallBar from './Components/GlobalInstallBar/GlobalInstallBar'

function App() {

  return (
    <div>
      {/* <GlobalInstallBar/> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routing/>
    </div>
  )
}

export default App