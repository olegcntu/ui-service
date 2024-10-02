import React, {useEffect, useState} from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import Contact from "./Contact";
import Container from "../components/Container";
import API_ROUTES from "../api";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`${API_ROUTES.BLOG_SERVICE}/blog/`)
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error while executing request:', error));
    }, []);

    return (
        <>
            <Meta title={"Blogs"}/>
            <BreadCrumb title="Blogs"/>
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Find by Categories</h3>
                            <div>
                                <ul className="ps-0">
                                    <li>Home</li>
                                    <li>Our store</li>
                                    <li>Blogs</li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {blogs.map(blog => (
                                <div className="col-6 mb-3" key={blog._id}>
                                    <BlogCard
                                        id={blog._id}
                                        title={blog.title}
                                        description={blog.description}
                                        createdAt={blog.createdAt}
                                        images={blog.images}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};
export default Blog
