import { useEffect, useReducer, useState } from 'react';
import { RtcClient } from '../../utils/RtcClient';

export const useRtcClent = () => {
  const [rtcClient, _setRtcClient] = useState<RtcClient | null>(null);
  const [, forceRender] = useReducer((boolean: boolean) => !boolean, false);

  const setRtcClient = (rtcClient: RtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  useEffect(() => {
    const init = async () => {
      const client = new RtcClient({ setRtcClient: setRtcClient });
      await client.getUserMedia();
      client.setRtcClient();
    };

    init();
  }, []);

  return { rtcClient };
};
