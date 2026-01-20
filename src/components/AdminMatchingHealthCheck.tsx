import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, XCircle, Loader2, Activity } from 'lucide-react';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  duration: number;
}

const AdminMatchingHealthCheck = () => {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { user } = useAuth();
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  if (adminLoading || !isAdmin) return null;

  const runHealthChecks = async () => {
    setRunning(true);
    setResults([]);
    const newResults: TestResult[] = [];

    // Test 1: get_discoverable_profiles (no params per types)
    const t1Start = performance.now();
    try {
      const { data, error } = await supabase.rpc('get_discoverable_profiles');
      const duration = Math.round(performance.now() - t1Start);
      
      if (error) {
        newResults.push({
          name: 'get_discoverable_profiles',
          passed: false,
          message: `Error: ${error.message}`,
          duration
        });
      } else {
        newResults.push({
          name: 'get_discoverable_profiles',
          passed: true,
          message: `Returned ${data?.length ?? 0} profiles`,
          duration
        });
      }
    } catch (e: any) {
      newResults.push({
        name: 'get_discoverable_profiles',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - t1Start)
      });
    }

    // Test 2: are_users_compatible
    const t2Start = performance.now();
    try {
      // Get another user to test compatibility with
      const { data: otherUser } = await supabase
        .from('profiles')
        .select('user_id')
        .neq('user_id', user?.id)
        .limit(1)
        .single();

      if (otherUser) {
        const { data, error } = await supabase.rpc('are_users_compatible', {
          user_a_id: user?.id || '',
          user_b_id: otherUser.user_id
        });
        const duration = Math.round(performance.now() - t2Start);

        if (error) {
          newResults.push({
            name: 'are_users_compatible',
            passed: false,
            message: `Error: ${error.message}`,
            duration
          });
        } else {
          newResults.push({
            name: 'are_users_compatible',
            passed: true,
            message: `Function works. Result: ${data ? 'compatible' : 'not compatible'}`,
            duration
          });
        }
      } else {
        newResults.push({
          name: 'are_users_compatible',
          passed: true,
          message: 'No other users to test with',
          duration: Math.round(performance.now() - t2Start)
        });
      }
    } catch (e: any) {
      newResults.push({
        name: 'are_users_compatible',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - t2Start)
      });
    }

    // Test 3: check_one_way_compatibility (uses viewer/target gender + orientation)
    const t3Start = performance.now();
    try {
      const { data, error } = await supabase.rpc('check_one_way_compatibility', {
        viewer_gender: 'male',
        viewer_orientation: 'woman',
        target_gender: 'female',
        target_orientation: 'man'
      });
      const duration = Math.round(performance.now() - t3Start);

      if (error) {
        newResults.push({
          name: 'check_one_way_compatibility',
          passed: false,
          message: `Error: ${error.message}`,
          duration
        });
      } else {
        newResults.push({
          name: 'check_one_way_compatibility',
          passed: data === true,
          message: data === true 
            ? 'Correctly returns true for straight male↔female' 
            : `Unexpected result: ${data}`,
          duration
        });
      }
    } catch (e: any) {
      newResults.push({
        name: 'check_one_way_compatibility',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - t3Start)
      });
    }

    // Test 4: Verify user's own profile exists with gender + sexual_orientation
    const t4Start = performance.now();
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('gender, sexual_orientation')
        .eq('user_id', user?.id || '')
        .single();
      const duration = Math.round(performance.now() - t4Start);

      if (error) {
        newResults.push({
          name: 'Current user profile',
          passed: false,
          message: `Error: ${error.message}`,
          duration
        });
      } else if (!data.gender || !data.sexual_orientation) {
        newResults.push({
          name: 'Current user profile',
          passed: false,
          message: `Missing fields - gender: ${data.gender || 'null'}, sexual_orientation: ${data.sexual_orientation || 'null'}`,
          duration
        });
      } else {
        newResults.push({
          name: 'Current user profile',
          passed: true,
          message: `gender: ${data.gender}, sexual_orientation: ${data.sexual_orientation}`,
          duration
        });
      }
    } catch (e: any) {
      newResults.push({
        name: 'Current user profile',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - t4Start)
      });
    }

    // Test 5: calculate_compatibility_score
    const t5Start = performance.now();
    try {
      const { data: otherUser } = await supabase
        .from('profiles')
        .select('user_id')
        .neq('user_id', user?.id)
        .limit(1)
        .single();

      if (otherUser) {
        const { data, error } = await supabase.rpc('calculate_compatibility_score', {
          user1_id: user?.id || '',
          user2_id: otherUser.user_id
        });
        const duration = Math.round(performance.now() - t5Start);

        if (error) {
          newResults.push({
            name: 'calculate_compatibility_score',
            passed: false,
            message: `Error: ${error.message}`,
            duration
          });
        } else {
          newResults.push({
            name: 'calculate_compatibility_score',
            passed: true,
            message: `Function works. Score: ${data}%`,
            duration
          });
        }
      } else {
        newResults.push({
          name: 'calculate_compatibility_score',
          passed: true,
          message: 'No other users to test with',
          duration: Math.round(performance.now() - t5Start)
        });
      }
    } catch (e: any) {
      newResults.push({
        name: 'calculate_compatibility_score',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - t5Start)
      });
    }

    setResults(newResults);
    setRunning(false);
  };

  const passCount = results.filter(r => r.passed).length;
  const failCount = results.filter(r => !r.passed).length;

  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-orange-600" />
          Matching Health Check
          <Badge variant="outline" className="ml-2 text-xs">Admin Only</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runHealthChecks} 
          disabled={running}
          className="w-full"
        >
          {running ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            'Run Health Checks'
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <div className="flex gap-4 text-sm">
              <span className="text-green-600 font-medium">✓ {passCount} passed</span>
              <span className="text-red-600 font-medium">✗ {failCount} failed</span>
            </div>

            <div className="space-y-2">
              {results.map((result, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    result.passed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-mono text-sm font-medium">
                        {result.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {result.duration}ms
                    </span>
                  </div>
                  <p className={`mt-1 text-sm ml-6 ${
                    result.passed ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminMatchingHealthCheck;
