# PintarKuis

## Deskripsi

PintarKuis adalah aplikasi kuis berbasis web. Disini pengguna dapat:

- Memulai kuis dengan menekan tombol start yang menginisiasi timer dan mengacak jawaban.
- Melihat satu soal pada satu waktu dengan pilihan jawaban yang diacak.
- Menyimpan status kuis di `localStorage` untuk memungkinkan melanjutkan kuis jika browser ditutup.
- Melihat hasil kuis setelah timer habis atau semua soal dijawab.
- Menyimpan riwayat kuis, termasuk skor dan tanggal mulai serta selesai kuis.

## Fitur

- **Login dan Registrasi**: Pengguna dapat mendaftar dan masuk untuk melacak hasil kuis.
- **Mulai Kuis**: Tombol untuk memulai kuis yang akan memulai timer dan mengacak jawaban.
- **Timer Kuis**: Timer yang menghitung mundur dari waktu yang ditentukan untuk setiap kuis.
- **Jawaban Pilihan Ganda**: Pilihan jawaban yang diacak setiap kali soal ditampilkan.
- **Hasil Kuis**: Menampilkan skor benar, salah, dan jumlah soal setelah kuis selesai.
- **Riwayat Kuis**: Tabel yang menampilkan riwayat kuis sebelumnya dengan tanggal mulai dan selesai.
- **Reset Kuis**: Tombol untuk mereset kuis dan kembali ke menu utama.

## Prerequisites

Untuk menjalankan proyek ini, perlu menginstal beberapa perangkat lunak berikut:

- **Node.js**: Versi terbaru dari [Node.js](https://nodejs.org/) untuk menjalankan server dan aplikasi frontend.
- **MySQL**: Sistem manajemen basis data untuk menyimpan data pengguna.

## Clone Repository

Clone repositori dengan menggunakan perintah berikut:

```bash
git clone https://github.com/percivalyan/pintarkuis.git
```

## Setup

```bash 
cd pintarkuis
```

### Backend

```bash
cd pintarkuis-backend
npm install
npm start
```

### Frontend

```bash
cd pintarkuis-frontend
npm install
npm start
```

### Query MySQL

```bash
CREATE DATABASE js_pintarkuis;

USE js_pintarkuis;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

