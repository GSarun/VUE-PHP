<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // อนุญาตให้เข้าถึงจากทุก Origin
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // อนุญาต Method ที่ใช้
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // อนุญาต Header ที่ส่งมา

// จัดการกับ Preflight request (OPTIONS) ที่เบราว์เซอร์ส่งมาก่อน POST จริง
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ตรวจสอบว่าเป็น POST request หรือไม่
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Invalid request method.']);
    exit();
}

// รับข้อมูล JSON ที่ส่งมาใน body ของ request
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

// --- ส่วนของการตรวจสอบข้อมูล (ในตัวอย่างนี้ใช้ค่าที่ hardcode) ---
// ในสถานการณ์จริง: ควรดึงข้อมูลผู้ใช้จากฐานข้อมูลมาเปรียบเทียบ
$correct_username = 'admin';
$correct_password = 'password123';

if ($username === $correct_username && $password === $correct_password) {
    // Login สำเร็จ
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Login successful! Welcome, ' . $username,
        'user' => ['username' => $username] // ส่งข้อมูลผู้ใช้กลับไปด้วย
    ]);
} else {
    // Login ไม่สำเร็จ
    http_response_code(401); // Unauthorized
    echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
}
?>