import React, { useState, useEffect, useRef } from 'react';
import fetchQuestions from '../api/quizApi';
import '../styles/Quiz.css';

const Quiz = ({ onQuizEnd, onReset }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10); // Timer 5 minutes (300 seconds)
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const timerRef = useRef();

    useEffect(() => {
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            const { questions, currentQuestionIndex, score, timer, startTime } = JSON.parse(savedState);
            setQuestions(questions);
            setCurrentQuestionIndex(currentQuestionIndex);
            setScore(score);
            setTimer(timer);
            setStartTime(new Date(startTime));
        } else {
            const loadQuestions = async () => {
                try {
                    const fetchedQuestions = await fetchQuestions();
                    const processedQuestions = fetchedQuestions.map(question => {
                        const answers = [question.correct_answer, ...question.incorrect_answers];
                        return {
                            ...question,
                            answers: answers.sort(() => Math.random() - 0.5),
                        };
                    });
                    setQuestions(processedQuestions);
                    localStorage.setItem('quizQuestions', JSON.stringify(processedQuestions));
                } catch (error) {
                    console.error('Error fetching questions:', error);
                }
            };
            loadQuestions();
        }
    }, []);

    useEffect(() => {
        if (!isQuizEnded) {
            timerRef.current = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [isQuizEnded]);

    useEffect(() => {
        if (timer === 0) {
            setIsQuizEnded(true);
            onQuizEnd(score, questions.length - score, currentQuestionIndex, startTime, new Date());
            localStorage.removeItem('quizState');
        }
    }, [timer, onQuizEnd, score, questions.length, currentQuestionIndex, startTime]);

    useEffect(() => {
        if (!isQuizEnded) {
            const quizState = {
                questions,
                currentQuestionIndex,
                score,
                timer,
                startTime,
            };
            localStorage.setItem('quizState', JSON.stringify(quizState));
        }
    }, [questions, currentQuestionIndex, score, timer, isQuizEnded, startTime]);

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
        localStorage.removeItem('quizQuestions'); // Hapus pertanyaan dari localStorage
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
                <p className="quiz-timer">Sisa waktu: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
                <h3 className="quiz-question">{question}</h3>
                <button className="reset-button" style={{backgroundColor: 'red'}} onClick={handleReset}>Reset Kuis</button> {/* Tombol Reset */}
            </div>
            {isQuizEnded ? (
                <div>
                    <h3>Kuis Berakhir</h3>
                    <p>Benar: {score}</p>
                    <p>Salah: {questions.length - score}</p>
                    <p>Jumlah Soal: {questions.length}</p>
                    <p>Jumlah Jawaban: {currentQuestionIndex}</p> {/* Jumlah Jawaban */}
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
