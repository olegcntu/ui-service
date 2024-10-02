import React, {useEffect, useState} from 'react';
import {Form, Button, Container, ListGroup, Alert} from 'react-bootstrap';
import API_ROUTES from "../api";

const AdminBlog = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (showSuccess) {
            setTitle('')
            setCategory('')
            setDescription('')
            setImages([])

            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showSuccess]);
    const handleSubmit = (event) => {
        event.preventDefault();

        const blog = {
            title: title,
            category: category,
            description: description,
        };
        fetch(`${API_ROUTES.BLOG_SERVICE}/blog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(blog)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('blog successfully created:', data);
                const productId = data._id;
                console.log(productId)
                const uploadUrl = `${API_ROUTES.BLOG_SERVICE}/blog/upload/${productId}`;
                const uploadFormData = new FormData();
                images.forEach((image) => {
                    uploadFormData.append('images', image);
                });
                fetch(uploadUrl, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: uploadFormData,
                })
                    .then((uploadResponse) => {
                        console.log('Pictures uploaded successfully:', uploadResponse);
                        setShowSuccess(true);
                    })
                    .catch((uploadError) => {
                        console.error('Error loading images:', uploadError);
                    });
            })
            .catch((error) => {
                console.error('Error creating blog:', error);
            });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages([...images, ...files]);
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };


    return (
        <Container className="my-4">
            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                    Product successfully created!
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>title:</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </Form.Group>


                <Form.Group controlId="brand">
                    <Form.Label>category:</Form.Label>
                    <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>description:</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                                  required
                                  style={{height: '300px'}}/>
                </Form.Group>

                <Form.Group controlId="images">
                    <Form.Label>Images:</Form.Label>
                    <Form.Control type="file" multiple onChange={handleImageChange}/>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 button">
                    Create Blog
                </Button>

            </Form>

            {images.length > 0 && (
                <ListGroup className="mt-4">
                    <ListGroup.Item variant="info">Pictures that are uploaded:</ListGroup.Item>
                    <div className="d-flex flex-wrap">
                        {images.map((image, index) => (
                            <div key={index} className="m-2">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Image ${index}`}
                                    className="img-thumbnail"
                                    style={{width: '200px', height: '200px', objectFit: 'contain'}}
                                />
                                <Button variant="danger" size="sm" className="mt-2"
                                        onClick={() => handleImageRemove(index)}>
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                </ListGroup>
            )}
        </Container>
    );
};

export default AdminBlog;
