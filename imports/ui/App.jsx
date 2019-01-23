import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import LineTracker from './Line.jsx';

class App extends React.Component {

  generateY = (posts) => posts.map(post => post.y)

  generateX = (posts) => posts.map(post => {
    const d = new Date(post.timestamp);
    return `${post.title}-${d.getMinutes()}:${d.getSeconds()}`;
  })

  render() {
    return (
      <div>
        <h1>Welcome to Meteor!</h1>
        <LineTracker
          generateX={this.generateX}
          generateY={this.generateY}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  console.log("App withTracker");

  return {};
})(App);
