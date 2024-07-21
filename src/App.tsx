import React from 'react';
import useFetchData from './hooks/useFetchData';
import useWebSocket from './hooks/useWebSocket';
import DataTable from './components/DataTable';

const App: React.FC = () => {
  const { data: coingeckoData, loading: coingeckoLoading } = useFetchData();
  const symbols = coingeckoData.map(item => item.symbol.toUpperCase() + 'USDT');
  const { data: binanceData, loading: binanceLoading } = useWebSocket(symbols);

  const loading = coingeckoLoading || binanceLoading;

  return (
    <div className="container mx-auto p-4">
      <DataTable data={coingeckoData} binanceData={binanceData} loading={loading} />
    </div>
  );
};

export default App;
