
import React, { useEffect } from 'react';
import { CryptoPrice } from '../components/crypto-price';
import { useStore as useCryptoStore } from '../components/crypto-price-store';

export { CryptoPriceContainer }

const CryptoPriceContainer = () => {

  const { getCryptoPrices } = useCryptoStore(state => state);

  useEffect(() => {
      getCryptoPrices();
  }, [])

  return (
    <CryptoPrice />
  );
}

