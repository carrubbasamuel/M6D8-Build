import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNewPost } from "../../redux/reducers/PostSlice";
import query from "query-string";
import "./styles.css";

const NewBlogPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.author);
  const allPosts = useSelector((state) => state.author.data);

  const [findToUpdate, setFindToUpdate] = useState({});
  const [cover, setCover] = useState(findToUpdate.cover || "");
  const [title, setTitle] = useState(findToUpdate.title || "");
  const [category, setCategory] = useState(findToUpdate.category || "");
  const [content, setContent] = useState(findToUpdate.content || "");
  const [time, setTime] = useState(findToUpdate.readTime || "");

  useEffect(() => {
    window.scrollTo(0, 0);
    const { update } = query.parse(window.location.search);
    if (update) {
      const find = allPosts.find((post) => post._id === update);
      setFindToUpdate(find);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      cover: cover,
      title: title,
      readTime: time,
      category: category,
      content: content,
    };

    dispatch(fetchNewPost(newBlog)).then((res) => {
      if (res.payload.statusCode === 500) {
        if (res.payload.error.errors) {
          toast.error("Compila tutti i campi", { position: "bottom-left" });
        }
        return;
      }
      navigate("/dashboard");
    });
  };

  return (
    <div style={{ marginTop: "12em" }}>
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>-- Select Category --</option>
              <option>Attualità</option>
              <option>Cultura generale</option>
              <option>Ultima ora</option>
              <option>Gossip</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="blog-cover" className="mt-3">
            <Form.Label>Cover</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="file"
                size="lg"
                className="blog-form-file"
                onChange={(e) => setCover(e.target.files[0])}
              />
              <p className="blog-form-or m-3">or</p>
              <Form.Control
                size="lg"
                placeholder="http://..."
                className="blog-form-url"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="blog-read-time" className="mt-3">
            <Form.Label>Read Time</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                className="w-50"
                size="lg"
                placeholder="How much time for read?"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <p className="m-3">Minutes</p>
            </div>
          </Form.Group>

          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Contenuto Blog</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{
                marginLeft: "1em",
              }}
            >
              {loading ? <Spinner animation="border" variant="light" /> : "Submit"}
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default NewBlogPost;
