import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-primary-600">VimaPay</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Your Smart Health Insurance Guide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Get personalized health insurance recommendations tailored to your needs. VimaPay helps you find the perfect coverage for you and your family with real-time comparisons and expert guidance.
          </p>
          <Link
            to="/form"
            className="inline-flex items-center btn-primary text-lg gap-2"
          >
            Get Started
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-primary-600 font-bold text-xl mb-4">Personalized</div>
            <p className="text-gray-600">Get recommendations tailored to your specific health needs and preferences</p>
          </div>
          <div className="card text-center">
            <div className="text-primary-600 font-bold text-xl mb-4">Compare</div>
            <p className="text-gray-600">Easy side-by-side comparison of different insurance plans</p>
          </div>
          <div className="card text-center">
            <div className="text-primary-600 font-bold text-xl mb-4">Expert Support</div>
            <p className="text-gray-600">Get guidance from our insurance advisors whenever you need</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage