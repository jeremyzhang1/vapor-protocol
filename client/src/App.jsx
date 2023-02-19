import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'
import OnboardingPage from './pages/OnboardingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={
          <OnboardingPage />
        } />
        <Route path="/app" element={
          <AppPage />
        } />
        <Route path="/" element={
          <LandingPage />
        } />
      </Routes>
    </Router>
  );
}

export default App;