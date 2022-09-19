import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

export default () => {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2"
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

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = bitcoinData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {isLoading ? (
        <>Loading</>
      ) : (
        <>
          <Table striped bordered hover responsive="md">
            <thead>
              <tr>
                <th>Date</th>
                <th>Open value ($)</th>
                <th>High value ($)</th>
                <th>Low value ($)</th>
              </tr>
            </thead>
            <tbody>
              {bitcoinData.length ? (
                currentPosts.map((e) => {
                  return TableRow(e);
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
          {Pagination(postsPerPage, bitcoinData.length, paginate)}
        </>
      )}
    </div>
  );
};
