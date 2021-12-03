import React, { useState, useReducer } from 'react'

import QuestionContext from './question-context'

const quesInitialState = {
    answers: {},
    score: 0,
    startQuestionnaire: false,
    endQuestionnaire: false
}

const questionnaireReducer = (state, action) => {
    if (action.type === 'ANSWER_UPDATE') {
        return { ...state, answers: action.val }
    }
    else if (action.type === 'START_QUESTIONNAIRE') {
        return { ...state, startQuestionnaire: true }
    }
    else if (action.type === 'SUBMIT_QUESTIONNAIRE') {
        return { ...state, score: action.val, endQuestionnaire: true }
    }
    else if (action.type === 'RESET_QUESTIONNAIRE') {
        return quesInitialState;
    }
}

const QuestionProvider = props => {

    const [questionnaireState, questionnaireDispatch] = useReducer(questionnaireReducer, quesInitialState);

    const updateAnswer = val => {
        questionnaireDispatch({ type: 'ANSWER_UPDATE', val: val });
    }

    const updateStartQuestionnaire = val => {
        questionnaireDispatch({ type: 'START_QUESTIONNAIRE', val: val });
    }

    const handleOnSubmit = val => {
        questionnaireDispatch({ type: 'SUBMIT_QUESTIONNAIRE', val: val });
    }

    const resetQuestionnaire = () => {
        questionnaireDispatch({ type: 'RESET_QUESTIONNAIRE' });
    }

    const questionContext = {
        questionnaireState: questionnaireState,
        updateAnswer: updateAnswer,
        updateStartQuestionnaire: updateStartQuestionnaire,
        handleOnSubmit: handleOnSubmit,
        resetQuestionnaire: resetQuestionnaire
    }

    return <QuestionContext.Provider value={questionContext}>
        {props.children}
    </QuestionContext.Provider>
}

export default QuestionProvider;