import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FormPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    age: '',
    location: '',
    gender: '',
    // Health Details
    healthConditions: [],
    medications: '',
    lifestyle: '',
    // Insurance Needs
    coverageType: '',
    familyCoverage: false,
    preferredHospitals: '',
    // Budget
    monthlyBudget: '',
    paymentFrequency: 'monthly',
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else handleSubmit()
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    navigate('/recommendations', { state: { formData } })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div>
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="form-input"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                className="form-input"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">Gender</label>
              <select
                className="form-input"
                value={formData.gender}
                onChange={(e) => updateFormData('gender', e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Health Details</h2>
            <div>
              <label className="form-label">Health Conditions</label>
              <div className="space-y-2">
                {['Diabetes', 'Hypertension', 'Heart Disease', 'None'].map((condition) => (
                  <label key={condition} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.includes(condition)}
                      onChange={(e) => {
                        const updatedConditions = e.target.checked
                          ? [...formData.healthConditions, condition]
                          : formData.healthConditions.filter(c => c !== condition)
                        updateFormData('healthConditions', updatedConditions)
                      }}
                      className="form-checkbox"
                    />
                    <span>{condition}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="medications">Current Medications</label>
              <textarea
                id="medications"
                className="form-input"
                value={formData.medications}
                onChange={(e) => updateFormData('medications', e.target.value)}
                rows="3"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Insurance Needs</h2>
            <div>
              <label className="form-label">Coverage Type</label>
              <select
                className="form-input"
                value={formData.coverageType}
                onChange={(e) => updateFormData('coverageType', e.target.value)}
                required
              >
                <option value="">Select coverage type</option>
                <option value="basic">Basic Coverage</option>
                <option value="standard">Standard Coverage</option>
                <option value="premium">Premium Coverage</option>
              </select>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.familyCoverage}
                  onChange={(e) => updateFormData('familyCoverage', e.target.checked)}
                  className="form-checkbox"
                />
                <span>Include family coverage</span>
              </label>
            </div>
            <div>
              <label className="form-label" htmlFor="preferredHospitals">Preferred Hospitals</label>
              <input
                type="text"
                id="preferredHospitals"
                className="form-input"
                value={formData.preferredHospitals}
                onChange={(e) => updateFormData('preferredHospitals', e.target.value)}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Budget Information</h2>
            <div>
              <label className="form-label" htmlFor="monthlyBudget">Monthly Budget</label>
              <input
                type="number"
                id="monthlyBudget"
                className="form-input"
                value={formData.monthlyBudget}
                onChange={(e) => updateFormData('monthlyBudget', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">Payment Frequency</label>
              <select
                className="form-input"
                value={formData.paymentFrequency}
                onChange={(e) => updateFormData('paymentFrequency', e.target.value)}
                required
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {stepNumber}
              </div>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary ml-auto"
              >
                {step === 4 ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormPage