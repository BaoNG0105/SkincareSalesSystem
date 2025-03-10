DROP DATABASE IF EXISTS skincaresellproduct;
CREATE DATABASE skincaresellproduct;
USE skincaresellproduct;

-- 1. Bảng cancellation_policies: Lưu thông tin chính sách hủy đơn & thanh toán
CREATE TABLE cancellation_policies (
    policy_id INT AUTO_INCREMENT PRIMARY KEY,
    policy_name VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    applicable_days INT NOT NULL,
    policy_type VARCHAR(50) NOT NULL DEFAULT 'Refund',
    IsDeleted BOOLEAN NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- 2. Bảng users: Quản lý thông tin người dùng (lưu trữ tiền của khách hàng)
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role ENUM('Customer','Staff','Manager') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN NOT NULL DEFAULT 1,
    gender ENUM('Male','Female') DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,
    address TEXT DEFAULT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    profile_image TEXT DEFAULT NULL,
    money DECIMAL(18,2) NOT NULL DEFAULT 0,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- 3. Bảng products: Quản lý sản phẩm chăm sóc da
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_image TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    status ENUM('Available','OutOfStock','Discontinued') NOT NULL DEFAULT 'Available',
    IsDeleted BOOLEAN NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- 4. Bảng skin_types: Quản lý các loại da (ví dụ: da dầu, da hỗn hợp, da khô, da thường)
CREATE TABLE skin_types (
    skin_type_id INT AUTO_INCREMENT PRIMARY KEY,
    skin_type VARCHAR(50) NOT NULL UNIQUE,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- 5. Bảng skin_care_routines: Lộ trình chăm sóc da tương ứng với từng loại da
CREATE TABLE skin_care_routines (
    routine_id INT AUTO_INCREMENT PRIMARY KEY,
    skin_type_id INT NOT NULL,
    step_number INT NOT NULL,
    description TEXT NOT NULL,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    UNIQUE KEY (skin_type_id, step_number),
    FOREIGN KEY (skin_type_id) REFERENCES skin_types(skin_type_id)
) ENGINE=InnoDB;

-- 6. Bảng orders: Quản lý đơn hàng
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    total_price DECIMAL(18,2) NOT NULL,
    order_status ENUM('Pending','Shipped','Delivered','Canceled') NOT NULL DEFAULT 'Pending',
    cancellation_policy_id INT DEFAULT NULL,
    discount_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users(user_id),
    FOREIGN KEY (cancellation_policy_id) REFERENCES cancellation_policies(policy_id)
) ENGINE=InnoDB;

-- 7. Bảng order_items: Chi tiết đơn hàng (sản phẩm có trong đơn hàng)
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(18,2) NOT NULL,
    discount_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
) ENGINE=InnoDB;

-- 8. Bảng promotions: Quản lý khuyến mãi
CREATE TABLE promotions (
    promotion_id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    minimum_order_value DECIMAL(18,2) DEFAULT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    IsDeleted BOOLEAN NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- 9. Bảng ratings_feedback: Đánh giá và phản hồi sản phẩm
CREATE TABLE ratings_feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
) ENGINE=InnoDB;

-- 10. Bảng payment_details: Lưu thông tin thanh toán cho đơn hàng
CREATE TABLE payment_details (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    payment_date TIMESTAMP NULL DEFAULT NULL,
    transaction_id VARCHAR(255) DEFAULT NULL,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 11. Bảng order_history: Lịch sử cập nhật trạng thái đơn hàng
CREATE TABLE order_history (
    order_history_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    note TEXT DEFAULT NULL,
    update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 12. Bảng skin_type_tests: Lưu lại mỗi lần khách hàng làm bài kiểm tra loại da
CREATE TABLE skin_type_tests (
    test_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    test_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    result_skin_type_id INT NOT NULL,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    UNIQUE KEY (customer_id, test_date),
    FOREIGN KEY (customer_id) REFERENCES users(user_id),
    FOREIGN KEY (result_skin_type_id) REFERENCES skin_types(skin_type_id)
) ENGINE=InnoDB;

-- 13. Bảng test_results: Lưu kết quả chi tiết của bài kiểm tra (số đáp án A, B, C, D)
CREATE TABLE test_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    test_id INT NOT NULL,
    total_A INT NOT NULL DEFAULT 0,
    total_B INT NOT NULL DEFAULT 0,
    total_C INT NOT NULL DEFAULT 0,
    total_D INT NOT NULL DEFAULT 0,
    final_skin_type_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (test_id) REFERENCES skin_type_tests(test_id),
    FOREIGN KEY (final_skin_type_id) REFERENCES skin_types(skin_type_id)
) ENGINE=InnoDB;

-- 14. Bảng promotion_applications: Ghi nhận khuyến mãi áp dụng cho đơn hàng hoặc sản phẩm (nếu cần)
CREATE TABLE promotion_applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id INT NOT NULL,
    product_id INT DEFAULT NULL,
    order_id INT DEFAULT NULL,
    applied_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    discount_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

-- 15. Bảng recommended_products: Đề xuất sản phẩm theo loại da (để FE hiển thị gợi ý mua hàng)
CREATE TABLE recommended_products (
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
    skin_type_id INT NOT NULL,
    product_id INT NOT NULL,
    recommendation_reason VARCHAR(255) DEFAULT NULL,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    UNIQUE KEY (skin_type_id, product_id),
    FOREIGN KEY (skin_type_id) REFERENCES skin_types(skin_type_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
) ENGINE=InnoDB;

-- 16. Bảng blogs: Quản lý bài viết, tin tức, chia sẻ cho trang chủ
CREATE TABLE blogs (
    blog_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id BIGINT NOT NULL,
    category VARCHAR(50) DEFAULT NULL,
    view_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
) ENGINE=InnoDB;

-- 17. Bảng faq: Câu hỏi thường gặp (có thể liên kết với sản phẩm nếu cần)
CREATE TABLE faq (
    faq_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT DEFAULT NULL,
    question TEXT NOT NULL,
    answer TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
) ENGINE=InnoDB;

-- 18. Bảng sales_reports: Báo cáo doanh số cho Dashboard
CREATE TABLE sales_reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    report_date DATE NOT NULL,
    total_revenue DECIMAL(18,2) NOT NULL,
    total_orders INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- 19. Bảng sales_report_details: Chi tiết doanh số theo sản phẩm
CREATE TABLE sales_report_details (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    product_revenue DECIMAL(18,2) NOT NULL,
    IsDeleted BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (report_id) REFERENCES sales_reports(report_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
) ENGINE=InnoDB;

-- Insert dữ liệu vào trong Database --
-- 1. INSERT USERS: 6 Actors (3 Customers, 2 Staff, 1 Manager)
INSERT INTO users (user_name, email, password_hash, role, gender, date_of_birth, address, phone_number, profile_image, money) VALUES
('Nguyen Van A', 'nguyenvana@example.com', 'hash_pass_A', 'Customer', 'Male', '1985-04-10', '123 Le Loi, HCMC', '0901111222', 'images/users/nguyenvana.jpg', 150),
('Tran Thi B', 'tranthib@example.com', 'hash_pass_B', 'Customer', 'Female', '1990-07-20', '456 Nguyen Trai, Ha Noi', '0902222333', 'images/users/tranthib.jpg', 200),
('Le Thi C', 'lethic@example.com', 'hash_pass_C', 'Customer', 'Female', '1992-11-15', '789 Tran Hung Dao, Da Nang', '0903333444', 'images/users/lethic.jpg', 180),
('Pham Van D', 'phamvand@example.com', 'hash_pass_D', 'Staff', 'Male', '1988-03-05', '101 Hai Ba Trung, HCMC', '0904444555', 'images/users/phamvand.jpg', 100),
('Do Thi E', 'dothie@example.com', 'hash_pass_E', 'Staff', 'Female', '1987-09-12', '202 Le Duan, Ha Noi', '0905555666', 'images/users/dothie.jpg', 120),
('Hoang Van F', 'hoangvanf@example.com', 'hash_pass_F', 'Manager', 'Male', '1980-01-25', '303 Nguyen Dinh Chieu, Da Nang', '0906666777', 'images/users/hoangvanf.jpg', 300);
 
-----------------------------------------------------------
-- 2. INSERT PRODUCTS: 5 Categories (25 products each)
-----------------------------------------------------------
-------------------------------------------------
-- 1. Category: Moisturizer (25 products)
-------------------------------------------------
INSERT INTO products (product_name, description, category, price, stock_quantity, product_image, status)
VALUES
('Deep Hydration Cream', 'Deep Hydration Cream is developed with a formula containing hyaluronic acid, glycerin and aloe vera extract. The product helps to deeply hydrate, restore the skin's protective barrier, soothe dry and irritated skin. The formula is paraben-free, suitable for all skin types, especially dry and dehydrated skin. Use daily to bring soft, smooth and youthful skin.', 'Moisturizer', 250000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367591/mtujrjvgligrf3yzicsb.webp ', 'Available'),
('Ultra Moisturizer', 'Ultra Moisturà kee lm premium moisturizer contains green tea extract, vitamin E and hyaluronic acid, which effectively provides nutrients and locks in moisture. The product soothes and protects the skin from environmental influences, preventing signs of premature aging. The light, fast-absorbing formula is suitable for normal and combination skin. Regular use gives the skin a soft and naturally radiant look.', 'Moisturizer', 270000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367601/wanxyuhi0zj39p6tjcb5.webp ', 'Available'),
('Soothing Repair', 'Soothing Repair Moisturizer contains soothing ingredients such as chamomile extract and aloe vera, combined with hyaluronic acid, to help irritated restored and dry skin. The product provides balanced moisture and protects the skin from harmful environmental agents. Suitable for sensitive and red skin, regular use helps the skin become soft, smooth and healthy.', 'Moisturizer', 260000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367599/vgwbugh33cjfofkffj0l.jpg ', 'Available'),
('Advanced Hydration Moisturizer', 'Advanced Hydration is a moisturizer with peptides, hyaluronic acid and vitamin B5, specially designed to deeply nourish and provide long-lasting moisture to the skin. The product helps improve skin texture, reduce signs of dryness and wrinkles. The gentle formula is suitable for all skin types, especially dry and mature skin.', 'Moisturizer', 280000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367588/f70b7uehjpexkyntocqw.jpg ', 'Available'),
('Sensitive Care Moisturizer', 'Sensitive Care is a moisturizer for sensitive skin, containing aloe vera, green tea and vitamin E to soothe, balance and hydrate the skin. The formula is fragrance and alcohol free, ensures safety for sensitive skin. The product helps restore irritated skin and brings a cool, comfortable feeling after each use.', 'Moisturizer', 240000.00, 130, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367598/yhtadzjsl6qipgu8somw.jpg ', 'Available'),
('Radiant Glow Moisturizer', 'Radiant Glow provides nutrients from hyaluronic acid, collagen and vitamin C, helping to nourish the skin from deep within and stimulate the production of natural collagen. The product effectively brightens, evens out skin tone and increases skin elasticity. Suitable for tired and aging skin, regular use will help the skin become radiant and youthful.', 'Moisturizer', 300000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367596/zbesiti3q31kangmun8u.webp ', 'Available'),
('Nutri Moist', 'Nutri Moist is a rich moisturizer, containing shea butter, hyaluronic acid and vitamin E. This formula deeply nourishes and hydrates, improving the skin's smoothness and elasticity. It is suitable for dry and dehydrated skin, leaving skin soft and healthy.', 'Moisturizer', 255000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367594/weiwrvuvrya9qwteytay.webp ', 'Available'),
('Rejuvenating Cream', 'Rejuvenating Cream contains a blend of peptides, hyaluronic acid and green tea extract, which helps to regenerate and restore the skin, minimizing wrinkles and signs of aging. The special formula penetrates deeply, providing essential nutrients and maintaining the skin's natural moisture. Suitable for mature skin in need of recovery and rejuvenation.', 'Moisturizer', 310000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367597/ywo16zqv8tzsaqhb80do.webp ', 'Available'),
('Intensive Repair Moisturizer', 'Intensive Repair is an intensive moisturizer formulated with hyaluronic acid, vitamin B5 and aloe vera extract, which helps restore damaged skin, providing optimal moisture and nutrients. The product improves skin texture, reduces dryness and brings soft, youthful skin. Suitable for dry skin and skin that needs recovery after treatment.', 'Moisturizer', 295000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367592/yn3lyiavu9trzxabyfex.webp ', 'Available'),
('Daily Nourish Moisturizer', 'Daily Nourish is a daily moisturizer containing natural ingredients such as chamomile extract, hyaluronic acid and vitamin E, providing balanced moisture and protecting the skin from environmental influences. The product is easily absorbed, does not clog pores, suitable for all skin types.', 'Moisturizer', 235000.00, 125, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367590/dm53y1cwtvsufmalos0r.jpg ', 'Available'),
('Hydrating Plus Moisturizer', 'Hydrating Plus is a moisturizer containing hyaluronic acid, glycerin and cucumber extract, which deeply hydrates and maintains the skin's softness. The product effectively soothes and restores the skin after environmental impacts, suitable for dry and tired skin.', 'Moisturizer', 265000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367592/txy8rnjpvqzprp4jhfn1.jpg ', 'Available'),
('Ultimate Moisture Moisturizer', 'Ultimate Moisture contains a blend of hyaluronic acid, peptides and vitamin E, which helps to provide maximum moisture and protect the skin from dehydration. The intensive formula helps to improve skin texture, tighten pores and soften the skin, suitable for dry and dehydrated skin.', 'Moisturizer', 320000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367601/wanxyuhi0zj39p6tjcb5.webp ', 'Available'),
('Pure Hydration Moisturizer', 'Pure Hydration is a pure moisturizer containing hyaluronic acid, rose extract and vitamin B5, which helps naturally hydrate and restore the skin's protective barrier. The product is suitable for sensitive skin and skin in need of recovery, giving the skin a soft, smooth and natural look.', 'Moisturizer', 250000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367595/ap8ogktdr8rlyaiflti5.jpg ', 'Available'),
('Age-Defying Moisturizer', 'Age-Defying Moisturizer combines hyaluronic acid, collagen and grape extract to help reduce wrinkles, plump the skin and prevent aging. It effectively improves elasticity and gives the skin a youthful, radiant look. Suitable for mature skin in need of recovery and rejuvenation.', 'Moisturizer', 330000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367589/hri5cw3hiibg9v3wbrcp.jpg ', 'Available'),
('Soothing Relief Moisturizer', 'Soothing Relief is a moisturizer containing aloe vera, chamomile and hyaluronic acid to help soothe irritated, red and dry skin. The gentle formula is alcohol and fragrance free, safe for sensitive skin, providing a cool and comfortable feeling.', 'Moisturizer', 240000.00, 130, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367598/b6jcmp9768dom4ct4tq4.webp ', 'Available'),
('Balancing Cream', 'Balancing Cream contains a blend of natural extracts from green tea, hyaluronic acid and vitamin E, which helps balance moisture and maintain smoothness for the skin. The product is suitable for combination skin, helps control excess oil and maintains fresh, non-greasy skin.', 'Moisturizer', 260000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367589/d6a3k4ou1c1xpw8n3yq0.jpg ', 'Available'),
('Revitalizing Moist Moisturizer', 'Revitalizing Moist is a moisturizer that combines collagen, hyaluronic acid and aloe vera extract, which helps regenerate the skin, restore cells and increase elasticity. The product brings firm, youthful and radiant skin, suitable for tired and aging skin.', 'Moisturizer', 280000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367598/wvlf3hgnautc6clahovo.jpg ', 'Available'),
('Premium Hydration Moisturizer', 'Premium Hydration contains hyaluronic acid, peptides and vitamin C, designed to provide optimal nourishment and hydration to the skin. The product helps improve skin texture, reduce dryness and maintain soft, smooth, radiant skin after each use.', 'Moisturizer', 350000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367594/hqrmiiztkdnkxubrg07p.webp ', 'Available'),
('Moisture Lock Moisturizer', 'Moisture Lock is a moisturizer containing hyaluronic acid, rose extract and vitamin E, which helps to "lock" natural moisture and maintain the skin's protective layer. The formula is quickly absorbed, non-greasy, suitable for dry and combination skin, giving a cool and soft feeling.', 'Moisturizer', 255000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367593/hikhpecj9xjufdshtqsg.jpg ', 'Available'),
('Collagen Boost Moisturizer', 'Collagen Boost is a moisturizer rich in collagen, hyaluronic acid and peptides, which helps boost natural collagen production, improve elasticity and reduce wrinkles. It is suitable for mature skin that needs to be restored and regenerated, giving the skin a firm and youthful appearance.', 'Moisturizer', 340000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367589/bbygnd9ovzh2oqqqsfog.jpg ', 'Available'),
('Gentle Hydration Moisturizer', 'Gentle Hydration is extracted from natural ingredients such as aloe vera, green tea and hyaluronic acid, providing gentle moisture and soothing the skin. Formulated for sensitive skin, it helps maintain moisture balance and brings soft, non-irritating skin.', 'Moisturizer', 245000.00, 125, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367591/uioh24gwgp0pvi9psswf.jpg ', 'Available'),
('Ultra Repair Moisturizer', 'Ultra Repair is an intensive moisturizer containing hyaluronic acid, vitamin B5 and aloe vera extract, which helps restore damaged skin, provides maximum moisture and improves elasticity. The product is suitable for dull skin, dry skin and skin that needs to recover from environmental impact.', 'Moisturizer', 315000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367601/rpvcvffpeiauidzpa7ec.jpg ', 'Available'),
('Deep Repair Cream', 'Deep Repair Cream contains a blend of premium nutrients such as hyaluronic acid, collagen and peptides, which help restore damaged skin cells, deeply hydrate and improve skin texture. The product is recommended for environmentally damaged skin and gives smooth, firm skin.', 'Moisturizer', 335000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367590/o0ibqtmqjnglp9a0mmwa.jpg ', 'Available'),
('Pro Hydration Moisturizer', 'Pro Hydration is a moisturizer containing hyaluronic acid and vitamin E, providing continuous moisture and protecting the skin from dehydration, suitable for all skin types, especially dry and tired skin.', 'Moisturizer', 260000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367595/avjg6kht7dtntyieqljh.jpg ', 'Available'),
('Light & Fresh Moisturizer', 'Light & Fresh is a lightweight moisturizer formulated with cucumber extract, hyaluronic acid and vitamin B5, providing just the right amount of moisture without feeling greasy, leaving skin feeling cool and refreshed.', 'Moisturizer', 230000.00, 130, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367593/dopld5ndxco2juavbtdb.jpg ', 'Available');
-------------------------------------------------
-- 2. Category: Serum (25 products)
-------------------------------------------------
INSERT INTO products (product_name, description, category, price, stock_quantity, product_image, status)
VALUES
('Vitamin C Booster Serum', 'Vitamin C Booster Serum contains 15% vitamin C with orange and green tea extracts, which helps brighten skin, improve pigmentation and increase collagen production. The gentle formula, antioxidants and free radical protection, is suitable for all skin types, especially dull and blemished skin.', 'Serum', 320000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367263/jb5py81nzdjyqrnuy5qs.jpg ', 'Available'),
('Retinol Renewal Serum', 'Retinol Renewal Serum contains stabilized retinol and peptides, which support skin regeneration, reduce wrinkles and improve skin texture. The product helps stimulate collagen production, fade dark spots and tighten pores, suitable for mature skin in need of recovery.', 'Serum', 350000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367262/nn9tomzqdvxtz2oyc9k9.avif ', 'Available'),
('Hyaluronic Acid Intensive Serum', 'Hyaluronic Acid Intensive Serum contains highly concentrated hyaluronic acid, combined with aloe vera extract and vitamin E, to deeply hydrate, fill in wrinkles and maintain skin elasticity. The fast-absorbing formula is suitable for dry and dehydrated skin.', 'Serum', 340000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367246/tr8udfbmwjgypr9xgdnh.webp ', 'Available'),
('Serum Collagen Infusion', 'Serum Collagen Infusion is supplemented with hydrolyzed collagen, peptides and vitamin C, which helps nourish and regenerate the skin, improve elasticity and reduce wrinkles. The product is suitable for skin that needs recovery, bringing a clear rejuvenating effect.', 'Serum', 360000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367242/hbz5unhjck8wb7wvuyug.jpg ', 'Available'),
('Anti-Aging Advanced Serum', 'Anti-Aging Advanced Serum contains a blend of peptides, retinol and hyaluronic acid, researched to reduce the signs of aging, firm the skin and improve texture. The intensive formula is suitable for mature skin showing signs of aging, giving the skin a youthful and radiant appearance.', 'Serum', 380000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367197/b6mhxzzk2p3lowkxwpst.jpg ', 'Available'),
('Brightening Complex Serum', 'Brightening Complex Serum contains vitamin C, niacinamide and raspberry extract, which helps brighten skin, balance pigmentation and improve evenness. The product has antioxidant effects and enhances collagen production, suitable for dull skin.', 'Serum', 330000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367241/fieyuoqw305z5cj9hkrp.jpg ', 'Available'),
('Perfect Niacinamide Serum', 'Perfect Niacinamide Serum contains 5% niacinamide combined with hyaluronic acid, which helps reduce acne, fade dark spots and improve skin texture. The gentle formula is suitable for oily and combination skin that needs sebum control.', 'Serum', 310000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367253/nwilmbevjiflxlyv2xbs.webp ', 'Available'),
('Pore Refining Serum', 'Pore Refining Serum contains green tea extract, salicylic acid and vitamin C, which helps to minimize pores, control excess oil and improve skin texture. The product is designed for skin with large pores and acne-prone skin, giving smooth and healthy-looking skin.', 'Serum', 325000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367258/b6mnheycwiy00f4zztkl.jpg ', 'Available'),
('Antioxidant Defense Serum', 'Antioxidant Defense Serum contains green tea extract, vitamin E and grape extract, which helps protect the skin from free radicals and environmental damage. The product has a strong antioxidant effect, maintaining youthful and radiant skin.', 'Serum', 335000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367197/akz4fhhnecu4wcu4i1sk.webp ', 'Available'),
('Peptide Repair Serum', 'Peptide Repair Serum contains a blend of peptides, collagen and hyaluronic acid, which support skin regeneration, plump wrinkles and improve elasticity. The intensive formula is suitable for mature skin in need of repair, leaving skin firm and smooth.', 'Serum', 360000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367256/m5gfhcofswd0zo7fpjll.jpg ', 'Available'),
('Hydration Plus Serum', 'Hydration Plus Serum contains hyaluronic acid, glycerin and aloe vera extract, providing moisture and keeping the skin smooth. The product is suitable for dry skin, helping to improve texture and keep skin moist all day long.', 'Serum', 320000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367248/ju5c3agun2i72rcjvkks.jpg ', 'Available'),
('Firming & Lifting Serum', 'Firming & Lifting Serum contains hydrolyzed collagen, peptides and vitamin C, which helps firm the skin, increase elasticity and provide a lifting effect. The product is suitable for sagging skin, helping to regenerate and rejuvenate the skin.', 'Serum', 380000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367245/xkxusoeerz1bcydnppyo.webp ', 'Available'),
('Rejuvenating Elixir Serum', 'Rejuvenating Elixir Serum combines vitamin C, hyaluronic acid and grape extract to brighten skin, improve texture and stimulate natural collagen production. It delivers a visible rejuvenating effect to tired skin.', 'Serum', 350000.00, 100, '' https://res.cloudinary.com/dygipvoal/image/upload/v1741367260/g25tfuyed0dhdcwjqd55.jpg ', 'Available'),
('Dark Spot Corrector Serum', 'Dark Spot Corrector Serum contains niacinamide, glycolic acid and vitamin C, which helps to fade dark spots, reduce uneven pigmentation and give an even skin tone. The formula is clinically proven to be safe for skin with dark spots.', 'Serum', 360000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367244/axpxfw3fomddrjl2mmiw.webp ', 'Available'),
('Oil Control Serum', 'Oil Control Serum contains salicylic acid, green tea and aloe vera extract, which helps control sebum, reduce acne and minimize pores. The product is suitable for oily and combination skin, leaving skin fresh and tight.', 'Serum', 330000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367255/r7m90uanepusp5rtuajn.jpg ', 'Available'),
('Soothing & Calm Serum', 'Soothing & Calm Serum contains chamomile extract, aloe vera and hyaluronic acid, which help soothe, reduce redness and irritation, suitable for sensitive skin. The product brings a feeling of relaxation and restores the skin after environmental impacts.', 'Serum', 310000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367266/akf5kjx8qrqnzpzt3fvk.webp ', 'Available'),
('Skin Renewal Serum', 'Skin Renewal Serum combines retinol, peptides and vitamin E, helping to stimulate skin regeneration, reduce wrinkles and improve skin texture. The intensive formula is suitable for mature skin in need of restoration and rejuvenation, bringing radiant skin.', 'Serum', 370000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367265/haer3qzkvbkxlt2702ba.webp ', 'Available'),
('Intensive Repair Serum', 'Intensive Repair Serum contains hyaluronic acid, peptides and vitamin C, which helps restore damaged skin, brighten and regenerate skin from within. The product has the effect of improving elasticity and giving smooth, youthful skin.', 'Serum', 380000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367249/ah5gisoeyc6ra7xe4gse.webp ', 'Available'),
('Bright Boost Serum', 'Bright Boost Serum contains vitamin C, niacinamide and raspberry extract, which helps to increase brightness, improve pigmentation and even out skin tone. The antioxidant formula helps protect the skin, suitable for dull skin.', 'Serum', 340000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367200/sjtotetyzo9vg1xlgzrg.webp ', 'Available'),
('Serum Purifying Extract', 'Serum Purifying Extract contains green tea extract, salicylic acid and aloe vera, which helps to deeply cleanse, control excess oil and reduce acne. The product is suitable for skin with signs of acne and sebum, giving clear skin.', 'Serum', 320000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367259/rhjuwaq8wp0bcqws8yfe.webp ', 'Available'),
('Vitamin E Enriched Serum', 'Vitamin E Enriched Serum contains vitamin E, hyaluronic acid and rose extract, which nourish and protect the skin from environmental damage. The product brings smooth, anti-oxidant and youthful skin.', 'Serum', 330000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367269/x1a173ftgxo5svt1pdk8.avif ', 'Available'),
('Advanced Cell Renewal Serum', 'Advanced Cell Renewal Serum combines retinol, peptides and hyaluronic acid to stimulate cell renewal, reduce wrinkles and improve elasticity. The intensive formula is designed for mature skin in need of rapid recovery.', 'Serum', 380000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367196/r0r2hbritip8yoekxupb.jpg ', 'Available'),
('Lightening Essence Serum', 'Lightening Essence Serum contains vitamin C, niacinamide and orange extract, which helps brighten the skin, reduce dark spots and balance natural pigmentation. The product is suitable for uneven skin tone, giving the skin a bright and even tone.', 'Serum', 350000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367250/ghoivcnc7upjqnlrixe8.avif ', 'Available'),
('Moisture Lock Serum', 'Moisture Lock Serum contains hyaluronic acid, glycerin and cucumber extract, which helps lock in moisture and maintain the skin's natural moisture, leaving skin smooth and soft all day long.', 'Serum', 340000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367252/l97top2wif4cuuxokcve.webp ', 'Available'),
('Ultimate Revival Serum', 'Ultimate Revival Serum contains a blend of vitamin C, retinol and peptides, which helps to regenerate the skin, improve elasticity and brighten the skin, providing a noticeable rejuvenation and restoration effect.', 'Serum', 390000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367268/pflxxer65oe5fuhhumsi.jpg ', 'Available');
-------------------------------------------------
-- 3. Category: Cleanser (25 products)
-------------------------------------------------
INSERT INTO products (product_name, description, category, price, stock_quantity, product_image, status)
VALUES
('Gentle Cleanse Facial Cleanser', 'Gentle Cleanse Facial Cleanser with a gentle formula containing green tea and aloe vera extracts, helps clean dirt and excess oil without drying the skin. The product is suitable for all skin types, especially sensitive skin, giving a cool and clean feeling after each use.', 'Cleanser', 180000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366074/l13wq1g8fiyedq367ubx.webp ', 'Available'),
('Purifying Foam Cleanser', 'Purifying Foam is a facial cleanser that contains fine foam, combined with green tea extract and salicylic acid, to help remove sebum and impurities deep in the pores. The powerful yet gentle cleansing formula is suitable for oily and combination skin.', 'Cleanser', 190000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366078/mjzotwqw9ttx4qqmt44x.jpg ', 'Available'),
('Deep Clean Facial Cleanser', 'Deep Clean Facial Cleanser is designed with a formula containing glycolic acid, chamomile extract and green tea, helping to deeply clean pores, remove sebum and dead cells. The product leaves the skin clear, fresh and ready for the next skin care steps.', 'Cleanser', 200000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366071/lpf1wvrhgd1z0rfsoqvc.webp ', 'Available'),
('Micellar Water Cleanser', 'Micellar Water Cleanser uses micellar technology to effectively remove makeup and dirt without rinsing with water. The gentle, alcohol-free formula is suitable for sensitive and dry skin.', 'Cleanser', 210000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366077/awkahgwhimegwsew4u4t.avif ', 'Available'),
('Soothing Cleanser', 'Soothing Cleanser contains aloe vera, green tea and vitamin E extracts, which help soothe and balance the skin after exposure to environmental pollution. The product gently cleanses, maintains natural moisture, suitable for sensitive skin.', 'Cleanser', 185000.00, 125, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366081/ateulmxz3k7ao10z8hc1.webp ', 'Available'),
('Balancing Cleanser', 'Balancing Cleanser with hyaluronic acid and green tea extract helps balance pH, remove dirt and excess oil, leaving skin clean and smooth. The product is suitable for all skin types, especially combination skin.', 'Cleanser', 195000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366070/hujwmsxlmtvfvw8ylrjr.jpg ', 'Available'),
('Exfoliating Cleanser', 'Exfoliating Cleanser contains natural exfoliating beads and fruit enzymes to help remove dead skin cells and brighten the skin. The formula both cleanses and hydrates, suitable for dull skin and skin in need of texture improvement.', 'Cleanser', 205000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366073/a4iqhc3ao46epjppozhe.webp ', 'Available'),
('Refreshing Gel Cleanser', 'Refreshing Gel is a gel cleanser containing cucumber and green tea extracts, providing a cool feeling, deep cleansing and helping to tighten pores. The product is suitable for oily and combination skin, giving the skin a fresh look.', 'Cleanser', 180000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366080/itpa1ysbegkccq7zcf6l.jpg ', 'Available'),
('Hydrating Cleanser', 'Hydrating Cleanser contains hyaluronic acid, rose extract and aloe vera, providing necessary moisture when cleansing the skin. The gentle formula is suitable for dry and sensitive skin, leaving the skin soft and not dry after use.', 'Cleanser', 190000.00, 125, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366075/s45onuadcyvxknayi5ne.avif ', 'Available'),
('Anti-Acne Cleanser', 'Anti-Acne Cleanser is supplemented with salicylic acid and green tea extract, helping to control excess oil, deep clean and prevent acne. The product is suitable for acne-prone skin, giving you clean and clear skin.', 'Cleanser', 210000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366070/qfubunntm1xkdbo8hlh9.jpg ', 'Available'),
('Brightening Cleanser', 'Brightening Cleanser contains vitamin C, orange extract and green tea, helps brighten skin, improve pigmentation and effectively remove dirt. Gentle formula, suitable for dull skin, giving radiant skin.', 'Cleanser', 200000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366070/mja6iq07fseskc3fjdlf.webp ', 'Available'),
('Detox Cleanser', 'Detox Cleanser contains mineral powder and green tea extract, helps remove toxins, sebum and impurities, leaving skin clean, clear and reduces acne. Safe formula for all skin types.', 'Cleanser', 220000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366072/idifjb9ltuqio0rkgf65.jpg ', 'Available'),
('Oil Control Cleanser', 'Oil Control Cleanser is designed with a formula containing salicylic acid, green tea extract and aloe vera, helping to control excess oil, deep clean and reduce oiliness, suitable for oily skin.', 'Cleanser', 210000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366077/x0kwocxoj1oogcigrhqw.jpg ', 'Available'),
('Sensitive Skin Cleanser', 'Sensitive Skin Cleanser has a gentle formula with chamomile and aloe vera extracts, which cleanses without irritation, maintains natural moisture and protects sensitive skin. Ideal for delicate skin.', 'Cleanser', 190000.00, 125, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366081/sxhquhywjnqizocsoyqv.avif ', 'Available'),
('Foam Cleanser', 'Foam Cleanser creates fine foam, deeply cleanses and effectively removes dirt and excess oil. Alcohol-free formula, suitable for all skin types, leaving a clean and refreshing feeling.', 'Cleanser', 200000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366074/f4oyxn7t2magoqsnyokb.webp ', 'Available'),
('Micellar Foam Cleanser', 'Micellar Foam combines micellar technology and natural extracts, helping to remove makeup and dirt without drying the skin. The product is suitable for sensitive skin, leaving the skin soft and balanced.', 'Cleanser', 210000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366076/zkvacggntqlbrx1beknd.webp ', 'Available'),
('Clear Pore Cleanser', 'Clear Pore Cleanser contains glycolic acid and green tea extract, which deeply cleanses, minimizes pores and exfoliates dead skin cells. The powerful yet gentle formula is suitable for skin with large pores and acne.', 'Cleanser', 220000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366071/yascnx3ifgueoympnjwg.jpg ', 'Available'),
('Daily Cleanser', 'Daily Cleanser with green tea and aloe vera extract formula, gently cleanses, maintains moisture and balances skin's pH. The product is suitable for daily cleansing for all skin types.', 'Cleanser', 190000.00, 125, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366071/cthhvofqqcuwfltjduol.jpg ', 'Available'),
('Deep Pore Cleanser', 'Deep Pore Cleanser contains salicylic acid and clay extract, which helps remove sebum, tighten pores and brighten skin. Specialized formula for oily and acne-prone skin, providing clear and clean results.', 'Cleanser', 230000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366072/ofmhhedx7fem4aoa0i1v.webp ', 'Available'),
('Herbal Cleanser', 'Herbal Cleanser contains natural herbal extracts such as green tea, aloe vera and chamomile, which gently cleanse and nourish the skin. The product does not contain harmful chemicals, suitable for sensitive skin.', 'Cleanser', 200000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366075/hbwy4xaipqzntyfjxcrz.jpg ', 'Available'),
('Vitamin C Cleanser', 'Vitamin C Cleanser contains vitamin C, orange extract and green tea, which helps brighten skin, improve pigmentation and effectively remove dirt. Gentle formula, suitable for dull skin.', 'Cleanser', 210000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366084/icrltmy1qxfkb62pbuf6.webp ', 'Available'),
('Refresh Clean Facial Cleanser', 'Refresh Clean is a facial cleanser formulated with cucumber and green tea extracts, providing a refreshing feeling, deep cleansing and retaining natural moisture. The product is suitable for all skin types.', 'Cleanser', 190000.00, 125, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366080/lhowhh141gbubgdgjrnz.jpg ', 'Available'),
('Ultra Clean Facial Cleanser', 'Ultra Clean contains a blend of glycolic acid, green tea and aloe vera extract, which deeply cleanses, removes sebum and dead skin cells, and balances the skin's pH. The product is suitable for oily and acne-prone skin.', 'Cleanser', 220000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366083/rhyrouvbigwyluv4moha.jpg ', 'Available'),
('Purity Cleanser', 'Purity Cleanser contains rose extract, hyaluronic acid and green tea, which helps remove dirt and provide moisture, leaving skin clear and smooth. Gentle formula, suitable for all skin types.', 'Cleanser', 210000.00, 120, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366079/eht3t2sjwkulif7pzukw.jpg ', 'Available'),
('Acne Fighter Cleanser', 'Acne Fighter is a cleanser containing salicylic acid, green tea and tea tree extract, which helps to deeply cleanse, control excess oil and effectively prevent acne. The product is designed for acne-prone skin, leaving skin clean and clear.', 'Cleanser', 230000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741366070/vyk5ygmz5kohacgeeobw.jpg ', 'Available');
-------------------------------------------------
-- 4. Category: Sunscreen (25 products)
-------------------------------------------------
INSERT INTO products (product_name, description, category, price, stock_quantity, product_image, status)
VALUES
('Ultra Shield SPF50+ Sunscreen', 'Ultra Shield SPF50+ Sunscreen provides comprehensive UVA/UVB protection with natural minerals and vitamin E. The non-greasy, fast-absorbing formula helps protect skin from environmental stress and prevents premature aging. Suitable for all skin types, especially sensitive skin.', 'Sunscreen', 350000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367496/sijskozdtrflmqqo8dgz.jpg ', 'Available'),
('Daily Protect SPF30 Sunscreen', 'Daily Protect SPF30 is a daily sunscreen containing natural ingredients and skin protectors, helping to prevent the harmful effects of UV rays and pollution. The lightweight, non-greasy formula is suitable for all skin types and daily use.', 'Sunscreen', 300000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367488/qhmcfptnzoa7iaxdo70y.jpg ', 'Available'),
('Sport Defense SPF50 Sunscreen', 'Sport Defense SPF50 is designed for outdoor sports activities with water and sweat resistance. The product contains mineral ingredients and powerful skin protectants, helping to maintain sun protection in harsh conditions.', 'Sunscreen', 360000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367494/zqrprewy4bazvq6nvuji.webp ', 'Available'),
('Mineral Sunscreen SPF40', 'Mineral Sunscreen SPF40 uses natural mineral ingredients such as zinc oxide and titanium dioxide, providing a physical layer of protection against UV rays without causing irritation. The formula is suitable for sensitive skin, giving a cool and non-greasy feeling.', 'Sunscreen', 340000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367491/kzhxbsrizogd980gucob.jpg ', 'Available'),
('Lightweight SPF35 Sunscreen', 'Lightweight SPF35 is a lightweight lotion sunscreen, containing green tea extract and vitamin E, that helps protect the skin from the effects of UV rays while still being absorbed quickly, without clogging pores. The product is ideal for normal and combination skin.', 'Sunscreen', 320000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367491/wu5zd9gylaqzsyuoa33o.webp ', 'Available'),
('Broad Spectrum SPF50 Sunscreen', 'Broad Spectrum SPF50 provides comprehensive protection against UVA/UVB rays with a formula containing minerals and vitamin C. Suitable for all skin types, it helps prevent aging and protects skin from environmental damage.', 'Sunscreen', 360000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367488/kbcdyejaeew4qlcvsztr.webp ', 'Available'),
('Water Resistant Sunscreen SPF45', 'Water Resistant SPF45 is designed to maintain sun protection in humid conditions and outdoor activities. The formula contains minerals and moisturizers, helping to protect the skin without being greasy, suitable for sports activities.', 'Sunscreen', 340000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367497/pjp6jkidpgsflry3vhce.jpg ', 'Available'),
('Advanced Protection SPF50 Sunscreen', 'Advanced Protection SPF50 is an intensive sunscreen containing protective ingredients such as zinc oxide, titanium dioxide and vitamin E, which helps prevent UV damage and improve skin elasticity. The gentle formula is suitable for sensitive skin.', 'Sunscreen', 370000.00, 95, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367487/eqkwyjn8n5tblmnzpca0.webp ', 'Available'),
('Facial Sunscreen SPF30', 'Facial Sunscreen SPF30 is specially designed for the face with a non-comedogenic formula and added moisturizers. It provides gentle yet effective protection, suitable for normal and combination skin.', 'Sunscreen', 310000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367490/vcg4md5xkrljtvecreqj.jpg ', 'Available'),
('Hydrating Sunscreen SPF40', 'Hydrating Sunscreen SPF40 contains moisturizing ingredients such as hyaluronic acid and vitamin E, combined with mineral sunscreens to protect the skin, while maintaining moisture and softness. The formula is suitable for dry and normal skin.', 'Sunscreen', 330000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367490/r5r2muyvni5pkdubzwma.webp ', 'Available'),
('Matte Finish Sunscreen SPF50', 'Matte Finish SPF50 provides non-greasy protection with a formula containing minerals and natural extracts, helping to control excess oil and give the skin a smooth finish. The product is suitable for oily and combination skin.', 'Sunscreen', 350000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367491/uvu8dypwog1axffhejw3.jpg ', 'Available'),
('Sensitive Skin SPF35 Sunscreen', 'Sensitive Skin SPF35 is developed for sensitive skin with an alcohol-free formula, containing moisturizing ingredients and natural minerals, helping to protect the skin from the harmful effects of UV rays without causing irritation.', 'Sunscreen', 320000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367494/immtl3jycevns30ouzav.png ', 'Available'),
('Tinted Sunscreen SPF30', 'Tinted Sunscreen SPF30 is a lightly tinted sunscreen that evens out skin tone while protecting skin from UV rays. The product contains natural extracts and nutrients, suitable for skin that needs light concealment.', 'Sunscreen', 310000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367495/j690rhir94qhmyynr48u.webp ', 'Available'),
('Non-comedogenic Sunscreen SPF50', 'Non-comedogenic SPF50 has a non-comedogenic formula, contains minerals and vitamin E, helps protect skin without clogging pores. Suitable for acne-prone and easily irritated skin.', 'Sunscreen', 360000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367492/j45yus1psnu5siqyve4y.jpg ', 'Available'),
('UV Defender SPF50 Sunscreen', 'UV Defender SPF50 is a specialized sunscreen with a formula containing zinc oxide and titanium dioxide, providing a strong layer of protection against UVA/UVB rays. The product is suitable for sensitive skin and skin that needs high protection.', 'Sunscreen', 370000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367497/nebkeeuppcubmhcjrun3.webp ', 'Available'),
('Daily Wear SPF30 Sunscreen', 'Daily Wear SPF30 provides gentle daily protection with a formula containing moisturizing and sun protection ingredients, helping to maintain soft skin and prevent UV damage. Suitable for all skin types.', 'Sunscreen', 300000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367489/u4onf3pzebkvzalstwer.jpg ', 'Available'),
('Invisible Shield SPF45 Sunscreen', 'Invisible Shield SPF45 with transparent formula, no white streaks, combined with mineral and moisturizing ingredients, provides an invisible and natural protective layer for the skin. The product is suitable for normal and sensitive skin.', 'Sunscreen', 340000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367491/i4projh0jkn22tqf7e7d.jpg ', 'Available'),
('Ultra Light SPF50 Sunscreen', 'Ultra Light SPF50 has a light lotion texture, absorbs quickly and does not feel heavy on the face, contains minerals and vitamin E to protect the skin from UV rays and polluted environment. Suitable for all skin types.', 'Sunscreen', 350000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367496/erdriei0voweldvluhfp.webp ', 'Available'),
('Advanced Formula SPF40 Sunscreen', 'Advanced Formula SPF40 is carefully researched with a formula containing advanced sunscreen ingredients, helping to protect the skin from the harmful effects of UV rays while maintaining moisture and skin balance. The product is suitable for sensitive skin.', 'Sunscreen', 330000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367487/h3g6oycsvmqdemvgm4xn.jpg ', 'Available'),
('Protective Barrier SPF50 Sunscreen', 'Protective Barrier SPF50 provides a strong layer of protection for the skin with a formula containing zinc oxide and vitamin C, helping to fight against the harmful effects of sunlight and pollution, while maintaining soft and healthy skin.', 'Sunscreen', 360000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367493/jdtpilxguxjkwxttp1so.png ', 'Available'),
('Clear Skin SPF35 Sunscreen', 'Clear Skin SPF35 is designed with a non-pore-clogging formula, containing natural ingredients such as green tea and hyaluronic acid, to protect and brighten the skin without making it greasy. It is ideal for oily and combination skin.', 'Sunscreen', 310000.00, 115, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367488/gtumgrpezy9ur0lai82b.webp ', 'Available'),
('Refreshing Sunscreen SPF40', 'Refreshing SPF40 provides a cool and refreshing feeling to the skin with a formula containing mint extract, hyaluronic acid and natural minerals, helping to protect the skin from the harmful effects of UV rays without being greasy. Suitable for normal and tired skin.', 'Sunscreen', 320000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367494/cbx0kllspwkqqddiya3w.png ', 'Available'),
('Deep Care SPF50 Sunscreen', 'Deep Care SPF50 combines sunscreen and moisturizing ingredients such as zinc oxide, vitamin E and hyaluronic acid, which help protect the skin and maintain its softness, suitable for skin that needs intensive care.', 'Sunscreen', 370000.00, 100, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367489/dmaoetewbcsvruqbrpqg.jpg ', 'Available'),
('Optimal Defense SPF45 Sunscreen', 'Optimal Defense SPF45 with a formula containing natural minerals and vitamin C, provides comprehensive protection and maintains smooth skin without feeling heavy on the face. The product is suitable for all skin types.', 'Sunscreen', 330000.00, 105, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367493/uufjuqtqskuxxocweii8.jpg ', 'Available'),
('Eco Friendly Sunscreen SPF30', 'Eco Friendly SPF30 is developed with an environmentally friendly formula, containing natural and safe ingredients, helping to protect the skin from the harmful effects of UV rays while maintaining moisture and skin balance. Suitable for all skin types.', 'Sunscreen', 310000.00, 110, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367489/wsg9iogx3fuhidryjwtr.webp ', 'Available');
-------------------------------------------------
-- 5. Category: Face Mask (25 products)
-------------------------------------------------
INSERT INTO products (product_name, description, category, price, stock_quantity, product_image, status)
VALUES
('Hydrating Mask', 'Hydrating Mask contains hyaluronic acid, cucumber extract and aloe vera, providing optimal moisture and soothing the skin. The product helps restore dry skin, giving a soft, smooth and youthful feeling after each use.', 'Face Mask', 300000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367449/qg2g3bgunypsulnyduye.jpg ', 'Available'),
('Purifying Mask Clay Mask', 'Purifying Mask is made from natural clay combined with green tea extract and vitamin C, which helps remove sebum, impurities and minimize pores. The product deeply cleanses, leaving skin clear and bright.', 'Face Mask', 320000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367449/aq2ywk3wqa0yvw6kn0pb.webp ', 'Available'),
('Sheet Mask Collagen', 'Sheet Mask Collagen is made from natural fabric that is evenly soaked with collagen, hyaluronic acid and vitamin E, providing nutrients and improving skin elasticity. The product helps to reduce wrinkles, giving you smooth and youthful skin immediately after use.', 'Face Mask', 310000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367451/jkvcomtyr6rgnpxljoia.jpg ', 'Available'),
('Rejuvenating Mask', 'Rejuvenating Mask contains a blend of peptides, collagen and hyaluronic acid, which stimulates skin regeneration, improves elasticity and reduces signs of aging. The product helps brighten, tighten and give the skin a youthful, smooth appearance.', 'Face Mask', 330000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367454/yj54fpy2vfacfluxu1es.webp ', 'Available'),
('Anti-Aging Mask Anti-Aging Mask', 'Anti-Aging Mask is enriched with collagen, retinol and vitamin C, which helps reduce wrinkles, improve firmness and regenerate the skin. The intensive formula provides a visible rejuvenating effect for mature skin.', 'Face Mask', 350000.00, 75, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367448/aiutcr5djixjjaafiymg.jpg ', 'Available'),
('Brightening Mask', 'Brightening Mask contains vitamin C, niacinamide and licorice extract, which helps brighten skin, improve pigmentation and reduce dark spots. The product gives skin an even, bright and natural tone.', 'Face Mask', 300000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367451/ioup0ml7lcq4jh14glmt.jpg ', 'Available'),
('Deep Cleansing Mask', 'Deep Cleansing Mask contains mineral mud and green tea extract, helps remove impurities, sebum and dead skin cells, leaving skin clean and clear. The product is suitable for oily and acne-prone skin.', 'Face Mask', 320000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367451/n6nrqlk931cagw5t032k.jpg ', 'Available'),
('Pore Minimizing Mask', 'Pore Minimizing Mask with clay, green tea extract and hyaluronic acid helps to tighten pores, remove sebum and improve skin texture. The product gives smooth, even and clear skin.', 'Face Mask', 310000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367453/dcelvgut8clo6v3acoyq.jpg ', 'Available'),
('Exfoliating Mask', 'Exfoliating Mask contains fruit enzymes and natural exfoliating beads, which help remove dead skin cells, brighten and improve skin texture. The product is suitable for dull skin, leaving skin smooth and radiant.', 'Face Mask', 330000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367454/bwvgvp9jqq3vdpemvo3r.jpg ', 'Available'),
('Detox Mask', 'Detox Mask combines mineral mud and green tea extract, helps remove accumulated toxins and impurities, deeply cleanses pores and leaves skin clean and clear. The product is suitable for oily and combination skin.', 'Face Mask', 320000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367454/zwl2orirpr2c4hnk5dv0.jpg ', 'Available'),
('Vitamin C Revitalizing Mask', 'Revitalizing Mask contains vitamin C, hyaluronic acid and fruit extracts, which helps brighten, restore and regenerate the skin, leaving it radiant and even-toned. The product has a powerful antioxidant effect.', 'Face Mask', 310000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367455/tg6nso2xiqf09duoktll.jpg ', 'Available'),
('Intensive Care Mask', 'Intensive Care Mask contains peptides, collagen and hyaluronic acid, deeply nourishes and restores tired skin, helps improve elasticity and leaves skin soft and supple. Premium formula for skin in need of intensive recovery.', 'Face Mask', 350000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367449/y51vzqf8dnuubfxh8os7.webp ', 'Available'),
('Recovery Mask', 'Recovery Mask contains hyaluronic acid, vitamin E and aloe vera extract, which helps restore damaged skin, improve texture and provide necessary moisture. Ideal for skin after treatment or affected by the environment.', 'Face Mask', 330000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367452/gvijg7t5h2037650qt7r.webp ', 'Available'),
('Nourishing Mask', 'Nourishing Mask contains shea butter extract, hyaluronic acid and vitamin C, which nourishes and provides nutrients to the skin from deep within. The product softens and balances the skin, giving it a natural and healthy look.', 'Face Mask', 320000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367449/ubnuenslnisvbyclzzgg.webp ', 'Available'),
('Gold Infused Mask', 'Gold Infused Mask contains nano gold particles, hyaluronic acid and peptides, which help stimulate collagen production, increase elasticity and brighten the skin. The premium product brings radiant, firm and youthful skin.', 'Face Mask', 380000.00, 75, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367448/jswbwlp29kvl69o4b1my.jpg ', 'Available'),
('Organic Mask', 'Organic Mask uses organic ingredients from aloe vera, green tea and natural clay, helping to clean, balance and provide safe nutrients for the skin. The product does not contain harmful chemicals, suitable for sensitive skin.', 'Face Mask', 310000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367450/nnxerlg8ibmjfjvtxlbt.jpg ', 'Available'),
('Sleeping Mask', 'Sleeping Mask is designed for overnight use, containing hyaluronic acid, peptides and chamomile extract, to deeply hydrate, restore and brighten the skin while you sleep. The product brings youthful and smooth skin the next morning.', 'Face Mask', 340000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367452/fnfd8zrwgin7ylkctjgb.webp ', 'Available'),
('Calming Mask', 'Calming Mask contains chamomile extract, aloe vera and hyaluronic acid, which helps soothe and reduce skin irritation, suitable for sensitive skin. The product brings a feeling of relaxation and soft skin, without tightness.', 'Face Mask', 300000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367450/bm7dpzmyr3mwsdk4zzyh.jpg ', 'Available'),
('Illuminating Mask', 'Illuminating Mask contains vitamin C, glycolic acid and licorice extract, which helps brighten and improve pigmentation, giving the skin a radiant, even and vibrant look. Suitable for dull and tired skin.', 'Face Mask', 320000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367451/ytnymxbbebsqoe1vzmgo.png ', 'Available'),
('Collagen Boost Mask', 'Collagen Boost Mask contains hydrolyzed collagen, peptides and hyaluronic acid, which helps boost collagen production, firm skin and reduce wrinkles. The product gives firm, elastic and youthful skin after each use.', 'Face Mask', 350000.00, 75, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367450/bcqf0c5tilynz7aqh1gb.jpg ', 'Available'),
('Pro Hydration Mask', 'Pro Hydration Mask contains hyaluronic acid, cucumber extract and vitamin E, providing optimal moisture and restoring dry skin, leaving skin smooth, soft and fresh. The product is easy to use and absorbs quickly.', 'Face Mask', 310000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367449/c96kuqvonblhqevlydwx.jpg ', 'Available'),
('Clarifying Mask', 'Clarifying Mask contains natural clay, salicylic acid and green tea extract, helps remove impurities, sebum and minimize pores, leaving skin clean and clear. The product is suitable for oily and acne-prone skin.', 'Face Mask', 330000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367453/ppwk3tpuntrjrc2hxniu.jpg ', 'Available'),
('Acne Treatment Mask', 'Acne Treatment Mask contains salicylic acid, green tea and aloe vera extract, helps control excess oil, deeply cleanses and effectively prevents acne. Specialized formula for acne-prone skin, giving you clean and balanced skin.', 'Face Mask', 320000.00, 80, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367449/iulwvgvvdp8zzg3fvtjf.jpg ', 'Available'),
('Essence Mask', 'Essence Mask contains green tea essence, hyaluronic acid and vitamin C, providing optimal nutrients, restoring and brightening the skin, bringing radiant, soft and vibrant skin. The product is suitable for all skin types.', 'Face Mask', 340000.00, 85, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367450/woagfxdylmbqh8rbkmc3.webp ', 'Available'),
('Softening Mask', 'Softening Mask contains cucumber extract, hyaluronic acid and vitamin E, which helps soften, restore and maintain the skin's natural moisture, leaving it feeling smooth and comfortable after each use. The gentle formula is suitable for dry and sensitive skin.', 'Face Mask', 310000.00, 90, ' https://res.cloudinary.com/dygipvoal/image/upload/v1741367451/guyll9cdpzpadhg2h7tm.jpg ', 'Available');
-----------------------------------------------------------
-- 3. INSERT SKIN TYPES: 4 types
-----------------------------------------------------------
INSERT INTO skin_types (skin_type) VALUES
('Oily Skin'),
('Normal Skin'),
('Dry Skin'),
('Combination skin');
 
-----------------------------------------------------------
-- 4. INSERT SKIN CARE ROUTINES
-----------------------------------------------------------
-- For Oily Skin (skin_type_id = 1)
INSERT INTO skin_care_routines (skin_type_id, step_number, description) VALUES
(1, 1, 'Step 1: Wash your face with a gel/foam cleanser containing salicylic acid, which helps remove sebum and dirt without stripping away natural moisture.'),
(1, 2, 'Step 2: Use micellar water or a toner containing witch hazel to balance pH, tighten pores and control excess oil.'),
(1, 3, 'Step 3: Apply a serum containing niacinamide and tea tree oil to regulate oil production, reduce inflammation, and fade acne scars.'),
(1, 4, 'Step 4: Apply a spot treatment to affected areas to reduce swelling and prevent acne-causing bacteria.'),
(1, 5, 'Step 5: Moisturize with an oil-free gel moisturizer containing hyaluronic acid, which provides essential moisture without feeling greasy.'),
(1, 6, 'Step 6: Use a clay mask 1-2 times/week to absorb sebum, deep clean and tighten pores.'),
(1, 7, 'Step 7: Apply a lotion or oil-balancing product specifically designed for oily skin to regulate excess oil.'),
(1, 8, 'Step 8: Finish with broad-spectrum SPF 50 sunscreen, which protects skin from the harmful effects of UV rays in everyday environments.');
 
-- For Normal Skin (skin_type_id = 2)
INSERT INTO skin_care_routines (skin_type_id, step_number, description) VALUES
(2, 1, 'Step 1: Wash your face with a gentle cleanser with chamomile extract, which cleanses without stripping the skin of its natural moisture.'),
(2, 2, 'Step 2: Use a moisturizing toner containing glycerin and vitamin B5 to balance pH and increase skin moisture.'),
(2, 3, 'Step 3: Apply a serum containing vitamin C and peptides, which stimulates collagen production, brightens skin and improves texture.'),
(2, 4, 'Step 4: Use a gentle essence to provide deep nourishment, helping the following skin care products penetrate more effectively.'),
(2, 5, 'Step 5: Moisturize with a moisturizer containing ceramides, which helps maintain the skin's protective barrier and moisture throughout the day.'),
(2, 6, 'Step 6: Use a moisturizing mask or sheet mask 1-2 times/week to regenerate and restore the skin.'),
(2, 7, 'Step 7: Apply eye cream and lip balm to care for delicate skin areas, reduce puffiness and wrinkles.'),
(2, 8, 'Step 8: Finish with SPF 30-50 sunscreen to protect skin from UV rays and environmental pollution.');
 
 
-- For Dry Skin (skin_type_id = 3)
INSERT INTO skin_care_routines (skin_type_id, step_number, description) VALUES
(3, 1, 'Step 1: Wash your face with a cream or oil cleanser, which gently cleanses without stripping the skin of its natural protective oils.'),
(3, 2, 'Step 2: Use a hydrating toner containing glycerin and hyaluronic acid to balance and maintain skin's moisture.'),
(3, 3, 'Step 3: Apply a nutrient-rich serum containing hyaluronic acid and vitamin E, which provides deep hydration and antioxidants.'),
(3, 4, 'Step 4: Use essence to enhance the absorption of the following skin care products.'),
(3, 5, 'Step 5: Moisturize with a cream containing ceramides, shea butter and nourishing oils, which help lock in moisture and restore the skin's protective barrier.'),
(3, 6, 'Step 6: Use a moisturizing mask or sleeping mask 1-2 times/week to regenerate and improve skin smoothness.'),
(3, 7, 'Step 7: Apply facial oil after moisturizer to hydrate and protect skin from environmental damage.'),
(3, 8, 'Step 8: Use a moisturizing sunscreen SPF 30 daily, which protects skin from UV rays without drying it out.');
 
-- For Combination Skin (skin_type_id = 4)
INSERT INTO skin_care_routines (skin_type_id, step_number, description) VALUES
(4, 1, 'Step 1: Gently wash your face with a cleanser specifically for combination skin, cleansing both oily and dry areas without disrupting moisture balance.'),
(4, 2, 'Step 2: Use a balancing toner that contains moisturizing and oil-controlling ingredients to help tighten pores and maintain balance.'),
(4, 3, 'Step 3: Apply a dual-action serum containing nutrients for dry areas and oil-regulating ingredients for shiny areas, improving overall skin texture.'),
(4, 4, 'Step 4: Use a light essence to provide deep nourishment, helping the next skin care products penetrate better.'),
(4, 5, 'Step 5: Apply a light moisturizer; if needed, use a separate product for dry areas to maintain softness and balance throughout the face.'),
(4, 6, 'Step 6: Use masks by area: choose a clay mask for oily skin areas and a moisturizing mask for dry skin areas, apply 1-2 times/week.'),
(4, 7, 'Step 7: Apply eye cream and lip balm to care for delicate areas, helping to reduce wrinkles and increase moisture.'),
(4, 8, 'Step 8: Finish the routine with broad-spectrum SPF 30 sunscreen, which protects skin from harmful UV rays and environmental pollution.');
 
 
-----------------------------------------------------------
-- 5. INSERT PROMOTIONS
-----------------------------------------------------------
INSERT INTO promotions (code, description, discount_percentage, start_date, end_date, minimum_order_value, status)
VALUES
('PROMO10', '10% discount for orders from 500,000 VND. Applicable to all orders this month with all product types. Customers will automatically receive a discount when the order value reaches the minimum.', 10.00, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 500000.00, 'Active'),
('PROMO15', 'Get 15% off on orders from 1,000,000 VND. Exclusive offer for loyal customers when purchasing key products. Valid for 30 days from activation date.', 15.00, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1000000.00, 'Active'),
('PROMO5', '5% off all orders with no value limit, special offer for the shopping season with the aim of attracting new customers and increasing shopping frequency.', 5.00, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 0, 'Active'),
('NEWYEAR20', 'New Year Offer: 20% off orders from VND 800,000. Applicable to all products in the store from December 31 to January 07. Customers enjoy high discounts to celebrate the new year and encourage early shopping.', 20.00, '2025-12-31', '2026-01-07', 800000.00, 'Active'),
('SUMMER25', 'Summer Promotion: 25% off orders from 1,200,000 VND, applicable to fashion, accessories and outdoor products. The promotion is valid for the first 2 weeks of summer, helping customers update new trends at preferential prices.', 25.00, '2025-06-01', '2025-06-14', 1200000.00, 'Active'),
('WELCOME10', 'New Customer Welcome Offer: 10% off your first order with no minimum. New customers will receive this offer code only once upon successful registration, to create a positive first impression.', 10.00, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), 0, 'Active'),
('CLEARANCE30', 'Clearance Promotion: Up to 30% off on discounted products in the Clearance category. Offer cannot be combined with other promotions and is only valid for 15 days, to quickly clear inventory.', 30.00, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), 0, 'Active'),
('FREESHIP50', 'Free Shipping Offer: 50% off shipping for orders from 700,000 VND. Applicable to all orders this month and helps customers save on shipping costs.', 50.00, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 700000.00, 'Active'),
('HOLIDAY15', 'Holiday Offer: 15% off orders from VND 900,000, applicable during the festive season. This promotion is to thank customers during the holiday season, with the condition that the order reaches the minimum value and applies to selected products.', 15.00, NOW(), DATE_ADD(NOW(), INTERVAL 20 DAY), 900000.00, 'Active'),
('FLASHSALE20', 'Flash Sale Promotion: 20% off all orders for 48 hours. Applicable to all products in the store with a short promotion period, to stimulate quick shopping and increase sales in a short period of time.', 20.00, NOW(), DATE_ADD(NOW(), INTERVAL 2 DAY), 0, 'Active');
 
-----------------------------------------------------------
-- 6. INSERT cancellation_policies.
-----------------------------------------------------------
INSERT INTO cancellation_policies (policy_name, description, applicable_days, policy_type)
VALUES
('Standard Cancellation', 'Customers may cancel orders within 24 hours of placement provided the order has not yet been processed. A full refund will be issued if the cancellation request is made within this timeframe; cancellations after 24 hours may incur a processing fee.', 1, 'Refund'),
('Pre-Order Cancellation', 'For pre-ordered items, cancellations are accepted up to 7 days before the official release date. A 10% restocking fee may apply for cancellations made less than 7 days prior to release. No cancellation is accepted once pre-order processing begins.', 7, 'Partial Refund'),
('Customized Order Cancellation', 'Customized orders can only be canceled within 12 hours of placement before production begins. Once customization has begun, cancellations are not permitted and any deposit will be forfeited.', 0, 'No Refund'),
('Holiday Season Cancellation', 'During peak holiday seasons, orders must be canceled at least 3 days prior to shipping to accommodate extended processing times. Refunds will be issued based on the processing stage with potential deductions for expedited handling costs.', 3, 'Partial Refund'),
('Restocking Fee Cancellation', 'Orders canceled after processing but before dispatch may incur a 15% restocking fee based on the total order value. This policy applies to standard orders only and does not apply to items that are defective or damaged.', 0, 'Partial Refund');
 
-----------------------------------------------------------
-- 7. INSERT BLOGS
-----------------------------------------------------------
INSERT INTO blogs (title, content, author_id, category, view_count)
VALUES
('Benefits of Proper Skin Care: A Step-by-Step Guide from an Expert',
'This article provides a comprehensive guide to daily skin care, from cleansing, toning, moisturizing to protecting your skin from the environment. You will learn about the role of each product, how to choose the right one for your skin type, and important tips from dermatologists. The article also includes useful tips to improve skin texture and maintain healthy, youthful skin over time. Natural methods and ingredients are introduced to help you have an effective and safe skin care routine.',
4, 'Skin Care', 150),
	
('Top Skin Care Products of 2025: Detailed Reviews and Customer Reviews',
'In this article, we compile and review the most trusted skin care products by customers in 2025. Each product is carefully analyzed in terms of uses, ingredients, pros and cons, along with real images and detailed reviews from consumers. The article not only helps you grasp the new trends but also provides information on how to effectively use each product to achieve optimal results for your skin.',
4, 'Product Review', 200),
	
('Secrets to Choosing the Right Skin Care Products: A Detailed Guide from a Dermatologist',
'Choosing skincare products requires understanding your skin type and the ingredients in the product. This article provides product evaluation criteria, detailed analysis of ingredients such as hyaluronic acid, peptides, vitamin C and many other nutrients. You will be guided on how to check for safety, effectiveness and small testing steps before applying them to the entire skincare routine. This is a useful document for those who want to have healthy and radiant skin over time.',
6, 'Tips', 250);
-----------------------------------------------------------
-- 8. INSERT FAQ
-----------------------------------------------------------
INSERT INTO faq (product_id, question, answer)
VALUES
(3,
'Is Retinol Suitable for All Skin Types?',
'Retinol is an effective ingredient for reducing wrinkles and boosting skin renewal. However, due to its irritating properties, those with sensitive skin should start with a low concentration, use it at night, and combine it with a moisturizer. Also, using sunscreen during the day is a must to protect the skin.'),
	
(4,
'How to use AHA/BHA properly?',
'AHA and BHA are acids that help exfoliate, improve texture, and brighten the skin. Start with 1-2 times/week, then gradually increase as your skin adapts. Avoid using at the same time with products containing retinol to limit irritation, and always remember to use sunscreen when going out.'),
	
(5,
'What is the difference between physical and chemical sunscreens?',
'Physical sunscreens contain minerals like zinc oxide and titanium dioxide, which create a protective barrier by reflecting UV rays. Chemical sunscreens, on the other hand, work by absorbing UV rays and converting them into heat. Both are effective when used correctly, but physical sunscreens are often recommended for sensitive skin because they are less likely to cause irritation.'),
	
(NULL,
'Why should you use toner after washing your face?',
'Toner helps balance the skin's pH, removes dirt and impurities left after cleansing, and opens pores so that the skin can absorb nutrients from subsequent skin care products. Using toner is an important step to maintain healthy and youthful skin.'),
	
(NULL,
'What is the effective way to take care of acne skin?',
'For acne-prone skin, gentle cleansing is important to avoid damaging the epidermis. Use a product containing salicylic acid to help unclog pores, combined with a light moisturizer that won't clog pores. In addition, maintaining a healthy diet and avoiding touching your face can also help reduce acne effectively.'),
	
(6,
'What are the benefits of Niacinamide for skin?',
'Niacinamide (Vitamin B3) helps reduce inflammation, fade dark spots, control excess oil, and strengthen the skin barrier. It is suitable for all skin types, including sensitive skin, and is often combined with other skin care ingredients to optimize the effectiveness of treatment and skin care.'),
	
(7,
'What is the effect of Hyaluronic Acid Serum and how to use it correctly?',
'Hyaluronic Acid has the ability to retain water, helping the skin stay smooth and plump. Serum containing Hyaluronic Acid should be used on damp skin immediately after cleansing and before applying moisturizer. This product is suitable for all skin types, especially dry and aging skin.'),
	
(NULL,
'How to preserve skin care products effectively?',
'To store your skin care products, keep them in a cool, dry place and away from direct sunlight. Products containing natural ingredients usually need to be refrigerated. Always close the lid tightly after use and follow the storage instructions on the product label.');
-----------------------------------------------------------
-- 9. INSERT PROMOTION_APPLICATIONS
-----------------------------------------------------------
INSERT INTO promotion_applications (promotion_id, product_id, order_id, applied_date, discount_amount)
VALUES
(1, 1, 1, NOW(), 20000.00),
(2, 2, 2, NOW(), 50000.00),
(3, NULL, 3, NOW(), 30000.00);
