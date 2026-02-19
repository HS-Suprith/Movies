import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Browse from './pages/Browse';

function App() {
  const isAuthenticated = () => {
    try {
      const user = localStorage.getItem('supx_user');
      return !!user && user !== 'null';
    } catch (e) {
      return false;
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated() ? <Navigate to="/browse" replace /> : <SignIn />
        } 
      />
      <Route
        path="/browse"
        element={
          isAuthenticated() ? <Browse /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;
