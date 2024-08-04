import React, { useState, useEffect } from 'react';
import fetchQuestions from '../api/quizApi';
import '../styles/global.css'; // Import global styles
import '../styles/quiz.css'; // Import quiz-specific styles

const Quiz = ({ onQuizEnd, onReset }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(300); // Timer 5 menit
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [startTime, setStartTime] = useState(new Date());

    useEffect(() => {
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            const { questions, currentQuestionIndex, score, timer } = JSON.parse(savedState);
            setQuestions(questions);
            setCurrentQuestionIndex(currentQuestionIndex);
            setScore(score);
            setTimer(timer);
        } else {
            const loadQuestions = async () => {
                try {
                    const fetchedQuestions = await fetchQuestions();
                    if (fetchedQuestions.length > 0) {
                        const processedQuestions = fetchedQuestions.map(question => {
                            const answers = [question.correct_answer, ...question.incorrect_answers];
                            return {
                                ...question,
                                answers: answers.sort(() => Math.random() - 0.5),
                            };
                        });
                        setQuestions(processedQuestions);
                    } else {
                        console.error('No questions fetched');
                    }
                } catch (error) {
                    console.error('Error fetching questions:', error);
                }
            };
            loadQuestions();
        }
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setIsQuizEnded(true);
            onQuizEnd(score, questions.length - score, questions.length, startTime, new Date());
            localStorage.removeItem('quizState');
        }
        const timerId = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timer, onQuizEnd, score, questions.length, currentQuestionIndex, startTime]);

    useEffect(() => {
        if (!isQuizEnded) {
            const quizState = {
                questions,
                currentQuestionIndex,
                score,
                timer,
            };
            localStorage.setItem('quizState', JSON.stringify(quizState));
        }
    }, [questions, currentQuestionIndex, score, timer, isQuizEnded]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setIsQuizEnded(true);
            onQuizEnd(score, questions.length - score, questions.length, startTime, new Date());
            localStorage.removeItem('quizState');
        }
    };

    const handleReset = () => {
        localStorage.removeItem('quizState'); // Hapus status kuis dari localStorage
        onReset(); // Memanggil fungsi reset dari props
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        return <div>No questions available.</div>;
    }

    const { question, correct_answer, answers } = currentQuestion;

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <p className="quiz-timer">Sisa waktu: {Math.floor(timer / 60)}:{timer % 60}</p>
                <h3 className="quiz-question">{question}</h3>
                <button className="reset-button" onClick={handleReset}>Reset Kuis</button> {/* Tombol Reset */}
            </div>
            {isQuizEnded ? (
                <div>
                    <h3>Kuis Berakhir</h3>
                    <p>Benar: {score}</p>
                    <p>Salah: {questions.length - score}</p>
                    <p>Jumlah Soal: {questions.length}</p>
                </div>
            ) : (
                <div className="quiz-buttons">
                    {answers && answers.length > 0 ? (
                        answers.map((answer, index) => (
                            <button key={index} onClick={() => handleAnswer(answer === correct_answer)}>
                                {answer}
                            </button>
                        ))
                    ) : (
                        <p>Loading answers...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
