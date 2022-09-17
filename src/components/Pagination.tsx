import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  width: 30rem;
  border: 1px solid var(--lightGray);
  display: grid;
  grid-template-columns: repeat(5, auto);
  border-radius: 1rem;
  margin: 3rem auto;
  overflow: hidden;

  a,
  p {
    padding: 1rem;
    border-right: 1px solid var(--lightGray);
    font-size: 1.5rem;
  }
`;

export default function Pagination() {
  return (
    <div className="w-[300px] grid grid-cols-[repeat(5,_auto)] rounded-2xl my-12 mx-auto overflow-hidden border border-gray-300">
      <Link href="/#">
        <a className="p-4 text-2xl border-r border-r-gray-300">⬅️ Prev</a>
      </Link>
      <p className="p-4 text-2xl border-r border-r-gray-300">1</p>
      <p className="p-4 text-2xl border-r border-r-gray-300">..</p>
      <p className="p-4 text-2xl border-r border-r-gray-300">10</p>
      <Link href="/#">
        <a className="p-4 text-2xl">➡️ Next</a>
      </Link>
    </div>
  );
}
