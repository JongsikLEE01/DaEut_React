# ReservationController
## 예약 게시글 경로
1. ⭕ 전체 조회         - [GET] "/reservation"
2. ⭕ 단일 조회         - [GET] "/reservation/{serviceNo}"
3. ⭕ 예약 글 등록      - [POST] "/reservation"
4. ⭕ 예약 글 수정      - [GET] "/reservation/update"
5. ⭕ 예약 글 수정 처리 - [PUT] "/reservation"
6. ⭕ 예약 글 삭제 처리 - [DELETE] "/reservation"

# OrderController
## 주문 경로
1. ⭕ 주문 등록         - [POST]  "/orders"
2. ❌ 주문 완료         - [GET]   "/orders/success"
3. ❌ 주문 실패         - [GET]   "/orders/fail"
4. ❌ 결제 하기         - [GET]   "/orders/{ordersNo}"
5. ❌ 취소 하기         - [POST]  "/orders/cancel"

# ChatController
## 채팅 경로
1. ⭕ 채팅방 조회           - [GET]        "/chat"
2. ⭕ 채팅 전송             - [Message]    "/chat/sendMessage"

# CartController
## 장바구니 경로
1. ⭕ 장바구니 조회             - [GET]      "/cart/{userNo}"
2. ⭕ 장바구니 추가             - [POST]     "/cart"
3. ⭕ 장바구니 선택 삭제         - [DELETE]   "/cart"
4. ⭕ 장바구니 전체 삭제         - [DELETE]   "/cart/{userNo}"