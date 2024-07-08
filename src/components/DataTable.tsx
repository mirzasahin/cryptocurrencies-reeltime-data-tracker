import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  formatNumber,
  formatNumberWithTwoDecimals,
  formatPercentage,
} from "../utils/formatters";

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

type DataTableProps = {
  data: CryptoData[];
  loading: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ data, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 tracking-wider">
              Crypto
            </th>
            <th className="px-6 text-right py-3 text-xs font-bold text-gray-400 tracking-wider">
              Price
            </th>
            <th className="px-6 text-right py-3 text-xs font-bold text-gray-400 tracking-wider">
              Market Value
            </th>
            <th className="px-6 text-right py-3 text-xs font-bold text-gray-400 tracking-wider">
              24h Change
            </th>
            <th className="px-6 text-right py-3 text-xs font-bold text-gray-400 tracking-wider">
              24h Sparkline
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item) => (
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
                    <span className="font-medium text-gray-400">/ USDT</span>
                  </div>
                  <div>{item.name}</div>
                </div>
              </td>
              <td className="px-6 text-right py-4 whitespace-nowrap text-sm text-gray-600">
                <span className="font-bold text-lg">
                  {formatNumberWithTwoDecimals(item.current_price)}
                </span>{" "}
                <span className="font-medium text-gray-400">USDT</span>
              </td>
              <td className="px-6 text-right py-4 whitespace-nowrap text-sm text-gray-600">
                <span className="font-bold text-lg">
                  {formatNumber(item.market_cap)}
                </span>{" "}
                <span className="font-medium text-gray-400">USDT</span>
              </td>
              <td
                className={`px-6 text-right py-4 font-bold whitespace-nowrap text-sm ${
                  item.price_change_percentage_24h > 0
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
