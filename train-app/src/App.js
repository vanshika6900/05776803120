import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Train from "./pages/Train";
import SeatAvailabilityPage from "./pages/Seat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Train />} />
          <Route path="/seats" element={<SeatAvailabilityPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
