// @flow
/* eslint camelcase: "off" */

export default class Log {
  user_id: number;
  type: 'conversion' | 'impression';
  revenue: number;
  time: Date;

  constructor(args: Object) {
    this.user_id = args.user_id;
    this.type = args.type;
    this.revenue = args.revenue == null ? 0 : args.revenue;
    this.time = new Date(args.time);
  }
}
