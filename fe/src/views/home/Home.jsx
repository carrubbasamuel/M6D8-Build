import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import BlogList from "../../components/blog/blog-list/BlogList";
import Header from "../../components/headers/headers";
import PaginationPosts from "../../components/pagination/pagination";
import { fetchAuthors } from "../../redux/reducers/PostSlice";
import "./styles.css";


const Home = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.userLogged);
  const authors = useSelector((state) => state.author.data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  
  return (
    <Container fluid="sm">
      <Header name={user && user.user.name} />
      <BlogList posts={authors} />
      <PaginationPosts />
    </Container>
  );
};

export default Home;
