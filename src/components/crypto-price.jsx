import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./crypto-price.css";
import { useStore as useCryptoStore } from './crypto-price-store';

export { CryptoPrice }

const CryptoPrice = () => {
    const { cryptoPrices } = useCryptoStore(state => state);

    return (
        <div className='wrapper'>
            <div className='row'>
                <div className='col-12 col-md-4 col-lg-4'>
                    <input type='text' className='form-control'></input>
                </div>
            </div>
            <div className='row'>
            {(Object.keys(cryptoPrices) || []).map(c => (
                <div className='col-12 col-md-3 col-lg-3'>
                <CryptoPriceCard key={c} name={c} crypto={cryptoPrices[c]} />
                </div>
            ))}
            </div>
        </div>

    )
}

const CryptoPriceCard = ({ name, crypto }) => {
    return (
        <div className='card'>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'>
                    <img src={require(`../images/${name}.png`)}></img>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'> 
                    <span>{name}</span>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-12'>
                    <span className='subtitle'>{`$${crypto.usd}`}</span>
                </div>
            </div>
        </div>
    )
}

