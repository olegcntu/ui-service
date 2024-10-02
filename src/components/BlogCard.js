import React, {Component} from 'react'
import {Link} from "react-router-dom";

export class BlogCard extends Component {
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    render() {
        const {
            id,
            title,
            description,
            createdAt,
            images
        } = this.props;
        const formattedDate = this.formatDate(createdAt);

        return (
            <div className="blog-card">
                <div className="card-image">
                    {images && images.length > 0 ? (
                        <img src={images[0].url} className="img-fluid w-100" alt=""/>
                    ) : (
                        <img src="/images/blog/blog-1.jpg" className="img-fluid w-100" alt=""/>
                    )}
                </div>
                <div className="blog-content">
                    <p className="date">{formattedDate}</p>
                    <h5 className="title">{title}</h5>
                    <Link to={`/blog/${id}`} className="button">Read More</Link>
                </div>
            </div>
        );
    }
}

export default BlogCard;

