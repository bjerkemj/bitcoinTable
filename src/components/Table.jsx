import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import { useFetchData } from "../hooks/useFetchBitcoinData";

export default () => {
  const [bitcoinData, isLoading] = useFetchData(
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState([]);
  const [descending, setDescending] = useState(true);

  useEffect(() => {
    setCurrentPosts(bitcoinData.slice(indexOfFirstPost, indexOfLastPost));
  }, [bitcoinData]);

  const sortBitcoinData = (bitcoinData) => {
    let sortingVar = descending ? -1 : 1;

    const tempList = [...bitcoinData];
    tempList.sort((a, b) => (a.open > b.open ? sortingVar : sortingVar * -1));
    setCurrentPosts(tempList.slice(indexOfFirstPost, indexOfLastPost));
    setDescending((prevState) => !prevState);
  };

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
                <th onClick={() => sortBitcoinData(bitcoinData)}>
                  Open value ($)
                </th>
                <th>High value ($)</th>
                <th>Low value ($)</th>
              </tr>
            </thead>
            <tbody>
              {bitcoinData.length ? (
                currentPosts.map((e) => {
                  return <TableRow data={e} />;
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={bitcoinData.length}
            paginate={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
