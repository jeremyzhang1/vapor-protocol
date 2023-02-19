import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'
import OnboardingPage from './pages/OnboardingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <OnboardingPage />
        } />
        <Route path="/debug" element={
          <AppPage />
        } />
        <Route path="/landing" element={
          <LandingPage />
        } />
      </Routes>
    </Router>
  );
}

export default App;