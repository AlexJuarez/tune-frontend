// @flow

import React, { Component } from 'react';
import Log from './../../records/Log';

import { VictoryLine } from 'victory';
import * as d3 from 'd3';

require('./user-conversions-graph.less');

type Props = {
  logs: Array<Log>,
};

function parseLogsIntoHistogram(logs: Array<Log>): Array<number> {
  return d3.histogram()
    .value((l: Log): Date => l.time)(logs)
    .map((arr: Array<Log>): number => arr.length);
}

function formatTimeLabel(date: Date): string {
  return `${date.getMonth()}/${date.getDay()}`;
}

export default class ConversionsGraph extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.logs.length !== nextProps.logs.length;
  }

  render(): ?React.Element<*> {
    if (this.props.logs == null || !this.props.logs.length) {
      return null;
    }

    const logs = this.props.logs.filter((l: Log): boolean => l.type === 'conversion');
    const extent = d3.extent(logs, (l: Log): Date => l.time);

    return (
      <div className="user-conversions-graph">
        <VictoryLine
          height={55}
          width={160}
          padding={0}
          data={parseLogsIntoHistogram(logs)}
        />
        <div className="user-conversions-graph-label">
          Conversions {formatTimeLabel(extent[0])} - {formatTimeLabel(extent[1])}
        </div>
      </div>
    );
  }
}
