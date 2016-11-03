// @flow

import React from 'react';
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

export default function (props: Props): ?React.Element<*> {
  if (props.logs == null || !props.logs.length) {
    return null;
  }

  const extent = d3.extent(props.logs, (l: Log): Date => l.time);

  return (
    <div className="user-conversions-graph">
      <VictoryLine
        height={55}
        width={160}
        padding={0}
        data={parseLogsIntoHistogram(props.logs)}
      />
      <div className="user-conversions-graph-label">
        Conversions {formatTimeLabel(extent[0])} - {formatTimeLabel(extent[1])}
      </div>
    </div>
  );
}
