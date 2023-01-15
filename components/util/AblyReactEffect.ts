import Ably, { Realtime } from 'ably/promises';
import { useEffect } from 'react';

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });

export function useChannel(channelName: string, callbackOnMessage: any) {
  const channel = ably.channels.get(channelName);

  const onMount = () => {
    channel.attach();
    channel.presence.enter();
    channel.subscribe((msg) => {
      callbackOnMessage(msg);
    });
  };

  const onUnmount = () => {
    channel.unsubscribe();
    channel.presence.leave();
    channel.detach();
  };

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  useEffect(useEffectHook);

  return [channel, ably];
}
