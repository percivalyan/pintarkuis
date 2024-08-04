import React, { useState } from 'react';
import Quiz from './Quiz';
import '../styles/global.css'; // Import global styles

const Dashboard = () => {
    const [quizResults, setQuizResults] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizHistory, setQuizHistory] = useState([]);

    const handleQuizStart = () => {
        // Hapus status kuis lama sebelum memulai kuis baru
        localStorage.removeItem('quizState');
        setQuizResults(null);
        setQuizStarted(true);
    };

    const handleQuizEnd = (correct, incorrect, attempted, startTime, endTime) => {
        setQuizResults({ correct, incorrect, attempted });
        setQuizStarted(false); // Reset untuk memungkinkan start ulang

        // Tambah riwayat kuis
        setQuizHistory(prevHistory => [
            ...prevHistory,
            { correct, incorrect, attempted, startTime, endTime }
        ]);
    };

    const handleReset = () => {
        setQuizResults(null);
        setQuizStarted(false); // Mengembalikan ke menu utama
        // Reset riwayat jika perlu
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>
            {!quizStarted ? (
                <button onClick={handleQuizStart}>Start Kuis</button>
            ) : (
                <Quiz onQuizEnd={handleQuizEnd} onReset={handleReset} /> // Pass handleReset
            )}
            {quizResults && (
                <div>
                    <h3>Hasil Kuis</h3>
                    <p>Benar: {quizResults.correct}</p>
                    <p>Salah: {quizResults.incorrect}</p>
                    <p>Jumlah Soal: {quizResults.attempted}</p>
                    <button onClick={handleReset}>Reset Kuis</button> {/* Tombol Reset */}
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
                            <th>Tanggal Mulai</th>
                            <th>Tanggal Selesai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizHistory.length > 0 ? (
                            quizHistory.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.correct}</td>
                                    <td>{entry.incorrect}</td>
                                    <td>{entry.attempted}</td>
                                    <td>{new Date(entry.startTime).toLocaleString()}</td>
                                    <td>{new Date(entry.endTime).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Belum ada riwayat kuis.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
