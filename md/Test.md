# 테스트 내역(24/06/19)

### User
- 예약 ⭕
- 리뷰 ⭕
- 파트너 신청 ⭕
- 회원가입
    - 사이트 회원가입 ⭕
    - 소셜 회원가입 🔺(전화번호, 이메일, 주소 못가져옴)
- 로그인
    - 사이트 로그인 ⭕
    - 소셜 로그인 ❌(500 Error)
    - 아이디 저장 ⭕
    - 자동 로그인⭕
- 아이디 찾기 ⭕
- 비밀번호 찾기 ⭕
- 내 정보 수정
    - 수정 ⭕
    - 탈퇴 ❌(404 Error, 데이터 삭제 ⭕)

### Partner
- 내 정보 변경
    - 수정 ⭕
- 내 예약 보기
    - 문의하기 ❌(400 Error)
- 내 리뷰 보기 🔺(textArea css 문제있음)
- 채팅 내역 ⭕

### Admin
- 유저관리
    - 수정 ⭕
    - 리뷰 ⭕
    - 삭제 ❌(500 Error, 제약조건 문제)
- 파트너관리
    - 승인 ⭕
    - 취소 ⭕
    - 수정 ⭕
    - 삭제 ❌(500 Error, 제약조건 문제)
- 예약관리
    - 환불 승인 ⭕
    - 예약 수정 ⭕

### 예약
- 예약
    - 등록 ⭕
    - 수정 ⭕
    - 삭제
        - 리뷰, 주문 등 없을때 ⭕
        - 리뷰, 주문 등 있을때
    - 조회
        - 일반 조회 ⭕
        - 리뷰 있을 경우 ❌
- 장바구니
    - 추가 🔺
    - 선택 삭제 ⭕
    - 전체 삭제 ⭕
    - 선택 결제 ❌(500 Error, 제약조건 문제)
- 채팅
    - 채팅창 추가 ⭕
    - 채팅 전송 ⭕
- 주문
    - 주문 성공 ⭕
    - 주문 실패 ⭕
    - 주문 취소 ⭕

### 팁
- 게시글
    - 등록 ⭕
    - 수정 ⭕
    - 삭제 ⭕
    - 추천 ⭕
- 댓글
    - 등록 ⭕
    - 수정 🔺(ID가 다른 유저에게도 수정/삭제 버튼이 보임)
    - 삭제 🔺(ID가 다른 유저에게도 수정/삭제 버튼이 보임)