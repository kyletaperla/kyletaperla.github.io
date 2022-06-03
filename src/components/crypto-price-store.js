import create from 'zustand';
import axios from 'axios';

export { useStore }

const useStore = create((set, get) => ({
    cryptocurrencies: [
        {key: 0, value:'ethereum'},
        {key: 1, value:'bitcoin'},
        {key: 2, value:'dogecoin'},
        {key: 3, value:'solana'},
        {key: 4, value:'cardano'},
        {key: 5, value:'zilliqa'},
        {key: 6, value:'polkadot'},
        {key: 7, value:'apecoin'}
    ],
    cryptoPrices: {},
    getCryptoPrices: () => {
        let cryptocurrencies = get().cryptocurrencies;
        let coins = '';
        
        (cryptocurrencies || []).forEach((c, i) => {
            if(i === 0) {
                coins += c.value;
            } else {
                coins = coins + '%2C' + c.value;
            }
        })

        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`)
            .then((response) => {
                set({cryptoPrices: response.data});
                console.log(get().cryptoPrices);
            })
            .catch((error) => {
            })

    }
}))