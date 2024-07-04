-- 서비스 샘플 데이터 추가
INSERT INTO service (service_category, service_name, service_price, service_content, partner_no)
VALUES 
    ('청소', '[청소] 화장실 청소', 300, '테스트데이터, 화장실 청소 서비스입니다.', 1),
    ('빨래', '[빨래] 빨래 전문', 200, '테스트데이터, 빨래 서비스입니다.', 2);

-- 주문 샘플 데이터 추가
INSERT INTO orders (orders_no, user_no, order_status, total_quantity, total_price, total_count, title)
VALUES 
    ('ORD001', 1, '보류중', 1, 300, 1, '화장실 청소 예약'),
    ('ORD002', 2, '결제완료', 2, 400, 2, '빨래 전문 예약');

-- 주문 항목 샘플 데이터 추가
INSERT INTO order_item (item_no, quantity, price, amount, orders_no, service_no)
VALUES 
    ('ITEM001', 1, 300, 300, 'ORD001', 1),
    ('ITEM002', 2, 200, 400, 'ORD002', 2);

-- 결제 샘플 데이터 추가
INSERT INTO payment (payment_method, status, orders_no, service_date, service_address)
VALUES 
    ('Card', '결제완료', 'ORD001', '2023-07-05 10:00:00', '인천광역시 남동구'),
    ('Card', '결제완료', 'ORD002', '2023-07-06 15:00:00', '서울특별시 강남구');

-- 추가적으로 더 많은 샘플 데이터를 원할 경우 각 테이블에 맞게 데이터를 추가할 수 있습니다.
-- 예를 들어, 다른 사용자와 파트너를 위한 주문을 추가할 수 있습니다.

-- 추가 서비스 샘플 데이터
INSERT INTO service (service_category, service_name, service_price, service_content, partner_no)
VALUES 
    ('방역', '[방역] 집 방역', 400, '테스트데이터, 집 방역 서비스입니다.', 1),
    ('보안', '[보안] CCTV 설치', 500, '테스트데이터, CCTV 설치 서비스입니다.', 2);

-- 추가 주문 샘플 데이터
INSERT INTO orders (orders_no, user_no, order_status, total_quantity, total_price, total_count, title)
VALUES 
    ('ORD003', 3, 'PENDING', 1, 400, 1, '집 방역 예약'),
    ('ORD004', 4, 'PAID', 1, 500, 1, 'CCTV 설치 예약');

-- 추가 주문 항목 샘플 데이터
INSERT INTO order_item (item_no, quantity, price, amount, orders_no, service_no)
VALUES 
    ('ITEM003', 1, 400, 400, 'ORD003', 3),
    ('ITEM004', 1, 500, 500, 'ORD004', 4);

-- 추가 결제 샘플 데이터
INSERT INTO payment (payment_method, status, orders_no, service_date, service_address)
VALUES 
    ('Credit Card', 'PAID', 'ORD003', '2023-07-07 10:00:00', '부산광역시 해운대구'),
    ('Credit Card', 'PAID', 'ORD004', '2023-07-08 15:00:00', '대구광역시 중구');
