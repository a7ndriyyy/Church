import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import EventDetails from "./pages/EventsDetails/Events";
import Schedule from "./pages/Schedule/Schedule";
import Contacts from "./pages/Contacts/Contacts";
import Support from "./pages/Support/Support";
import About from "./pages/About/About";

import './i18n';



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/schedule" element={<Schedule/>} />
             <Route path="/contacts" element={<Contacts/>} />
             <Route path="/support" element={<Support/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


