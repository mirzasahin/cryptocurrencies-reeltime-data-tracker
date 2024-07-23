import { useEffect, useState, useRef } from 'react';

type BinanceData = {
  s: string; // Symbol
  c: string; // Last price
  q: string;
  P: string;
};

const useWebSocket = (symbols: string[]) => {
  const [data, setData] = useState<BinanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const bufferRef = useRef<BinanceData[]>([]);

  useEffect(() => {
    if (symbols.length === 0) { 
      return;
    }

    const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

    const connectWebSocket = () => {
      socket.onopen = () => {
        setLoading(false);
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        bufferRef.current = bufferRef.current.map((item) =>
          item.s === message.s ? message : item 
        );
        if (!bufferRef.current.find((item) => item.s === message.s)) {
          bufferRef.current.push(message);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = (event) => {
        if (!event.wasClean) {
          setTimeout(connectWebSocket, 5000); // Retry connection after 5 seconds
        }
      };

      return () => {
        socket.close();
      };
    };

    connectWebSocket();

    // Cleanup function to close WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, [symbols]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData([...bufferRef.current]);
      bufferRef.current = []; // Clear buffer after setting data
    }, 3000); // Update data every 2 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return { data, loading };
};

export default useWebSocket;
