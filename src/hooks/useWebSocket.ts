import { useEffect, useState } from 'react';

type BinanceData = {
  s: string; // Symbol
  c: string; // Last price
  q: string
};

const useWebSocket = (symbols: string[]) => {
  const [data, setData] = useState<BinanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbols.length === 0) {
      return;
    }

    const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

    const connectWebSocket = () => {
      socket.onopen = () => {
        console.log('WebSocket bağlantısı kuruldu.');
        setLoading(false);
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setData((prevData) => {
          const updatedData = [...prevData];
          const index = updatedData.findIndex(item => item.s === message.s);
          if (index !== -1) {
            updatedData[index] = message;
          } else {
            updatedData.push(message);
          }
          return updatedData;
        });
      };

      socket.onerror = (error) => {
        console.error('WebSocket hatası:', error);
      };

      socket.onclose = (event) => {
        console.log('WebSocket bağlantısı kapandı.', event);
        if (!event.wasClean) {
          console.log('WebSocket yeniden bağlanıyor...');
          setTimeout(connectWebSocket, 5000); // 5 saniye sonra tekrar bağlan
        }
      };

      return () => {
        socket.close();
      };
    };

    connectWebSocket();

  }, [symbols]);

  return { data, loading };
};

export default useWebSocket;
