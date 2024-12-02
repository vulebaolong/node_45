/**
 * - Build Image từ docker file
 * docker build duong_dan_file_docker -t ten_image
 * => docker build . -t img-be_cyber_media
 * 
 * - Login:
 * docker login -u vulebaolong
 * 
 * - chạy container
 * docker run -d -p 3070:3069 --name ten_container ten_image
 * docker run -d -p 3070:3069 --name cons-be_cyber_media img-be_cyber_media
 * 
 * - lấy địa chỉ IP của 1 container
 * docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_container
 * 
 * 
 * - lấy danh sách image hiện có
 * docker image list
 * 
 * - xoá image
 * docker image remove id_name_image
 * 
 * 
 * - dừng container
 * docker container stop id_name_container
 * 
 * - xoá container
 * docker container remove id_name_container
 * 
 * - chạy docker compose:
 * docker compose up -d
 * 
 * - dừng docker compose
 * docker compose down
 * 
 * 
 * 
 */

/**
 * các câu lệnh thao tác trên server
 * 
 * xem dánh sách các folder và các file hiện có
 * ls -la
 * 
 * tạo folder:
 * mkdir ten_folder
 * 
 * di chuyển vô
 * cd ten_folder
 * 
 * di chuyển lùi
 * cd ../
 * 
 * tạo file:
 * touch ten_file
 * 
 * ghi file bằng tool nano
 * nano ten_file
 * 
 * lưu file với nano
 * ctrl + O + enter => save 
 * ctrl + X => thoát
 * 
 * lệnh kẹp sudo: để tránh trường hợp mỗi lần gõ lệnh phải có sudo ở đầu
 * sudo su
 * 
 * thoát kẹp sudo su:
 * exit
 * 
 * xem log của terminal trong docker:
 * docker container logs id_name_container
 * docker logs id_name_container
 * 
 * Truy cập vào terminal của container:
 * docker exec -it id_name_container /bin/sh
 * exit: thoát
 * 
 * Chạy lại container:
 * docker container restart id_name_container
 * 
 * - xem kiêmn truc
 * 
 * kiến trúc của máy
 * uname -m
 * 
 * kiến trúc của image
 * docker inspect --format '{{.Os}}/{{.Architecture}}' <image_name_or_id>
 * docker inspect <image_name_or_id>

 * 
 * LỖI: exec format error
 * - sai kiến trúc
 * 
 * x86 (chip intel): amd64
 *    - FROM --platform=linux/amd64
 * arm (chip apple silicon): arm64
 *    - FROM --platform=linux/arm64
 * 
 * xoá file:
 * sudo rm ten_file
 * 
 * xoá folder
 * sudo rmdir ten_file
 * 
 * xoá action-runer nếu chạy lỗi, và muốn chạy lại
 * sudo rm -rf /home/ubuntu/actions-runner
 * 
 * Enter the name of the runner group to add this runner to: [press Enter for Default]
 * => enter để chọn default
 * 
 * Enter the name of runner: [press Enter for ip-172-31-43-118]
 * => enter để chọn default
 * 
 * This runner will have the following labels: 'self-hosted', 'Linux', 'X64'  
 * Enter any additional labels (ex. label-1,label-2): [press Enter to skip]
 * => thiết lập tên label: chọn runs-on trong cd-docker.yml
 * 
 * Enter name of work folder: [press Enter for _work]
 * => enter để chọn default
 * 
 * 
 * sudo ./svc.sh install
 * sudo ./svc.sh start
 * 
 * 
 * DẤU PORT
 * 
 * cài NGINX:
 * Khi truy cập vào bất kể trang web nào thì mặc định là cổng 80
 * - github.com => 80
 * nginx sẽ tự động bắt truy từ cổng 80 này chuyển vào port 3070
 * - sudo apt update
 * - sudo apt install nginx
 * 
 * sudo nano /etc/nginx/sites-available/default
 * 
 * ctrl + K để xoá nhanh từng dòng
 * 
 *  
 */

// server {
//     listen 80;
//     server_name 13.212.188.30;  # Subdomain cho API
//     # server_name be-node.vulebaolong.com;

//     location / {
//         proxy_pass http://localhost:3070;
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_set_header X-Real-IP $remote_addr;
//         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//         proxy_set_header X-Forwarded-Proto $scheme;
//     }

//     location /socket.io/ {
//         proxy_pass http://localhost:3070;
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection "upgrade";
//         proxy_set_header Host $host;
//         proxy_set_header X-Real-IP $remote_addr;
//         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//         proxy_set_header X-Forwarded-Proto $scheme;
//         proxy_buffering off;
//         proxy_cache off;
//         proxy_read_timeout 86400s;
//         proxy_send_timeout 86400s;
//     }
// }

/**
 * - chạy kiểm tra nginx
 * sudo nginx -t
 * 
 * - khởi động lại nginx
 * sudo systemctl restart nginx
 * 
 * mở port 80 trong security của AWS
 */