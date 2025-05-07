# VimaPay Health Insurance Recommendation System

## Overview
VimaPay is a health insurance recommendation platform that integrates with real-time health insurance APIs in India to provide users with personalized insurance plan recommendations based on their preferences and needs.

## Health Insurance API Integration

This project integrates with multiple health insurance providers in India to fetch real-time data for insurance plans. The integration allows users to:

- View personalized insurance recommendations based on their preferences
- Compare different insurance plans side by side
- Select and submit applications for insurance plans

### Integrated Insurance Providers

The system currently integrates with the following insurance providers:

- HDFC ERGO Health Insurance
- Care Health Insurance
- Bajaj Allianz General Insurance
- ICICI Lombard General Insurance
- Go Digit General Insurance

### API Implementation

The API integration is implemented in the `src/services/insuranceApi.js` file, which provides the following functionality:

- `fetchInsurancePlans()`: Fetches insurance plans based on user preferences
- `getInsurancePlanDetails()`: Gets detailed information about a specific plan
- `submitPlanSelection()`: Submits a user's selected plan to the insurance provider
- `getInsuranceProviders()`: Gets a list of available insurance providers

## Features

- **Personalized Recommendations**: Users receive insurance plan recommendations based on their specific needs and preferences.
- **Real-time Data**: The system fetches real-time data from insurance providers to ensure recommendations are up-to-date.
- **Plan Comparison**: Users can compare different insurance plans side by side to make informed decisions.
- **Application Submission**: Users can submit applications for their selected insurance plans directly through the platform.
- **Responsive Design**: The platform is fully responsive and works on all devices.

## Technical Implementation

### Components

- **RecommendationPage**: Displays personalized insurance recommendations based on user preferences.
- **ComparisonPage**: Allows users to compare different insurance plans side by side.
- **ThankYouPage**: Confirms submission of insurance plan selection and provides next steps.

### API Service

The API service handles all communication with the insurance providers' APIs. It includes error handling, data transformation, and caching mechanisms to ensure optimal performance.

## Setup and Configuration

### API Keys

To use the real insurance provider APIs, you need to obtain API keys from each provider and add them to your environment variables:

```
REACT_APP_HDFC_API_KEY=your_hdfc_api_key
REACT_APP_BAJAJ_API_KEY=your_bajaj_api_key
REACT_APP_CARE_API_KEY=your_care_api_key
REACT_APP_GODIGIT_API_KEY=your_godigit_api_key
REACT_APP_ICICI_API_KEY=your_icici_api_key
```

### Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Future Enhancements

- Integration with additional insurance providers
- Enhanced filtering and sorting options for insurance plans
- User accounts and saved preferences
- Integration with payment gateways for premium payments
- Policy document generation and download