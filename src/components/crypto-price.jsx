import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ethereum from "../images/eth.png";
import "./crypto-price.css";
import { useStore as useCryptoStore } from './crypto-price-store';


export { CryptoPrice }

const CryptoPrice = () => {
    const { cryptoPrice, getCryptoPrice } = useCryptoStore(state => state);
    const minute_ms = 60000;

    useEffect(() => {
        getCryptoPrice();

        const interval = setInterval(() => {
            getCryptoPrice();
        }, minute_ms);
        
          return () => clearInterval(interval);
    }, [])
    
    return (
        <div className='card'>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'>
                    <img className={ethereum} src={ethereum}></img>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'>
                    <span>Ethereum</span>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'>
                    {cryptoPrice ? <span className='subtitle'>{`$${cryptoPrice}`}</span> : null}
                </div>
            </div>
        </div>
    )
}

