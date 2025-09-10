import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store, { persistor } from './Providers/store.js';
import RefetchData from './Components/RefetchData/RefetchData.jsx';
import { SocketProvider } from './Context/socket.context.jsx';
import { GlobalStates } from './Context/context.jsx';
import { GlobalAuthStates } from './Context/auth.context.jsx';
import { PersistGate } from 'redux-persist/integration/react';
// import './styles/ant-theme.less';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RefetchData>
          <SocketProvider>
            <GlobalAuthStates>
              <GlobalStates>
                <App />
              </GlobalStates>
            </GlobalAuthStates>
          </SocketProvider>
        </RefetchData>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
