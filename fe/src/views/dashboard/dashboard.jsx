import React, { useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillBookmarksFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../../components/blog/blog-list/BlogList";
import ProfileDash from "../../components/profiledash/profiledash";
import { fetchMyPosts, fetchSavedPosts } from "../../redux/reducers/PostSlice";
import "./style.css";

export default function Dashboard() {
    const dispatch = useDispatch();
    const author = useSelector((state) => state.author.data);
    const saved = useSelector((state) => state.author.saved);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(fetchMyPosts())
    }, [dispatch]);



    return (
        <Container className="dash">
            <ProfileDash />

            <Tabs
                defaultActiveKey="dashboard"
                id="fill-tab-example"
                className="mb-3 text-dark"
                fill
            >
                <Tab eventKey="dashboard" title={<BiSolidDashboard fontSize={30} color="black" />} >
                    <BlogList posts={author} />
                </Tab>
                <Tab eventKey="saved" title={<BsFillBookmarksFill fontSize={30} color="black"/>} onEnter={()=> dispatch(fetchSavedPosts())}>
                    <BlogList posts={saved} saveZone={true} />
                </Tab>
            </Tabs>

         
        </Container>
    );
}
