/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormControl,
} from "react-bootstrap";
import products from "../sample-data/productsData";
import Rating from "../components/Rating";
import axios from "axios";
// import { Meta } from "react-helmet";

const ProductScreen = ({ match }) => {
  const [chosenQuantity, setChosenQuantity] = useState(1);

  const decrementQuantity = () => {
    if (chosenQuantity > 0) setChosenQuantity(chosenQuantity - 1);
  };

  const incrementQuantity = () => {
    setChosenQuantity(chosenQuantity + 1);
  };

  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${match.params.id}`
      );
      setProduct(data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        <i className="fas fa-arrow-left" />
        <strong> Go Back</strong>
      </Link>
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong style={{ fontWeight: "bold" }}>Price:</strong>
              <strong> ${product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong style={{ fontWeight: "bold" }}>Stock:</strong>
              <strong> {product.countInStock}</strong>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Row>
                <Col>
                  <span style={{ fontWeight: "bold" }}>Total Price:</span>
                </Col>
                <Col className="col-6">
                  ${(product.price * chosenQuantity).toFixed(2)}
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col className="col-4">
                  <span style={{ fontWeight: "bold" }}>Quantity:</span>
                </Col>
                <Col>
                  <Row>
                    <Col className="col-3">
                      <Button
                        className="btn-sm"
                        variant="light"
                        onClick={decrementQuantity}
                      >
                        <i className="fa-solid fa-minus fa-beat" />
                      </Button>
                    </Col>
                    <Col className="col-6">
                      <FormControl
                        className="form-control-sm"
                        type="number"
                        value={chosenQuantity}
                        readOnly
                      />
                    </Col>
                    <Col className="col-2">
                      <Button
                        className="btn-sm"
                        variant="light"
                        onClick={incrementQuantity}
                      >
                        <i className="fa-solid fa-plus fa-beat" />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>
                  <span style={{ fontWeight: "bold" }}>Status:</span>
                </Col>
                <Col>
                  {product.countInStock >= chosenQuantity
                    ? "Available"
                    : "Non-Available"}
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={
                    product.countInStock < chosenQuantity ||
                    chosenQuantity === 0
                  }
                >
                  ADD TO CART
                </Button>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
