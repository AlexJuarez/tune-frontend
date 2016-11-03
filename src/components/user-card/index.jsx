// @flow

import React, { Component } from 'react';
import User from './../../records/User';
import Log from './../../records/Log';

import Face from './face';
import ConversionsGraph from './conversionsGraph';

require('./user-card.less');

type Props = {
  user: User,
  logs: Array<Log>,
};

function formatRevenue(revenue: number): string {
  return revenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export default class UserCard extends Component {
  constructor(props: Props, context: Object) {
    super(props, context);

    this.logs = [];
  }

  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.user !== this.props.user ||
      this.props.logs.length !== nextProps.logs.length;
  }

  logs: Array<Log>;

  getLogs(): Array<Log> {
    if (!this.logs.length && this.props.logs.length) {
      const u = this.props.user;
      this.logs = this.props.logs.filter((l: Log): boolean => l.user_id === u.id);
    }

    return this.logs;
  }

  info(): {
    impressions: number,
    conversions: number,
    revenue: number,
  } {
    const logs = this.getLogs();
    let impressions = 0;
    let conversions = 0;
    let revenue = 0;

    for (let i = 0, log = logs[i]; i < logs.length; i++) {
      if (log.type === 'impression') {
        impressions++;
      } else if (log.type === 'conversion') {
        conversions++;
      }

      revenue += log.revenue;
    }

    return {
      impressions,
      conversions,
      revenue,
    };
  }

  render(): React.Element<*> {
    const { user } = this.props;
    const { impressions, conversions, revenue } = this.info();

    const logs = this.getLogs();

    return (
      <div className="user-card">
        <Face user={user} />
        <ConversionsGraph logs={logs} />
        <div className="user-card-info">
          <div className="impressions">{impressions}</div>
          <div className="subtitle">impressions</div>
          <div className="conversions">{conversions}</div>
          <div className="subtitle">conversions</div>
          <div className="revenue">&#36;{formatRevenue(revenue)}</div>
        </div>
      </div>
    );
  }
}
