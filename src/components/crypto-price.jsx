import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./crypto-price.css";
import { useStore as useCryptoStore } from './crypto-price-store';

import ethereum from '../images/ethereum.png';
import bitcoin from '../images/bitcoin.png';

export { CryptoPrice }

const CryptoPrice = () => {
    const cryptocurrencies = useCryptoStore(state => state.cryptocurrencies);
    return (
        <>{(cryptocurrencies || []).map(c => <CryptoPriceCard key={c.key} crypto={c.value} price={c.cryptoPrice} />)}</>
    )
}

const CryptoPriceCard = ({ crypto, price }) => {
    const { getCryptoPrice } = useCryptoStore(state => state);
    const minute_ms = 60000;

    useEffect(() => {
        getCryptoPrice(crypto);

        const interval = setInterval(() => {
            getCryptoPrice(crypto);
        }, minute_ms);
        
          return () => clearInterval(interval);
    }, [])
    
    return (
        <div className='card'>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'>
                    <img src={require(`../images/${crypto}.png`)}></img>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'> 
                    <span>{crypto}</span>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'>
                    {price ? <span className='subtitle'>{`$${price}`}</span>: null}
                </div>
            </div>
        </div>
    )
}

