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
  props: Props;

  info(): {
    impressions: number,
    conversions: number,
    revenue: number,
  } {
    const { logs } = this.props;
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
    const { user, logs } = this.props;
    const { impressions, conversions, revenue } = this.info();

    return (
      <div className="user-card">
        <Face user={user} />
        <ConversionsGraph logs={logs.filter((l: Log): boolean => l.type === 'conversion')} />
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
