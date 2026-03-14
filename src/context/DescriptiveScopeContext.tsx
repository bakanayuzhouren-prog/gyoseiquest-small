import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const DESCRIPTIVE_SCOPE_KEY = 'descriptiveScopeEnabled';

type DescriptiveScopeContextType = {
  descriptiveScopeEnabled: boolean;
  setDescriptiveScopeEnabled: (value: boolean) => void;
};

const DescriptiveScopeContext = createContext<DescriptiveScopeContextType | null>(null);

export function DescriptiveScopeProvider({ children }: { children: React.ReactNode }) {
  const [descriptiveScopeEnabled, setState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem(DESCRIPTIVE_SCOPE_KEY);
        setState(val === 'true');
      } catch (_) {
        setState(false);
      }
    })();
  }, []);

  const setDescriptiveScopeEnabled = useCallback(async (value: boolean) => {
    setState(value);
    try {
      await AsyncStorage.setItem(DESCRIPTIVE_SCOPE_KEY, value ? 'true' : 'false');
    } catch (_) {}
  }, []);

  return (
    <DescriptiveScopeContext.Provider value={{ descriptiveScopeEnabled, setDescriptiveScopeEnabled }}>
      {children}
    </DescriptiveScopeContext.Provider>
  );
}

export function useDescriptiveScope() {
  const ctx = useContext(DescriptiveScopeContext);
  if (!ctx) {
    return {
      descriptiveScopeEnabled: false,
      setDescriptiveScopeEnabled: (_: boolean) => {},
    };
  }
  return ctx;
}
