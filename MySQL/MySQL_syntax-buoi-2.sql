-- MySQL

-- Không phân biệt chữ hoa và chữ thường "select" & "SELECT"
-- => sử dụng chữ HOA
-- dùng dấu ";" để kết thúc dòng

-- Tạo csdl / db / database
CREATE DATABASE demo_database;
CREATE DATABASE IF NOT EXISTS demo_database;

-- Xoá csdl / db / database
DROP DATABASE demo_database_test;
DROP DATABASE IF EXISTS demo_database_test;

-- Chọn database để thao tác
USE demo_database;



-- TABLE -----

-- Tạo Table
CREATE TABLE users (
	user_id INT,
	full_name VARCHAR(255),
	email VARCHAR(255),
	age INT,
	avatar VARCHAR(255),
	birth_day DATE,
	is_active BOOLEAN
);

-- Đổi tên table
RENAME TABLE users TO users_new;

-- Xoá Table
DROP TABLE users_new;
DROP TABLE IF EXISTS users_new;

-- Xoá dữ liệu bên trong Table
TRUNCATE TABLE users;


-- ALTER TABLE
-- Thêm một cột vào table
ALTER TABLE users
ADD pass_word VARCHAR(255);

-- Xoá một cột trong table
ALTER TABLE users
DROP COLUMN avatar;

-- Đổi tên cột trong table
-- RENAME sẽ chỉ hỗ trợ từ phiên bản sql 8.0 trở lên
ALTER TABLE users
RENAME COLUMN full_name TO fullName;

-- Nếu là phiên bản cũ hơn dùng CHANGE
ALTER TABLE users
CHANGE ten_cot_cu ten_cot_moi VARCHAR(255);

-- Sửa đổi kiểu dữ liệu của cột trong table
ALTER TABLE users
MODIFY COLUMN email INT;






-- RÀNG BUỘC
-- NOT NULL: cột không được NULL, phải có dữ liệu
-- UNIQUE: giá trị trong cột phải khác nhau, duy nhất (id, email, user_name, ...)
-- PRIMARY KEY: sự kết hợp của NOT NULL và UNIQUE => id, 1 table phải có PRIMARY KEY
-- FOREIGN KEY: tạo liên lết giữa table với nhau
-- DEFAULT: đặt giá trị mặc định cho một
-- CREATE INDEX: đánh chỉ mục, lấy dữ liệu nhanh hơn (email, ...)

-- NOT NULL với CREATE TABLE
CREATE TABLE not_null (
	id INT NOT NULL,
	age INT
);
-- NOT NULL với ALTER TABLE
ALTER TABLE not_null
MODIFY age INT NOT NULL;


-- UNIQUE với CREATE TABLE
CREATE TABLE `unique` (
	unique_id INT NOT NULL UNIQUE,

	email VARCHAR(255),
	facebook_id VARCHAR(255),
	google_id VARCHAR(255),
	zalo_id VARCHAR(255),
	
	tele_id VARCHAR(255),
	github_id VARCHAR(255),
	
	
	UNIQUE (email),
	
	CONSTRAINT UC_unique UNIQUE (facebook_id, google_id)
);

-- UNIQUE với ALTER TABLE
ALTER TABLE `unique`
ADD UNIQUE (zalo_id);

ALTER TABLE `unique`
ADD CONSTRAINT UC_unique_2 UNIQUE (tele_id, github_id);

-- Xoá unique
ALTER TABLE `unique`
DROP INDEX UC_unique_2;


-- PRIMARY với CREATE TABLE
-- composite primary key (tạo nhiều khoá chính trong một table)
CREATE TABLE primary_key (
	-- cách 1
	-- primary_key_id INT PRIMARY KEY,
	
	facebook_id VARCHAR(255),
	google_id VARCHAR(255),
	zalo_id VARCHAR(255),
	
	tele_id VARCHAR(255),
	github_id VARCHAR(255),
	discord_id VARCHAR(255)
	
	-- cách 2
	-- PRIMARY KEY (facebook_id),
	
	-- cách 3
	-- CONSTRAINT PK_primary_key PRIMARY KEY (google_id, zalo_id)
);

-- PRIMARY KEY với ALTER TABLE
ALTER TABLE primary_key 
ADD PRIMARY KEY (tele_id);

ALTER TABLE primary_key
ADD CONSTRAINT PK_primary_key PRIMARY KEY (github_id, discord_id);







