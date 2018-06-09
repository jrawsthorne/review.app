import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import BodyShort from './BodyShort';

import './PostPreview.less';

const PostPreview = ({
  url,
  backdropPath,
  overview,
  title,
  post,
}) => {
  const options = {
    year: 'numeric', month: 'long', day: 'numeric',
  };
  /* human readable date */
  let created = new Date(post.created);
  created = created.toLocaleDateString('en-GB', options);
  return (
    <React.Fragment>
      <Link to={url}>
        {/* coloured background if doesn't exist */}
        <div className="PostPreviewBackdrop" style={{ backgroundImage: `${backdropPath && `url(https://image.tmdb.org/t/p/w780${backdropPath})`}`, backgroundColor: '#444' }} />
      </Link>
      <div className="PostPreviewBody">
        <h2 style={{ marginBottom: 0 }}>
          <Link to={url}>{title}</Link>
        </h2>
        <p style={{ marginBottom: '1em' }}>
          <Icon style={{ fontSize: 12, marginRight: 5 }} type="clock-circle-o" /> {created} - <Link to={`/@${post.author}`}>{post.author}</Link>
        </p>
        <BodyShort body={overview} /> <Link to={url}>Read more</Link>
      </div>
    </React.Fragment>
  );
};

PostPreview.propTypes = {
  overview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  backdropPath: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  post: PropTypes.shape().isRequired,
};

export default PostPreview;