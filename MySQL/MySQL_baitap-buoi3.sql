-- Kiểm tra version
SELECT VERSION();


-- AUTO_INCREMENT: tự động tăng (bắt đầu từ 1), đảm bảo cột khoá chính luôn luôn là duy nhất, và không trùng nhau

CREATE TABLE users (
	users_id INT PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(255),
	email VARCHAR(255),
	pass_word VARCHAR(255)
)

-- Thêm dữ liệu
INSERT INTO users (users_id, full_name, email, pass_word) VALUES
(1, "Nguyen Van A", "A@gmail.com", "1234"),
(2, "Nguyen Van B", "B@gmail.com", "1234"),
(3, "Nguyen Van C", "C@gmail.com", "1234"),
(4, "Nguyen Van D", "D@gmail.com", "1234"),
(5, "Nguyen Van E", "E@gmail.com", "1234");

-- Truy vấn
-- 1 - FROM: sẽ chạy trước 
-- 2 - SELECT: chỉ đỉnh kết quả đổ ra
SELECT *
FROM users

-- muốn chỉ đỉnh chỉ có 2 cột full_name và email đổ ra
SELECT email, full_name
FROM users

SELECT full_name AS "Họ và tên", email AS "đây là email"
FROM users

-- LIMIT
SELECT *
FROM users
LIMIT 2

-- WHERE: lọc dữ liệu
SELECT *
FROM users
WHERE users_id = 2

-- BÀI TẬP NHỎ
-- tạo table có tên là: foods
-- field: foods_id là kiểu số, khoá chính, tự động tăng
-- field: foods_name là kiểu chữ,
-- field: description là kiểu chữ


CREATE TABLE foods (
	foods_id INT PRIMARY KEY AUTO_INCREMENT,
	foods_name VARCHAR(255),
	description VARCHAR(255)
)

INSERT INTO foods (foods_id, foods_name, description) VALUES
(1, "su kem", "bánh được làm từ kem"),
(2, "gỏi gà", "gỏi được làm từ ga"),
(3, "gỏi vịt", "gỏi được làm từ vịt"),
(4, "gỏi cá", "gỏi được từ cá"),
(5, "gỏi heo", "gỏi được làm từ heo")


CREATE TABLE orders (
	orders_id INT PRIMARY KEY AUTO_INCREMENT,
	
	users_id INT,
	foods_id INT,

	FOREIGN KEY (users_id) REFERENCES users (users_id),
	FOREIGN KEY (foods_id) REFERENCES foods (foods_id)
)

INSERT INTO orders (orders_id, users_id, foods_id) VALUES
(1, 1, 2),
(2, 3, 1),
(3, 2, 5),
(4, 1, 3),
(5, 3, 2)

-- 1 - 1 (ONE - to - ONE)
-- Mô tả: Một bản ghi trong bảng A sẽ chỉ liên kết tới một bản ghi trong bảng B

-- 1 - N (ONE - to - MANY)
-- Mô tả: Một bản ghi trong bảng A có thể có nhiều bản ghi tương ứng bên trong bảng B

-- N - N (MANY - to - MANY)
-- Mô tả: Một bản ghi trong bảng A có thể liên kết nhiều với bản ghi bên bảng B, và ngược lại	



-- INNER JOIN
SELECT *
FROM orders
INNER JOIN users ON users.users_id = orders.users_id

-- trường hợp 2 bảng có số lương hàng bằng nhau
-- sẽ lấy bảng ở FROM làm chuẩn để đi so sánh

-- trường hợp 2 bảng có số lượng hàng khác nhau
-- sẽ lấy bảng nào ít hàng hơn làm chuẩn để đi so sánh



-- LEFT JOIN: sẽ lấy tất cả các bản ghi bên TRÁI, ngay cả khi không có bản ghi khớp với bản ghi bên PHẢI
SELECT *
FROM users
LEFT JOIN orders ON orders.users_id = users.users_id 


-- RIGHT JOIN: sẽ lấy tất cả các bản ghi bên PHẢI, ngay cả khi không có bản ghi khớp với bản ghi bên TRÁI 
SELECT *
FROM orders
RIGHT JOIN users ON orders.users_id = users.users_id 


-- CROSS JOIN 
SELECT *
FROM orders
CROSS JOIN users






