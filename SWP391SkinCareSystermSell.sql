-- Kiểm tra và tạo Database
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'DatabaseForTest')
BEGIN
    DROP DATABASE [DatabaseForTest];
END
GO

CREATE DATABASE [DatabaseForTest];
GO

USE [DatabaseForTest];
GO

-- Bảng users (Quản lý thông tin người dùng)
CREATE TABLE users (
    user_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_name VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(MAX) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status BIT NOT NULL DEFAULT 1,  -- 1: Active, 0: Inactive
    gender VARCHAR(10) NULL,
    date_of_birth DATE NULL,
    address NVARCHAR(MAX) NULL,
    phone_number VARCHAR(20) NULL,
    profile_image NVARCHAR(MAX) NULL,
    CONSTRAINT chk_role CHECK (role IN ('Customer','Staff','Manager')),
    CONSTRAINT chk_gender CHECK (gender IN ('Male','Female') OR gender IS NULL)
);
GO

-- Bảng products (Quản lý sản phẩm)
CREATE TABLE products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    stock_quantity INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Available',
    CONSTRAINT chk_product_status CHECK (status IN ('Available','OutOfStock','Discontinued'))
);
GO

-- Bảng skin_types (Quản lý loại da)
CREATE TABLE skin_types (
    skin_type_id INT IDENTITY(1,1) PRIMARY KEY,
    skin_type VARCHAR(50) NOT NULL UNIQUE
);
GO

-- Bảng skin_care_routines (Lộ trình chăm sóc da)
CREATE TABLE skin_care_routines (
    routine_id INT IDENTITY(1,1) PRIMARY KEY,
    skin_type_id INT NOT NULL,
    step_number INT NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    CONSTRAINT uq_skin_type_step UNIQUE (skin_type_id, step_number),
    CONSTRAINT fk_skin_type FOREIGN KEY (skin_type_id) REFERENCES skin_types(skin_type_id)
);
GO

-- Bảng user_details (Thông tin đặc thù theo vai trò)
CREATE TABLE user_details (
    user_id BIGINT PRIMARY KEY,
    loyalty_points INT NULL,
    preferred_skin_type_id INT NULL,
    hire_date DATE NULL,
    salary DECIMAL(18,2) NULL,
    department VARCHAR(255) NULL,
    CONSTRAINT fk_user_details_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_user_details_skin_type FOREIGN KEY (preferred_skin_type_id) REFERENCES skin_types(skin_type_id)
);
GO

-- Bảng cancellation_policies (Chính sách hủy)
CREATE TABLE cancellation_policies (
    policy_id INT IDENTITY(1,1) PRIMARY KEY,
    policy_name VARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NULL,
    applicable_days INT NOT NULL,
    policy_type VARCHAR(50) NOT NULL DEFAULT 'Refund'
);
GO

-- Bảng shipping_addresses (Địa chỉ giao hàng)
CREATE TABLE shipping_addresses (
    address_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address NVARCHAR(MAX) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NULL,
    is_default BIT NOT NULL DEFAULT 0,
    CONSTRAINT fk_shipping_addresses_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
GO

-- Bảng orders (Đơn hàng)
CREATE TABLE orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    total_price DECIMAL(18,2) NOT NULL,
    order_status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    policy_id INT NULL,
    shipping_address_id INT NULL,
    discount_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    CONSTRAINT chk_order_status CHECK (order_status IN ('Pending','Shipped','Delivered','Canceled')),
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES users(user_id),
    CONSTRAINT fk_orders_policy FOREIGN KEY (policy_id) REFERENCES cancellation_policies(policy_id),
    CONSTRAINT fk_orders_shipping_address FOREIGN KEY (shipping_address_id) REFERENCES shipping_addresses(address_id) ON DELETE SET NULL
);
GO

-- Bảng order_items (Chi tiết đơn hàng)
CREATE TABLE order_items (
    order_item_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(18,2) NOT NULL,
    discount_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
GO

-- Bảng promotions (Khuyến mãi)
CREATE TABLE promotions (
    promotion_id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description NVARCHAR(MAX) NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    minimum_order_value DECIMAL(18,2) NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active'
);
GO


-- Bảng carts (Giỏ hàng)
CREATE TABLE carts (
    cart_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id BIGINT NOT NULL UNIQUE,
    CONSTRAINT fk_carts_customer FOREIGN KEY (customer_id) REFERENCES users(user_id)
);
GO


-- Bảng faq (Câu hỏi thường gặp)
CREATE TABLE faq (
    faq_id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NULL,
    question NVARCHAR(MAX) NOT NULL,
    answer NVARCHAR(MAX) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_faq_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
GO

-- Bảng payment_details (Chi tiết thanh toán)
CREATE TABLE payment_details (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    payment_date DATETIME NULL,
    transaction_id VARCHAR(255) NULL,
    CONSTRAINT fk_payment_details_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);
GO

-- Bảng order_history (Lịch sử đơn hàng)
CREATE TABLE order_history (
    order_history_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    note NVARCHAR(MAX) NULL,
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_history_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);
GO

-- Bảng skin_type_tests (Kiểm tra loại da)
CREATE TABLE skin_type_tests (
    test_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    test_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    result_skin_type_id INT NOT NULL,
    CONSTRAINT uq_skin_type_tests UNIQUE (customer_id, test_date),
    CONSTRAINT fk_skin_type_tests_customer FOREIGN KEY (customer_id) REFERENCES users(user_id),
    CONSTRAINT fk_skin_type_tests_result_skin FOREIGN KEY (result_skin_type_id) REFERENCES skin_types(skin_type_id)
);
GO

-- Bảng test_results (Kết quả kiểm tra loại da)
CREATE TABLE test_results (
    result_id INT IDENTITY(1,1) PRIMARY KEY,
    test_id INT NOT NULL,
    total_A INT NOT NULL DEFAULT 0,
    total_B INT NOT NULL DEFAULT 0,
    total_C INT NOT NULL DEFAULT 0,
    total_D INT NOT NULL DEFAULT 0,
    final_skin_type_id INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_test_results_test FOREIGN KEY (test_id) REFERENCES skin_type_tests(test_id),
    CONSTRAINT fk_test_results_final_skin FOREIGN KEY (final_skin_type_id) REFERENCES skin_types(skin_type_id)
);
GO

-- Bảng delivery_details (Chi tiết giao hàng)
CREATE TABLE delivery_details (
    delivery_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    delivery_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    courier_name VARCHAR(255) NULL,
    tracking_number VARCHAR(255) NULL,
    delivery_date DATETIME NULL,
    estimated_delivery_date DATETIME NULL,
    delivered_date DATETIME NULL,
    CONSTRAINT fk_delivery_details_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
GO

-- Bảng promotion_applications (Áp dụng khuyến mãi)
CREATE TABLE promotion_applications (
    application_id INT IDENTITY(1,1) PRIMARY KEY,
    promotion_id INT NOT NULL,
    product_id INT NULL,
    order_id INT NULL,
    applied_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    discount_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_promotion_applications_promotion FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id),
    CONSTRAINT fk_promotion_applications_product FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT fk_promotion_applications_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
GO

-- Bảng product_comparisons (So sánh sản phẩm)
CREATE TABLE product_comparisons (
    comparison_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product1_id INT NOT NULL,
    product2_id INT NOT NULL,
    comparison_result NVARCHAR(MAX) NULL,
    CONSTRAINT fk_product_comparisons_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_product_comparisons_product1 FOREIGN KEY (product1_id) REFERENCES products(product_id),
    CONSTRAINT fk_product_comparisons_product2 FOREIGN KEY (product2_id) REFERENCES products(product_id)
);
GO

-- Bảng product_attributes (Thuộc tính sản phẩm)
CREATE TABLE product_attributes (
    attribute_id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NOT NULL,
    attribute_name VARCHAR(255) NOT NULL,
    attribute_value VARCHAR(255) NOT NULL,
    CONSTRAINT fk_product_attributes_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
GO

-- Bảng product_images (Hình ảnh sản phẩm)
CREATE TABLE product_images (
    image_id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NOT NULL,
    image_url NVARCHAR(MAX) NOT NULL,
    is_main_image BIT NOT NULL DEFAULT 0,
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
GO

-- Bảng user_notifications (Thông báo người dùng)
CREATE TABLE user_notifications (
    notification_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    notification_type VARCHAR(50) NOT NULL DEFAULT 'General',
    status VARCHAR(50) NOT NULL DEFAULT 'Unread',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
GO

-- Bảng recommended_products (Gợi ý sản phẩm theo loại da)
CREATE TABLE recommended_products (
    recommendation_id INT IDENTITY(1,1) PRIMARY KEY,
    skin_type_id INT NOT NULL,
    product_id INT NOT NULL,
    recommendation_reason VARCHAR(255) NULL,
    CONSTRAINT uq_recommended_products UNIQUE (skin_type_id, product_id),
    CONSTRAINT fk_recommended_products_skin_type FOREIGN KEY (skin_type_id) REFERENCES skin_types(skin_type_id),
    CONSTRAINT fk_recommended_products_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
GO

-- Bảng sales_reports: báo cáo doanh số tổng hợp theo khoảng thời gian
CREATE TABLE sales_reports (
    report_id INT IDENTITY(1,1) PRIMARY KEY,
    report_date DATE NOT NULL,
    total_revenue DECIMAL(18,2) NOT NULL,
    total_orders INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
GO

-- Bảng sales_report_details: chi tiết doanh số theo sản phẩm
CREATE TABLE sales_report_details (
    detail_id INT IDENTITY(1,1) PRIMARY KEY,
    report_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    product_revenue DECIMAL(18,2) NOT NULL,
    CONSTRAINT fk_sales_report_details_report FOREIGN KEY (report_id) REFERENCES sales_reports(report_id) ON DELETE CASCADE,
    CONSTRAINT fk_sales_report_details_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
GO
