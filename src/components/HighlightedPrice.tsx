import React, { useState, useEffect } from 'react';
import '../App.css'; // CSS animasyonlarının olduğu dosya
import { formatNumberWithTwoDecimals } from '../utils/formatters';

type HighlightedPriceProps = {
  price: number;
};

const HighlightedPrice: React.FC<HighlightedPriceProps> = ({ price }) => {
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [highlightClass, setHighlightClass] = useState<string>('');

  useEffect(() => {
    if (previousPrice !== null) {
      if (price > previousPrice) {
        setHighlightClass('flash-green');
      } else if (price < previousPrice) {
        setHighlightClass('flash-red');
      }

      const timer = setTimeout(() => {
        setHighlightClass('');
      }, 500);

      return () => clearTimeout(timer);
    }

    setPreviousPrice(price);
  }, [price, previousPrice]);

  useEffect(() => {
    setPreviousPrice(price);
  }, [price]);

  return (
    <span className={`font-bold text-lg ${highlightClass}`}>
      ${formatNumberWithTwoDecimals(price)}
    </span>
  );
};

export default HighlightedPrice;
