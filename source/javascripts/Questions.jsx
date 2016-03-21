import React                                from "react";
import Rx                                   from "rx";
import R                                    from "ramda";

class QuizQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QuizQuestions';
        this.questions = this.props.questions;
        this.unanswered = R.whereEq({answered: false});
        this.unansweredQuestions = R.filter(this.unanswered);
    }

    handleAnswer(event,question){
      this.props.handleAnswer(parseInt(event.target.id), question);
    }

    render() {
      const unanswered = this.unanswered;
      const unansweredQuestions = this.unansweredQuestions; 
      const firstUnanswered = R.compose(R.head, unansweredQuestions);

      const Question = (questions) => createQuestionEl(firstUnanswered(questions));

      const createQuestionEl = (question) => {
        return (
          <div className="question_container" onClick={(e) => this.handleAnswer(e,question.q)}>
            <p className="question_text">
              {question.q}
            </p>
            <div className="answers_container">
              {createAnswers(question.answers)}
            </div>
          </div>
        )
      }

      const createAnswers = (answers) => {
        const mapWithIndex = R.addIndex(R.map);
        return mapWithIndex((val,idx) => createAnswerEl(val,idx), answers);
      }

      const createAnswerEl = (answer,index) => {
        return(
          <div className="answer_container" key={index} >
            <button className="answer_button" id={index} value={answer}>{answer}</button>
        </div>
        )
      }
        return <div>{Question(this.questions)}</div>;
    }
}
export default QuizQuestions;
