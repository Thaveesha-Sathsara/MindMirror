import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Create from "./Create/Create";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import { StoreProvider } from "./StoreContext";
import Search from "./Search/Search";
import View from "./View/View";

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/create" element={<Create />} ></Route>
          <Route path="/search" element={<Search />} ></Route>
          <Route path="/view" element={<View />} ></Route>
        </Routes>
      </Router>
      
    </StoreProvider>
  );
};

export default App;
