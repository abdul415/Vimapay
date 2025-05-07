import { useLocation, Link } from 'react-router-dom'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { fetchInsurancePlans } from '../services/insuranceApi'

const ComparisonPage = () => {
  const location = useLocation()
  const selectedPlan = location.state?.plan
  
  const [comparisonPlans, setComparisonPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getComparisonPlans = async () => {
      try {
        setLoading(true)
        // Fetch real insurance plans from our API service
        const plans = await fetchInsurancePlans({})
        
        // If a plan was selected, make sure it's first in the list
        if (selectedPlan) {
          const filteredPlans = plans.filter(plan => plan.id !== selectedPlan.id)
          setComparisonPlans([selectedPlan, ...filteredPlans.slice(0, 2)])
        } else {
          setComparisonPlans(plans.slice(0, 3))
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch insurance plans for comparison:', err)
        setError('Unable to load insurance plans for comparison. Please try again later.')
        setLoading(false)
      }
    }

    getComparisonPlans()
  }, [selectedPlan])

  // Fallback mock plans in case API fails - will be removed in production
  const fallbackPlans = [
    {
      id: 1,
      name: 'Premium Health Plus',
      provider: 'HealthGuard Insurance',
      monthlyPremium: 299,
      coverage: 500000,
      features: {
        'Hospital Room': 'Private Room',
        'Pre-existing Conditions': 'Covered after 2 years',
        'Annual Health Checkup': 'Free',
        'Maternity Coverage': 'Included',
        'Dental Coverage': 'Included',
        'Vision Coverage': 'Included',
        'Mental Health Coverage': 'Full Coverage',
        'Prescription Drugs': 'Full Coverage',
        'Network Hospitals': '5000+',
        'Claim Settlement Ratio': '98%'
      }
    },
    {
      id: 2,
      name: 'Standard Care Shield',
      provider: 'SecureCare Insurance',
      monthlyPremium: 199,
      coverage: 300000,
      features: {
        'Hospital Room': 'Semi-Private Room',
        'Pre-existing Conditions': 'Covered after 3 years',
        'Annual Health Checkup': 'Discounted',
        'Maternity Coverage': 'Additional Cost',
        'Dental Coverage': 'Basic Coverage',
        'Vision Coverage': 'Basic Coverage',
        'Mental Health Coverage': 'Partial Coverage',
        'Prescription Drugs': 'Generic Only',
        'Network Hospitals': '3000+',
        'Claim Settlement Ratio': '95%'
      }
    },
    {
      id: 3,
      name: 'Essential Health Guard',
      provider: 'SafeLife Insurance',
      monthlyPremium: 149,
      coverage: 200000,
      features: {
        'Hospital Room': 'General Ward',
        'Pre-existing Conditions': 'Covered after 4 years',
        'Annual Health Checkup': 'Basic',
        'Maternity Coverage': 'Not Included',
        'Dental Coverage': 'Not Included',
        'Vision Coverage': 'Not Included',
        'Mental Health Coverage': 'Emergency Only',
        'Prescription Drugs': 'Limited Coverage',
        'Network Hospitals': '2000+',
        'Claim Settlement Ratio': '92%'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Compare Insurance Plans
          </h1>
          <p className="text-gray-600">
            Compare features and benefits side by side to make an informed decision.
          </p>
        </div>
        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading insurance plans for comparison...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg inline-block">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && comparisonPlans.length > 0 && (
          <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                {comparisonPlans.map(plan => (
                  <th key={plan.id} className="px-6 py-4 text-center">
                    <div className="text-lg font-bold text-gray-900">{plan.name}</div>
                    <div className="text-sm text-gray-600">{plan.provider}</div>
                    <div className="text-2xl font-bold text-primary-600 mt-2">
                      ${plan.monthlyPremium}/mo
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Coverage up to ${(plan.coverage / 1000).toFixed(0)}k
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.keys(comparisonPlans[0].features).map(feature => (
                <tr key={feature} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{feature}</td>
                  {comparisonPlans.map(plan => (
                    <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-600">
                      {plan.features[feature].includes('Not Included') ? (
                        <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                      ) : (
                        plan.features[feature]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {!loading && !error && (
          <div className="mt-12 flex justify-center gap-4">
            <Link to="/recommendations" className="btn-secondary">
              Back to Recommendations
            </Link>
            <Link to="/thank-you" className="btn-primary">
              Choose a Plan
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComparisonPage