import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import "./index.css";
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Search from "./pages/Search/Search";
import View from "./pages/View/View";

const App = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />
            <Route path="/view/:id" element={
              <ProtectedRoute>
                <View />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;
