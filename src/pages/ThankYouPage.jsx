import { Link, useLocation } from 'react-router-dom'
import { CheckCircleIcon, PhoneIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { submitPlanSelection } from '../services/insuranceApi'

const ThankYouPage = () => {
  const location = useLocation()
  const selectedPlan = location.state?.plan
  
  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitted: false,
    referenceId: null,
    message: '',
    nextSteps: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // If a plan was selected, automatically submit it
    // In a real app, this would happen after user confirmation
    const autoSubmitPlan = async () => {
      if (selectedPlan) {
        try {
          setLoading(true)
          // Mock user data - in a real app, this would come from a form
          const userData = {
            name: 'Demo User',
            email: 'demo@example.com',
            phone: '9876543210',
            age: 35
          }
          
          const result = await submitPlanSelection(userData, selectedPlan)
          setSubmissionStatus({
            isSubmitted: true,
            referenceId: result.referenceId,
            message: result.message,
            nextSteps: result.nextSteps
          })
          setLoading(false)
        } catch (err) {
          console.error('Failed to submit plan selection:', err)
          setError('Unable to process your selection. Our team will contact you shortly.')
          setLoading(false)
        }
      }
    }
    
    autoSubmitPlan()
  }, [selectedPlan])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card text-center">
          <div className="mb-8">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Interest!
            </h1>
            
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-r-transparent mb-4"></div>
                <p className="text-xl text-gray-600">Processing your selection...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            ) : (
              <div>
                <p className="text-xl text-gray-600 mb-4">
                  We've received your information and our team will review your preferences
                  to ensure you get the best coverage possible.
                </p>
                
                {submissionStatus.isSubmitted && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                    <p className="font-semibold">Reference ID: {submissionStatus.referenceId}</p>
                    <p>{submissionStatus.message}</p>
                    
                    {submissionStatus.nextSteps.length > 0 && (
                      <div className="mt-3">
                        <p className="font-semibold">Next steps:</p>
                        <ul className="list-disc list-inside text-left">
                          {submissionStatus.nextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {selectedPlan && (
                  <div className="bg-primary-50 border border-primary-200 text-primary-700 px-4 py-3 rounded-lg mb-4 text-left">
                    <p className="font-semibold mb-2">Selected Plan:</p>
                    <p><span className="font-medium">Plan:</span> {selectedPlan.name}</p>
                    <p><span className="font-medium">Provider:</span> {selectedPlan.provider}</p>
                    <p><span className="font-medium">Monthly Premium:</span> ₹{selectedPlan.monthlyPremium}</p>
                    <p><span className="font-medium">Coverage:</span> ₹{selectedPlan.coverage.toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Want to Talk to an Insurance Advisor?
            </h2>
            <p className="text-gray-600 mb-6">
              Our experienced advisors are here to answer your questions and help you
              make the best choice for your health insurance needs.
            </p>
            <button className="btn-primary inline-flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              Schedule a Call
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Need to make changes to your preferences?
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/form" className="btn-secondary">
                Update Preferences
              </Link>
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage