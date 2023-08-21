import query from "query-string";
import React, { useEffect, useRef } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAuthors, fetchNewPost, fetchUpdatePosts } from "../../redux/reducers/PostSlice";
import "./styles.css";
import Quill from 'quill';

const QuillClipboard = Quill.import('modules/clipboard');
QuillClipboard.DEFAULTS.sanitize = [{ tag: 'span' }, { tag: 'div' }];

const NewBlogPost = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.author);
  const allPosts = useSelector((state) => state.author.data);
  const [change, setChange] = React.useState(false);
  const [quillContent, setQuillContent] = React.useState("");

  let coverUrl = useRef(null);
  let coverFile = useRef(null);
  const title = useRef(null);
  const category = useRef(null);
  const time = useRef(null);


  useEffect(() => {
    window.scrollTo(0, 0);

    const { update } = query.parse(window.location.search);
    if (update) {
      dispatch(fetchAuthors()).then(() => {
        setChange(true);
      });
      const find = allPosts.find((post) => post._id === update);
      if (find) {
        coverUrl.current.value = find.cover || "";
        title.current.value = find.title || "";
        category.current.value = find.category || "";
        setQuillContent(find.content || "");
        time.current.value = find.readTime.value || "";
      }
    }
  }, [change]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const { update } = query.parse(window.location.search);
    let cover;
    if (coverFile.current.files[0]) {
      cover = coverFile.current.files[0];
    } else {
      cover = coverUrl.current.value;
    }

    const newBlog = {
      cover: cover,
      title: title.current.value,
      readTime: time.current.value,
      category: category.current.value,
      content: quillContent,
    };

    if (update) {
      const data = {
        blogItem: newBlog,
        id: update
      }
      console.log(data);
      dispatch(fetchUpdatePosts(data)).then((res) => {
        if (res.payload.statusCode === 500) {
          if (res.payload.error.errors) {
            toast.error("Compila tutti i campi", { position: "bottom-left" });
          }
          return;
        }
        navigate("/dashboard");
      });
    } else {
      dispatch(fetchNewPost(newBlog)).then((res) => {
        if (res.payload.statusCode === 500) {
          if (res.payload.error.errors) {
            toast.error("Compila tutti i campi", { position: "bottom-left" })
          }
          return
        }
        navigate('/dashboard')
      })
    }
  }

  const handleSelect = () => {
    if (coverFile.current.files[0]) {
      coverUrl.current.value = "";
    } else {
      coverFile.current.value = "";
    }
  };

  const handleReset = () => {
    setQuillContent("");
  }


  return (
    <div style={{ marginTop: "12em" }
    }>
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={handleSubmit}>

          <Form.Group controlId="blog-form" className=" mt-3"><Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Title" ref={title} />
          </Form.Group>

            <Form.Group controlId="blog-category" className="mt-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control ref={category} size="lg" as="select">
                <option value="Tecnologia">Tecnologia</option>
                <option value="Viaggi">Viaggi</option>
                <option value="Cucina e Ricette">Cucina e Ricette</option>
                <option value="Salute e Benessere">Salute e Benessere</option>
                <option value="Arte e Cultura">Arte e Cultura</option>
                <option value="Finanza e Investimenti">Finanza e Investimenti</option>
                <option value="Ambiente e Sostenibilità">Ambiente e Sostenibilità</option>
                <option value="Sport">Sport</option>
                <option value="Istruzione e Apprendimento">Istruzione e Apprendimento</option>
                <option value="Stile di Vita">Stile di Vita</option>
              </Form.Control>
            </Form.Group>


            <Form.Label>Cover</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control type="file" size="lg" placeholder="Title" ref={coverFile} className="blog-form-file" onChange={handleSelect} />
              <p className="blog-form-or m-3">or</p>
              <Form.Control size="lg" placeholder="http://..." ref={coverUrl} className="blog-form-url" onChange={handleSelect} />
            </div>
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Read Time</Form.Label>
            <div className="d-flex">
              <Form.Control type="number" className="w-50" size="lg" placeholder="How much time for read?" ref={time} />
              <p className="m-3">   Minutes</p>
            </div>
          </Form.Group>


          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Contenuto Blog</Form.Label>
            <ReactQuill
              value={quillContent}
              onChange={setQuillContent}
              theme="snow" // Usa il tema snow
              
            />
          </Form.Group>

          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark" onClick={handleReset}>
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
    </div >
  );
};

export default NewBlogPost;
