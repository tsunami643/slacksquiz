import React from 'react';
import {TwitterTweetEmbed} from 'react-twitter-embed';

function QuestionResult(props){
    if (props.link) {
        var splitLink = props.link.split("/")
        return <TwitterTweetEmbed
            tweetId={`${splitLink[splitLink.length - 1]}`}//last element
        />
    }else{
        return props.fakeTweet;
    }
}

export default QuestionResult;