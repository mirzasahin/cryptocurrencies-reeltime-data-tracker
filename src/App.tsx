import React from 'react';
import useFetchData from './hooks/useFetchData';
import DataTable from './components/DataTable';

const App: React.FC = () => {
  const { data, loading } = useFetchData();

  return (
    <div className="container mx-auto p-4">
      <DataTable data={data} loading={loading} />
    </div>
  );
};

export default App;