import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FormPage from './pages/FormPage'
import RecommendationPage from './pages/RecommendationPage'
import ComparisonPage from './pages/ComparisonPage'
import ThankYouPage from './pages/ThankYouPage'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </div>
  )
}

export default App