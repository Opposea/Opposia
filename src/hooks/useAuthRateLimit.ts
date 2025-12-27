import { useState, useCallback } from 'react';

interface RateLimitState {
  attempts: number;
  lockoutUntil: number | null;
  lastAttemptTime: number;
}

const STORAGE_KEY = 'auth_rate_limit';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW_MS = 60 * 1000; // 1 minute window for counting attempts

const getStoredState = (): RateLimitState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      // Reset attempts if window has passed
      if (Date.now() - state.lastAttemptTime > ATTEMPT_WINDOW_MS) {
        return { attempts: 0, lockoutUntil: null, lastAttemptTime: 0 };
      }
      return state;
    }
  } catch {
    // Ignore parse errors
  }
  return { attempts: 0, lockoutUntil: null, lastAttemptTime: 0 };
};

const saveState = (state: RateLimitState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
};

export const useAuthRateLimit = () => {
  const [state, setState] = useState<RateLimitState>(getStoredState);

  const getRemainingLockoutTime = useCallback((): number => {
    const currentState = getStoredState();
    if (currentState.lockoutUntil && currentState.lockoutUntil > Date.now()) {
      return Math.ceil((currentState.lockoutUntil - Date.now()) / 1000);
    }
    return 0;
  }, []);

  const isLocked = useCallback((): boolean => {
    const currentState = getStoredState();
    if (currentState.lockoutUntil && currentState.lockoutUntil > Date.now()) {
      return true;
    }
    // Clear lockout if expired
    if (currentState.lockoutUntil && currentState.lockoutUntil <= Date.now()) {
      const newState = { attempts: 0, lockoutUntil: null, lastAttemptTime: 0 };
      saveState(newState);
      setState(newState);
    }
    return false;
  }, []);

  const recordFailedAttempt = useCallback((): { locked: boolean; remainingAttempts: number } => {
    const currentState = getStoredState();
    const now = Date.now();
    
    // Reset count if outside the attempt window
    let newAttempts = currentState.attempts;
    if (now - currentState.lastAttemptTime > ATTEMPT_WINDOW_MS) {
      newAttempts = 0;
    }
    
    newAttempts += 1;
    
    let lockoutUntil: number | null = null;
    if (newAttempts >= MAX_ATTEMPTS) {
      lockoutUntil = now + LOCKOUT_DURATION_MS;
    }
    
    const newState: RateLimitState = {
      attempts: newAttempts,
      lockoutUntil,
      lastAttemptTime: now
    };
    
    saveState(newState);
    setState(newState);
    
    return {
      locked: lockoutUntil !== null,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - newAttempts)
    };
  }, []);

  const resetOnSuccess = useCallback(() => {
    const newState = { attempts: 0, lockoutUntil: null, lastAttemptTime: 0 };
    saveState(newState);
    setState(newState);
  }, []);

  const getAttemptsRemaining = useCallback((): number => {
    const currentState = getStoredState();
    if (Date.now() - currentState.lastAttemptTime > ATTEMPT_WINDOW_MS) {
      return MAX_ATTEMPTS;
    }
    return Math.max(0, MAX_ATTEMPTS - currentState.attempts);
  }, []);

  return {
    isLocked,
    getRemainingLockoutTime,
    recordFailedAttempt,
    resetOnSuccess,
    getAttemptsRemaining,
    maxAttempts: MAX_ATTEMPTS
  };
};
