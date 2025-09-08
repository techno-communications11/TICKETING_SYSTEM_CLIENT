// import React, { useEffect, useState } from 'react';

// const GlobalInstallBar = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const handler = (e) => {
//       e.preventDefault();
//       setDeferredPrompt(e);
//       setShow(true);
//     };

//     window.addEventListener('beforeinstallprompt', handler);

//     return () => window.removeEventListener('beforeinstallprompt', handler);
//   }, []);

//   const handleInstall = async () => {
//     if (!deferredPrompt) return;

//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;

//     if (outcome === 'accepted') {
//       console.log('User installed the app');
//     } else {
//       console.log('User dismissed the install prompt');
//     }

//     setDeferredPrompt(null);
//     setShow(false);
//   };

//   if (!show) return null;

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         bottom: 0,
//         width: '100%',
//         backgroundColor: '#f8f9fa',
//         borderTop: '1px solid #dee2e6',
//         padding: '10px 20px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         zIndex: 3000,
//       }}
//     >
//       <span style={{ fontSize: '16px', color: '#333' }}>
//         📥 Install our Desktop Application for a better experience
//       </span>
//       <button
//         onClick={handleInstall}
//         style={{
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           padding: '8px 16px',
//           cursor: 'pointer',
//         }}
//       >
//         Install App
//       </button>
//     </div>
//   );
// };

// export default GlobalInstallBar;



import React, { useEffect, useState } from 'react';
import { Snackbar, Button as MuiButton, Slide } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

function SlideUp(props) {
  return <Slide {...props} direction="up" />;
}

const GlobalInstallBar = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { user } = useSelector((state) => state.currentUser); // Ensure your Redux state has currentUser

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    // Send install log to API first
    try {
      const response = await axios.post('https://ticketing-system-sever.vercel.app/auth/userUsedInDesktop', { id: user?._id });
      // Show success toast
      setSnackbarOpen(true);
    } catch (error) {
      console.warn('Install log API failed:', error.message);
    }

    // Proceed with the install regardless of API result
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShow(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!show) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #dee2e6',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 3000,
        }}
      >
        <span style={{ fontSize: '16px', color: '#333' }}>
          📥 Install our Desktop Application for a better experience
        </span>
        <MuiButton
          variant="contained"
          onClick={handleInstall}
          style={{ backgroundColor: '#007bff' }}
        >
          Install App
        </MuiButton>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="✅ App install logged successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={SlideUp}
      />
    </>
  );
};

export default GlobalInstallBar;
