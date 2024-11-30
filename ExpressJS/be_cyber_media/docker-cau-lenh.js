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