import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch(
        url
      );
      const json = await data.json();
      const dataAsList = [];
      json.Data.Data.forEach((element) => {
        dataAsList.push({
          time: new Date(element.time * 1000),
          high: element.high,
          low: element.low,
          open: element.open,
        });
      });
      setBitcoinData(dataAsList);
      setIsLoading(false);
    };

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [bitcoinData, isLoading];
};
