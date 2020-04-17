import React, {useState, useEffect} from 'react';
import MyFakeTweet from './components/MyFakeTweet.js';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import SlacksTweets from './data/slacks.json';
import FakeTweets from './data/fake.json';

function App() {
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);


  const [alreadyAskedQuestions, setAlreadyAskedQuestions] = useState([]);

  const [currentTweet, setCurrentTweet] = useState(SelectTweet());


  const [answerText, setAnswerText] = useState("");

  return (
    <Container>
      <div className="App">
        <br/>
        <Row>
          <Col>
              <MyFakeTweet tweetText={currentTweet.text} name="SlacksOrFake" style={{width: "100%"}}/>
          </Col>
          <Col>
              <Card>
                <Card.Body>   
                  <h3>@SirActionSlacks or @DeepSlacks?</h3>
                  <p>For millennia, humanity has always pondered how they will meet their end. Nuclear warfare. Global warming. Cloud9 winning a game of Dota 2. All good candidates. But there is one possibility that stands above all others: The Robot Uprising.</p>
                  <p>Can you tell which tweets are written by Dota's own SirActionSlacks and which are simply an imitation?</p>
                  <Button onClick={AnswerQuestion} id="slacks" style={{marginRight: "10px"}}>Slacks 👨‍</Button>
                  <Button onClick={AnswerQuestion} id="fake" style={{marginRight: "10px"}}>Deep Slacks 🤖</Button>
                  <span style={{fontWeight: "bold"}}>{score}/{questionsAnswered}</span>
                  <p>{answerText}</p>
                </Card.Body>
              </Card>
          </Col>        
        </Row>
        
        <br/>
        <div>Question mark icon made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Created by <a href="https://twitter.com/HarryNegus">@harrynegus</a> | <a href="https://www.reddit.com/user/d2-match-bot-speaks">/u/d2-match-bot-speaks</a> with <a href="https://reactjs.org/">React</a>. Tweets grabbed using <a href="https://www.tweepy.org/">Tweepy</a></div>
        </div>
        <div>Credit to <a href="https://twitter.com/tsunami643">@tsunami643</a> for creating <a href="https://twitter.com/DeepSlacks">@DeepSlacks</a> and <a href="https://twitter.com/SirActionSlacks">@SirActionSlacks</a> for existing.</div>
    </Container>
  );

  function SelectTweet(){
    if (alreadyAskedQuestions.length >= 44) {
      alert(`You've answered all the questions! You got ${score}/${questionsAnswered}!`)
      setAlreadyAskedQuestions([]);
      setScore(0);
      setQuestionsAnswered(0);
    }

    var fakeOrSlacks = Math.round(Math.random())
    if (fakeOrSlacks === 0) { //fake
      var tweet = FakeTweets[Math.floor(Math.random() * FakeTweets.length)]
      while (alreadyAskedQuestions.map((question) => question.tweet).includes(tweet)) {
        tweet = FakeTweets[Math.floor(Math.random() * FakeTweets.length)]
      }
      return {text: tweet, answer: "fake"};
    }else{//slacks
      var tweet = SlacksTweets[Math.floor(Math.random() * SlacksTweets.length)]
      while (alreadyAskedQuestions.map((question) => question.tweet).includes(tweet)) {
        tweet = SlacksTweets[Math.floor(Math.random() * SlacksTweets.length)]
      }
      return {text: tweet, answer: "slacks"};
    }
  }

  function AnswerQuestion(ev){
    setQuestionsAnswered (questionsAnswered + 1)
    alreadyAskedQuestions.push(currentTweet);
    if (ev.target.id === currentTweet.answer) {
      setScore(score + 1);
      setAnswerText("Correct!");
      setCurrentTweet(SelectTweet());
    }else{
      setAnswerText("Wrong!");
      setCurrentTweet(SelectTweet());
    }
  }

}

export default App;
