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
    filtered: {},
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
                get().setCryptoPrices(response.data);
            })
            .catch((error) => {
            })
    },
    setCryptoPrices: (cryptoPrices) => {
        set(state => {
            // Link: https://stackoverflow.com/questions/1359761/sorting-a-javascript-object-by-property-name
            // Title: Sorting a JavaScript object by property name
            // Date: 06/03/2022
            // Comments: I thought this solution was pretty cool but the guy does say in the post that this won't always work. "By definition, the order
            // of keys in an object is undefined. Think about sorting these keys when the object is actually being displayed to the user. Whatever sort order it uses
            // internally doesn't matter anyway."
            
            var sorted = {},
            key, a = [];
        
            for (key in cryptoPrices) {
                if (cryptoPrices.hasOwnProperty(key)) {
                    a.push(key);
                }
            }
        
            a.sort();
        
            for (key = 0; key < a.length; key++) {
                sorted[a[key]] = cryptoPrices[a[key]];
            }

            return {
                cryptoPrices: sorted,
                filtered: sorted
            }

        })
    },
    filterCryptoResults: (searchString) => {
        if (!searchString) {
            get().getCryptoPrices();
        }

        let names = (Object.keys(get().cryptoPrices) || []).filter(c => c.includes(searchString));
        let filtered = {...get().cryptoPrices};

        for (var prop in filtered) {
            if (!names.includes(prop)) {
                delete filtered[prop];
            }
        }

        set({filtered: filtered});
    }
}))