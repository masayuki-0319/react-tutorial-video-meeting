import { useEffect, useReducer, useState, useRef } from 'react';
import { RtcClient } from '../../utils/RtcClient';

export const useRtcClent = () => {
  const [rtcClient, _setRtcClient] = useState<RtcClient | null>(null);
  const remortVideoRef = useRef(null);
  const [, forceRender] = useReducer((boolean: boolean) => !boolean, false);

  const setRtcClient = (rtcClient: RtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  useEffect(() => {
    const init = async () => {
      const client = new RtcClient({ setRtcClient, remortVideoRef });
      await client.setMediaStream();
    };

    init();
  }, []);

  return { rtcClient };
};
