import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TestPage() {
  const [testResults, setTestResults] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const runTest = async (testName: string, url: string, options: any = {}) => {
    try {
      setTestResults(prev => prev + `\n🔧 Testing ${testName}...`);
      const response = await fetch(url, options);
      const data = await response.json();
      setTestResults(prev => prev + `\n✅ ${testName}: ${response.status} - ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setTestResults(prev => prev + `\n❌ ${testName} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults('Starting deployment diagnostics...\n');

    // Test 1: Check if buttons API is accessible
    await runTest('Get Buttons API', '/api/buttons');

    // Test 2: Check debug buttons endpoint
    await runTest('Debug Buttons API', '/api/debug-buttons');

    // Test 3: Test database connection
    await runTest('Database Test', '/api/test-db');

    // Test 4: Test a simple button creation (without image)
    await runTest('Test Button Creation', '/api/buttons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: 'TEST-' + Date.now(),
        imageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', // 1x1 transparent PNG
        link: 'https://example.com'
      })
    });

    setTestResults(prev => prev + '\n\n🏁 Diagnostics complete!');
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">🔧 Deployment Test Page</h1>
        <p className="mb-4 text-gray-300">
          This page helps diagnose issues with your deployed website. Click "Run All Tests" to check if the APIs are working.
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={runAllTests} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Running Tests...' : 'Run All Tests'}
            </Button>
            <Button 
              onClick={clearResults} 
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Clear Results
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Test Results:</Label>
            <textarea
              value={testResults}
              readOnly
              className="w-full h-96 p-3 bg-black text-green-400 font-mono text-sm border border-gray-600 rounded"
              placeholder="Test results will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}