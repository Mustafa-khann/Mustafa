// Error handling utility
// Centralized error handling and logging

import { DEBUG } from '../config/environment';

class ErrorHandler {
  constructor() {
    this.errors = [];
  }

  // Log error with context
  logError(error, context = {}) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.errors.push(errorInfo);

    if (DEBUG) {
      console.error('Error logged:', errorInfo);
    }

    // In production, you might want to send this to an error tracking service
    // like Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorInfo);
    }
  }

  // Send error to external service
  sendToErrorService(errorInfo) {
    // Implementation for sending to error tracking service
    // Example: Sentry, LogRocket, etc.
    console.log('Sending error to tracking service:', errorInfo);
  }

  // Handle API errors
  handleApiError(error, endpoint) {
    const context = {
      type: 'API_ERROR',
      endpoint,
      status: error.status,
      statusText: error.statusText,
    };

    this.logError(error, context);
  }

  // Handle component errors
  handleComponentError(error, componentName) {
    const context = {
      type: 'COMPONENT_ERROR',
      component: componentName,
    };

    this.logError(error, context);
  }

  // Get all logged errors
  getErrors() {
    return this.errors;
  }

  // Clear errors
  clearErrors() {
    this.errors = [];
  }

  // Create user-friendly error message
  getUserFriendlyMessage(error) {
    if (error.status === 404) {
      return 'The requested resource was not found.';
    }
    if (error.status === 500) {
      return 'Something went wrong on our end. Please try again later.';
    }
    if (error.status === 403) {
      return 'You do not have permission to access this resource.';
    }
    if (error.status === 401) {
      return 'Please log in to access this resource.';
    }

    return 'An unexpected error occurred. Please try again.';
  }
}

export const errorHandler = new ErrorHandler();
export default errorHandler;
