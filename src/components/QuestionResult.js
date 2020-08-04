import React, {useEffect} from 'react';
import {Tweet} from 'react-twitter-widgets';
import {Card} from 'react-bootstrap';

function QuestionResult(props){
    if (props.link) {
        var splitLink = props.link.split("/")
        return (
            <Card>
                <Card.Body>
                <Tweet
                    tweetId={`${splitLink[splitLink.length - 1]}`}//last element
                />

                </Card.Body>
            </Card>
        )
    }else{
        return props.fakeTweet;
    }
}

export default QuestionResult;