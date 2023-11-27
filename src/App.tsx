import React, { useState, useEffect } from "react";
import "./App.scss";

const App: React.FC = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(
    localStorage.getItem("selectedCurrencies")?.length
      ? JSON.parse(localStorage.getItem("selectedCurrencies")!)
      : []
  );

  console.log("selectedCurrencies", selectedCurrencies);

  useEffect(() => {
    localStorage.setItem(
      "selectedCurrencies",
      JSON.stringify(selectedCurrencies)
    );
  }, [selectedCurrencies]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedCurrencies")!);
    if (items) {
      setSelectedCurrencies(items);
    }
  }, []);

  const currencies = [
    "eur",
    "pln",
    "gel",
    "dkk",
    "czk",
    "gbp",
    "sek",
    "usb",
    "rub",
  ];

  const removeCurrency = (event, value: string) => {
    event.preventDefault();
    const index = selectedCurrencies.indexOf(value);
    const newCurrency = [...selectedCurrencies];
    newCurrency.splice(index, 1);
    setSelectedCurrencies(newCurrency);
    localStorage.removeItem("selectedCurrencies");
  };

  const addCurrency = (event, value: string) => {
    event.preventDefault();
    if (selectedCurrencies.length && selectedCurrencies.includes(value)) {
      removeCurrency(event, value);
    } else {
      setSelectedCurrencies([...selectedCurrencies, value]);
    }
  };

  const isSelected = (value: string): boolean => {
    if (selectedCurrencies) {
      return selectedCurrencies.includes(value);
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <section className="grid_selected">
          {selectedCurrencies.length > 0 &&
            selectedCurrencies?.map((value: string) => (
              <div className="grid_wrapper" key={currencies.indexOf(value)}>
                <div className="grid_container">
                  <button
                    className="grid_closedBtn"
                    onClick={(event) => removeCurrency(event, value)}
                  ></button>
                  <span>{value}</span>
                </div>
              </div>
            ))}
        </section>

        <section className="grid_currencies">
          {currencies.map((value: string) => (
            <div className="grid_wrapper" key={currencies.indexOf(value)}>
              <label
                className={
                  isSelected(value)
                    ? "currency_selected currency"
                    : "currency_container currency"
                }
                onClick={(event) => addCurrency(event, value)}
              >
                <input type="checkbox" checked={isSelected(value)} readOnly />
                <span className="checkmark"></span>
                {value.toUpperCase()}
              </label>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default App;
