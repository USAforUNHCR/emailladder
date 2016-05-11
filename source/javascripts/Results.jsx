import React                                from "react";
import Querystring                          from "query-string";
import Signup                               from "./Signup.jsx";
import R                                    from "ramda";

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Results';
        this.answers = this.props.answers;
        this.Querystring = Querystring;
        this.questions = this.props.questions;
        this.groundwork = this.props.groundwork;
        this.uid = this.Querystring.parse(location.hash).uid || false;

        this.state = {
          uid: this.uid
        }
    }

    componentWillMount() {
        
        let answersArr = this.zipAnswers(this.questions,this.answers);
        const data = this.makeAnswersData(answersArr,this.state.uid);
        this.sendData(data);
    }

    makeAnswersData(answersArr,uid){
      const data = {
        source: "CAEET Quiz",
        tags: {
          answers: answersArr,
          send_email: 0
        }
      };
      uid ? data.externalId = uid : null;
      return data;
    }

    zipAnswers(questions,answers) {
      const answerZip = (question,answer) => question.answers[answer];
      return R.zipWith(answerZip, this.questions, this.answers);
    }

    sendData(data) {
      this.groundwork.supporters.create(data)
      .then((response) => console.log(response))
      .catch((response) => console.log(response));
    }

    handleEmojiClick(uid){
      const data = {
        source: "CAEET Quiz Emoji",
        tags: {
          send_email: 0
        }
      };
      uid ? data.externalId = uid : null;
      this.sendData(data);
    }

    render() {
        const resultsZip = R.zipWith((question,answer) => {
          question.yourAns = answer;
          return question;
        })
        const mapWithIndex = R.addIndex(R.map);
        const resultEl = mapWithIndex((question,index) => question.yourAns == question.a ? correctEl(question,index) : wrongEl(question,index));

        const correctEl = (question,index) => {
          return (
            <div key={index} className="answer_div">
              <p className="question_text">The Question was: {question.q}</p>
              <div className="correct_answer">
                <p>The Answer was: {question.answers[question.a]}</p>
                <p>You were correct!</p>
              </div>
            </div>
            )
        }

        const wrongEl = (question,index) => {
          return (
            <div key={index} className="answer_div">
              <p className="question_text">The Question was: {question.q}</p>
              <div className="wrong_answer">
                <p>The Answer was: {question.answers[question.a]}</p>
                <p>Your Answer was: {question.answers[question.yourAns]}</p>
                <p>You were incorrect :(</p>
              </div>
            </div>
            )
        }

        const results = R.compose(resultEl,resultsZip)

        return (
          <div className="results_container">
            <div className="answers_container">
              {results(this.questions,this.answers)}
             </div>
            <div className="emoji_container">
              <p className="emoji_text">
                Thanks for taking the Quiz! Click on the link below to get your free refugee emoji keyboard.
              </p>
              <a href="http://bit.ly/1RBfbNA" target="_blank" onClick={() => this.handleEmojiClick(this.state.uid)}>Get Emojis!</a>
            </div>
          </div>
             )
    }
}

export default Results;
