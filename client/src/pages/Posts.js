import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import PostFeed from "../components/PostFeed";
import PostForm from "../components/PostForm";
import { getPosts } from "../actions/posts";

class PostsPage extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
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
