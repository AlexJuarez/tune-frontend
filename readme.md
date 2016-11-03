# [Tune frontend][1]

This is a solution to the tune frontend challenge. In this readme, I will describe the technologies and patterns used to design this solution. Starting broadly, this solution uses Webpack, React, Redux, LocalStorage, Immutablejs, Victory, flowtype and eslint. To understand where these technologies are used lets talk about the app architecture.

## Data Management w/ Redux

With Redux, this app has a state tree that looks like
```javascript
{
  queries: {
    numQueries: 0,
    items: Array<Query>
  },
  users: Array<User>,
  logs: Array<Log>
}
```
*flowtype definitions [Query][2], [User][3], [Log][4]

The queries object is related to data fetching/ catching with redux in an elegant way. And users/ logs corresponds to the json blobs given.

On application start, Query events to get users and logs are dispatched. Each event has a unique ID and allows us to asynchronously manage our data in a sensible way. Refer to [Queries][5] and [Query][6] for implementation specifics. By using a Generic Query and Action approach we can generate Queries in a standard way while still resolving to a specific action.

In practice a query does these things.

- Starting with a fetchUsers or fetchLogs Action => calls a generic fetch with specific url
  - broadcasts a QUERY_STARTED event that contains the unique queryId and the url
  - as well as kicks off the async request for the json blob (there are two possible outcomes: success or failure)
    - on success a query finished event will be broadcast with the id, url and data
    - on failure a query finished event will be broadcast with the id, url and err.message

By broadcasting all of our states, we can add ui interactivity based on the outcomes of these events and sanity checks so that the ui does not end up in a bad state. Additionally, the outcome of each query is stored in the state tree so calls to the server are cached.

Finally, the folder structure is fairly standard for a react-redux app. With actions, reducers and store containing the important state management logic.

## Sensible Componentization w/ React

When approaching a UI problem I look for common design patterns that would lend themselves to good separation. The component tree for this application is simple and looks like:

- A UserList that renders some number of UserCards
  - UserCard that manages static user info, computed user properties (eg impressions/conversions), and the conversions graph.

By taking advantage of [shouldComponentUpdate][7] we can optimize our UI to perform updates to the DOM only when absolutely necessary. For example, an individual user card only needs to update when the user info changes or the logs change. Thanks to the fact that User is an immutable object we can use an equality comparision to check for [change][8] in an efficient way.

## Graphing with [Victory][9]

Before starting this challenge, I was not familiar with Victory. However, its design patterns are very similar to other approaches currently under development at Facebook. The first step to creating the desired line chart was to format the data using d3.histogram, which resulted in a array of values corresponding to the number of conversions per time period. By managing the data first the resulting VictoryLine render code is very clean.

```javascript
<VictoryLine
  height={55}
  width={160}
  padding={0}
  data={data}
/>
```

# Running locally

To get started you will need node 5 or greater
- First run `npm install` in the root project folder.
- Then to start a development server run `npm start`, `node server.js` and browse to http://localhost:8080/

- To start the more productiony version run `npm run build`, `node server.js` and browse to http://localhost:3000/

[1]: https://mighty-escarpment-34432.herokuapp.com/
[2]: https://github.com/AlexJuarez/tune-frontend/blob/master/src/reducers/query.js#L12
[3]: https://github.com/AlexJuarez/tune-frontend/blob/master/src/records/User.js
[4]: https://github.com/AlexJuarez/tune-frontend/blob/master/src/records/Log.js
[5]: https://github.com/AlexJuarez/tune-frontend/blob/master/src/reducers/queries.js
[6]: https://github.com/AlexJuarez/tune-frontend/blob/master/src/reducers/query.js
[7]: https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate
[8]: https://github.com/AlexJuarez/tune-frontend/blob/master/src/components/user-card/index.jsx#L31
[9]: https://github.com/FormidableLabs/victory