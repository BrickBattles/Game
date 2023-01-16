import React from 'react';
import Ably, { Realtime } from 'ably/promises';
import { useContext, useEffect, createContext, Dispatch, SetStateAction, useState } from 'react';

type AblyContextType = {
  ably: Realtime | Ably.Types.RealtimePromise | null;
  setAbly: React.Dispatch<SetStateAction<Realtime | Ably.Types.RealtimePromise | null>>;
  channel: any;
  setChannel: React.Dispatch<SetStateAction<any>>;
  clientId: string;
  setClientId: React.Dispatch<SetStateAction<string>>;
};

const initAbly = {
  ably: null,
  setAbly: () => {},
  channel: null,
  setChannel: () => {},
  clientId: 'not initialized',
  setClientId: () => {},
};

const AblyContext = createContext<AblyContextType>(initAbly);

export function AblyProvider({ children }: any) {
  const [ably, setAbly] = useState<Realtime | Ably.Types.RealtimePromise | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [clientId, setClientId] = useState<string>('not initialized');

  useEffect(() => {
    if (!ably) {
      setAbly(new Ably.Realtime.Promise({ authUrl: 'api/createTokenRequest' }));
    }
  }, [ably]);

  return (
    <AblyContext.Provider value={{ ably, setAbly, channel, setChannel, clientId, setClientId }}>
      {children}
    </AblyContext.Provider>
  );
}

export function useAbly() {
  return useContext(AblyContext);
}
