import React, {useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState<boolean>(true);

  const updateNetworkStatus = () => {
    setOnline(navigator.onLine);
  };

  //   sometimes, the load event does not trigger on some browsers, that is why manually calling updateNetworkStatus on initial mount
  useEffect(() => {
    updateNetworkStatus();
  }, []);

  useEffect(() => {
    window.addEventListener("load", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
        window.removeEventListener("load", updateNetworkStatus);
        window.removeEventListener("online", updateNetworkStatus);
        window.removeEventListener("offline", updateNetworkStatus);
    };
  }, [navigator.onLine]);

  return { isOnline };
};

const Offline = () => {
  return (
    <div className="flex flex-col justify-center h-full w-full bg-white p-4 space-y-4">
      <div className="flex flex-row justify-center items-center space-x-4"><WifiOff /><h1 className="text-3xl font-bold">You are offline</h1></div>
      <h4 className="text-lg text-center">You must be online to retrieve the latest messages.</h4>
    </div>
  );
};

export default Offline; 