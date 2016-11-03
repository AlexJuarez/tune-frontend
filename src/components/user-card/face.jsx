// @flow

import React, { Component } from 'react';
import User from './../../records/User';

require('./user-face.less');

type Props = {
  user: User,
};

type State = {
  imageError: boolean,
};

export default class UserFace extends Component {
  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      imageError: false,
    };
  }

  props: Props;
  state: State;

  renderUserAvatar(): ?React.Element<*> {
    const { user } = this.props;
    if (user.avatar && !this.state.imageError) {
      return (
        <img
          onError={() => { this.setState({ imageError: true }); }}
          src={user.avatar}
          alt={user.name}
        />
      );
    }

    return undefined;
  }

  render(): React.Element<*> {
    const { user } = this.props;

    return (
      <div>
        <div className="user-avatar">
          {this.renderUserAvatar()}
          <div className="user-initial">{user.name.substr(0, 1)}</div>
        </div>
        <div className="user-name">{user.name}</div>
        <div className="user-occupation">{user.occupation}</div>
      </div>
    );
  }
}
