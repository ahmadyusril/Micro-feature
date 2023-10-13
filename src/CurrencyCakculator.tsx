import { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyCalculator() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/3a4b63e109103ffbb3182419')
      .then(response => {
        const data = response.data;
        const availableCurrencies = Object.keys(data);
        setCurrencies(availableCurrencies);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else {
      axios.get(`https://open.er-api.com/v6/latest/3a4b63e109103ffbb3182419/convert?from=USD&to=EUR&amount=1?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
        .then(response => {
          const rate = response.data[`${fromCurrency}_${toCurrency}`];
          setConvertedAmount(amount * rate);
        })
        .catch(error => {
          console.error('Error fetching conversion rate:', error);
        });
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div>
      <h1>Currency Calculator</h1>
      <div>
        <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        to
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <p>
          {amount} {fromCurrency} is approximately {convertedAmount} {toCurrency}
        </p>
      </div>
    </div>
  );
}

export default CurrencyCalculator;
