import { useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState("")

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") || "")
  }, [])

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Router />
    </UserContext.Provider>
  );
}

export default App;
