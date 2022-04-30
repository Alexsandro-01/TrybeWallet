const a = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  const arr = Object.values(data);
  const currencies = {};
  arr.forEach((value) => {
    currencies[value.code] = {
      code: value.code,
      name: value.name,
      ask: value.ask,
    };
  });
  console.log(currencies);
  // return dispatch(actionCurrencies(currencies));
};

a();
