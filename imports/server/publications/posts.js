
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../startup/collections/index';


Meteor.startup(() => {
    if(!Meteor.isServer) return;
    Meteor.publish('posts', () => Posts.find());

    function getTitle() {
        return `Post ${Posts.find().count()}`.toUpperCase();
    }
    if (Posts.find().count() === 0) {
        for (let i = 0; i < 20; i += 1) {
            Posts.insert({
                title: getTitle(),
                timestamp: new Date().getTime(),
                y: 100 + Math.round(5 + Math.random() * (-5 - 5)),
            });
        }
    }

    setInterval(Meteor.bindEnvironment(() => {
        const yVal = 100;
        Posts.insert({
            y: yVal + Math.round(5 + Math.random() * (-5 - 5)),
            x: new Date(),
            title: getTitle(),
            timestamp: new Date().getTime(),
        });
        /*
       Posts.find().fetch().forEach(post => {
         Posts.update(post._id, {
           $set: {
             y: yVal +  Math.round(5 + Math.random() *(-5-5)),
             x: new Date(),
           },
         });
       });
         */
        console.log('Post Update');
    }), 1 * 1000);
});
