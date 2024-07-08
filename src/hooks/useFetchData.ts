import useSWR from "swr";

// API'den veri çeken fonksiyon (SWR ile ilişkili satır)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useFetchData = () => {
  const cacheKey = "cryptoDataCache";
  const cacheTimestampKey = "cryptoDataCacheTimestamp";
  const currentTime = Date.now();

  // LocalStorage'dan cachelenmiş veriyi ve zaman damgasını alıyoruz
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

  // Eğer cache'de veri varsa ve bu veri 45 saniyeden daha yeni ise, cache'deki veriyi kullanıyoruz
  let initialData = null;
  if (
    cachedData &&
    cachedTimestamp &&
    currentTime - parseInt(cachedTimestamp) < 45000
  ) {
    initialData = JSON.parse(cachedData);
  }

  // CoinGecko API'den veri çekme
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=true",
    fetcher,
    {
      refreshInterval: 45000, // Her 45 saniyede bir veriyi güncelle. (Cache/Update Frequency: Every 45 seconds for all the API plans) Bu bilgiye istinaden end-pointe 45 saniye de bir istek gönderiyoruz.
      revalidateOnFocus: false, // Sayfa odağa geldiğinde tekrar validasyon yapma
      dedupingInterval: 45000, // Aynı URL için 45 saniye boyunca tekrar istek gönderme
      fallbackData: initialData, // İlk veri olarak cache'deki veriyi kullan
    }
  );

  // Eğer veri başarıyla çekildiyse, bu veriyi ve zaman damgasını LocalStorage'a kaydediyoruz
  if (data && data !== initialData) {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheTimestampKey, currentTime.toString());
  }

  // Veriyi ve loading durumunu döndürme
  return {
    data: data ? data.slice(0, 15) : [],
    loading: !data && !error, // Veri yoksa loading
  };
};

export default useFetchData;
