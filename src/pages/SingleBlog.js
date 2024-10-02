import React, {useEffect, useState} from 'react';
import {HiOutlineArrowLeft, HiEye, HiThumbUp, HiThumbDown} from 'react-icons/hi';
import {Link, useParams} from 'react-router-dom';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import API_ROUTES from "../api";

function SingleBlog() {
    const [blog, setBlog] = useState(null);
    const {id} = useParams();
    const [shouldReload, setShouldReload] = useState(false);
    const [viewCount, setViewCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisLiked, setIsDisLiked] = useState(false);

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        fetch(`${API_ROUTES.BLOG_SERVICE}/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBlog(data);
                setViewCount(data.numViews);
                setIsLiked(checkUserLiked(data));
                setIsDisLiked(checkUserDisLiked(data));
            })
            .catch((error) => console.log(error));

    }, [id, token, shouldReload]);

    function checkUserLiked(data) {
        if (!email) return false
        const likes = data.likes;
        return likes.some(user => user.email === email);
    }

    function checkUserDisLiked(data) {
        if (!email) return false
        const likes = data.dislikes;
        return likes.some(user => user.email === email);
    }

    const handleLike = () => {
        if (token) {
            const requestBody = {
                blogId: id,
            };

            fetch(`${API_ROUTES.BLOG_SERVICE}/blog/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            })
                .then((response) => response.json())
                .then(() => {
                    setShouldReload(!shouldReload);
                })
                .catch((error) => console.log(error));
        } else {
            window.location.href = '/login';
        }
    };

    const handleDislike = () => {
        if (token) {
            const requestBody = {
                blogId: id,
            };

            fetch(`${API_ROUTES.BLOG_SERVICE}/blog/dislikes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            })
                .then((response) => response.json())
                .then(() => {
                    setShouldReload(!shouldReload);
                })
                .catch((error) => console.log(error));
        } else {
            window.location.href = '/login';
        }
    };

    if (!blog) {
        return <p>Loading...</p>;
    }

    const {title, description, images, likes, dislikes} = blog;

    return (
        <>
            <Meta title={title}/>
            <BreadCrumb title={title}/>
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blogs" className="d-flex align-items-center gap-10">
                                <HiOutlineArrowLeft className="fs-5"/>
                                Go back to Blogs
                            </Link>
                            <h3 className="title">{title}</h3>
                            {images.length > 0 &&
                                <img src={images[0].url} className="img-fluid w-100 my-4" alt="blog"/>}
                            <p>{description}</p>
                            <p>
                                <HiEye className="fs-2"/> Views: {viewCount}
                            </p>
                            <p>
                                <HiThumbUp
                                    className={`icon-button fs-2 ${isLiked ? 'active' : ''}`}
                                    style={{color: isLiked ? '#007BFF' : 'inherit'}}
                                    onClick={handleLike}
                                />{' '}
                                Likes: {likes.length}
                            </p>
                            <p>
                                <HiThumbDown
                                    className={`icon-button fs-2 ${isDisLiked ? 'active' : ''}`}
                                    style={{color: isDisLiked ? '#007BFF' : 'inherit'}}
                                    onClick={handleDislike}
                                />{' '}
                                Dislikes: {dislikes.length}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default SingleBlog;
