/**
 * Insurance API Service
 * This service handles integration with health insurance APIs in India
 * to fetch real-time insurance plan data for recommendations.
 */

// API configuration
const API_CONFIG = {
  // Base URLs for different insurance providers
  // These would be replaced with actual API endpoints when available
  baseUrls: {
    hdfc: 'https://api.hdfcergo.com/insurance/v1',
    bajaj: 'https://api.bajajallianz.com/insurance/v1',
    care: 'https://api.careinsurance.com/v1',
    goDigit: 'https://api.godigit.com/v1',
    icici: 'https://api.icicilombard.com/api/v1'
  },
  // API keys would be stored in environment variables in production
  apiKeys: {
    hdfc: import.meta.env.VITE_HDFC_API_KEY || 'demo-key',
    bajaj: import.meta.env.VITE_BAJAJ_API_KEY || 'demo-key',
    care: import.meta.env.VITE_CARE_API_KEY || 'demo-key',
    goDigit: import.meta.env.VITE_GODIGIT_API_KEY || 'demo-key',
    icici: import.meta.env.VITE_ICICI_API_KEY || 'demo-key'
  }
};

/**
 * Fetch health insurance plans based on user preferences
 * @param {Object} userPreferences - User's insurance preferences
 * @returns {Promise<Array>} - Array of insurance plans
 */
export const fetchInsurancePlans = async (userPreferences) => {
  try {
    // In a production environment, we would make actual API calls to insurance providers
    // For now, we'll simulate API responses with a delay
    
    console.log('Fetching insurance plans with preferences:', userPreferences);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return mock data that mimics real API response
    // In production, this would be replaced with actual API calls
    return getMockInsurancePlans(userPreferences);
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    throw new Error('Failed to fetch insurance plans. Please try again later.');
  }
};

/**
 * Get detailed information about a specific insurance plan
 * @param {string} planId - ID of the insurance plan
 * @param {string} provider - Insurance provider name
 * @returns {Promise<Object>} - Detailed plan information
 */
export const getInsurancePlanDetails = async (planId, provider) => {
  try {
    // In production, we would make an API call to get detailed plan information
    console.log(`Fetching details for plan ${planId} from ${provider}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, return mock data
    const allPlans = getMockInsurancePlans({});
    const plan = allPlans.find(p => p.id.toString() === planId.toString());
    
    if (!plan) {
      throw new Error('Plan not found');
    }
    
    // Add INR values to the plan
    if (!plan.monthlyPremiumINR) {
      plan.monthlyPremiumINR = convertUSDtoINR(plan.monthlyPremium);
    }
    if (!plan.coverageINR) {
      plan.coverageINR = convertUSDtoINR(plan.coverage);
    }
    
    return {
      ...plan,
      // Add additional details that would come from a detailed API call
      detailedBenefits: [
        ...plan.benefits,
        'Access to wellness programs',
        'Cashless treatment at network hospitals',
        'Tax benefits under Section 80D'
      ],
      waitingPeriods: {
        general: '30 days',
        preExisting: plan.features['Pre-existing Conditions'].replace('Covered after ', ''),
        maternity: plan.features['Maternity Coverage'] === 'Included' ? '9 months' : 'Not covered'
      },
      exclusions: [
        'Cosmetic treatments',
        'Self-inflicted injuries',
        'Experimental treatments',
        'Non-allopathic treatments (unless specified)'
      ]
    };
  } catch (error) {
    console.error('Error fetching plan details:', error);
    throw new Error('Failed to fetch plan details. Please try again later.');
  }
};

/**
 * Submit user selection for an insurance plan
 * @param {Object} userData - User's personal information
 * @param {Object} selectedPlan - The selected insurance plan
 * @returns {Promise<Object>} - Submission confirmation
 */
export const submitPlanSelection = async (userData, selectedPlan) => {
  try {
    // In production, we would submit this data to the insurance provider's API
    console.log('Submitting plan selection:', { userData, selectedPlan });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock successful submission response
    return {
      success: true,
      referenceId: `REF-${Date.now().toString().substring(7)}`,
      message: 'Your insurance plan selection has been submitted successfully.',
      nextSteps: [
        'Our team will review your application',
        'You will receive a confirmation email within 24 hours',
        'A representative may contact you for additional information if needed'
      ]
    };
  } catch (error) {
    console.error('Error submitting plan selection:', error);
    throw new Error('Failed to submit your selection. Please try again later.');
  }
};

/**
 * Helper function to generate mock insurance plans based on user preferences
 * This simulates what would be returned from real insurance APIs
 * @param {Object} preferences - User preferences
 * @returns {Array} - Array of insurance plans
 */
const getMockInsurancePlans = (preferences) => {
  // In a real implementation, we would use the preferences to filter plans
  // from the actual API responses
  
  // Mock data based on real insurance offerings in India
  return [
    {
      id: 1,
      name: 'Premium Health Plus',
      provider: 'HDFC ERGO Health Insurance',
      monthlyPremium: 2999,
      coverage: 500000,
      benefits: [
        'Comprehensive hospital coverage',
        'No waiting period for accidents',
        'Covers pre-existing conditions after 2 years',
        'Free annual health checkup',
        '24/7 telemedicine support'
      ],
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
      },
      rating: 4.8,
      apiSource: 'hdfc'
    },
    {
      id: 2,
      name: 'Care Health Shield',
      provider: 'Care Health Insurance',
      monthlyPremium: 1999,
      coverage: 300000,
      benefits: [
        'Basic hospital coverage',
        '3 months waiting period for accidents',
        'Covers pre-existing conditions after 3 years',
        'Discounted health checkups',
        'Emergency helpline'
      ],
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
      },
      rating: 4.5,
      apiSource: 'care'
    },
    {
      id: 3,
      name: 'Bajaj Allianz Health Guard',
      provider: 'Bajaj Allianz General Insurance',
      monthlyPremium: 1499,
      coverage: 200000,
      benefits: [
        'Essential hospital coverage',
        '6 months waiting period for accidents',
        'Covers pre-existing conditions after 4 years',
        'Basic health checkup',
        'Customer support during business hours'
      ],
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
      },
      rating: 4.2,
      apiSource: 'bajaj'
    },
    {
      id: 4,
      name: 'ICICI Lombard Complete Health',
      provider: 'ICICI Lombard General Insurance',
      monthlyPremium: 2499,
      coverage: 400000,
      benefits: [
        'Comprehensive hospital coverage',
        'No waiting period for accidents',
        'Covers pre-existing conditions after 2.5 years',
        'Annual health checkup included',
        '24/7 customer support'
      ],
      features: {
        'Hospital Room': 'Private Room',
        'Pre-existing Conditions': 'Covered after 2.5 years',
        'Annual Health Checkup': 'Included',
        'Maternity Coverage': 'Included with sub-limits',
        'Dental Coverage': 'Partial Coverage',
        'Vision Coverage': 'Partial Coverage',
        'Mental Health Coverage': 'Included',
        'Prescription Drugs': 'Covered with limits',
        'Network Hospitals': '4500+',
        'Claim Settlement Ratio': '96%'
      },
      rating: 4.6,
      apiSource: 'icici'
    },
    {
      id: 5,
      name: 'Go Digit Health Insurance',
      provider: 'Go Digit General Insurance',
      monthlyPremium: 1799,
      coverage: 250000,
      benefits: [
        'Digital-first health insurance',
        '2 months waiting period for accidents',
        'Covers pre-existing conditions after 3 years',
        'Digital health checkup vouchers',
        'App-based claim processing'
      ],
      features: {
        'Hospital Room': 'Semi-Private Room',
        'Pre-existing Conditions': 'Covered after 3 years',
        'Annual Health Checkup': 'Digital Vouchers',
        'Maternity Coverage': 'Optional Add-on',
        'Dental Coverage': 'Optional Add-on',
        'Vision Coverage': 'Optional Add-on',
        'Mental Health Coverage': 'Basic Coverage',
        'Prescription Drugs': 'Partial Coverage',
        'Network Hospitals': '3500+',
        'Claim Settlement Ratio': '94%'
      },
      rating: 4.4,
      apiSource: 'goDigit'
    }
  ];
};

/**
 * Get a list of available insurance providers
 * @returns {Promise<Array>} - Array of insurance providers
 */
export const getInsuranceProviders = async () => {
  try {
    // In production, we would fetch this from an API
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: 'hdfc', name: 'HDFC ERGO Health Insurance', logo: 'hdfc-logo.png' },
      { id: 'care', name: 'Care Health Insurance', logo: 'care-logo.png' },
      { id: 'bajaj', name: 'Bajaj Allianz General Insurance', logo: 'bajaj-logo.png' },
      { id: 'icici', name: 'ICICI Lombard General Insurance', logo: 'icici-logo.png' },
      { id: 'goDigit', name: 'Go Digit General Insurance', logo: 'godigit-logo.png' }
    ];
  } catch (error) {
    console.error('Error fetching insurance providers:', error);
    throw new Error('Failed to fetch insurance providers. Please try again later.');
  }
};