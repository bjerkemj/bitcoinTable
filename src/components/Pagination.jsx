import React from "react";

export default ( {postsPerPage, totalPosts, paginate} ) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="justify-content-center">
      <ul className="pagination justify-content-center">
        {pageNumbers.map((i) => (
          <li key={i} className="page-item">
            <button onClick={() => paginate(i)} className="page-link">
              {i}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
