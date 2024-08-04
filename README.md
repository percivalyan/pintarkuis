# PintarKuis

## Deskripsi

PintarKuis adalah aplikasi kuis berbasis web.

## Prerequisites

Untuk menjalankan proyek ini, perlu menginstal:

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
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) DEFAULT NULL
);
```

