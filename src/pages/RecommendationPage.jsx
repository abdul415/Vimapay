import { useLocation, Link } from 'react-router-dom'
import { CheckCircleIcon, CurrencyDollarIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { fetchInsurancePlans, getInsurancePlanDetails } from '../services/insuranceApi'

const RecommendationPage = () => {
  const location = useLocation()
  const formData = location.state?.formData || {}
  
  const [recommendedPlans, setRecommendedPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCurrencyInINR, setShowCurrencyInINR] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [planDetailsLoading, setPlanDetailsLoading] = useState(false)

  useEffect(() => {
    const getInsurancePlans = async () => {
      try {
        setLoading(true)
        // Fetch real insurance plans from our API service
        const plans = await fetchInsurancePlans(formData)
        setRecommendedPlans(plans)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch insurance plans:', err)
        setError('Unable to load insurance recommendations. Please try again later.')
        setLoading(false)
      }
    }

    getInsurancePlans()
  }, [formData])

  // Fallback mock plans in case API fails - will be removed in production
  const fallbackPlans = [
    {
      id: 1,
      name: 'Premium Health Plus',
      provider: 'HealthGuard Insurance',
      monthlyPremium: 299,
      coverage: 500000,
      benefits: [
        'Comprehensive hospital coverage',
        'No waiting period for accidents',
        'Covers pre-existing conditions after 2 years',
        'Free annual health checkup',
        '24/7 telemedicine support'
      ],
      rating: 4.8
    },
    {
      id: 2,
      name: 'Standard Care Shield',
      provider: 'SecureCare Insurance',
      monthlyPremium: 199,
      coverage: 300000,
      benefits: [
        'Basic hospital coverage',
        '3 months waiting period for accidents',
        'Covers pre-existing conditions after 3 years',
        'Discounted health checkups',
        'Emergency helpline'
      ],
      rating: 4.5
    },
    {
      id: 3,
      name: 'Essential Health Guard',
      provider: 'SafeLife Insurance',
      monthlyPremium: 149,
      coverage: 200000,
      benefits: [
        'Essential hospital coverage',
        '6 months waiting period for accidents',
        'Covers pre-existing conditions after 4 years',
        'Basic health checkup',
        'Customer support during business hours'
      ],
      rating: 4.2
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Personalized Insurance Recommendations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your profile and preferences, we've selected these insurance plans
            that best match your needs.
          </p>
        </div>
        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Fetching the best insurance plans for you...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg inline-block">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPlans.length > 0 ? recommendedPlans.map((plan) => (
            <div key={plan.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600">{plan.provider}</p>
                </div>
                <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ★ {plan.rating}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {showCurrencyInINR ? (
                    <>
                      <CurrencyRupeeIcon className="inline-block h-6 w-6 mr-1" />
                      {plan.monthlyPremiumINR.toLocaleString()}
                    </>
                  ) : (
                    <>
                      <CurrencyDollarIcon className="inline-block h-6 w-6 mr-1" />
                      {plan.monthlyPremium.toLocaleString()}
                    </>
                  )}
                  <span className="text-base font-normal text-gray-600">/month</span>
                </div>
                <div className="text-gray-600">
                  Coverage up to {showCurrencyInINR ? (
                    <>
                      <CurrencyRupeeIcon className="inline-block h-4 w-4" />
                      {(plan.coverageINR / 1000).toFixed(0)}k
                    </>
                  ) : (
                    <>
                      <CurrencyDollarIcon className="inline-block h-4 w-4" />
                      {(plan.coverage / 1000).toFixed(0)}k
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link
                  to="/compare"
                  state={{ plan }}
                  className="btn-secondary flex-1 text-center"
                >
                  Compare
                </Link>
                <button 
                  className="btn-primary flex-1"
                  onClick={() => {
                    setSelectedPlan(null);
                    setPlanDetailsLoading(true);
                    getInsurancePlanDetails(plan.id, plan.apiSource)
                      .then(detailedPlan => {
                        setSelectedPlan(detailedPlan);
                        setPlanDetailsLoading(false);
                      })
                      .catch(err => {
                        console.error('Error fetching plan details:', err);
                        setPlanDetailsLoading(false);
                      });
                  }}
                >
                  Select Plan
                </button>
              </div>
            </div>
            )) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600">No insurance plans match your criteria. Please adjust your preferences.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 text-center space-y-4">
          <div>
            <button 
              onClick={() => setShowCurrencyInINR(!showCurrencyInINR)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Show prices in {showCurrencyInINR ? 'USD' : 'INR'}
            </button>
          </div>
          <div>
            <Link to="/form" className="btn-secondary">
              Adjust Preferences
            </Link>
          </div>
        </div>
        
        {/* Plan Details Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h2>
                    <p className="text-gray-600">{selectedPlan.provider}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Premium</h3>
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-2xl font-bold text-primary-600">
                            {showCurrencyInINR ? (
                              <>
                                <CurrencyRupeeIcon className="inline-block h-5 w-5 mr-1" />
                                {selectedPlan.monthlyPremiumINR.toLocaleString()}
                              </>
                            ) : (
                              <>
                                <CurrencyDollarIcon className="inline-block h-5 w-5 mr-1" />
                                {selectedPlan.monthlyPremium.toLocaleString()}
                              </>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">per month</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary-600">
                            {showCurrencyInINR ? (
                              <>
                                <CurrencyRupeeIcon className="inline-block h-5 w-5 mr-1" />
                                {(selectedPlan.monthlyPremiumINR * 12).toLocaleString()}
                              </>
                            ) : (
                              <>
                                <CurrencyDollarIcon className="inline-block h-5 w-5 mr-1" />
                                {(selectedPlan.monthlyPremium * 12).toLocaleString()}
                              </>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">per year</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Coverage</h3>
                      <div className="text-2xl font-bold text-primary-600">
                        {showCurrencyInINR ? (
                          <>
                            <CurrencyRupeeIcon className="inline-block h-5 w-5 mr-1" />
                            {selectedPlan.coverageINR.toLocaleString()}
                          </>
                        ) : (
                          <>
                            <CurrencyDollarIcon className="inline-block h-5 w-5 mr-1" />
                            {selectedPlan.coverage.toLocaleString()}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Waiting Periods</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">General</span>
                          <span className="font-medium">{selectedPlan.waitingPeriods.general}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pre-existing Conditions</span>
                          <span className="font-medium">{selectedPlan.waitingPeriods.preExisting}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Maternity</span>
                          <span className="font-medium">{selectedPlan.waitingPeriods.maternity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits</h3>
                      <ul className="space-y-2">
                        {selectedPlan.detailedBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Exclusions</h3>
                      <ul className="space-y-2">
                        {selectedPlan.exclusions.map((exclusion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-600">{exclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between">
                    <button 
                      onClick={() => setSelectedPlan(null)}
                      className="btn-secondary"
                    >
                      Back to Plans
                    </button>
                    <button className="btn-primary">
                      Purchase Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading overlay for plan details */}
        {planDetailsLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex flex-col items-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-r-transparent mb-4"></div>
                <p className="text-gray-700">Loading plan details...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecommendationPage