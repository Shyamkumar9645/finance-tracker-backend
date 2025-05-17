// backend-test.js
// This is a simple script to test if your backend is properly configured

require('dotenv').config();
const fetch = require('node-fetch');

const API_URL = process.env.API_URL || 'https://backend1223.netlify.app/api';
const FRONTEND_URL = process.env.CLIENT_URL || 'https://tiny-semifreddo-fdd2a6.netlify.app/.netlify/functions';

// Test endpoints
const endpoints = [
  { url: `${API_URL}/health`, method: 'GET' },
  { url: `${API_URL}/auth/login`, method: 'OPTIONS' },
];

// Test CORS headers
const testEndpoint = async (endpoint) => {
  console.log(`Testing ${endpoint.method} ${endpoint.url}...`);

  try {
    const headers = {
      'Origin': FRONTEND_URL,
    };

    // For OPTIONS requests, add the necessary CORS headers
    if (endpoint.method === 'OPTIONS') {
      headers['Access-Control-Request-Method'] = 'POST';
      headers['Access-Control-Request-Headers'] = 'Content-Type';
    }

    const response = await fetch(endpoint.url, {
      method: endpoint.method,
      headers,
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    // Log response headers
    const responseHeaders = {};
    response.headers.forEach((value, name) => {
      responseHeaders[name] = value;
    });

    console.log('Response Headers:');
    console.log(JSON.stringify(responseHeaders, null, 2));

    // Check CORS headers
    if (!response.headers.get('access-control-allow-origin')) {
      console.error('⚠️ Missing Access-Control-Allow-Origin header!');
    } else if (response.headers.get('access-control-allow-origin') === '*' &&
              response.headers.get('access-control-allow-credentials') === 'true') {
      console.error('⚠️ Using wildcard origin with credentials - this will cause CORS errors!');
    } else {
      console.log('✅ CORS headers look good');
    }

    // Check if the origin matches the frontend
    if (response.headers.get('access-control-allow-origin') !== FRONTEND_URL &&
        response.headers.get('access-control-allow-origin') !== '*') {
      console.error(`⚠️ Origin mismatch: expected ${FRONTEND_URL}, got ${response.headers.get('access-control-allow-origin')}`);
    }

    // Try to parse response body
    try {
      const body = await response.text();
      if (body) {
        try {
          const json = JSON.parse(body);
          console.log('Response Body:');
          console.log(JSON.stringify(json, null, 2));
        } catch (e) {
          console.log('Response Body (text):');
          console.log(body);
        }
      } else {
        console.log('Empty response body');
      }
    } catch (e) {
      console.error('Error reading response body:', e);
    }

    console.log('\n' + '-'.repeat(50) + '\n');
  } catch (error) {
    console.error(`❌ Error testing ${endpoint.url}: ${error.message}`);
    console.error('\n' + '-'.repeat(50) + '\n');
  }
};

// Run tests
const runTests = async () => {
  console.log('Running backend CORS tests...');
  console.log(`API URL: ${API_URL}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
  console.log('\n' + '-'.repeat(50) + '\n');

  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }

  console.log('Tests completed.');
};

runTests();