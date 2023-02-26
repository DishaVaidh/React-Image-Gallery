import React, { Component } from "react";
import { Card, Modal, Button } from "react-bootstrap";

import "./ImageDetail.css";
export default class ImageDetail extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }
  render() {
    let {
      user_name,
      user_image,
      user_id,
      likes,
      image_url,
      desc,
      twitter_id,
      tags,
    } = this.props;
    return (
      <div className="mx-auto">
        <Card
          col-lg-3
          col-md-4
          col-sm-6
          onClick={() => this.setState({ showModal: true })}
        >
          <Card.Img className="card-img" variant="top" src={image_url} />
          <Card.Body>
            <div className="profile-info">
              <img src={user_image} className="body-img" alt="user" />
              <div className="user-details">
                <div className="user-name">{user_name}</div>
                <div className="user-id">{"@" + user_id}</div>
              </div>

              <div className="like-details">
                <img
                  className="like-img "
                  src={require("../../assets/likes.png")}
                  alt="Logo"
                />
                <div className="user-name">{likes}</div>
              </div>
            </div>
            <Card.Text>{desc}</Card.Text>
          </Card.Body>
        </Card>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={image_url} className="card-img" alt="Modal Image" />
            <div className="popup-modal-body">
              <div className="profile-info">
                <img src={user_image} className="body-img" alt="user" />
                <div className="user-details">
                  <div className="user-name">{user_name}</div>
                  <div className="user-id">{"@" + user_id}</div>
                </div>
                <div className="social-details">
                  <div className="social-detail-with-icon">
                    <img
                      src={require("../../assets/instagram.png")}
                      className="social-img"
                      alt="insta"
                    />
                    <div className="user-id">{"/" + user_id}</div>
                  </div>
                  {twitter_id && (
                    <div className="social-detail-with-icon">
                      <img
                        src={require("../../assets/twitter.png")}
                        className="social-img"
                        alt="twitter"
                      />
                      <div className="user-id">{"/" + twitter_id}</div>
                    </div>
                  )}
                </div>
                <div className="like-details">
                  <img
                    className="like-img "
                    src={require("../../assets/likes.png")}
                    alt="Logo"
                  />
                  <div className="user-name">{likes}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="user-name">Related tags</div>
              {tags.map((element, ind) => {
                return (
                  <span className="tag-style" key={ind}>
                    {element.title}
                  </span>
                );
              })}
            </div>
            <br />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
