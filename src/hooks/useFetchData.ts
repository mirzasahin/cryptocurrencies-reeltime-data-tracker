import useSWR from "swr";

// API'den veri çeken fonksiyon (SWR ile ilişkili satır)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useFetchData = () => {
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=true",
    fetcher,
    {
      refreshInterval: 45000, // Her 45 saniyede bir veriyi güncelle.
      revalidateOnFocus: false, // Sayfa odağa geldiğinde tekrar validasyon yapma
      dedupingInterval: 45000, // Aynı URL için 45 saniye boyunca tekrar istek gönderme
    }
  );

  // Veriyi ve loading durumunu döndürme
  return {
    data: data ? data.slice(0, 15) : [],
    loading: !data && !error, // Veri yoksa loading
    error, // Hata varsa döndür
  };
};

export default useFetchData;
