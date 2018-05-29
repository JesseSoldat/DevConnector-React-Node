import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import { getPosts } from "../actions/posts";

class PostsPage extends Component {
  render() {
    const { posts, loading } = this.props.post;
    console.log("posts", posts);

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <h1>Have Posts</h1>;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="col-md-12">{postContent}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });

PostsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getPosts })(PostsPage);
