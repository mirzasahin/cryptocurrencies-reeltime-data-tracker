import useSWR from 'swr';

// API'den veri çeken fonksiyon (SWR ile ilişkili satır)
const fetcher = (url: string) => fetch(url).then(res => res.json());

const useFetchData = () => {
  // CoinGecko API'den veri çekme
  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true', fetcher, {
    refreshInterval: 45000, // Her 45 saniyede bir veriyi güncelle
    revalidateOnFocus: false, // Sayfa odağa geldiğinde tekrar validasyon yapma
    dedupingInterval: 45000, // Aynı URL için 45 saniye boyunca tekrar istek gönderme
  });

  // Hata durumunu yönetme
  if (error) {
    console.error('Error fetching data:', error);
  }

  // Veriyi ve loading durumunu döndürme
  return {
    data: data ? data.slice(0, 10) : [], // İlk 10 kripto para birimini al
    loading: !data && !error, // Veri yoksa loading
  };
};

export default useFetchData;
