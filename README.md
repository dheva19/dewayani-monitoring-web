# 🕷️ Dewayani Monitoring Web

Dewayani Monitoring Web adalah aplikasi *dashboard* berbasis **Next.js** yang berfungsi sebagai antarmuka pemantauan dan kontrol terpusat untuk **Robot Hexapod SAR Dewayani**. Melalui *dashboard* ini, operator dapat melihat *live feed* kamera, memantau telemetri dari 13 sensor jarak, mengecek orientasi spasial robot, serta mengirimkan perintah pergerakan (kinematika) secara *real-time*.

## 🚀 Fitur Utama

### 1. 📹 Robot Vision (Live YOLO Feed)
* Menampilkan *streaming* video langsung dari kamera robot.
* Digunakan untuk pemantauan visual, siap diintegrasikan dengan deteksi objek (YOLO) untuk kebutuhan pencarian dan penyelamatan.

### 2. 📡 Monitoring Sensor Ultrasonic (7 Sensor Proximity)
Memantau jarak halangan di sekitar robot secara *real-time* (dalam cm) melalui visualisasi grafik batang:
* US-1 · Depan
* US-2 · Kanan Depan
* US-3 · Kanan Belakang
* US-4 · Belakang
* US-5 · Kiri Belakang
* US-6 · Kiri Depan
* US-7 · Gripper (Mendeteksi objek di jangkauan capit)

### 3. 📐 Sensor VL (6 Sensor Jarak Presisi)
Membaca data tingkat presisi tinggi dari subsistem sensor inframerah/ToF pada rentang jarak 0–200:
* VL-1 · Depan | VL-2 · Kanan Depan
* VL-3 · Kanan Belakang | VL-4 · Belakang
* VL-5 · Kiri Belakang | VL-6 · Kiri Depan

### 4. 🧭 Orientasi Spasial & Gyro (IMU & Artificial Horizon)
* **Artificial Horizon:** Representasi grafis dinamis berbentuk indikator *attitude* untuk melihat kemiringan robot terhadap permukaan tanah.
* **Telemetri Orientasi:** Menampilkan data **Yaw** (0.0°), **Pitch** (0.0°), dan **Roll** (0.0°) secara presisi dari sensor IMU.

### 5. 🕹️ Kirim Perintah (Velocity Command Panel)
Panel kontrol (teleoperasi) untuk mengirimkan perintah kecepatan ke *controller* robot:
* **X:** Translasi sumbu X (maju/mundur).
* **Y:** Translasi sumbu Y (menyamping/kanan-kiri).
* **ω (Omega):** Kecepatan sudut untuk rotasi/berputar di tempat.

## 🛠️ Stack Teknologi

* **Framework:** Next.js
* **Styling & UI:** Tailwind CSS, Shadcn/UI, Lucide Icons
* **Komunikasi:** MQTT (WebSockets) / Jembatan komunikasi dari ROS 2

## 📦 Cara Instalasi

Pastikan sudah menginstal **Node.js** (versi 18+) dan *package manager* seperti npm, yarn, atau pnpm.

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/dewayanisar/dewayani-monitoring-web.git
   cd dewayani-monitoring-web
   ```

2. **Instalasi Dependensi**
   ```bash
   npm install
   # atau menggunakan pnpm/yarn
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser untuk mengakses *dashboard*.

## 🤝 Kontribusi & Tim

Sistem monitoring ini dikembangkan dan dikelola oleh sub-divisi software untuk mendukung operasional dan manuver hexapod. *Pull Request* untuk optimasi *dashboard*, perbaikan *bug*, atau penambahan fitur sangat diapresiasi.