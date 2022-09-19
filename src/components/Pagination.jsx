import React from "react";

export default ( postsPerPage, totalPosts, paginate ) => {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="justify-content-cente">
      <ul className="pagination justify-content-cente">
        {pageNumbers.map((i) => (
          <li key={i} className="page-item">
            <a onClick={() => paginate(i)} href="!#" className="page-link">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
