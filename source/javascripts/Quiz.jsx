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
              q: "True or False, climate change leads to more refugees. ",
              answers:[ "True","False",],
              a: 0,
              answered: false
            },
            {
              q: "How many people are currently displaced around the world?",
              answers:["60 Million","28 Million","22 Million","88 Million"],
              a: 0,
              answered: false
            },
            {
              q: "Which of the following is a direct result of climate change that leads to conflict?",
              answers:["Lack of drinkable water","Crops drying up","Livestock Dying","All of the above"],
              a: 3,
              answered: false
            },
            {
              q: "Which country currently has a refugee crisis?",
              answers:["Syria", "Ukraine", "Colombia", "All of the above"],
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
        return (
        <div className="quiz_page_container">Quiz
          {!checkComplete(this.state.questions) ? <QuizQuestions handleAnswer={this.handleAnswer} questions={unansweredQuestions(this.state.questions)}/> : <QuizResults questions={this.state.questions} answers={this.state.answersIdx}/> }
        </div>
        )
    }
}

export default Quiz;
