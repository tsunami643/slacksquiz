import React, {useState, useEffect} from 'react';
import QuestionResult from './components/QuestionResult.js';
import MyFakeTweet from './components/MyFakeTweet.js';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Apocalypses from './data/apocalypses.json';

import SlacksTweets from './data/slacks.json';
import FakeTweets from './data/fake.json';

function App() {
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);


  const [alreadyAskedQuestions, setAlreadyAskedQuestions] = useState([]);

  const [currentTweet, setCurrentTweet] = useState(SelectTweet());
  const [answerText, setAnswerText] = useState("");

  const [showingResult, setShowingResult] = useState(false)

  return (
    <Container>
      <div className="App">       
        <br/>
        <Row>
          <Col sm={12} md={6}>
              {showingResult ? 
                <QuestionResult link={currentTweet.link} fakeTweet={<MyFakeTweet tweetText={currentTweet.text} nickName="DeepSlacks" name="Deep Slacks Bot" deepFake style={{width: "100%"}}/>}/>      
              : 
                <MyFakeTweet tweetText={currentTweet.text} name="SlacksOrFake" nickName="SlacksOrFake" style={{width: "100%"}}/>
              }
              
          </Col>
          <Col sm={12} md={6}>
              <Card>
                <Card.Body>  
                  <h3>@SirActionSlacks or @DeepSlacks?</h3> 
                  <div style={{marginBottom: "5px"}}>
                    <Button disabled={showingResult} onClick={AnswerQuestion} id="slacks" style={{marginRight: "10px"}}>Slacks 👨‍</Button>
                    <Button disabled={showingResult} onClick={AnswerQuestion} id="fake" style={{marginRight: "10px"}}>Deep Slacks 🤖</Button>
                    <span style={{fontWeight: "bold"}}>{score}/{questionsAnswered}</span><br/>
                  </div>
                  {showingResult && <Button onClick={NextQuestion} id="next-question" style={{marginBottom: "10px"}}>Next Question</Button>}
                  <p>{answerText}</p>
                  <p>For millennia, humanity has always pondered how they will meet their end. Nuclear warfare. Global warming. {Apocalypses[Math.floor(Math.random() * Apocalypses.length)]}. All good candidates. But there is one possibility that stands above all others: The Robot Uprising.</p>
                  <p>Can you tell which tweets are written by Dota's own SirActionSlacks and which are simply an imitation?</p>
                </Card.Body>
              </Card>
          </Col>        
        </Row>
        
        <br/>
        <div>Created by <a href="https://twitter.com/HarryNegus">@harrynegus</a> | <a href="https://www.reddit.com/user/d2-match-bot-speaks">/u/d2-match-bot-speaks</a> with <a href="https://reactjs.org/">React</a>. Tweets grabbed using <a href="https://www.tweepy.org/">Tweepy</a>. and provided by <a href="https://twitter.com/tsunami643">@tsunami643</a></div>
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
      return {text: tweet.text.split('https')[0], link: tweet.link, answer: "fake"};//get rid of any pictures
    }else{//slacks
      var tweet = SlacksTweets[Math.floor(Math.random() * SlacksTweets.length)]
      while (alreadyAskedQuestions.map((question) => question.tweet).includes(tweet)) {
        tweet = SlacksTweets[Math.floor(Math.random() * SlacksTweets.length)]
      }
      return {text: tweet.text.split('https')[0], link: tweet.link,  answer: "slacks"};
    }
  }

  function AnswerQuestion(ev){
    setQuestionsAnswered (questionsAnswered + 1)
    alreadyAskedQuestions.push(currentTweet);
    if (ev.target.id === currentTweet.answer) {
      setScore(score + 1);
      setAnswerText("Correct!");
      setShowingResult(true);
    }else{
      setAnswerText("Wrong!");
      setShowingResult(true);
    }
  }

  function NextQuestion(ev){
    setShowingResult(false);
    setAnswerText("");
    setCurrentTweet(SelectTweet());
  }

}

export default App;
