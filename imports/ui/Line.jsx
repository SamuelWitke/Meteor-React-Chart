import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Line } from 'react-chartjs-2';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Posts } from "../startup/collections";

class LineTracker extends Component {
    static propTypes = {
        generateY: PropTypes.func.isRequired,
        generateX: PropTypes.func.isRequired,
    }
    state = {
        posts: [],
    }
    handle = Meteor.subscribe('posts');
    static getDerivedStateFromProps(props) {
        if (props.posts.length > 0) {
            return {
                posts: props.posts,
            }
        }
    }
    stopSubscription = () => {
        this.handle.stop();
    }
    startSubscription = () => {
        this.handle.stop();
        this.handle = Meteor.subscribe('posts');
    }
    render() {
        const { posts, } = this.state;
        const { generateX, generateY } = this.props;
        console.log(this.state)
        const data = {
            labels: generateX(posts),
            backgroundColor: 'rgba(251, 85, 85, 0.4)',
            datasets: [
                {
                    label: 'Updating Dataset',
                    backgroundColor: '#00A0DF',
                    borderColor: '#036DB2',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: generateY(posts),
                }
            ]
        }
        return (
            <>
                <Line
                    data={data}
                    width={500}
                    height={500}
                    options={{ maintainAspectRatio: false }}
                />
                <button type="button" onClick={this.stopSubscription}> Stop </button>
                <button type="button" onClick={this.startSubscription}> Start </button>
            </>
        )
    }
}
export default withTracker(() => {
    return {
        posts: Posts.find({
            timestamp: { $gte: new Date().getTime() - 10000, $lt: new Date().getTime() + 10000, }
        }, { sort: { timestamp: 1 } }).fetch(),
    };
})(LineTracker)