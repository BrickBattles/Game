import React from 'react';
import { StreamrClient } from 'streamr-client';
import { useContext, useEffect, createContext, Dispatch, SetStateAction, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

type AuthContextType = {
  streamr: StreamrClient | null;
  setStreamr: React.Dispatch<SetStateAction<StreamrClient | null>>;
};

const initAuth = {
  streamr: null,
  setStreamr: () => {},
};

const AuthContext = createContext<AuthContextType>(initAuth);

export function AuthProvider({ children }: any) {
  const [streamr, setStreamr] = useState<StreamrClient | null>(null);

  useEffect(() => {
    const streamr = new StreamrClient({
      logLevel: 'debug',
    });
    setStreamr(streamr);
  }, []);

  return <AuthContext.Provider value={{ streamr, setStreamr }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
