import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Track from "./pages/Track"
import Officerlogin from "./pages/Officerlogin"
import Dashboard from "./pages/Dashboard";
import ComplaintDetails from "./pages/ComplaintDetails";
import ResolvedComplaints from "./pages/ResolvedComplaints";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/Track" element={<Track />} />
        <Route path="/officerlogin" element={<Officerlogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />}/>
        <Route path="/resolved" element={<ResolvedComplaints />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;