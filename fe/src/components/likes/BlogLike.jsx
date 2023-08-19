import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchAuthors, fetchLike, fetchSavedPosts, fetchUnlike, setChange } from '../../redux/reducers/PostSlice';
import './bloglike.css';




export default function BlogLikeButton({ posts }) {
  const { _id } = posts;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLike = () => {
    dispatch(fetchLike(_id)).then(() => {
      dispatch(fetchAuthors())
      dispatch(setChange(true))
    });
  };

  const handleUnlike = () => {
    dispatch(fetchUnlike(_id)).then(async () => {
      if (location.pathname === '/dashboard') {
        await dispatch(fetchSavedPosts());
        dispatch(setChange(true))
      } else {
        dispatch(fetchAuthors());
        dispatch(setChange(true))
      }
    });
  };

  return (
    posts?.isMine === false ?
      <div className="d-flex align-items-center justify-content-center fs-4">
        {posts?.isLike ?
        <div className="d-flex align-items-center justify-content-center fs-4 ms-2">
          <p className="mb-0 me-2 fs-5">{posts?.likes?.length}</p>
          <AiFillHeart className='heartbtn' onClick={handleUnlike} />
        </div>
        : <div className="d-flex align-items-center justify-content-center fs-4 ms-2">
          <p className="mb-0 me-2 fs-5">{posts?.likes?.length}</p>
          <AiOutlineHeart className='heartbtn' onClick={handleLike} />
        </div>}
      </div>
      :
      <div className="d-flex align-items-center justify-content-center fs-4">
        <p className="mb-0 me-2 fs-5">{posts?.likes?.length}</p>
        <AiFillHeart className='heartbtnfill' />
      </div>
  )


}
