
import React from 'react';
import { BsBookmarkDashFill, BsBookmarkPlusFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fetchAuthors, fetchSavePost, fetchSavedPosts, fetchUnsavePost, setChange } from '../../redux/reducers/PostSlice';


export default function BlogSaveButton({ posts }) {
  const { _id } = posts;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSave = async () => {
    await dispatch(fetchSavePost(_id)).then(() => {
      dispatch(fetchAuthors())
      dispatch(setChange(true))
    });
  };

  const handleUnsave = () => {
    dispatch(fetchUnsavePost(_id)).then(async () => {
      if (!(location.pathname === '/')) {
        await dispatch(fetchSavedPosts());
        dispatch(setChange(true))
      } else if (location.pathname === '/') {
        dispatch(fetchAuthors());
        dispatch(setChange(true))
      }
    });
  };

    return posts?.isMine === false ?
        <div className="mark">
          {posts?.isSaved ? <BsBookmarkDashFill style={{ cursor: 'pointer', fill: 'black' }} onClick={handleUnsave} /> : <BsBookmarkPlusFill style={{ cursor: 'pointer' }} onClick={handleSave} />}
        </div>
        :
        null
}