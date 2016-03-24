import React                                from "react";
import Querystring                          from "query-string";
import QuizResults                          from "Results.jsx";
import QuizQuestions                        from "Questions.jsx";
import R                                    from "ramda";

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.groundwork = this.props.groundwork;
        this.identified = Querystring.parse(this.props.location.search).uid ? true : false;
        this.uid = querystring.parse(this.props.location.search).uid;
        this.displayName = 'Quiz';
        this.handleAnswer = this.handleAnswer.bind(this);

        this.unanswered = R.whereEq({answered: false});
        this.unansweredQuestions = R.filter(this.unanswered);

        this.state = {
          questions: [
            {
              q: "How many people are currently displaced around the world?",
              answers:[ "60 Million","28 Million", "22 Million", "88 Million"],
              a: 0,
              answered: false
            },
            {
              q: "True or False, 50% of all refugees are women and children",
              answers:["True", "False"],
              a: 0,
              answered: false
            },
            {
              q: "What percent of refugee children are in primary school?",
              answers:[ "20%", "50%", "100%", "80%"],
              a: 1,
              answered: false
            },
            {
              q: "Which country currently has a refugee crisis?",
              answers:["Syria", "Ukraine", "South Sudan", "All of the above"],
              a: 3,
              answered: false
            }
          ],
          answersIdx: []
        }
    }

    handleAnswer(answerIndex,questionString) {
      this.setAnswer(answerIndex);
      this.completeQuestion(questionString);
    }

    setAnswer(answerIndex) {
      let nextAnswersIdx = Array.prototype.map.call(this.state.answersIdx, (answer) =>  answer);
      nextAnswersIdx.push(answerIndex);
      this.setState({answersIdx: nextAnswersIdx});
    }

    completeQuestion(questionString) {
      let currentQuestion = this.state.questions.findIndex((element) => element.q === questionString);
      let nextQuestions = this.state.questions;
      nextQuestions[currentQuestion].answered = true;
      this.setState({questions: nextQuestions});
    }

    render() {

        const unansweredQuestions = (questions) => this.unansweredQuestions(questions);
        const checkComplete = (questions) => unansweredQuestions(questions).length === 0;
        let qNum = ((this.state.questions.length) - (unansweredQuestions(this.state.questions).length) + 1);

        return (
        <div className="quiz_page_container">
          {!checkComplete(this.state.questions) ? <QuizQuestions qNum={qNum} handleAnswer={this.handleAnswer} questions={unansweredQuestions(this.state.questions)}/> : <QuizResults groundwork={this.groundwork} questions={this.state.questions} answers={this.state.answersIdx}/> }
        </div>
        )
    }
}

export default Quiz;
