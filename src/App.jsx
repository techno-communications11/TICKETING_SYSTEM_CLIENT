import React, { useEffect } from 'react'
import Routing from './Routing/Routing'
import { ToastContainer } from 'react-toastify'
// import GlobalInstallBar from './Components/GlobalInstallBar/GlobalInstallBar'

function App() {
  useEffect(() => {
    // Disable right-click
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // Disable some key combinations
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.key === "U") // Ctrl+U (view source)
      ) {
        e.preventDefault();
        alert("Developer tools are disabled on this site.");
      }
    });

    // Detect DevTools open via console trick
    const checkDevTools = setInterval(() => {
      const start = new Date().getTime();
      debugger; // pauses when DevTools are open
      const end = new Date().getTime();
      if (end - start > 100) {
        alert("Developer tools detected! Please close them to continue.");
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(checkDevTools);
  }, []);

  return (
    <div>
      {/* <GlobalInstallBar/> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routing />
    </div>
  )
}

export default App