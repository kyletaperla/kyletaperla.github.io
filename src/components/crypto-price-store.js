import create from 'zustand';
import axios from 'axios';

export { useStore }

const useStore = create(set => ({
  cryptoPrice: null,
  setCryptoPrice: (price) => {
      set({cryptoPrice: price});
  },
  getCryptoPrice: () => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then((response) => {
      set({
          cryptoPrice: response.data.ethereum.usd
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
}))