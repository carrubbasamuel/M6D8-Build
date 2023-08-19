
import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSearchPost, setSearchPost } from '../../redux/reducers/PostSlice';
import './styles.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.author.search);

    const handleSearch = (e) => {
        if(e.target.value === ""){
            dispatch(setSearchPost());
            return
        }else{
            dispatch(fetchSearchPost(e.target.value));
        }
    }

    return (
        <div className="search-container">
            <Form className="search-form">
                <Form.Group controlId="formSearch">
                    <Form.Control onKeyDown={handleSearch} name="search" type="text" placeholder="Search a post" />
                </Form.Group>
            </Form>
            <div className="search-results">
                {
                    searchResults && searchResults.map((post) => (
                        <div className="search-result" key={post._id}>
                            <Link to={`/blog/${post._id}`} className="search-result-link" onClick={()=> dispatch(setSearchPost())}>
                                <div>
                                <strong>{post.title}</strong>
                                <p className="text-muted">{post.author.name} {post.author.surname}</p>
                                </div>
                                <img width={50} height={50} src={post.cover} alt="post" className="search-result-img"/>
                            </Link>
                        </div>
                    ))

                }
                
            </div>
        </div>
    )
}