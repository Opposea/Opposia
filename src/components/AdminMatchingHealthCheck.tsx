import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Activity, CheckCircle, Loader2, XCircle } from 'lucide-react';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  duration: number;
}

type TargetSource = 'discover' | 'fallback' | 'none';

const AdminMatchingHealthCheck = () => {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { user } = useAuth();

  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const summary = useMemo(() => {
    const passCount = results.filter(r => r.passed).length;
    const failCount = results.filter(r => !r.passed).length;
    return { passCount, failCount };
  }, [results]);

  if (adminLoading || !isAdmin) return null;

  const push = (arr: TestResult[], r: TestResult) => arr.push(r);

  const runHealthChecks = async () => {
    if (!user?.id) return;

    setRunning(true);
    setResults([]);

    const newResults: TestResult[] = [];

    // 1) Current user profile sanity via RPC
    const tProfileStart = performance.now();
    let viewerGender: string | null = null;
    let viewerOrientation: string | null = null;
    let viewerAgeVerified: boolean | null = null;

    try {
      const { data, error } = await supabase.rpc('get_current_user_profile');
      const duration = Math.round(performance.now() - tProfileStart);

      if (error) {
        push(newResults, {
          name: 'get_current_user_profile',
          passed: false,
          message: `Error: ${error.message}`,
          duration,
        });
      } else {
        viewerGender = data?.gender ?? null;
        viewerOrientation = data?.sexual_orientation ?? null;
        viewerAgeVerified = data?.age_verified ?? null;

        const missing: string[] = [];
        if (!viewerGender) missing.push('gender');
        if (!viewerOrientation) missing.push('sexual_orientation');

        push(newResults, {
          name: 'get_current_user_profile',
          passed: missing.length === 0,
          message:
            missing.length === 0
              ? `gender=${viewerGender}, sexual_orientation=${viewerOrientation}, age_verified=${String(viewerAgeVerified)}`
              : `Missing: ${missing.join(', ')} (gender=${String(viewerGender)}, sexual_orientation=${String(viewerOrientation)})`,
          duration,
        });
      }
    } catch (e: any) {
      push(newResults, {
        name: 'get_current_user_profile',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - tProfileStart),
      });
    }

    // 2) UI gate: can this user connect?
    const tGateStart = performance.now();
    try {
      const duration = Math.round(performance.now() - tGateStart);
      const canConnect = Boolean(isAdmin || viewerAgeVerified);

      push(newResults, {
        name: 'Connect gate (UI)',
        passed: canConnect,
        message: canConnect
          ? 'Connect is enabled (admin or age_verified=true)'
          : 'Connect is disabled because age_verified=false (users can browse but cannot connect)',
        duration,
      });
    } catch (e: any) {
      push(newResults, {
        name: 'Connect gate (UI)',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - tGateStart),
      });
    }

    // 3) Discover RPC
    const tDiscoverStart = performance.now();
    let targetUserId: string | null = null;
    let targetSource: TargetSource = 'none';

    try {
      const { data, error } = await supabase.rpc('get_discoverable_profiles');
      const duration = Math.round(performance.now() - tDiscoverStart);

      if (error) {
        push(newResults, {
          name: 'get_discoverable_profiles',
          passed: false,
          message: `Error: ${error.message}`,
          duration,
        });
      } else {
        const count = data?.length ?? 0;
        targetUserId = count > 0 ? data![0].user_id : null;
        targetSource = count > 0 ? 'discover' : 'none';

        push(newResults, {
          name: 'get_discoverable_profiles',
          passed: true,
          message: `Returned ${count} profile(s)${targetUserId ? ` • sample target=${targetUserId}` : ''}`,
          duration,
        });
      }
    } catch (e: any) {
      push(newResults, {
        name: 'get_discoverable_profiles',
        passed: false,
        message: `Exception: ${e.message}`,
        duration: Math.round(performance.now() - tDiscoverStart),
      });
    }

    // 4) If Discover is empty, pick ANY other user as a target for function tests
    if (!targetUserId) {
      const tPickStart = performance.now();
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('user_id')
          .neq('user_id', user.id)
          .limit(1)
          .single();

        const duration = Math.round(performance.now() - tPickStart);

        if (error) {
          push(newResults, {
            name: 'Pick target user',
            passed: false,
            message: `Error: ${error.message}`,
            duration,
          });
        } else {
          targetUserId = data?.user_id ?? null;
          targetSource = targetUserId ? 'fallback' : 'none';
          push(newResults, {
            name: 'Pick target user',
            passed: Boolean(targetUserId),
            message: targetUserId ? `Picked target=${targetUserId}` : 'No other users found',
            duration,
          });
        }
      } catch (e: any) {
        push(newResults, {
          name: 'Pick target user',
          passed: false,
          message: `Exception: ${e.message}`,
          duration: Math.round(performance.now() - tPickStart),
        });
      }
    }

    // 5) are_users_compatible (must be true for any profile returned by Discover)
    if (targetUserId) {
      const tCompatStart = performance.now();
      try {
        const { data, error } = await supabase.rpc('are_users_compatible', {
          user_a_id: user.id,
          user_b_id: targetUserId,
        });

        const duration = Math.round(performance.now() - tCompatStart);

        if (error) {
          push(newResults, {
            name: 'are_users_compatible',
            passed: false,
            message: `Error: ${error.message}`,
            duration,
          });
        } else {
          const isCompatible = Boolean(data);
          const shouldBeTrue = targetSource === 'discover';

          push(newResults, {
            name: 'are_users_compatible',
            passed: shouldBeTrue ? isCompatible : true,
            message: shouldBeTrue
              ? `Target came from Discover → expected true, got ${String(isCompatible)}`
              : `Result for test target: ${String(isCompatible)}`,
            duration,
          });
        }
      } catch (e: any) {
        push(newResults, {
          name: 'are_users_compatible',
          passed: false,
          message: `Exception: ${e.message}`,
          duration: Math.round(performance.now() - tCompatStart),
        });
      }

      // 6) check_one_way_compatibility using REAL stored values
      const tOneWayStart = performance.now();
      try {
        const { data: targetProfile, error: targetProfileError } = await supabase
          .from('profiles')
          .select('gender, sexual_orientation')
          .eq('user_id', targetUserId)
          .single();

        if (targetProfileError) {
          push(newResults, {
            name: 'check_one_way_compatibility',
            passed: false,
            message: `Could not read target profile: ${targetProfileError.message}`,
            duration: Math.round(performance.now() - tOneWayStart),
          });
        } else {
          const { data, error } = await supabase.rpc('check_one_way_compatibility', {
            viewer_gender: viewerGender ?? '',
            viewer_orientation: viewerOrientation ?? '',
            target_gender: targetProfile?.gender ?? '',
            target_orientation: targetProfile?.sexual_orientation ?? '',
          });

          const duration = Math.round(performance.now() - tOneWayStart);

          if (error) {
            push(newResults, {
              name: 'check_one_way_compatibility',
              passed: false,
              message: `Error: ${error.message}`,
              duration,
            });
          } else {
            push(newResults, {
              name: 'check_one_way_compatibility',
              passed: true,
              message: `viewer(${viewerGender}/${viewerOrientation}) → target(${targetProfile?.gender}/${targetProfile?.sexual_orientation}) = ${String(data)}`,
              duration,
            });
          }
        }
      } catch (e: any) {
        push(newResults, {
          name: 'check_one_way_compatibility',
          passed: false,
          message: `Exception: ${e.message}`,
          duration: Math.round(performance.now() - tOneWayStart),
        });
      }

      // 7) calculate_compatibility_score
      const tScoreStart = performance.now();
      try {
        const { data, error } = await supabase.rpc('calculate_compatibility_score', {
          user1_id: user.id,
          user2_id: targetUserId,
        });

        const duration = Math.round(performance.now() - tScoreStart);

        if (error) {
          push(newResults, {
            name: 'calculate_compatibility_score',
            passed: false,
            message: `Error: ${error.message}`,
            duration,
          });
        } else {
          push(newResults, {
            name: 'calculate_compatibility_score',
            passed: true,
            message: `Score = ${String(data)}%`,
            duration,
          });
        }
      } catch (e: any) {
        push(newResults, {
          name: 'calculate_compatibility_score',
          passed: false,
          message: `Exception: ${e.message}`,
          duration: Math.round(performance.now() - tScoreStart),
        });
      }
    } else {
      push(newResults, {
        name: 'Compatibility tests',
        passed: false,
        message: 'No target user available to test compatibility functions against.',
        duration: 0,
      });
    }

    setResults(newResults);
    setRunning(false);
  };

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
        <Button onClick={runHealthChecks} disabled={running || !user?.id} className="w-full">
          {running ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            'Run Health Checks'
          )}
        </Button>

        {!user?.id && (
          <p className="text-sm text-muted-foreground">
            Sign in to run health checks.
          </p>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            <div className="flex gap-4 text-sm">
              <span className="text-green-600 font-medium">✓ {summary.passCount} passed</span>
              <span className="text-red-600 font-medium">✗ {summary.failCount} failed</span>
            </div>

            <div className="space-y-2">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-mono text-sm font-medium">{result.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{result.duration}ms</span>
                  </div>
                  <p className={`mt-1 text-sm ml-6 ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
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
