CREATE TABLE users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL,
	pass_word VARCHAR(255),
	full_name VARCHAR(255) NOT NULL,
	avatar VARCHAR(255),
	
	goole_id VARCHAR(255),
	face_app_id VARCHAR(255),
	
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE video_type (
	type_id INT PRIMARY KEY AUTO_INCREMENT,
	type_name VARCHAR(255) NOT NULL,
	icon VARCHAR(255),

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

INSERT INTO video_type (type_id, type_name, icon) VALUES
(1, 'New', 'IconNews'),
(2, 'Coding', 'IconCode'),
(3, 'Music', 'IconMusic'),
(4, 'Movie', 'IconVideo'),
(5, 'Gaming', 'IconDeviceGamepad'),
(6, 'Sport', 'IconBallBaseball'),
(7, 'Fashion', 'IconShirt'),
(8, 'Gym', 'IconUmbrella'),
(9, 'Crypto', 'IconDiamond');


CREATE TABLE videos (
	video_id INT PRIMARY KEY AUTO_INCREMENT,
	video_name VARCHAR(255) NOT NULL,
	description TEXT,
	thumbnail VARCHAR(255),
	views INT DEFAULT 0,
	source VARCHAR(255) NOT NULL,
	
	type_id INT,
	user_id INT,
	
	
	FOREIGN KEY (type_id) REFERENCES video_type(type_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)


INSERT INTO videos (video_id, video_name, thumbnail, description, views, source, user_id, type_id) VALUES
(1, 'SƠN TÙNG M-TP | ĐỪNG LÀM TRÁI TIM ANH ĐAU | OFFICIAL TEASER', 'https://img.youtube.com/vi/CQXQKr_3vKE/maxresdefault.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rem, tempora quia culpa praesentium totam id adipisci. Itaque voluptatibus aspernatur vitae quisquam cumque? Quaerat fugit tempora recusandae illo quod aspernatur impedit cumque exercitationem vel! Doloribus nemo suscipit eius deserunt eveniet hic, tempore odit fugiat soluta itaque, sequi et voluptatem! Consequuntur, autem deleniti commodi placeat sed numquam, illo harum unde dolore officia laborum accusamus animi libero? Blanditiis ratione esse nulla ut aperiam quasi non distinctio animi minus qui ducimus sit odit nobis officia, facere voluptates! Minima ut animi facere enim modi autem aliquid, numquam amet sapiente iure suscipit quisquam delectus tempore. Fuga, quae, consequuntur nam aliquid est fugiat nulla laudantium veritatis quos enim quibusdam impedit porro doloribus dolorum libero, dignissimos atque. Placeat ipsa saepe dolore. Repellat, ea. Doloremque repellendus facilis rem aliquam suscipit iusto exercitationem, magnam hic. Officia dolores corporis dolore nam magni quia magnam at dicta cumque accusantium eos assumenda expedita, ducimus voluptates porro est dignissimos! Saepe facere fugiat atque, numquam tempora eius? Ut ipsum beatae porro odio aspernatur, iure voluptatum. Libero adipisci temporibus eius dolore recusandae, veniam obcaecati soluta fuga, animi totam beatae quisquam modi officiis magnam quibusdam nostrum. Laborum porro quibusdam deserunt nesciunt perspiciatis totam libero cupiditate esse.', 1500, 'https://www.youtube.com/watch?v=CQXQKr_3vKE', 1, 2),
(2, 'SƠN TÙNG M-TP | ĐỪNG LÀM TRÁI TIM ANH ĐAU | OFFICIAL', 'https://img.youtube.com/vi/abPmZCZZrFA/maxresdefault.jpg', 'Highlights from a live music concert', 800, 'https://www.youtube.com/watch?v=abPmZCZZrFA', 1, 3),
(3, 'SƠN TÙNG M-TP | CHÚNG TA CỦA TƯƠNG LAI | OFFICIAL MUSIC VIDEO\n', 'https://img.youtube.com/vi/zoEtcR5EW08/maxresdefault.jpg', 'First episode of a gaming adventure', 2500, 'https://www.youtube.com/watch?v=zoEtcR5EW08', 1, 5),
(4, 'SƠN TÙNG M-TP | 7-MINUTE STAGE | ĐỪNG LÀM TRÁI TIM ANH ĐAU\n', 'https://img.youtube.com/vi/FEmnnU-HhnQ/maxresdefault.jpg', 'Latest fashion trends for the spring season', 1200, 'https://www.youtube.com/watch?v=FEmnnU-HhnQ', 1, 7),
(5, '(Synthwave Disco 80s) Em Đừng Đi - Sơn Tùng M-TP | Prod. by SenTfour\n', 'https://img.youtube.com/vi/kMg3wTAhNsY/maxresdefault.jpg', 'Understanding the basics of cryptocurrency', 300, 'https://www.youtube.com/watch?v=kMg3wTAhNsY', 1, 9),
(6, 'SƠN TÙNG M-TP | MUỘN RỒI MÀ SAO CÒN | OFFICIAL MUSIC VIDEO\n', 'https://img.youtube.com/vi/xypzmu5mMPY/maxresdefault.jpg', 'Complete guide to full stack web development', 1200, 'https://www.youtube.com/watch?v=xypzmu5mMPY', 1, 2),
(7, 'NƠI NÀY CÓ ANH | OFFICIAL MUSIC VIDEO | SƠN TÙNG M-TP\n', 'https://img.youtube.com/vi/FN7ALfpGxiI/maxresdefault.jpg', 'Soulful acoustic guitar performance', 650, 'https://www.youtube.com/watch?v=FN7ALfpGxiI', 1, 3),
(8, 'SƠN TÙNG M-TP | CHÚNG TA CỦA HIỆN TẠI | OFFICIAL MUSIC VIDEO\n', 'https://img.youtube.com/vi/psZ1g9fMfeo/maxresdefault.jpg', 'Compilation of epic gaming moments', 3500, 'https://www.youtube.com/watch?v=psZ1g9fMfeo', 1, 5),
(9, 'SƠN TÙNG M-TP | HÃY TRAO CHO ANH ft. Snoop Dogg | Official MV\n', 'https://img.youtube.com/vi/knW7-x7Y7RE/maxresdefault.jpg', 'Effective fitness workout routine', 900, 'https://www.youtube.com/watch?v=knW7-x7Y7RE', 1, 8),
(10, 'Em Là Mầm Non Của Đảng (Thu thanh trước 1975) | Hà Nội Vi Vu', 'https://img.youtube.com/vi/vfWTt905FUI/maxresdefault.jpg', 'Effective fitness workout routine', 900, 'https://www.youtube.com/watch?v=vfWTt905FUI', 1, 8),
(11, 'SƠN TÙNG M-TP x BOMATELA | CÓ CHẮC YÊU LÀ ĐÂY (REMIX) | SHOW RECAP', 'https://img.youtube.com/vi/EhJqekMVxTc/maxresdefault.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate pariatur praesentium alias quod explicabo. Amet necessitatibus voluptates vitae ut? Ratione, molestias quasi nihil tempore quisquam veritatis repellat aut autem? Cupiditate, voluptatem vel minima, natus quis doloribus in inventore harum qui autem eaque eos, aspernatur magnam. Saepe quae reprehenderit ipsum voluptatum dolores, atque ullam at optio minima inventore iure quis, labore unde voluptatibus accusamus eveniet illo praesentium magni quos ad illum. Laboriosam incidunt aliquam rerum eius aperiam ad nobis quos quae, sequi, ab iusto laborum, eos sunt tenetur qui modi atque iste. Cupiditate quaerat quasi accusantium itaque voluptas. Asperiores pariatur autem perferendis repellendus minus ducimus aut iste molestiae est error aspernatur maxime corporis mollitia, voluptatum omnis facilis, voluptatem blanditiis deleniti consequuntur soluta! Corrupti distinctio vel sequi ab adipisci deleniti eos quod atque, nulla, eius eveniet. Nihil numquam suscipit neque blanditiis labore exercitationem amet quae officia sit natus culpa consequatur, recusandae architecto sapiente sed nesciunt! Odit quae ad voluptate adipisci tempore harum in voluptates quos, beatae impedit delectus ab exercitationem dolorem illo. Beatae delectus dicta esse quod voluptates sed corporis suscipit maxime, exercitationem laboriosam voluptas amet impedit. Id, ad reprehenderit libero incidunt quasi reiciendis neque dolorum nobis. Officiis ullam earum modi repellat?', 299, 'https://www.youtube.com/watch?v=EhJqekMVxTc', 1, 1),
(12, 'SƠN TÙNG M-TP | LẠC TRÔI MOVINGTOON | PHOTOSHOOT | OFFICIAL EPISODE 36', 'https://img.youtube.com/vi/phknRB6-f4U/maxresdefault.jpg', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur vitae expedita, saepe repellat atque quia. Autem recusandae nostrum itaque in, perspiciatis ullam, sunt, magnam ducimus eaque quisquam hic magni possimus sed alias soluta vitae enim quasi id veritatis iusto nam iure porro. Natus, minima fugiat, inventore minus omnis quaerat mollitia quo voluptatum, blanditiis ipsa voluptatem consectetur fugit asperiores expedita numquam? Quia sed blanditiis nam a odit omnis facere nesciunt dolorum sequi tempora, corporis hic dicta minima possimus vel exercitationem impedit reprehenderit quod expedita quos perferendis veniam officia! Dolore aperiam aliquid, libero accusantium dolores qui fuga doloremque molestiae! Pariatur, explicabo vitae.', 408, 'https://www.youtube.com/watch?v=phknRB6-f4U', 1, 1),
(13, 'SƠN TÙNG M-TP | LẠC TRÔI MOVINGTOON | TÙNG FAKE TÙNG REAL | OFFICIAL EPISODE 30', 'https://img.youtube.com/vi/kgeiiJNewZc/maxresdefault.jpg', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, atque minima optio quibusdam, officia facilis delectus rem iste, beatae saepe doloremque? Quaerat, provident quidem qui minus facilis, reprehenderit temporibus explicabo non deleniti sapiente nostrum tenetur eaque hic, recusandae quas voluptate consequatur rerum quasi. Provident laborum magnam repudiandae vitae possimus voluptatibus, ipsum omnis facere blanditiis nesciunt? Eligendi mollitia aut obcaecati aliquam alias sequi non libero! Officiis, repudiandae. Tenetur distinctio voluptatibus ducimus nobis quis inventore dicta alias fuga quia sit. Minus veniam quidem expedita, adipisci, ipsa quo tempore neque ullam itaque, ratione modi possimus officia! Ipsum cum dolorem obcaecati alias maiores fugit veniam, repellat, dicta facilis blanditiis enim inventore animi id ea quasi. Sunt numquam reprehenderit quidem modi blanditiis dolor et, corrupti architecto nulla recusandae sapiente molestiae iusto officia repellendus, optio laudantium?', 199, 'https://www.youtube.com/watch?v=kgeiiJNewZc', 1, 4),
(14, 'SON TUNG M-TP | MAKING MY WAY | OFFICIAL VISUALIZER', 'https://img.youtube.com/vi/niPkap1ozUA/maxresdefault.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio maiores expedita, ad nulla dicta quam nisi beatae, voluptas quae necessitatibus, facilis excepturi velit harum explicabo debitis. Et iure veritatis ex, nemo culpa in ipsum laudantium corporis. Vitae dolor quasi architecto repellat, soluta ipsum reiciendis, iusto quia voluptate delectus unde veritatis in tempore magnam laborum nesciunt minima provident ducimus nulla maxime totam eos sapiente quisquam quas? Debitis, nisi nostrum. Quaerat eveniet voluptatem nemo error necessitatibus placeat illum excepturi cupiditate voluptate. Officia, voluptatibus unde! Sed illo error placeat, fugit deserunt quisquam adipisci tenetur facilis quod non pariatur nisi ullam odio nemo dolorum sunt omnis corrupti eligendi reprehenderit accusamus tempore facere earum autem nam. Repudiandae saepe praesentium quos, aliquid voluptatibus ullam sint excepturi!', 120, 'https://www.youtube.com/watch?v=niPkap1ozUA', 1, 6),
(15, 'SƠN TÙNG M-TP | THERE’S NO ONE AT ALL (ANOTHER VERSION) | OFFICIAL MUSIC VIDEO', 'https://img.youtube.com/vi/JHSRTU31T14/maxresdefault.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio omnis amet error id, cupiditate, numquam quo deleniti voluptate recusandae itaque neque et ut laboriosam. Illum molestias, quae quas soluta molestiae quidem tenetur officiis in. Corrupti natus ipsum porro omnis dolore officia? Laboriosam consectetur culpa praesentium quibusdam ullam dolor similique eligendi maxime aspernatur rem illo illum corporis corrupti est tempore, tempora excepturi numquam totam officia consequuntur! Incidunt, maxime. In a ipsa cumque quaerat, mollitia, asperiores ducimus enim iste nemo velit facilis quia tempora? Sed consequuntur illo iste odio provident cum voluptatibus saepe maiores a nihil, ab corrupti molestias, dolorum quia. Aliquam, natus! Odit commodi dolorem eveniet. Velit illo sit id tempora?', 1000, 'https://www.youtube.com/watch?v=JHSRTU31T14', 1, 4),
(16, 'SƠN TÙNG M-TP | LẠC TRÔI MOVINGTOON | KÝ HỢP ĐỒNG | OFFICIAL EPISODE 32', 'https://img.youtube.com/vi/MaI7JCybK3s/maxresdefault.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptas consectetur, dolor, facilis perferendis autem, tempora hic eaque blanditiis beatae dignissimos culpa natus tenetur cum labore non laudantium quis? Consectetur veniam fugit modi dolor facilis, explicabo impedit velit, eveniet deleniti unde dolorum est quasi alias dolores perspiciatis similique ipsa asperiores cupiditate assumenda nostrum culpa. Harum ratione delectus dolorem perspiciatis iure pariatur laudantium ullam culpa error mollitia sunt rerum rem voluptatibus quis, eaque accusamus totam illo eligendi. Dicta ab incidunt ipsum repudiandae pariatur consequatur vel doloremque sit nesciunt, nobis dignissimos veniam beatae ex? Veniam laboriosam, numquam facilis deserunt laudantium repellat.', 999, 'https://www.youtube.com/watch?v=MaI7JCybK3s', 1, 6),
(17, 'Bản tình ca của Đá - [Official Audio] - HwangCho - Đường anh đi toàn ke với đá…', 'https://img.youtube.com/vi/ZyYmIiYEK7I/maxresdefault.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rem, tempora quia culpa praesentium totam id adipisci. Itaque voluptatibus aspernatur vitae quisquam cumque? Quaerat fugit tempora recusandae illo quod aspernatur impedit cumque exercitationem vel! Doloribus nemo suscipit eius deserunt eveniet hic, tempore odit fugiat soluta itaque, sequi et voluptatem! Consequuntur, autem deleniti commodi placeat sed numquam, illo harum unde dolore officia laborum accusamus animi libero? Blanditiis ratione esse nulla ut aperiam quasi non distinctio animi minus qui ducimus sit odit nobis officia, facere voluptates! Minima ut animi facere enim modi autem aliquid, numquam amet sapiente iure suscipit quisquam delectus tempore. Fuga, quae, consequuntur nam aliquid est fugiat nulla laudantium veritatis quos enim quibusdam impedit porro doloribus dolorum libero, dignissimos atque. Placeat ipsa saepe dolore. Repellat, ea. Doloremque repellendus facilis rem aliquam suscipit iusto exercitationem, magnam hic. Officia dolores corporis dolore nam magni quia magnam at dicta cumque accusantium eos assumenda expedita, ducimus voluptates porro est dignissimos! Saepe facere fugiat atque, numquam tempora eius? Ut ipsum beatae porro odio aspernatur, iure voluptatum. Libero adipisci temporibus eius dolore recusandae, veniam obcaecati soluta fuga, animi totam beatae quisquam modi officiis magnam quibusdam nostrum. Laborum porro quibusdam deserunt nesciunt perspiciatis totam libero cupiditate esse.', 1500, 'https://www.youtube.com/watch?v=ZyYmIiYEK7I', 1, 6);


CREATE TABLE roles (
	role_id INT PRIMARY KEY AUTO_INCREMENT,

	`name` VARCHAR(255),
	description VARCHAR(255),
	is_active BOOLEAN DEFAULT TRUE,
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE permissions (
	permission_id INT PRIMARY KEY AUTO_INCREMENT,

	`name` VARCHAR(255),
	endpoint VARCHAR(255),
	method VARCHAR(255),
	module VARCHAR(255),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE role_permissions (
	role_permissions_id INT PRIMARY KEY AUTO_INCREMENT,

	role_id INT,
	permission_id INT,
	is_active BOOLEAN DEFAULT TRUE,

	FOREIGN KEY (role_id) REFERENCES roles(role_id),
	FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)





