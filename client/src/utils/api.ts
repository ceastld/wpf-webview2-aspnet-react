/**
 * API utility functions with automatic URL prefix handling
 */

import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

// Get the base API URL from environment variables
const getBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

/**
 * Enhanced fetch function that automatically prepends the API base URL
 * @param {string} endpoint - The API endpoint (e.g., '/api/demo', '/weatherforecast')
 * @param {RequestInit} options - Fetch options (same as native fetch)
 * @returns {Promise<Response>} - Fetch response
 */
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
  
  return fetch(url, options);
};

/**
 * Enhanced fetch function that automatically prepends the API base URL and returns JSON
 * @param {string} endpoint - The API endpoint
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<T>} - Parsed JSON response
 */
export const apiFetchJson = async <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await apiFetch(endpoint, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

/**
 * GET request helper
 * @param {string} endpoint - The API endpoint
 * @param {RequestInit} options - Additional fetch options
 * @returns {Promise<T>} - Parsed JSON response
 */
export const apiGet = <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  return apiFetchJson<T>(endpoint, { ...options, method: 'GET' });
};

/**
 * POST request helper
 * @param {string} endpoint - The API endpoint
 * @param {any} data - Request body data
 * @param {RequestInit} options - Additional fetch options
 * @returns {Promise<T>} - Parsed JSON response
 */
export const apiPost = <T = unknown>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> => {
  return apiFetchJson<T>(endpoint, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
  });
};

/**
 * PUT request helper
 * @param {string} endpoint - The API endpoint
 * @param {any} data - Request body data
 * @param {RequestInit} options - Additional fetch options
 * @returns {Promise<T>} - Parsed JSON response
 */
export const apiPut = <T = unknown>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> => {
  return apiFetchJson<T>(endpoint, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request helper
 * @param {string} endpoint - The API endpoint
 * @param {RequestInit} options - Additional fetch options
 * @returns {Promise<T>} - Parsed JSON response
 */
export const apiDelete = async <T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await apiFetch(endpoint, { ...options, method: 'DELETE' });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // Check if response has content
  const text = await response.text();
  if (!text) {
    return undefined as T;
  }
  
  return JSON.parse(text);
};

/**
 * Build SignalR connection
 * @param {string} hubName - The hub name (e.g., 'clockHub', 'chatHub')
 * @returns {HubConnection} - SignalR connection
 */
export const buildConnection = (hubName: string): HubConnection => {
  const baseUrl = getBaseUrl();
  const hubUrl = `${baseUrl}/${hubName}`;
  
  return new HubConnectionBuilder()
    .withUrl(hubUrl)
    .withAutomaticReconnect()
    .build();
};
