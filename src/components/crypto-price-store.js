import create from 'zustand';
import axios from 'axios';

export { useStore }

const useStore = create((set, get) => ({
    cryptocurrencies: [
        {key: 0, value:'ethereum', cryptoPrice: null},
        {key: 1, value:'bitcoin', cryptoPrice: null},
        {key: 2, value:'dogecoin', cryptoPrice: null},
        {key: 3, value:'shibainu', cryptoPrice: null}
    ],
    getCryptoPrice: (crypto) => {
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`)
      .then((response) => {
        set(state => {
            let cryptocurrencies = state.cryptocurrencies;
            let result = Object.values(response.data)[0];

            (cryptocurrencies || []).map(c => {
                if (c.value === crypto) {
                    console.log(result.usd);
                    c.cryptoPrice = result.usd;
                }
            })

            return {
                cryptocurrencies: cryptocurrencies
            }
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }
}))