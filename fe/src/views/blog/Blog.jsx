import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";

import { AiOutlineComment } from "react-icons/ai";
import { fetchGetReviews, setPostToReview, setShowModal } from "../../redux/reducers/ReviewSlice";

import EditMode from "../../components/blog/blog-item/modalReview/editmode";
import ModalReview from "../../components/blog/blog-item/modalReview/ModalReview";



import BlogLikeButton from "../../components/likes/BlogLike";
import { fetchAuthors } from "../../redux/reducers/PostSlice";
import "./styles.css";


const Blog = props => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.author.data);

  const handleShow = () => {
    dispatch(setPostToReview(params.id));
    dispatch(setShowModal(true));
    dispatch(fetchGetReviews());
  };

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);


  useEffect(() => {
    const { id } = params;
    const blog = posts.find(post => post._id.toString() === id);
    if (blog) {
      setBlog(blog);
      setLoading(false);
    }
  }, [params, posts, navigate]);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <EditMode />
        <ModalReview />
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>
          <div className="blog-details-content">{blog.content}</div>
          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
            <div>{new Date(blog.createdAt).toLocaleDateString()}</div>

              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <div className='d-flex align-items-center justify-content-center fs-4'>
                  <BlogLikeButton posts={blog} />
                  <div className='ms-4'>
                    <AiOutlineComment onClick={handleShow} style={{ cursor: 'pointer' }} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

export default Blog;
