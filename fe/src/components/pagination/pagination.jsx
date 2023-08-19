import { useEffect, useMemo, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../redux/reducers/PostSlice';

export default function PaginationPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const totalPage = useSelector((state) => state.author.totalPage);

  
  const pagination = useMemo(() => totalPage, [totalPage]);

  const clickHandler = (e) => {
    const newPage = Number(e.target.text);
    if (newPage >= 1 && newPage <= pagination) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (currentPage >= 1 && currentPage <= pagination) {
      dispatch(fetchAuthors(currentPage));
    }
  }, [dispatch, currentPage, pagination]);

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
      />

      {Array.from({ length: pagination }, (_, i) => (
        <Pagination.Item key={i} active={i + 1 === currentPage}  onClick={clickHandler}>
          {i + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, pagination))}
      />
    </Pagination>
  );
}
