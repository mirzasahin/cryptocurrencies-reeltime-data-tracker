import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  formatNumber,
  formatPercentage,
} from "../utils/formatters";
import HighlightedPrice from "./HighlightedPrice";

type CryptoData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
};

type BinanceData = {
  s: string;
  c: string;
  P: string;
};

type DataTableProps = {
  data: CryptoData[];
  binanceData: BinanceData[];
  loading: boolean;
};

const tradingPair = "USDT"

const DataTable: React.FC<DataTableProps> = ({ data, binanceData, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const mergedData = data.map((item) => {
    const binanceItem = binanceData.find((bItem) => bItem.s === item.symbol.toUpperCase() + tradingPair);
    return {
      ...item,
      current_price: binanceItem ? parseFloat(binanceItem.c) : item.current_price,
      price_change_percentage_24h: binanceItem ? parseFloat(binanceItem.P) : item.price_change_percentage_24h,
    };
  });

  const sortedData = mergedData.sort((a, b) => b.current_price - a.current_price);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
          <th className="table-header">Crypto</th>
            <th className="price-header">Price</th>
            <th className="market-value-header">Market Value</th>
            <th className="change-header">24h Change</th>
            <th className="sparkline-header">24h Sparkline</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedData.map((item) => (
            <tr key={item.symbol}>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 mr-2"
                />
                <div>
                  <div className="font-bold">
                    {item.symbol.toUpperCase()}{" "}
                    <span className="font-medium text-gray-400">/ {tradingPair}</span>
                  </div>
                  <div>{item.name}</div>
                </div>
              </td>
              <td className="px-6 w-[250px] text-right py-4 whitespace-nowrap text-sm text-gray-600">
                <HighlightedPrice price={item.current_price} />{" "}
                <span className="font-medium text-gray-400">{tradingPair}</span>
              </td>
              <td className="px-6 w-[250px] text-right py-4 whitespace-nowrap text-sm text-gray-600">
                <span className="font-bold text-lg">$
                  {formatNumber(item.market_cap)}
                </span>{" "}
                <span className="font-medium text-gray-400">{tradingPair}</span>
              </td>
              <td
                className={`px-6 w-[200px] text-right py-4 font-bold whitespace-nowrap text-sm ${item.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
              >
                {item.price_change_percentage_24h > 0 ? (
                  <>
                    <i className="fas fa-arrow-up mr-2"></i>
                    {formatPercentage(item.price_change_percentage_24h)}
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-down mr-2"></i>
                    {formatPercentage(item.price_change_percentage_24h)}
                  </>
                )}
              </td>
              <td className="px-6 w-[150px] py-4">
                <Sparklines data={item.sparkline_in_7d.price.slice(-24)}>
                  <SparklinesLine
                    color={
                      item.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                    style={{ fill: "none", strokeWidth: 5 }}
                  />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
