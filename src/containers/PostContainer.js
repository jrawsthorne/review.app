import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';

import PostLoading from '../components/post/PostLoading';

import Post from '../components/post/Post';

class PostContainer extends React.Component {
  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    post: PropTypes.shape(),
    loaded: PropTypes.bool,
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    author: PropTypes.string.isRequired,
    permlink: PropTypes.string.isRequired,
  };
  componentDidMount() {
    const {
      loaded, author, permlink,
    } = this.props;
    if (!loaded) {
      this.props.fetchPost(
        author,
        permlink,
      );
    }
  }
  componentDidUpdate() {
    const {
      fetching, loaded, author, permlink,
    } = this.props;
    if (!loaded && !fetching) {
      this.props.fetchPost(
        author,
        permlink,
      );
    }
  }
  render() {
    const {
      loaded, failed, fetching, post,
    } = this.props;
    if (failed) return 'Sorry, there was an error fetching the post';
    if (fetching || !loaded) return <PostLoading />;
    return <Post post={post} />;
  }
}

PostContainer.defaultProps = {
  post: undefined,
  fetching: false,
  failed: false,
  loaded: false,
};

const mapStateToProps = (state, ownProps) => {
  const { author, permlink } = ownProps;
  return {
    post: _.get(state.posts.items, `@${author}/${permlink}`),
    fetching: _.get(state.posts.itemStates, `@${author}/${permlink}.fetching`),
    failed: _.get(state.posts.itemStates, `@${author}/${permlink}.failed`),
    loaded: _.get(state.posts.itemStates, `@${author}/${permlink}.loaded`),
  };
};

export default connect(mapStateToProps, { fetchPost })(PostContainer);
