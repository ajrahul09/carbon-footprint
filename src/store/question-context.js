import React from 'react'

const QuestionContext = React.createContext({
    questionnaireState: {},
    updateAnswer: val => {},
    updateStartQuestionnaire: val => {},
    handleOnSubmit: val => {},
    resetQuestionnaire: () => {}
})

export default QuestionContext;