<?php
// ตั้งค่า header เพื่อระบุว่าข้อมูลที่ส่งกลับเป็น JSON
header('Content-Type: application/json');
// อนุญาตให้เข้าถึงได้จากทุก Origin (สำคัญสำหรับการพัฒนา)
// ใน Production ควรระบุ Origin ของ Frontend ให้ชัดเจน เช่น http://localhost:5173
header('Access-Control-Allow-Origin: *');

$posts = [
    [
        'id' => 1,
        'title' => 'Hello from PHP Backend!',
        'body' => 'This is the first post served by our local PHP API.'
    ],
    [
        'id' => 2,
        'title' => 'Vue and PHP Integration',
        'body' => 'This data is now coming from the `backend/api/test.php` file.'
    ],
];

// แปลง array เป็น JSON string แล้วส่งออกไป
echo json_encode($posts);

?>
