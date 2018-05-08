import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/postActions';

import Loading from '../misc/Loading';

import Post from '../post/Post';

class PostContainer extends React.Component {
    static propTypes = {
      fetchPost: PropTypes.func.isRequired,
      post: PropTypes.shape(),
      loaded: PropTypes.bool,
      fetching: PropTypes.bool,
      failed: PropTypes.bool,
      author: PropTypes.string.isRequired,
      permlink: PropTypes.string.isRequired,
      onLoad: PropTypes.func.isRequired,
      noLoading: PropTypes.bool.isRequired,
    };
    componentDidMount() {
      const {
        fetching, loaded, failed, author, permlink, onLoad, post,
      } = this.props;
      if (!loaded) {
        this.props.fetchPost(
          author,
          permlink,
        );
      } else {
        onLoad(post, { fetching, loaded, failed });
      }
    }
    componentWillReceiveProps(nextProps) {
      const {
        fetching, loaded, failed, author, permlink, onLoad, post,
      } = nextProps;
      if (!loaded && !fetching) {
        this.props.fetchPost(
          author,
          permlink,
        );
      }
      onLoad(post, { fetching, loaded, failed });
    }
    render() {
      const {
        loaded, failed, fetching, post, noLoading,
      } = this.props;
      if (failed) return 'Sorry, there was an error fetching the post';
      if (fetching || !loaded) return noLoading ? '' : <Loading />;
      return <Post body={post.body} title={post.title} />;
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
