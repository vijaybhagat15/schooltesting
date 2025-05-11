import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Section6 from './components/Sections_for_Home/Section6';
import Contact from './pages/Contact';
import Academics from './pages/Academics';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About/>} />
            <Route path="/News" element={<Section6/>} />
            <Route path="/Academics" element={<Academics/>} />
            <Route path="/Contact" element={<Contact/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;