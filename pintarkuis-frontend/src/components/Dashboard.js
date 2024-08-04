import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [quizResults, setQuizResults] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizHistory, setQuizHistory] = useState([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('quizHistory');
        if (savedHistory) {
            setQuizHistory(JSON.parse(savedHistory));
        }

        const savedQuizState = localStorage.getItem('quizState');
        if (savedQuizState) {
            setQuizStarted(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
    }, [quizHistory]);

    const handleQuizStart = () => {
        localStorage.removeItem('quizState');
        localStorage.removeItem('quizQuestions');
        setQuizResults(null);
        setQuizStarted(true);
    };

    const handleQuizEnd = (correct, incorrect, attempted, startTime, endTime) => {
        const newHistoryEntry = { correct, incorrect, attempted, startTime, endTime };
        setQuizResults(newHistoryEntry);
        setQuizStarted(false);
        setQuizHistory(prevHistory => [...prevHistory, newHistoryEntry]);
    };

    const handleReset = () => {
        setQuizResults(null);
        setQuizStarted(false);
        localStorage.removeItem('quizState');
        localStorage.removeItem('quizQuestions');
    };

    const handleDelete = (index) => {
        const updatedHistory = quizHistory.filter((_, i) => i !== index);
        setQuizHistory(updatedHistory);
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>
            {!quizStarted ? (
                <button onClick={handleQuizStart}>Start Kuis</button>
            ) : (
                <Quiz onQuizEnd={handleQuizEnd} onReset={handleReset} />
            )}
            {quizResults && (
                <div>
                    <h3>Hasil Kuis</h3>
                    <p>Benar: {quizResults.correct}</p>
                    <p>Salah: {quizResults.attempted - quizResults.correct}</p>
                    <p>Jumlah Jawaban yang Dijawab: {quizResults.attempted}</p>
                </div>
            )}

            <div className="quiz-history">
                <h3>Riwayat Kuis</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Skor Benar</th>
                            <th>Skor Salah</th>
                            <th>Jumlah Soal</th>
                            <th>Jumlah Jawaban yang Dijawab</th>
                            <th>Tanggal Mulai</th>
                            <th>Tanggal Selesai</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizHistory.length > 0 ? (
                            quizHistory.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.correct}</td>
                                    <td>{entry.attempted - entry.correct}</td>
                                    <td>15</td>
                                    <td>{entry.attempted}</td>
                                    <td>{new Date(entry.startTime).toLocaleString()}</td>
                                    <td>{new Date(entry.endTime).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">Belum ada riwayat kuis.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
