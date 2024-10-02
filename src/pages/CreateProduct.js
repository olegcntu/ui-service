import React, {useEffect, useState} from 'react';
import {Form, Button, Container, ListGroup, Alert} from 'react-bootstrap';
import API_ROUTES from "../api";
const CreateProductForm = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (showSuccess) {
            setTitle('')
            setCategory('')
            setBrand('')
            setDescription('')
            setPrice('')
            setIsNew(false)
            setQuantity('')
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

        const productData = {
            title: title,
            category: category,
            brand: brand,
            description: description,
            isNew:isNew,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        };
        fetch(`${API_ROUTES.PRODUCT_SERVICE}/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Product successfully created:', data);
                const productId = data._id;
                const uploadUrl = `${API_ROUTES.PRODUCT_SERVICE}/product/upload/${productId}`;
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
                console.error('Error creating product:', error);
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

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);

        if (value === 'New Goods') {
            setIsNew(true);
        } else if (value === 'Used Goods') {
            setIsNew(false);
        }
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
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="category">
                    <Form.Label>Category:</Form.Label>
                    <h5 className="sub-title">Category</h5>
                    <div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="newGoodsCheckbox"
                                checked={category === "tablet"}
                                onChange={() => {
                                    setCategory("tablet")
                                }}
                            />
                            <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                Tablet
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="newGoodsCheckbox"
                                checked={category === "headphones"}
                                onChange={() => {
                                    setCategory("headphones")
                                }}
                            />
                            <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                Headphones
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="newGoodsCheckbox"
                                checked={category === "computerMouse"}
                                onChange={() => {
                                    setCategory("computerMouse")
                                }}
                            />
                            <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                Computer mouse
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="newGoodsCheckbox"
                                checked={category === "systemUnit"}
                                onChange={() => {
                                    setCategory("systemUnit")
                                }}
                            />
                            <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                System unit
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="newGoodsCheckbox"
                                checked={category === "ubsCord"}
                                onChange={() => {
                                    setCategory("ubsCord")
                                }}
                            />
                            <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                USB cord
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="newGoodsCheckbox"
                                checked={category === "laptop"}
                                onChange={() => {
                                    setCategory("laptop")
                                }}
                            />
                            <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                Laptop
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="usedGoodsCheckbox"
                                checked={category === "keyboard"}
                                onChange={() => {
                                    setCategory("keyboard")
                                }}
                            />
                            <label className="form-check-label" htmlFor="usedGoodsCheckbox">
                                Keyboard
                            </label>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="brand">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                                  required/>
                </Form.Group>

                <Form.Group controlId="option">
                    <Form.Label>Choose an option:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        required
                    >
                        <option value="">Choose an option</option>
                        <option value="New Goods">New Goods</option>
                        <option value="Used Goods">Used Goods</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="quantity">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                  required/>
                </Form.Group>

                <Form.Group controlId="images">
                    <Form.Label>Images:</Form.Label>
                    <Form.Control type="file" multiple onChange={handleImageChange}/>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 button">
                    Create a product
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

export default CreateProductForm;
