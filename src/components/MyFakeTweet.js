import React, {useEffect} from 'react';
import QuestionMarkImage from '../img/question.png';
import DeepSlacksImage from '../img/deepslacks.jpg';

import {Card} from 'react-bootstrap';

import FakeTweet from 'fake-tweet';
import 'fake-tweet/build/index.css';


function MyFakeTweet(props){


    const config = {
        user: {
          nickname: `${props.nickName}`,
          name: `${props.name}`,
          avatar: !props.deepFake ? QuestionMarkImage : DeepSlacksImage,
          verified: false,
          locked: false
        },
        display: "default",
        text: `${props.tweetText}`,
        image: "",
        date: `${new Date().toDateString()}`,
        app: "Twitter for iPhone",
        retweets: 322,
        likes: 10000
    };

    return (
        <Card>
            <Card.Body>
            <FakeTweet style={{width: "100%"}} config={config}/>
            </Card.Body>
        </Card>
    )
}

export default MyFakeTweet;