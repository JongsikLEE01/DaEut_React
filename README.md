# 프로젝트 : DaEut
![logo_w (1)](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/927fa3b1-b3c3-4378-a5d9-838d4db9d9db)
<br>
(시연 영상 링크)


## 목차
**1. 프로젝트 개요**
<br>
- 프로젝트 주제
- 주제 선정 배경
- 기획 의도
- 활용방안 및 기대효과
      
**2. 프로젝트 구조**
<br>
- 주요 기능
- 메뉴 구조도
- Flow Chart
    
**3. 프로젝트 팀 구성 및 역할**
<br>

**4. 프로젝트 수행절차 및 방법**
<br>
- 수행 절차
- 수행 방법 
    
**5. 프로젝트 수행 경과**
<br>
- 요구사항 정의서
- 기능 정의서
- ERD
-  테이블 정의서
-  화면 설계서
- 프로젝트 실제 화면 UI
  
**6. 핵심기능 코드 리뷰**
<br>
- 기능 목표
- 채팅 / 알림 기능
- 주문 / 결제 기능
- 개선할 점
     
**7. 자체 평가 의견**
<br>
- 개별 평가
- 종합 평가

**8. 리액트 전환**
<br>
- 목표
- MVC 패턴에서 REST API로 전환
  
<br><br>
# 1. 프로젝트 개요
## 1-1. 프로젝트 주제<br>
- 1인 가구를 위한 종합 서비스 플랫폼
## 1-2. 주제 선정 배경<br>
- 증가하는 1인 가구와 그에 따른 1인 가구를 위한 서비스의 수요 증가.
- 외부 활동과 집을 가꾸는 일을 전부 혼자 부담해야 하는 1인 가구를 위한 서비스를 제공.
- 따라서 청소 외의 방역, 빨래, 보안 등 1인 가구에게 필요한 서비스를 결합한 맞춤형 통합 플랫폼을 기획.
## 1-3. 기획 의도<br>
- 청소 및 생활 서비스와 더불어 팁 게시판을 제공하여 사용자의 생활 품질을 향상시키고자 함.
- 현재 존재하는 청소 서비스와 차별점을 두기 위해 다양한 패키지 옵션과 팁 게시판 기능을 구현하여 활용도와 사용자의 만족도를 충족.
- 관리자에게는 효율적인 서비스 관리를 통해 서비스 품질을 높일 수 있도록 보조.
- 이를 통해 사용자는 더 나은 생활을 유지할 수 있으며, 플랫폼은 신뢰성과 지속성을 확보 가능.
## 1-4. 활용방안 및 기대효과<br>
- 다양한 생활 패키지 서비스 제공을 통해 합리적인 가격을 서비스에게 제공하여, 청소 외의 여러가지 서비스를 한 곳에서 예약하고 관리할 수 있도록 한다.
- 생활 팁 게시판 및 리뷰와 댓글을 통해 사용자간 정보를 교류하고 소통한다.
- 실시간 날씨 정보로 사용자는 필요한 정보를 얻는다.
- 사용자와 파트너간 채팅으로 상세하고 즉각적인 Q&A를 가능하게 하여 원활한 소통을 지원한다.
<br><br>
# 2. 프로젝트 구조
### 2-1. 주요 기능<br>
#### 핵심 기능<br>
1. 파트너 : 유저 간의 채팅
2. 회원의 서비스 예약
#### 기타 기능<br>
1. 게시판 기능
2. 페이징 처리
3. 로그인 및 회원가입
    - 소셜 로그인 및 회원가입
    - 회원가입 시 중복 확인
4. 날씨 정보 출력
5. 결제 처리
6. 달력을 통한 일정 관리
#### 서비스<br>
유저는 서비스와 해당 서비스의 파트너를 선택해서 예약을 요청할 수 있고, 파트너는 자신의 일정을 조회하고 유저와의 상담을 할 수 있다.
- 세부 기능
    - 입력값
        - 날짜
        - 위치
        - 전화번호
        - 예약자 이름
    - 서비스
        1. 쿠폰 발급
            - 첫가입 N원
            - 생일 쿠폰 등
        2. 서비스 범위
            - 패키지
        3. 1(파트너) : N(사용자) 채팅 
            - 상세 일정 관리
            - 상세 Q & A
        4. 주문 / 결제
            - 예약 취소 및 환불 처리
       5. 리뷰
            - 등록
            - 별점
            - 썸네일
#### 관리자<br>
관리자는 유저와 파트너, 게시판, 서비스 예약을 관리하고 환불을 처리할 수 있다.
- 세부 기능
    - 팁 게시글 관리
        - 게시글 삭제
        - 댓글 삭제
    - 회원 관리
        - 쿠폰 발급
    - 서비스 관리
        - 예약 관리
        - 환불 관리
    - 파트너 관리
        - 파트너 승인
#### 게시판<br>
사용자들이 서로 생활 팁을 공유하며 소통할 수 있는 게시판이다.
- 세부 기능
    - 작성, 수정, 삭제
    - 조회수
    - 좋아요
    - 키워드 검색
    - 댓글
#### 로그인 및 마이페이지<br>
소셜 로그인 기능과 사이트 자체 가입을 할 수 있고, 시스템 비밀번호를 통해 관리자 가입이 가능하다. 마이 페이지를 이용하여 유저는 나의 정보를 변경하고 예약을 관리하며 리뷰와 예약을 확인할 수 있다. 파트너는 자신의 정보를 변경하고 나의 일정을 관리하며 자신의 리뷰를 볼 수 있다. 또한 관리자는 자신의 페이지에서 유저와 파트너, 게시물과 리뷰를 한 번에 관리할 수 있다.
- 세부기능
    - 회원
        - 카카오 로그인, 회원가입
    - 파트너
        - 사이트 자체 로그인, 회원가입
            - 아이디 중복 확인
    - 마이페이지
        - 유저
            - 사용자 정보 변경
            - 내 예약 관리
            - 좋아요한 글 모아 보기
        - 파트너
            - 사용자 정보 변경
            - 일정 관리
            - 내 리뷰 보기
        - 관리자
           - 게시글 및 리뷰 관리
           - 회원 및 파트너 관리

<br><br>
### 2-2. 메뉴 구조도<br>
<details>
    <summary>🧊메뉴 구조도</summary>

![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/f1355d61-d788-43e0-8ffc-f6b3e67208ab)
![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/a2df97b8-eead-4a6c-8ea8-87130176601f)
![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/04e0677e-70e9-4c38-996b-5431d59fa3bf)


</details>

### 2-3. 플로우 차트<br>
<details>
    <summary>🧊플로우 차트</summary>

![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/630e5a14-d03a-4164-bcea-9b7140f57211)

</details>

<br><br>

# 3. 프로젝트 팀 구성 및 역할
## 팀원<br>
- 인원 : 5명<br>
- 반예진
    - 팁 게시판 구현 / 게시판 페이지 디자인
    - 게시판 기능 (등록 / 수정 / 삭제 / 목록 / 추천 / 조회수 / 댓글)<br>
- 윤준호
    - 유저 페이지, 사이드 바, ERD 설계 / 유저 전체 페이지 디자인 및 구현 (정보 변경, 예약 조회, 리뷰 작성, 파트너 신청)
    - 유저 및 파트너 사이드 바 구현
    - 전체 DB 설계 및 테이블 정의서 작성<br>
- 이종식
    - 메인 페이지, 예약, 결제, 장바구니 디자인 구성
    - 예약 게시글 목록, 등록, 수정, 삭제 구현
    - 장바구니 목록, 등록, 삭제 구현
    - 결제 및 예약 서비스 구현
    - 환불 처리 및 환불 승인 처리 구현
    - 채팅방 및 채팅 기능 구현<br>
- 정다운
    - 로그인 기능(Security5를 통한 기능 구현 & 카카오 소셜 로그인 기능 구현), 이메일 인증, 관리자 페이지
    - 로그인, 회원가입, 관리자 페이지 디자인
    - 기존 팁 게시판에 관리자 권한을 부여하여 관리
    - 관리자의 회원, 파트너, 예약 관리 (목록 / 조회 / 수정 / 삭제)          
    - 구글 이메일 인증을 통해 비밀번호 찾기 기능 구현 <br>
- 황다정
    - 파트너 페이지의 정보 조회 수정, 리뷰 및 자신의 예약 보기 구현
    - Full Calendar API를 이용해 예약 게시글의 캘린더
    - 예약 세부 페이지의 세부 사항 구현(별점 및 리뷰 시스템 구현)
    - 채팅, 예약 게시글 목록, 예약 게시글 세부 페이지, 에러 페이지 디자인<br>
<br><br>

# 4. 프로젝트 수행절차 및 방법
## 4-1. 프로젝트 수행 절차<br>
<details>
    <summary>🧊프로젝트 수행 절차</summary>
      
![간트차트](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/793b4cd2-0d38-44c0-8cdf-1179f4190cd1)

</details>
<br>

## 4-2. 수행방법<br>
- 사용 언어 <br>
  + <img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white0">
- 프레임워크 <br>
  + <img src="https://img.shields.io/badge/BootStrap-7952B3?style=flat&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/SpringBoot 2.7.17-6DB33F?style=flat&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/SpringSecurity-6DB33F?style=flat&logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/MyBatis-6DB33F?style=flat&logo=MyBatis&logoColor=white"> 
- 개발도구 <br>
  + <img src="https://img.shields.io/badge/openjdk 17-686767?style=flat&logo=openjdk&logoColor=black"/> <img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=flat&logo=visualstudiocode&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>
- 라이브러리 <br>
  + <img src="https://img.shields.io/badge/Lombok-6DB33F?style=flat&logo=Lombok&logoColor=white"> <img src="https://img.shields.io/badge/Devtools-6DB33F?style=flat&logo=springboot&logoColor=white">
- 사용 DB : <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/> 
- 참조 API : <img src="https://img.shields.io/badge/ProtOne-007396?style=flat&logo=Iamport&logoColor=white"> <img src="https://img.shields.io/badge/OpenWeather-007396?style=flat&logo=Zxing&logoColor=white"> <img src="https://img.shields.io/badge/FullCalendar-007396?style=flat&logo=Zxing&logoColor=white">
- 협업 Tools : <img src="https://img.shields.io/badge/trello-0052CC?style=flat&logo=trello&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=flat&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/GoogleDrive-4285F4?style=flat&logo=GoogleDrive&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white"/>
<br><br>

# 5. 프로젝트 수행 경과
## 5-1. 요구사항 정의서<br>
<details>
    <summary>🧊요구사항 정의서</summary>

![요구사항정의서](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/a3fbe5a1-e714-48f1-9be0-5403b7d86da2)

</details>

## 5-2. 기능 정의서<br>
<details>
    <summary>🧊기능 정의서</summary>

![기능정의서1](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/ec5b18fd-0cca-4b2a-a7de-6ed16b23eebf)
![기능정의서2](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/e143306b-da35-4760-affc-b6c81b7abff2)
![기능정의서3](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/ca51b062-97c3-4e45-828f-69f82c988bac)
![기능정의서4](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/96597457-bd5d-4d24-8210-ed9044299409)
      
</details>

## 5-3. ERD<br>
<details>
    <summary>🧊ERD</summary>
      
![ERD](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/fd51df14-9a63-4f8e-ac67-ce2d318c5397)

</details>

## 5-4. 테이블 정의서<br>
<details>
    <summary>🧊테이블 정의서</summary>

![테이블정의서1](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/eef4772e-d57c-480f-a02d-bda8aa960432)
![테이블정의서2](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/58f48755-6f59-4552-92d5-e32cd2f34b2d)
![테이블정의서3](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/106d60af-d743-4801-be90-906f5c6806b3)
![테이블정의서4](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/c1a9e28b-1728-45fa-aa97-7d2e0ba40a04)
![테이블정의서5](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/70cbd362-cddb-4ff9-aaeb-b5a793be32dc)
![테이블정의서6](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/2bc0ac02-79bc-4e52-958a-a0b8dcf23fef)
![테이블정의서7](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/c862e741-ade5-4737-81a0-fa21b2302ce6)
![테이블정의서8](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/62bacddd-82a1-4ef9-b41c-3892c27a7cc6)
![테이블정의서9](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/da3e9d6e-41c5-467c-848b-490f65bc5d06)
![테이블정의서10](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/2f247665-5f20-4ab2-829c-9cb1a85e5308)
![테이블정의서11](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/57e929d6-bb40-442c-8731-cc78eb9332a4)
![테이블정의서12](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/568bb83e-589e-4416-9f98-02f5eb7c9734)
![테이블정의서13](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/cd3471d7-652b-4110-af5c-116de87d9b43)
![테이블정의서14](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/b0cea7bc-4e6e-4287-a1cf-fb0f0f40d90c)
![테이블정의서15](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/5df47404-f4ef-4476-b58b-76f083159b2c)
![테이블정의서16](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/de409ace-efc5-450e-91a3-13a2ff6d6ec7)
![테이블정의서17](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/ff533ac0-d700-4b83-a807-48ef43d5193c)


</details>

## 5-5. 화면 설계서<br>
<details>
    <summary>🧊메인 및 로그인</summary>

![화면설계도1](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/8ca60a22-11a0-41b3-82a0-116c82beb39a)
![화면설계도2](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/065abef7-d523-4173-b5ee-28874ba25bdd)
![화면설계도3](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/f4803324-b4ea-45a5-8bbb-58f41d5ebe18)
![화면설계도4](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/8cba0213-318e-42bc-a2c3-2509a6116b2a)
![화면설계도5](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/abf0ea71-2095-4a3f-a0fe-557bcc321f6a)
![화면설계도6](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/66a61248-7d2f-47e3-9f38-dfa8fc4b1457)
![화면설계도7](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/61476393-6e08-40f7-93fb-f78b925a5faf)

</details>

<details>
    <summary>🧊예약 및 결제, 채팅</summary>

![화면설계도9](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/2cc78008-9f58-40f4-99d7-0094d2f088fb)
![화면설계도10](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/fca6c74d-5343-4fde-b9d2-18efbf7462ee)
![화면설계도8](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/40de2ee5-23fb-4c35-bab6-cb1d65ce59cc)
![화면설계도11](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/0f099d58-7c3a-49ec-8e30-fdbdfee09000)
![화면설계도12](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/73c622b1-a516-4f16-91f7-49642a63ee61)
![화면설계도13](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/6c20165e-a2dc-403b-af67-e5ec3cabfb3b)
![화면설계도19](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/46920253-fd07-494e-b79b-c7e37f95190a)

</details>

<details>
    <summary>🧊팁 게시판</summary>

![화면설계도37](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/4489ecf4-52a0-44b8-978b-3c7f6cb7bcd7)
![화면설계도38](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/fc4ecfef-ce6f-4880-9cb9-3b1a79f35c8e)

</details>

<details>
    <summary>🧊사용자</summary>

![화면설계도14](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/2396c950-5413-4778-8f62-d32df8de861b)
![화면설계도15](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/e960ea61-09bd-4575-90a3-c478e95ee9d6)
![화면설계도16](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/4ba6997d-07b7-4e9c-9a30-3ba7a0901127)
![화면설계도17](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/2f3eefe5-1811-40d7-b325-c7045db935b2)
![화면설계도18](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/cba42d89-1d83-465d-9f82-8e4419bbd232)
![화면설계도21](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/a0405bea-e025-4fd2-9a09-93140a7f7651)
![화면설계도22](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/45a36681-18a7-46dc-b8b6-f9e47ad5a655)
![화면설계도23](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/3504d182-5a88-480d-8e3b-7cc932b86a15)

</details>

<details>
    <summary>🧊파트너</summary>

![화면설계도31](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/8248641d-6971-4b8b-90d9-5ac91a3bc8e8)
![화면설계도34](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/86a4958d-5279-475a-acf6-09c0ba95b4ce)
![화면설계도35](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/32f390f8-28d3-45a8-bdff-fe0db02f7720)
![화면설계도36](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/560b2a23-a9d3-40ba-95f2-7df32fcb4bb0)

</details>

<details>
    <summary>🧊관리자</summary>

![화면설계도20](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/353cf090-4119-4b21-8508-4b6fe2dad272)
![화면설계도24](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/cec4088a-329e-4051-a5f2-44a6cf7912fe)
![화면설계도25](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/12f40848-4443-48b2-bc6f-a2054d62bdb0)
![화면설계도26](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/2084c6ab-d6fd-4bd3-abc7-bb1dcfc1cb5e)
![화면설계도27](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/795dc231-4749-4fbb-a9e5-685c0ecda655)
![화면설계도28](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/18cf494a-4851-41b6-bfc7-f0d575429f2f)
![화면설계도29](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/254c8c26-c023-4973-adc7-a7d70a5c8ccd)
![화면설계도30](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/1e5a1ff2-c680-4856-8aef-56c1722a1b01)
![화면설계도32](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/063f96fd-f442-4c73-8f56-c1f9d2f3f821)

</details>

<details>
    <summary>🧊에러 페이지</summary>

![화면설계도39](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/fb9a7514-4e62-42fa-8884-c64b1d58d980)
![화면설계도40](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/6310b5d0-578f-4f08-8ebd-5f9e91106a47)
![화면설계도41](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/edf8b296-abe7-4c37-884c-3ec9d8984e59)

</details>

## 5-6. 실제 화면<br>
<details>
    <summary>🧊메인 및 로그인</summary>
      
![실제화면8](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/e8f5eead-14b5-46da-a285-89a302f51963)
![실제화면9](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/c963f11f-c283-4411-ad56-c82c84ee9992)
![실제화면1](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/b21e3817-c8dc-4eb3-9998-d4dfd01750a4)
![실제화면2](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/3d85d734-8e2d-42ec-b433-425757c9a694)
![실제화면3](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/fb6f02b0-ad5f-478f-8d93-d60d9f121717)
![실제화면4](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/d71dbd04-f93b-468d-a942-9cc8d128738e)
![실제화면5](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/6e4d5652-695d-4676-a5ed-bc9e29c94023)
![실제화면6](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/134a0ceb-3c86-4dc3-9e52-5e625f04c29a)
![실제화면7](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/e0758692-fbd4-4f88-aa91-d14eb5814dd4)

</details>

<details>
    <summary>🧊예약 및 결제</summary>

![실제화면10](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/5235da66-68c9-4590-827d-c3c511b8fb8a)
![실제화면11](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/9612bd51-943c-480d-bbd5-6697738b0fff)
![실제화면12](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/28d77ea8-79a4-45e4-8140-c55594b5d93c)
![실제화면13](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/19191512-57be-4b01-bcf7-7048d736b3b1)
![실제화면14](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/346c1044-f2fc-4084-a67d-c0b114309038)
![실제화면15](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/9e9560ec-c3d5-4373-97dc-7dd166eb4d7f)
![실제화면16](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/b43d1a77-c3b4-46b3-a0cc-19ebaff15604)
![실제화면17](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/a4668443-a7ec-4378-b436-864e541c3e39)
![실제화면18](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/2d1be101-ed26-4ec2-b512-408579717200)

</details>

<details>
    <summary>🧊팁 게시판</summary>

![실제화면19](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/68435933-7ebc-47c8-9fe6-a792c6ca9319)
![실제화면20](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/73c66f84-968b-4853-a22c-db004c85be4d)
![실제화면22](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/b6a59ccb-34b5-48c5-9cc9-7dd311938b7a)
![실제화면21](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/b038bb91-b8ab-41b6-9c9d-14fef30d9931)

</details>

<details>
    <summary>🧊사용자</summary>

![실제화면23](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/636b2c11-75a2-4bd6-b2da-67b7961f8506)
![실제화면24](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/8cb90140-05f8-41ad-82b4-03422bcc5e72)
![실제화면25](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/18f41b0d-5725-4c43-a4bd-cd1ac16f5634)
![실제화면26](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/1f83eadb-f840-4ab0-b2d0-91f2b04599c9)
![실제화면28](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/1e21dfe8-5c9a-4a03-86c0-bd95b701c08f)
![실제화면30](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/02cb5072-a5c9-4f75-b177-b46fdc4e3d5e)
![실제화면31](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/3b6a15ad-bbf3-4211-a9af-f0cef52db65c)
![실제화면29](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/890a370a-8e77-471a-830d-b57b82d2c3bf)

</details>

<details>
    <summary>🧊파트너</summary>

![실제화면32](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/b8c4dbfc-79f6-4c9d-8227-12e7e96e1507)
![실제화면33](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/72d616c7-cc0d-4627-9134-042e29cafeb8)
![실제화면34](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/48e1cf16-e74d-4380-894d-74b3263f0fc3)
![실제화면35](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/0c24f7aa-fe1e-4ca5-912b-2cdcfd7be76b)
![실제화면36](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/16690f19-d309-4dae-ab23-e30ec6eed49e)
![실제화면38](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/b5a61da7-7755-4352-93c5-2556806812c1)
![실제화면39](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/8ba69734-709e-4bbf-85eb-054fee1c71f7)


</details>

<details>
    <summary>🧊관리자</summary>

![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/9d2be97d-f7fe-4088-9425-da2172742105)
![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/7c79475c-7323-47ad-948a-d358fbfcc9d5)
![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/182d6be2-b6db-4b4e-a634-90ef3f48a566)
![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/944dabbc-aa9a-4175-8e60-3990e7b980ec)
![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/c7b835da-8b28-4c30-846c-55f3e67f1ee3)
![image](https://github.com/JongsikLEE01/MSA5_MainProject/assets/160221884/76f96ebf-e27a-4201-8bea-55519da9647d)


</details>
<br><br>

# 6. 핵심기능 코드 리뷰
## 6-1. 기능 목표
1. 유저와 파트너가 서비스에 대해서 실시간으로 문의를 할 수 있도록 1:1 채팅을 구현하는 기능
      - 실시간 문의로 유저의 만족도 증대
      - 서비스 게시글에서 알 수 없는 정보도 문의를 통해 알 수 있음

2. 유저가 실제로 결제로 이어져 결제와 환불을 할 수 있고, 어드민은 이를 승인 또는 미승인해 처리하는 기능
      - 실제 사용 가능한 수준의 기능을 구현하는 것을 목표로 구현
    
<br><br>

## 6-2. 채팅 생성 및 처리 과정

### 채팅 / 알림 기능
<details>
    <summary>채팅 기능 구현</summary>

## **StompJS 클라이언트 설정**

- `ChatContainer` 컴포넌트는 특정 채팅 방의 채팅 데이터를 관리하고 이를 자식 컴포넌트인 `ChatForm`에 전달
- API 호출을 통해 서버에서 채팅 데이터를 가져오고, 이를 상태로 관리하여 최신 데이터를 유지
- `ChatForm` 컴포넌트는 `ChatContainer`에서 전달받은 `roomNo`와 `chatList`를 이용하여 채팅 메시지를 화면에 표시

### 1. 상태(State) 관리

```jsx
const [message, setMessage] = useState('');
const [stompClient, setStompClient] = useState(null);
```

- `useState`를 사용하여 `message` 상태와 `stompClient` 상태를 정의
- `message`: 사용자가 입력한 채팅 메시지를 저장하는 상태
- `stompClient`: 웹 소켓 클라이언트 객체를 저장하는 상태

### 2. 참조(Ref) 관리

```jsx
const chatAreaRef = useRef(null);
```

- `useRef`를 사용하여 `chatAreaRef` 변수를 생성
- 이 변수는 채팅 메시지가 표시되는 영역을 가리키는 역할

### 3. 알림(pushAlarm) 함수

```jsx
const pushAlarm = (newChat) => {
  const notification = new Notification('새로운 메시지 도착가 도착했어요!', {
    body: `${partner.userName}: ${newChat.chatContent}`,
    icon: `${process.env.PUBLIC_URL}/img/logo-h.png`
  });

  notification.onclick = () => {
    navigate(`/chat/${roomNo}`);
  }
}
```

- `pushAlarm` 함수는 새로운 채팅 메시지가 도착했을 때 브라우저 알림을 표시하는 역할
- `Notification` 객체를 생성하여 알림을 만들고, 제목(`'새로운 메시지 도착가 도착했어요!'`)과 본문(`${partner.userName}: ${newChat.chatContent}`)을 설정
- `icon` 속성을 통해 알림에 표시할 아이콘을 설정합니다. `${process.env.PUBLIC_URL}/img/logo-h.png` 경로는 public 폴더의 이미지를 가리킴
- 알림 클릭 시 `notification.onclick` 핸들러에서 `navigate` 함수를 호출하여 채팅방으로 이동

### 4. 메시지 전송(sendMessage) 함수

```jsx
const sendMessage = () => {
  if (stompClient && stompClient.connected) {
    stompClient.send("/pub/sendMessage", {}, JSON.stringify({
      roomNo: roomNo,
      chatContent: message,
      userNo: 2,
      chatRegDate: getCurrentTime()
    }));
    setMessage('');
  }
}
```

- `sendMessage` 함수는 사용자가 입력한 채팅 메시지를 웹 소켓을 통해 서버로 전송하는 역할
- `stompClient.send` 메서드를 사용하여 `/pub/sendMessage` 주소로 메시지를 전송
- 전송 후 `setMessage('')`를 호출하여 입력 필드를 초기화

### 5. 웹 소켓 연결 및 해제

```jsx
useEffect(() => {
  // 소켓 연결 로직
  const socket = new SockJS('http://localhost:8080/chat');
  const client = Stomp.over(socket);

  client.connect({}, frame => {
    console.log('Connected: ' + frame);
    client.subscribe(`/sub/chat/${roomNo}`, message => {
      const newChat = JSON.parse(message.body);
      // 푸쉬알림 전송
      pushAlarm(newChat);
      // 새로운 메시지를 기존 채팅 리스트에 추가
      setChatList(prevChatList => [...prevChatList, newChat]);
    });
  });

  setStompClient(client);

  return () => {
    client.disconnect(() => {
      console.log('소켓 연결 해제...');
    });
  };
}, [roomNo]);

```

- `useEffect` 훅을 사용하여 컴포넌트가 마운트될 때 웹 소켓 연결을 설정하고, 언마운트될 때 연결을 해제
- `SockJS`와 `Stomp`을 사용하여 웹 소켓 클라이언트를 생성하고, 서버와 연결
- `client.connect` 메서드를 통해 연결이 성공하면, `client.subscribe` 메서드를 사용하여 특정 채팅방의 메시지를 구독
- 메시지가 도착할 때마다 `pushAlarm` 함수를 호출하여 알림을 표시하고, 채팅 리스트에 새로운 메시지를 추가
- `return` 구문에서는 웹 소켓 연결 해제 로직을 정의

---

## **메시지 전송 함수 구현**

- `ChatContainer` 컴포넌트는 특정 채팅 방의 채팅 데이터를 관리하고 이를 자식 컴포넌트인 `ChatForm`에 전달
- API 호출을 통해 서버에서 채팅 데이터를 가져오고, 이를 상태로 관리하여 최신 데이터를 유지
- `ChatForm` 컴포넌트는 `ChatContainer`에서 전달받은 `roomNo`와 `chatList`를 이용하여 채팅 메시지를 화면에 표시

### 1. 상태(State) 관리

```jsx
const [chatList, setChatList] = useState([]);
const [partner, setPartner] = useState([]);
const [user, setUser] = useState([]);
const [chatRooms, setChatRooms] = useState([]);
```

- `useState`를 사용하여 각각 `chatList`, `partner`, `user`, `chatRooms` 상태를 정의
- `chatList`: 채팅 메시지 리스트를 저장하는 배열
- `partner`: 채팅 상대방의 정보를 저장하는 객체
- `user`: 현재 사용자의 정보를 저장하는 객체
- `chatRooms`: 채팅 방 정보를 저장하는 객체

### 2. 채팅 조회(getChatList 함수)

```jsx
const getChatList = async () => {
  try {
    const response = await Services.selectChatData(roomNo);
    const data = response.data;
    const chatRooms = data.chatRooms;
    const chatList = data.chatList;
    const partner = data.partner;
    const user = data.user;

    setChatRooms(chatRooms);
    setChatList(chatList);
    setPartner(partner);
    setUser(user);
  } catch (e) {
    console.error(`채팅 조회 중 에러 발생... ${e}`);
  }
};
```

- `getChatList` 함수는 `Services.selectChatData(roomNo)` 함수를 호출하여 해당 채팅방의 데이터를 조회
- `await` 키워드를 사용하여 비동기로 데이터를 받아옴
- 응답 데이터에서 `chatRooms`, `chatList`, `partner`, `user` 정보를 추출하여 각 상태(`setChatRooms`, `setChatList`, `setPartner`, `setUser`)를 업데이트
- 에러 발생 시 `catch` 블록에서 에러 메시지를 출력

### 3. 푸시 알림 허용 요청(Notification.permission)

```jsx
// 푸시 알림 허용 요청
if (Notification.permission !== 'granted') {
  try {
    // 크롬 에러 체크
    Notification.requestPermission().then((permission) => {
      if (permission !== 'granted')
        return;
    });
  } catch (e) {
    // 사파리 에러 체크
    if (e instanceof TypeError) {
      Notification.requestPermission((permission) => {
        if (permission !== 'granted')
          return;
      });
    } else {
      console.error(e);
    }
  }
}
```

- 페이지 로드 시 `Notification.permission`을 체크하여 사용자에게 푸시 알림을 허용할 것인지 물음
- 푸시 알림이 이미 허용된 상태(`'granted'`)가 아니면, `Notification.requestPermission()`을 사용하여 사용자에게 알림 권한을 요청
- `try-catch` 블록을 사용하여 크롬과 사파리에서의 다른 에러 처리 방식을 구분

### 4. useEffect 훅

```jsx

useEffect(() => {
  getChatList();
}, [roomNo]);
```

- `useEffect` 훅을 사용하여 컴포넌트가 마운트될 때와 `roomNo`가 변경될 때마다 `getChatList` 함수를 호출하여 새로운 채팅 데이터를 불러옴
- `roomNo`가 변경될 때마다 채팅 내용을 업데이트

### 5. ChatForm 컴포넌트 렌더링

```jsx
return (
  <ChatForm
    chatRooms={chatRooms}
    roomNo={roomNo}
    chatList={chatList}
    setChatList={setChatList}
    partner={partner}
    user={user}
  />
);
```

- `ChatForm` 컴포넌트를 렌더링하고, 필요한 props(`chatRooms`, `roomNo`, `chatList`, `setChatList`, `partner`, `user`)를 전달
- `chatRooms`, `roomNo`, `chatList`, `setChatList`, `partner`, `user` 상태와 함수들을 `ChatForm` 컴포넌트로 전달하여 채팅 화면을 구성

## **컴포넌트에 WebSocket 연결 설정**

- 이 클래스는 웹소켓 설정을 관리, `/chat` 엔드포인트를 통해 클라이언트가 웹소켓 연결을 수립하고, 메시지 발행 및 구독 경로를 `/pub` 및 `/sub`로 설정하여 클라이언트와 서버 간의 실시간 메시징을 지원
- SockJS를 사용하여 웹소켓을 지원하지 않는 환경에서도 폴백을 통해 통신이 가능하도록 설정
- CORS 설정을 통해 모든 도메인에서의 요청을 허용하여 외부 도메인에서도 웹소켓 연결이 가능

### 1. Imports

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
```

- `Configuration`: Spring의 구성 클래스를 나타내는 애노테이션
- `MessageBrokerRegistry`: 메시지 브로커를 구성하는 데 사용되는 클래스
- `EnableWebSocketMessageBroker`: 웹소켓 메시지 브로커를 활성화하는 애노테이션
- `StompEndpointRegistry`: STOMP 엔드포인트를 등록하는 데 사용되는 클래스
- `WebSocketMessageBrokerConfigurer`: 웹소켓 메시지 브로커를 구성하는 인터페이스

### 2. WebSocketConfig Class

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
```

- `@Configuration`: 이 클래스가 Spring 설정 클래스를 나타냄
- `@EnableWebSocketMessageBroker`: 웹소켓 메시지 브로커를 활성화하여 메시지 처리를 가능하게 함
- `WebSocketConfig` 클래스는 `WebSocketMessageBrokerConfigurer` 인터페이스를 구현하여 웹소켓 메시지 브로커를 설정함

### 3. registerStompEndpoints Method

```java
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
```

- `registerStompEndpoints`: STOMP 엔드포인트를 등록하는 메소드
- `registry.addEndpoint("/chat")`: `/chat` 엔드포인트를 설정하여 클라이언트가 이 경로를 통해 웹소켓 핸드셰이크를 수행
- `setAllowedOriginPatterns("*")`: 모든 도메인에서 오는 요청을 허용하는 CORS 설정
- `withSockJS()`: SockJS를 사용하여 웹소켓을 지원하지 않는 브라우저에서도 폴백 메커니즘을 통해 통신을 가능하게 함

### 4. configureMessageBroker Method

```java
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.setApplicationDestinationPrefixes("/pub");
        config.enableSimpleBroker("/sub");
    }
```

- `configureMessageBroker`: 메시지 브로커를 구성하는 메소드
- `config.setApplicationDestinationPrefixes("/pub")`: 클라이언트가 서버로 메시지를 보낼 때 사용할 엔드포인트를 `/pub`으로 설정
- `config.enableSimpleBroker("/sub")`: 서버가 클라이언트로 메시지를 보낼 때 사용할 엔드포인트를 `/sub`으로 설정. 이 설정으로 인해 서버는 `/sub` 경로를 통해 클라이언트에 메시지를 브로드캐스트 할 수 있음


---

## Rest Controller

- REST API는 `goToChatRoom` 메소드를 통해 채팅방 정보를 조회하고, WebSocket을 통해 `sendMessage` 메소드로 메시지를 전송
- `SimpMessageSendingOperations`을 사용하여 WebSocket에서 메시지를 브로드캐스트
- 각 메소드는 예외 상황을 처리하여 적절한 HTTP 상태 코드와 함께 오류를 응답

### 1. Imports

```java
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daeut.daeut.reservation.dto.ChatRooms;
import com.daeut.daeut.reservation.dto.Chats;
import com.daeut.daeut.reservation.service.ChatRoomService;
import com.daeut.daeut.reservation.service.ChatService;

import lombok.extern.slf4j.Slf4j;
```

- 필요한 클래스 및 애노테이션을 임포트합니다. `@Autowired`, `@MessageMapping`, `@Payload`, `@RestController` 등 Spring과 관련된 기능을 사용하기 위한 준비

### 2. ChatController 클래스

```java
@Slf4j
@RestController
@RequestMapping("/chat")
public class ChatController {
```

- `@Slf4j`: 롬복을 사용하여 로깅을 위한 Logger를 자동으로 생성
- `@RestController`: REST API 컨트롤러임을 선언합니다. HTTP 요청과 JSON 응답을 처리
- `@RequestMapping("/chat")`: 이 컨트롤러의 기본 URL을 `/chat`으로 지정

### 3. 필드 선언

```java
    @Autowired
    private SimpMessageSendingOperations template;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRoomService chatRoomService;

```

- `SimpMessageSendingOperations`: WebSocket을 통해 메시지를 전송하는 데 사용
- `ChatService`, `ChatRoomService`: 각각 채팅 메시지와 채팅방 정보를 처리하는 서비스 클래스에 대한 의존성을 주입

### 4. goToChatRoom 메소드

```java
    @GetMapping("")
    public ResponseEntity<Object> goToChatRoom(@RequestParam("roomNo") String roomNo) {
        try {
            ChatRooms chatRooms = chatRoomService.select(roomNo);
            if (chatRooms == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("채팅 방을 찾을 수 없습니다.");
            }
            int partnerNo = chatRooms.getPartnerNo();
            List<Chats> chatList = chatService.selectByRoomNo(roomNo);

            Map<String, Object> response = new HashMap<>();
            response.put("chatRooms", chatRooms);
            response.put("partnerNo", partnerNo);
            response.put("chatList", chatList);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채팅 방 조회 중 오류 발생: " + e.getMessage());
        }
    }
```

- `@GetMapping("")`: GET 요청을 처리하며, `/chat` 경로에 대한 요청을 처리
- `goToChatRoom` 메소드는 `roomNo`를 받아 해당 채팅방 정보와 채팅 메시지 목록을 조회하여 JSON 형태로 응답
- `ResponseEntity`: HTTP 상태 코드와 함께 응답을 구성

### 5. sendMessage 메소드

```java
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload Chats chat) {
        try {
            chatService.insert(chat);
            log.info("chat? {}", chat);
            template.convertAndSend("/sub/chat/" + chat.getRoomNo(), chat);
        } catch (Exception e) {
            log.error("Error sending message: {}", e.getMessage());
        }
    }
```

- `@MessageMapping("/sendMessage")`: WebSocket에서 `/sendMessage` 경로로 메시지가 도착하면 이 메소드가 처리
- `sendMessage` 메소드는 `Chats` 객체를 받아서 채팅 메시지를 DB에 저장하고, 해당 채팅방의 모든 클라이언트에게 메시지를 브로드캐스팅

</details>
<br><br>

<details>
    <summary>알림 기능 구현</summary>

## chatForm

---

- 웹소켓을 이용하여 실시간 채팅을 구현하고, 새로운 메시지가 도착할 때 사용자에게 알림을 보내는 기능을 포함
- 각 기능은 useEffect 훅을 통해 적절히 관리되고, 상태와 이벤트 처리를 통해 사용자와 상호작용

### 1. 상태 관리

```jsx
  const ChatForm = ({ chatRooms, roomNo, chatList, setChatList }) => {
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const chatAreaRef = useRef(null);
  const { userInfo } = useContext(LoginContext);
  const pushNotification = useNotification();
```

- `message` 상태는 사용자가 입력한 채팅 메시지를 저장, `stompClient`는 웹소켓 클라이언트를 저장하며, `chatAreaRef`는 채팅 영역의 DOM 요소에 대한 참조를 제공
- `LoginContext`에서 사용자 정보(`userInfo`)를 가져오고, 이 컴포넌트에서는 사용자 번호(`userNo`)와 사용자 이름(`userName`)을 사용
- 커스텀 훅으로, 새로운 메시지 도착 시 사용자에게 알림을 전송하는 기능을 제공

### 2. 메시지 전송 함수

```jsx
const sendMessage = () => {
  if (stompClient && stompClient.connected && message.trim()) {
    stompClient.send("/pub/sendMessage", {}, JSON.stringify({
      roomNo: roomNo,
      chatContent: message,
      userNo: userInfo.userNo,
      chatRegDate: getCurrentTime()
    }));
    setMessage('');
  }
};
```

- 사용자가 입력한 메시지(`message`)를 웹소켓을 통해 서버로 전송
- `stompClient`가 연결되어 있고 메시지가 비어있지 않은 경우에만 전송

### 3. 웹소켓 연결 및 메시지 수신

```jsx
useEffect(() => {
  const socket = new SockJS('http://localhost:8080/chat');
  const client = Stomp.over(socket);

  client.connect({}, frame => {
    console.log('웹 소켓 연결... ' + frame);
    client.subscribe(`/sub/chat/${roomNo}`, message => {
      const newChat = JSON.parse(message.body);

      // 자신의 메시지는 알림을 보내지 않음
      if (userInfo?.userNo !== newChat?.userNo) {
        // 푸쉬알림 전송
        pushNotification('새로운 메시지가 도착했어요!', {
          body: `${userInfo.userName} : ${newChat.chatContent}`
        }, roomNo);
      }

      // 새로운 메시지를 기존 채팅 리스트에 추가
      setChatList(prevChatList => [...prevChatList, newChat]);
    });
  });

  setStompClient(client);

  return () => {
    client.disconnect(() => {
      console.log('소켓 연결 해제...');
    });
  };
}, [roomNo, userInfo?.userNo]);
```

- 페이지가 로딩될 때 웹소켓을 연결하고, 특정 채팅방(`roomNo`)에 대한 메시지를 구독
- 웹소켓 연결이 성공하면 콜백 함수가 실행되며, 메시지를 수신할 때마다 새로운 채팅을 받아서 처리
- 새로운 메시지가 도착하면 사용자에게 알림을 전송
- 받은 새로운 메시지를 기존 채팅 리스트에 추가

### 4. DOM 조작

```jsx
useEffect(() => {
  if (chatAreaRef.current) {
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  }
}, [chatList]);
```

- `chatList`가 변경될 때마다 채팅 영역의 스크롤을 자동으로 아래로 이동

### 5. 렌더링

```jsx
return (
  <div className="chatbox">
    <div className="chat-header">
      <div className="chat-partner-info">
        <span className="partner-name-chat">{chatRooms?.title}</span>
      </div>
    </div>
    <div className="chat-box" id="messages">
      <div id="chatArea" className="chatArea" ref={chatAreaRef}>
        {chatList && chatList.map((chat, chatKey) => (
          <div key={chatKey} className={`message ${chat.userNo === userInfo?.userNo ? 'my-message' : 'other-message'}`}>
            <span className="message-content">{chat.chatContent}</span>
            <span className="message-date">{chat.chatRegDate.split(' ')[1].slice(0, 5)}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="input-box">
      <input
        type="text"
        name="chatcontent"
        id="message"
        placeholder="부적절한 메세지는 삭제 처리됩니다."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button type="button" className="sendchat" id="send" onClick={sendMessage}>전송</button>
    </div>
    <div className="button-box">
      <button className="goback" onClick={onHistoryBack}>돌아가기</button>
    </div>
  </div>
);
```

- 채팅 메시지는 `chatList`에서 매핑하여 출력하고, 사용자가 입력한 메시지를 입력창에 제공
- 전송 버튼을 클릭하거나 엔터 키를 누르면 `sendMessage` 함수가 호출



## useNotification

---

- React 애플리케이션에서 알림을 관리하고 보내는 기능을 쉽게 사용할 수 있도록 구현
- 사용자의 알림 권한을 확인하고, 권한이 허용된 경우 알림을 생성하여 보내는 기능을 제공

### 1. useEffect를 이용한 알림 권한 요청

```java
useEffect(() => {
    if (Notification.permission !== 'granted') {
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission((permission) => {
            if (permission !== 'granted') return;
          });
        } else {
          console.error(error);
        }
      }
    }
  }, [])
```

- `useEffect` 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정
- `Notification.permission`을 확인하여 사용자의 알림 권한이 'granted'인지 확인
- 권한이 없는 경우 `Notification.requestPermission()`을 호출하여 사용자에게 알림 권한을 요청
- `try-catch` 문을 사용하여 오류 처리를 하고, 오류가 발생할 경우에도 `Notification.requestPermission()`을 이용하여 권한 요청을 시도

### 2. pushNotification 함수

```java
 const pushNotification = (title, options, roomNo) => {
    if (Notification.permission === 'granted') {
      // 알림에 표시될 아이콘 추가
      const icon = '/img/logo_h.png';
      options = { ...options, icon };
      const notification = new Notification(title, options);

      console.log(`notification? ${notification}`);
      console.log(notification);

      // 알림 클릭 시 이동할 URL 설정
      notification.onclick = () => {
        window.location.href = `/chat/${roomNo}`;
      };

      return notification;
    } else {
      console.warn('알림 권한이 허용되지 않았습니다...');
    }
  };
```

- 알림을 보내는 함수입니다. `title`, `options`, `roomNo` 매개변수를 받아서 사용
- `Notification.permission === 'granted'`인 경우에만 알림을 생성하고 보냄
- 알림에 사용될 아이콘(`icon`)을 설정하고, `options`에 추가
- `new Notification(title, options)`을 통해 실제로 알림 객체를 생성
- 생성된 알림 객체에 클릭 이벤트(`notification.onclick`)를 추가하여 클릭 시 `/chat/${roomNo}`로 이동하도록 설정
- 알림 객체를 반환

</details>
<br><br>

### 결제 / 환불 기능
<details>
    <summary>결제 기능 구현</summary>

## OrderServiceImpl.java

---

### 1. 주문 목록 조회

```java
@Override
    public List<Orders> list() throws Exception {
        List<Orders> ordersList = orderMapper.list();
        for (Orders order : ordersList) {
            Users user = userService.selectByUserNo(order.getUserNo()); 
            order.setUser(user);
        }
        return ordersList;
    }
```

- 주문 목록을 가져와 각 주문에 대해 사용자 정보를 추가

### 2. 주문 조회

```java
@Override
    public Orders select(String ordersNo) throws Exception {
        Orders order = orderMapper.select(ordersNo);
        int userNo = order.getUserNo();
        log.info("::::::::::: orders ~ user :::::::::::");
        log.info(" userNo : " + userNo);
        Users user = userService.selectByUserNo(userNo);
        log.info(user.toString());
        order.setUser(user);
        return order;
    }
```

- 주문 번호를 통해 특정 주문을 조회하고 해당 주문의 사용자 정보를 추가

### 3. 주문 추가

```java
@Override
    public int insert(Orders orders) throws Exception {
        List<String> serviceNoList = orders.getServiceNo();
        List<Integer> quantityList = orders.getQuantity();

        if(serviceNoList == null) return 0;
        if(quantityList == null) return 0;
        if(serviceNoList.size() != quantityList.size()) return 0;

        String orderNo = UUID.randomUUID().toString();
        orders.setOrdersNo(orderNo);

        int totalCount = serviceNoList.size();
        int totalQuantity = 0;
        int totalPrice = 0;
        String title = "";

        List<OrderItems> orderItemList = new ArrayList<>();
        for(int i = 0; i < serviceNoList.size(); i++){
            String strServiceNo = serviceNoList.get(i);
            int serviceNo = Integer.parseInt(strServiceNo);
            Services service = reservationService.serviceSelect(serviceNo);
            if(i == 0) title = service.getServiceName();
            if(service == null) continue;
            OrderItems orderItem = new OrderItems();
            orderItem.setItemNo(UUID.randomUUID().toString());
            orderItem.setOrdersNo(orderNo);
            orderItem.setServiceNo(serviceNo);
            int quantity = quantityList.get(i);
            int price = service.getServicePrice();
            int amount = price * quantity;
            totalPrice += amount;
            totalQuantity += quantity;
            orderItem.setQuantity(quantity);
            orderItem.setPrice(price);
            orderItem.setAmount(amount);
            orderItemList.add(orderItem);
        }
        title += " 외 " + totalCount + " 건";

        orders.setTitle(title);
        orders.setTotalPrice(totalPrice);
        orders.setTotalQuantity(totalQuantity);
        orders.setTotalCount(totalCount);
        orders.setOrderStatus(OrderStatus.보류중);

        // 주문 등록
        int result = orderMapper.insert(orders);

        if(result > 0){
            // 주문 항목 등록
            for (OrderItems orderItems : orderItemList) {
                orderItemService.insert(orderItems);
            }
        }

        return result;
    }
```

- 새로운 주문을 삽입하고 관련된 주문 항목을 추가
- 상세 주문 항목은 orderItem에 저장
- 서비스 번호와 수량을 기반으로 총 가격, 총 수량 등을 계산하여 주문 정보를 설정



## OrderController.java

---

### 1. 클래스 선언 및 의존성 주입

```java
@Slf4j
@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private CartService cartService;

    @Autowired
    private CancelService cancelService;
}
```

- `@Slf4j`: 로그 기록을 위한 Lombok 어노테이션
- `@RestController`: 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냄
- `@RequestMapping("/orders")`: "/orders" 경로로 들어오는 요청을 이 컨트롤러가 처리
- `@CrossOrigin(origins = "*")`: CORS 설정으로, 모든 도메인에서의 요청을 허용
- `@Autowired`: 스프링의 의존성 주입(DI)으로 서비스들을 자동으로 주입

### 2. 주문 등록

```java
@PostMapping("")
public ResponseEntity<?> orderPost(@RequestBody Orders orders) {
    try {
        log.info("::::::::: 주문 등록 - orderPost() ::::::::::");
        log.info("serviceNo : " + orders.getServiceNo());
        log.info("quantity : " + orders.getQuantity());
        log.info("orders : " + orders);

        orders.setOrderStatus(OrderStatus.보류중);

        int result = orderService.insert(orders);

        log.info("신규 등록된 주문ID : " + orders.getOrdersNo());
        String ordersNo = orders.getOrdersNo();

        Map<String, Object> response = new HashMap<>();
        response.put("orders", orders);
        response.put("ordersNo", ordersNo);

        return ResponseEntity.ok().body(response);
    } catch (Exception e) {
        log.error("주문 등록 중 오류 발생: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
    }
}
```

- `@PostMapping("")`: HTTP POST 요청을 처리
- `@RequestBody Orders orders`: 요청 본문을 `Orders` 객체로 변환
- 주문을 등록하고 결과를 JSON 형태로 반환

### 3. 주문 완료

```java
@GetMapping("/success")
public ResponseEntity<Object> orderSuccess(@RequestParam("ordersNo") String ordersNo,
                                           @RequestParam("date") String date,
                                           @RequestParam("time") String time,
                                           @RequestParam("userAddress") String userAddress,
                                           @RequestParam("userPost") String userPost) {
    log.info("ordersNo? {}", ordersNo);
    log.info("date? {}", date);
    log.info("time? {}", time);
    log.info("userAddress? {}", userAddress);
    log.info("userPost? {}", userPost);
    try {
        Payments payments = new Payments();
        payments.setOrdersNo(ordersNo);
        payments.setPaymentMethod("card");
        payments.setStatus(PaymentStatus.결제완료);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String dateTime = date + ' ' + time;
        Date serviceDate = sdf.parse(dateTime);
        payments.setServiceDate(serviceDate);

        String address = "(" + userPost + ") " + userAddress;
        payments.setServiceAddress(address);

        paymentService.merge(payments);

        payments = paymentService.selectByOrdersNo(ordersNo);
        log.info(":::::::::::::::::::: payments ::::::::::::::::::::");
        log.info(payments.toString());

        Orders order = orderService.select(ordersNo);
        log.info(":::::::::::::::::::: orders ::::::::::::::::::::");
        order.setOrderStatus(OrderStatus.확정완료);
        orderService.update(order);
        log.info(payments.toString());

        List<OrderItems> orderItemList = orderItemService.listByOrderNo(ordersNo);
        List<Integer> serviceNoList = new ArrayList<>();
        for (OrderItems orderItem : orderItemList) {
            serviceNoList.add(orderItem.getServiceNo());
        }
        int result = cartService.deleteByOrderComplete(serviceNoList, order.getUserNo());
        log.info("주문한 서비스 장바구니 삭제 - result : " + result);

        Map<String, Object> response = new HashMap<>();
        response.put("payments", payments);
        response.put("order", order);

        return ResponseEntity.ok().body(response);
    } catch (Exception e) {
        log.error("주문 처리 중 오류 발생: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류 발생");
    }
}
```

- `@GetMapping("/success")`: 주문 성공 시 호출
- 결제 정보를 설정하고 저장한 후, 주문 상태를 업데이트
- 장바구니에서 주문한 항목을 삭제하고, 결과를 JSON으로 반환
- React에서는 반환 후 주문 성공 페이지로 이동

### 4. 주문 실패

```java
@GetMapping("/fail")
public ResponseEntity<Object> orderFail(@RequestParam("ordersNo") String ordersNo,
                                        @RequestParam(value = "date", required = false) String date,
                                        @RequestParam(value = "time", required = false) String time,
                                        @RequestParam(value = "userAddress", required = false) String userAddress,
                                        @RequestParam(value = "userPost", required = false) String userPost,
                                        @RequestParam(value = "errorMsg", required = false) String errorMsg) {
    log.info("ordersNo? {}", ordersNo);
    log.info("date? {}", date);
    log.info("time? {}", time);
    log.info("userAddress? {}", userAddress);
    log.info("userPost? {}", userPost);
    log.info("errorMsg? {}", errorMsg);
    try {
        Payments payments = new Payments();
        payments.setOrdersNo(ordersNo);
        payments.setPaymentMethod("card");
        payments.setStatus(PaymentStatus.결제완료);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        if (date == null || date.isEmpty() || time == null || time.isEmpty()) {
            Date now = new Date();
            payments.setServiceDate(now);
        } else {
            String serviceDate = date + ' ' + time;
            Date orderServiceDate = sdf.parse(serviceDate);
            payments.setServiceDate(orderServiceDate);
        }

        if (userAddress == null || userAddress.isEmpty() || userPost == null || userPost.isEmpty()) {
            String address = "사용자가 주소를 지정하지 않았습니다.";
            payments.setServiceAddress(address);
        } else {
            String address = "(" + userPost + ") " + userAddress;
            payments.setServiceAddress(address);
        }

        paymentService.insert(payments);

        payments = paymentService.selectByOrdersNo(ordersNo);
        payments.setStatus(PaymentStatus.보류);
        paymentService.merge(payments);

        Orders order = orderService.select(ordersNo);

        log.info("[결제 실패] 에러 메시지 : " + errorMsg);

        Map<String, Object> response = new HashMap<>();
        response.put("payments", payments);
        response.put("order", order);

        return ResponseEntity.ok().body(response);
    } catch (Exception e) {
        log.error("결제 실패 처리 중 오류 발생: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 실패 처리 중 오류 발생");
    }
}

```

- `@GetMapping("/fail")`: 주문 실패 시 호출
- 실패한 주문 정보를 저장하고 결제 상태를 '보류'로 업데이트
- 결과를 JSON으로 반환
- React에서는 주문 실패 페이지로 이동, 주문 실패 페이지 에서는 주문 실패의 원인을 출력

### 5. 주문/결제 조회

```java
@GetMapping("/{ordersNo}")
public ResponseEntity<?> checkout(@PathVariable("ordersNo") String ordersNo) {
    log.info(ordersNo);
    try {
        Orders order = orderService.select(ordersNo);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("주문을 찾을 수 없습니다.");
        }

        List<OrderItems> orderItems = orderItemService.listByOrderNo(ordersNo);

        Map<String, Object> response = new HashMap<>();
        response.put("order", order);
        response.put("orderItems", orderItems);

        return ResponseEntity.ok().body(response);
    } catch (Exception e) {
        log.error("주문 조회 중 오류 발생: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 조회 중 오류 발생");
    }
}
```

- `@GetMapping("/{ordersNo}")`: 특정 주문의 상세 정보를 조회
- 주문 정보와 주문 항목 정보를 조회하여 JSON으로 반환

## PaymentServiceimpl.java

---

### 1. 전체 코드

```java
package com.daeut.daeut.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daeut.daeut.reservation.dto.Payments;
import com.daeut.daeut.reservation.mapper.PaymentMapper;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    private PaymentMapper paymentMapper;

    @Override
    public List<Payments> list() throws Exception{
        return paymentMapper.list();
    }

    @Override
    public Payments select(int paymentNo) throws Exception{
        return paymentMapper.select(paymentNo);
    }

    @Override
    public int insert(Payments payments) throws Exception{
        Payments oldPayments = selectByOrdersNo(payments.getOrdersNo());
        if( oldPayments == null )  return paymentMapper.insert(payments);

        return 0;
    }

    @Override
    public int update(Payments payments) throws Exception{
       return paymentMapper.update(payments);
    }

    @Override
    public int delete(int paymentNo) throws Exception{
        return paymentMapper.delete(paymentNo);
    }

    @Override
    public Payments selectByOrdersNo(String ordersNo) throws Exception{
        return paymentMapper.selectByOrdersNo(ordersNo);
    }

    // 결제 내역이 있으면 update, 없으면 insert
    @Override
    public int merge(Payments payments) throws Exception {
        if( payments == null || select(payments.getPaymentNo()) == null ) 
            return insert(payments);

        return update(payments);
    }

    @Override
    public int updateData(Payments payments) throws Exception {
        return paymentMapper.updateData(payments);
    }
    
}

```

- DB에 저장하고 이미 결재 내역이 있는 경우 update, 없으면 inset를 함

## OrderContainer.jsx

---

- 컴포넌트가 마운트될 때 `ordersNo`를 기반으로 주문 정보를 API에서 가져옴
- 가져온 주문 정보와 주문 항목 정보를 각각의 state에 저장
- `OrderForm` 컴포넌트를 렌더링하고, 주문 정보와 주문 항목 정보를 props로 전달

### 1. 컴포넌트 정의 및 상태 관리

```jsx
import React, { useEffect, useState } from 'react'
import OrderForm from '../../components/Order/OrderForm'
import * as Orders from '../../apis/Services/Orders
```

- `React`, `useEffect`, `useState`를 `react` 라이브러리에서 가져옴
- `OrderForm` 컴포넌트를 import합니다. 이는 주문 정보를 표시하는 컴포넌트
- `Orders` 모듈을 import하여 주문 정보를 가져오는 API 호출을 사용

```jsx
const OrderContainer = ({ ordersNo }) => {
  const [orders, setOrders] = useState({})
  const [orderItem, setOrderItem] = useState([])

  console.log(ordersNo)
```

- `OrderContainer`는 함수형 컴포넌트로, `ordersNo`를 props로 받음
- `orders`와 `orderItem`이라는 두 개의 state를 정의합니다. `orders`는 주문의 기본 정보를, `orderItem`은 주문 항목 정보를 저장

### 2. 주문 정보 가져오기 함수

```jsx
  // 주문정보 가져오기
  const getOrders = async (ordersNo) => {
    try {
      const response = await Orders.getOrder(ordersNo)
      const data = response.data
      const order = data.order
      const orderItem = data.orderItems

      console.log(order)
      console.log(orderItem)
      setOrders(order)
      setOrderItem(orderItem)
    } catch (e) {
      console.error(e)
    }
  }
```

- `getOrders`는 비동기 함수로, `ordersNo`를 사용하여 주문 정보를 API에서 가져옴
- `Orders.getOrder` 함수는 API 호출을 담당하며, `ordersNo`를 인자로 받음
- API 호출이 성공하면 응답 데이터에서 주문 정보(`order`)와 주문 항목 정보(`orderItems`)를 추출
- 추출한 데이터를 각각의 state(`orders`, `orderItem`)에 저장
- 오류가 발생하면 콘솔에 에러 메시지를 출력

### 3. useEffect 훅을 사용하여 컴포넌트 마운트 시 주문 정보 가져오기

```jsx
  useEffect(() => {
    getOrders(ordersNo)
  }, [])
```

- `useEffect` 훅은 컴포넌트가 처음 마운트될 때(`[]`의존성 배열이 빈 상태) `getOrders` 함수를 호출하여 주문 정보를 가져옴

### 4. 렌더링

```jsx
  return (
    <>
      <OrderForm
        orders={orders}
        orderItem={orderItem}
      />
    </>
  )
}

export default OrderContainer
```

- `OrderContainer` 컴포넌트는 `OrderForm` 컴포넌트를 렌더링하며, `orders`와 `orderItem` state를 props로 전달
- `OrderForm` 컴포넌트는 이 props를 사용하여 주문 정보를 표시

## OrderForm.jsx

---

1. 사용자는 결제 화면에서 이름, 이메일, 전화번호, 서비스 일정, 서비스 시간, 주소 등을 입력
2. `결제하기` 버튼을 클릭하면 입력값을 확인하고, 결제 요청을 보냅니다.
3. 결제 성공 여부에 따라 다른 페이지로 이동
4. `취소하기` 버튼을 클릭하면 취소 여부를 묻고, 확인되면 서비스 페이지로 이동

### 1. 컴포넌트 정의 및 상태 관리

```jsx
import React, { useContext, useEffect, useState } from 'react'
import DaumPostcode from "react-daum-postcode"
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import * as Swal from '../../apis/alert'
import { LoginContext } from '../contexts/LoginContextProvider'
```

- `React`, `useEffect`, `useState`, `useContext`를 `react` 라이브러리에서 가져옴
- `DaumPostcode`는 주소 검색을 위한 컴포넌트
- `Modal`은 다음 주소 찾기 API 창을 모달로 표시하기 위한 컴포넌트
- `useNavigate`는 페이지 이동을 위한 훅
- `Swal`은 경고창을 표시하는 유틸리티
- `LoginContext`는 로그인 상태를 관리하는 컨텍스트

```jsx
const OrderForm = ({ orders, orderItem }) => {
  const navigate = useNavigate()
  const [serviceDate, setServiceDate] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceTime, setServiceTime] = useState('')
  const [userPost, setUserPost] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userAddressDetail, setUserAddressDetail] = useState('')
  const [address, setAdderss] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { userInfo } = useContext(LoginContext)
```

- 컴포넌트는 여러 상태 변수를 관리합니다. `serviceDate`, `name`, `email`, `phone`, `serviceTime`, `userPost`, `userAddress`, `userAddressDetail`, `address`는 사용자 입력값을 저장
- `isOpen`은 주소 검색 모달의 열림/닫힘 상태를 관리
- `userInfo`는 로그인된 사용자의 정보를 가져옴

### 2. 결제 취소 함수

```jsx
  const onCancel = () =>{
    Swal.confirm('정말 취소하시겠습니까?', '지금 결제를 취소 할 경우 현재 저장된 입력한 값이 모두 사라집니다.', 'warning',(result) => {
      if(result.isConfirmed){
        navigate("/service")
      }
    })
  }
```

- `onCancel` 함수는 결제를 취소할 때 실행
- 사용자에게 확인 창을 표시하고, 확인되면 `/service` 페이지로 이동

### 3. 주소 검색 처리

```jsx
  const handlePostCode = (data) => {
    setUserPost(data.zonecode)
    setUserAddress(data.roadAddress)
    console.log(userPost);
    console.log(userAddress);
    setIsOpen(false)
  }
```

- `handlePostCode` 함수는 주소 검색 결과를 처리
- `zonecode`와 `roadAddress`를 상태에 저장하고, 모달을 닫음

```jsx
  const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
        left: "0",
        margin: "auto",
        width: "500px",
        height: "400px",
        padding: "0",
        overflow: "hidden",
    },
  }
```

- `customStyles`는 모달의 스타일을 정의

```jsx
  const onOpen = () =>{
    setIsOpen(!isOpen)
  }
```

- `onOpen` 함수는 모달의 열림/닫힘 상태를 토글

### 4. 결제 처리

```jsx
  const onClickPayment = () => {
    if (!name || !email || !phone || !serviceDate || !serviceTime || !userPost || !userAddress || !userAddressDetail) {
      Swal.alert('모든 입력 값을 입력해주세요', '선택되지 않은 입력 값이 있어요. 선택해주세요.', 'warning')
      return
    }

    console.log(address);
    const { IMP } = window
    IMP.init(['imp번호'])

    const data = {
      pg: 'kcp',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: orders.title,
      amount: orders.totalPrice,
      buyer_name: name,
      buyer_tel: phone,
      buyer_email: email,
      buyer_addr: address,
      buyer_postalcode: userPost
    }
    IMP.request_pay(data, callback)
  }
```

- `onClickPayment` 함수는 결제 버튼 클릭 시 실행, 필수 입력값을 확인하고, 누락된 값이 있으면 경고창을 표시
- `IMP.init`을 통해 결제 서비스를 초기화
- 결제 데이터를 정의하고 `IMP.request_pay`를 호출하여 결제를 요청

```jsx
  const callback = (response) => {
    const {success, error_msg} = response;
    const errorMsg = error_msg
    if (success) {
      navigate(`/order/done/${orders.ordersNo}/${serviceDate}/${serviceTime}/${address}/${userPost}`)
    } else {
      navigate(`/order/false/${orders.ordersNo}/${serviceDate}/${serviceTime}/${address}/${userPost}/${errorMsg}`)
    }
  }
```

- `callback` 함수는 결제 성공 여부를 처리
- 성공하면 주문 완료 페이지로, 실패하면 실패 페이지로 이동

### 5. 결제 설정

```jsx
  useEffect(()=>{
    setAdderss(`${userAddress} ${userAddressDetail}`)
    setName(userInfo.userName)
    setEmail(userInfo.userEmail)
    setPhone(userInfo.userPhone)

    const jquery = document.createElement("script")
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js"
    const iamport = document.createElement("script")
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js"
    document.head.appendChild(jquery)
    document.head.appendChild(iamport)
    return () => {
      document.head.removeChild(jquery)
      document.head.removeChild(iamport)
    }
  }, [userAddress, userAddressDetail, userInfo])

```

- `useEffect` 훅은 컴포넌트가 처음 마운트될 때와 `userAddress`, `userAddressDetail`, `userInfo`가 변경될 때 실행
- 결제에 필요한 외부 스크립트를 로드하고, 사용자의 기본 정보를 설정

### 6. 렌더링

```jsx
  return (
    <>
      <div className="py-5 text-center">
        <h2 className="color_main size_4rem">결제 화면</h2>
        <p className="lead">{orders.title}</p>
      </div>
      <div className="row g-5 flex-row-reverse">
        <div className="col-md-5 col-lg-4 orders-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="color_main">주문 내역</span>
          </h4>
          <ul className="list-group mb-3">
            {orderItem.map((item) => (
              <li key={orderItem.itemNo} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.service.serviceName}</h6>
                  <small className="text-body-secondary">{item.service.serviceContent}</small>
                </div>
                <span className="text-body-secondary">&#8361; {item.price.toLocaleString()} 원</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>총 가격 (원)</span>
              <strong id="paymentPrice">&#8361; {orders.totalPrice} 원</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 color_sub2">예약 정보</h4>
          <div className="needs-validation">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="userName" className="form-label">이름</label>
                <input type="text" className="form-control" id="userName" placeholder="이름" value={userInfo.userName} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col-12">
                <label htmlFor="serviceDate" className="form-label">서비스 일정</label>
                <input type="date" className="form-control" id="serviceDate" placeholder="일정" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} required />
              </div>
              <div className="col-12">
                <label htmlFor="serviceTime" className="form-label">서비스 시간</label>
                <input type="time" className="form-control" id="serviceTime" placeholder="일정" value={serviceTime} onChange={(e) => setServiceTime(e.target.value)} required />
              </div>
              <div className="col-12">
                <label htmlFor="userEmail" className="form-label">이메일</label>
                <input type="email" className="form-control" id="userEmail" placeholder="daeut@example.com" value={userInfo.userEmail} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="col-md-12">
                <label htmlFor="userPhone" className="form-label">전화번호</label>
                <input type="text" className="form-control" id="userPhone" placeholder="전화번호를 입력해주세요" value={userInfo.userPhone} onChange={(e) => setPhone(e.target.value)}  />
              </div>
              <div className="col-12">
                <label htmlFor="userPost" className="form-label">우편번호</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="userPost" placeholder="우편번호" value={userPost} onChange={(e) => setUserPost(e.target.value)} required />
                  <button type="button" className="btn btn-secondary myBtn" onClick={onOpen}>우편번호 찾기</button>
                  <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                    <DaumPostcode onComplete={handlePostCode} height="100%" />
                  </Modal>
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="userAddress" className="form-label">주소</label>
                <input type="text" className="form-control" id="userAddress" placeholder="주소를 입력해주세요" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required />
              </div>
              <div className="col-12">
                <label htmlFor="userAddressDetail" className="form-label">상세주소</label>
                <input type="text" className="form-control" id="userAddressDetail" placeholder="상세주소를 입력해주세요" value={userAddressDetail} onChange={(e) => setUserAddressDetail(e.target.value)} required />
              </div>
              <div className="d-flex justify-content-end gap-5 mb-3 mt-4 btn-container">
                <input type="hidden" name="ordersNo" id="ordersNo" value={orders.ordersNo} />
                <input type="hidden" name="totalPrice" id="totalPrice" value={orders.totalPrice} />
                <input type="hidden" name="title" id="title" value={orders.title} />
                <button className="btn btn-primary btn-lg sessuce color_main" type="button" onClick={onClickPayment}>결제하기</button>
                <button className="btn btn-danger btn-lg cancel" type="button" data-bs-toggle="modal" data-bs-target="#cancelPaymentModel" onClick={onCancel}>취소하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderForm
```

- 렌더링 부분에서는 결제 화면을 구성. 입력 필드와 결제 버튼, 주문 내역 등을 표시
- 주소 검색 모달도 포함되어 있으며, 사용자가 우편번호를 찾을 수 있도록 함

</details>
<br><br>

<details>
    <summary>환불 기능 구현</summary>

## OrderController.java

---

### 전체 코드

```java
    /**
     * 결제 취소
     * @param ordersNo
     * @param cancelAccount
     * @param cancelName
     * @param cancelNumber
     * @param reason
     * @param model
     * @return
     * @throws Exception
     */
    @PostMapping("/cancel")
    public ResponseEntity<Object> cancelOrder(@RequestParam String ordersNo,
                                              @RequestParam String cancelAccount,
                                              @RequestParam String cancelName,
                                              @RequestParam String cancelNumber,
                                              @RequestParam String reason) {
        try {
            // orders 수정
            Orders orders = orderService.select(ordersNo);
            if (orders == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("주문을 찾을 수 없습니다.");
            }
            orders.setOrderStatus(OrderStatus.환불);
            orderService.update(orders);

            // 데이터 넣기
            Cancel cancel = new Cancel();
            cancel.setReason(reason);
            cancel.setCancelAmount(orders.getTotalPrice());
            cancel.setConfirmed(0);
            cancel.setRefund(0);
            cancel.setCancelAccount(cancelAccount);
            cancel.setCancelNumber(cancelNumber);
            cancel.setCancelName(cancelName);
            cancel.setOrdersNo(ordersNo);

            cancelService.insert(cancel);

            // JSON 응답 데이터 구성
            return ResponseEntity.ok().body(cancel);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 취소 중 오류 발생: " + e.getMessage());
        }
    }
```

- **`@PostMapping("/cancel")`**: 이 메서드는 HTTP POST 요청을 처리하며, `/cancel` 경로로 들어오는 요청을 처리
- **`@RequestParam`**: 각 파라미터는 HTTP 요청의 쿼리스트링이나 폼 데이터에서 값을 가져옴
    - **`ordersNo`**: 주문 번호. 주어진 주문 번호에 해당하는 주문을 찾음
    - **`cancelAccount`**: 취소할 계좌 번호
    - **`cancelName`**: 취소자의 이름
    - **`cancelNumber`**: 취소자의 전화번호
    - **`reason`**: 취소 사유
- **`ResponseEntity<Object>`**: HTTP 응답을 나타내는 Spring의 클래스입니다. `Object` 타입으로 응답 본문을 설정할 수 있음

### 주요 기능

1. **주문 확인**: 주어진 주문 번호 (`ordersNo`)를 사용하여 주문을 조회
2. 조회된 주문이 없을 경우 404 상태 코드를 반환
3. **주문 상태 변경**: 조회된 주문의 상태를 "보류중"으로 변경
4. **취소 정보 저장**: 취소 정보를 저장하기 위해 `Cancel` 객체를 생성하고 필드에 취소 관련 정보를 설정
    - `reason`: 취소 사유
    - `cancelAmount`: 취소 금액 (주문의 총 금액)
    - `confirmed`, `refund`: 초기값으로 0을 설정
    - `cancelAccount`, `cancelNumber`, `cancelName`: 취소자의 계좌 번호, 전화번호, 이름
    - `ordersNo`: 취소할 주문의 번호
5. **응답**: 취소 정보를 JSON 형식으로 응답
    - 성공적으로 처리되면 HTTP 상태 코드 200과 취소된 정보를 반환
    - 처리 중 오류가 발생하면 HTTP 상태 코드 500과 오류 메시지를 반환

## AdminController.java

---

### 전체 코드

```java
     /**
     * 환불
     * @param ordersNo
     * @return
     */
    @GetMapping("/adminReservationCancel")
    public ResponseEntity<?> adminReadReservationCancel(@RequestParam String ordersNo) {
        log.info("Cancel ordersNo: " + ordersNo);
        try {

            // 결제 내역 환불로 수정
            Payments payments = paymentService.selectByOrdersNo(ordersNo);
            payments.setStatus(PaymentStatus.환불);
            log.info("payments: " + payments);
            paymentService.merge(payments);

            // 취소 내역 환불로 승인
            Cancel cancel = cancelService.selectByOrdersNo(ordersNo);
            cancel.setConfirmed(1);
            cancel.setRefund(1);
            log.info("cancel: " + cancel);
            cancelService.update(cancel);

            // 주문 내역 환불로 수정
            Orders orders = orderService.select(ordersNo);
            orders.setOrderStatus(OrderStatus.환불);
            log.info("orders: " + orders);
            orderService.update(orders);

            HashMap<String, Object> response = new HashMap<>();
            response.put("payments", payments);
            response.put("cancel", cancel);
            response.put("orders", orders);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
```

### 주요 기능

1. **`@GetMapping("/adminReservationCancel")`**: 이 메서드는 HTTP GET 요청을 처리하며, `/adminReservationCancel` 경로로 들어오는 요청을 처리
2. **`@RequestParam`**: HTTP 요청의 쿼리스트링에서 `ordersNo` 값을 가져옴
    - **`ordersNo`**: 환불할 주문의 번호
3. **로그 출력**: 주문 번호를 로그에 출력하여 확인
4. **환불 처리**: 주어진 주문 번호에 대한 각종 데이터를 환불 상태로 변경
    - **`Payments`**: 주문 번호에 대한 결제 정보를 조회하고, 결제 상태를 "환불"로 설정
    - **`Cancel`**: 주문 번호에 대한 취소 정보를 조회하고, 취소 상태를 환불로 승인하고, 환불 처리 여부를 표시
    - **`Orders`**: 주문 번호에 대한 주문 정보를 조회하고, 주문 상태를 "환불"로 설정
5. **응답 데이터 구성**: 각각의 변경된 데이터를 `HashMap`에 담아서 HTTP 응답으로 반환
    - `payments`: 변경된 결제 정보
    - `cancel`: 변경된 취소 정보
    - `orders`: 변경된 주문 정보
6. **예외 처리**: 만약 처리 중 오류가 발생하면, 오류 메시지와 함께 500 상태 코드를 반환

## UserResrvationForm.jsx

---

### 추가된 코드

```jsx
{
        order.orderStatus === '확정완료' && 
        (
          <div className="form-buttons">
            <Link to={`/cancel/${order.ordersNo}`} className="btn btn-danger">예약 취소</Link>
          </div>
        )
      }
      {
        order.orderStatus !== '확정완료' && 
        (
          <div className="form-buttons">
            <span className="btn btn-danger">{order.orderStatus}</span>
          </div>
        )
 }
```

- 주문 상태가 확정 완료 인 경우 예약 취소 버튼을 띄워 UserCancelForm으로 이동
- 주문 상태가 확정 완료가 아닌 경우 현재 예약 상태를 띄움

## UserCancelContainer.jsx

---

- 사용자가 주문을 취소하고 환불을 요청할 때 필요한 데이터를 관리하고 서버와 통신하여 주문 정보를 조회
- 환불을 처리하는 역할을 하며 주문 정보를 가져오는 것과 환불을 요청하는 데 있어 비동기 처리와 오류 처리를 수행

### **1. 상태 관리 및 초기화**

```jsx
const [order, setOrder] = useState({})
```

- `useState` 훅을 사용하여 `order` 상태를 초기화합니다. 이 상태는 주문 정보를 담고 있음

### **2. 라우터 관련**

```jsx
const navigate = useNavigate()
```

- `react-router-dom`의 `useNavigate` 훅을 사용하여 프로그래밍적으로 페이지 전환을 처리할 수 있는 `navigate` 함수를 가져옴

### **3. 주문 정보 가져오기 (`getOrders` 함수)**

```jsx
const getOrders = async (ordersNo) => {
  try {
    const response = await orders.getOrder(ordersNo)
    const data = response.data
    const order = data.order
    setOrder(order)
  } catch (e) {
    console.error(`주문 조회중 에러 발생... ${e}`)
  }
}
```

- `getOrders` 함수는 주어진 `ordersNo`를 사용하여 서버로부터 주문 정보를 가져오는 비동기 함수
- `orders.getOrder(ordersNo)` 메서드를 호출하여 주문 정보를 요청하고, 성공적으로 응답받으면 `order` 상태를 업데이트

### **4. 환불 처리 (`onCancel` 함수)**

```jsx
const onCancel = async (ordersNo, cancelAccount, cancelName, cancelNumber, reason) => {
  try {
    const response = await orders.payCancel(ordersNo, cancelAccount, cancelName, cancelNumber, reason)
    const data = response.data
    const status = response.status
    console.log(data)
    console.log(`환불 처리 결과.... ${status}`)
    navigate(`/cancelDone/${ordersNo}`)
  } catch (e) {
    console.error(`환불 처리 중 에러 발생... ${e}`)
  }
}
```

- `onCancel` 함수는 사용자가 환불을 요청할 때 호출되는 함수
- `orders.payCancel` 메서드를 사용하여 서버에 환불 요청을 보냄
- 성공적으로 환불 요청이 처리되면, `navigate` 함수를 사용하여 `/cancelDone/${ordersNo}` 경로로 페이지를 이동

### **5. 사용 효과 (`useEffect` 훅)**

```jsx
useEffect(() => {
  getOrders(ordersNo)
}, [])
```

- `useEffect` 훅을 사용하여 컴포넌트가 마운트되었을 때 한 번만 `getOrders` 함수를 호출하여 초기 주문 정보를 가져옴
- `ordersNo`는 컴포넌트의 props로 전달받음

### **6. 컴포넌트 반환**

```jsx
return (
  <>
    <UserCancelForm
      ordersNo={ordersNo}
      order={order}
      onCancel={onCancel}
    />
  </>
)
```

- `UserCancelForm` 컴포넌트에 `ordersNo`, `order`, `onCancel` 함수를 props로 전달하여 렌더링
- 이 컴포넌트는 실제로 화면에 표시되는 부분을 담당


## UserCancelForm.jsx

---

- 사용자가 환불을 요청하는 폼을 구현한 React 함수형 컴포넌트
- 사용자가 입력한 환불 정보를 관리하고, 유효성 검사를 수행하여 필수 정보가 누락되지 않도록 함
- 사용자에게 취소 여부를 확인하는 팝업을 제공하고, 사용자가 확인을 클릭하면 정해진 경로로 페이지를 이동

### **1. 상태 관리 및 초기화**

```jsx
const [cancelAccount, setCancelAccount] = useState('')
const [cancelName, setCancelName] = useState('')
const [cancelNumber, setCancelNumber] = useState('')
const [reason, setReason] = useState('')
```

- `useState` 훅을 사용하여 각각 `cancelAccount`, `cancelName`, `cancelNumber`, `reason` 상태를 초기화
- 각 상태는 사용자가 입력한 환불 정보를 관리

### **2. 이벤트 핸들러**

- **환불하기 (`onSubmit` 함수)**
    
    ```jsx
    const onSubmit = () => {
      if (!cancelName || !cancelAccount || !cancelNumber || !reason) {
        Swal.alert('모든 입력 값을 입력해주세요', '선택되지 않은 입력 값이 있어요. 선택해주세요.', 'warning')
        return
      }
      // 취소 처리 함수 호출
      onCancel(ordersNo, cancelAccount, cancelName, cancelNumber, reason)
    }
    ```
    
    - 사용자가 제출 버튼을 클릭하면 호출되는 함수
    - 각 입력 필드(`cancelName`, `cancelAccount`, `cancelNumber`, `reason`)가 비어 있는지 확인하고, 비어 있으면 경고 메시지를 띄움
    - 모든 필드가 채워져 있으면 `onCancel` 함수를 호출하여 서버에 환불 요청을 보냄
    
- **취소하기 (`onBack` 함수)**
    
    ```jsx
    const onBack = () => {
      Swal.confirm('정말 취소하시겠습니까?', '지금 결제를 취소 할 경우 현재 저장된 입력한 값이 모두 사라집니다.', 'warning', (result) => {
        if (result.isConfirmed) {
          navigate("/service")
        }
      })
    }
    ```
    
    - 사용자가 취소 버튼을 클릭하면 호출되는 함수
    - `Swal.confirm`을 사용하여 사용자에게 정말 취소할 것인지 확인하는 팝업을 띄움
    - 사용자가 확인을 클릭하면 `navigate` 함수를 사용하여 `/service` 경로로 페이지를 이동
    

### **3. 폼 요소**

- **환불 은행 선택**
    
    ```jsx
    <select
      name="cancelAccount"
      id="cancelAccount"
      className="form-select w-25"
      value={cancelAccount}
      onChange={(e) => setCancelAccount(e.target.value)}
      required
    >
      {/* 옵션들 */}
    </select>
    ```
    
    - `cancelAccount` 상태와 연결된 `<select>` 요소
    - 사용자가 환불할 은행을 선택할 수 있음

- **예금주 입력**
    
    ```jsx
    <input
      type="text"
      className="form-control"
      name="cancelName"
      id="cancelName"
      value={cancelName}
      onChange={(e) => setCancelName(e.target.value)}
      placeholder="예금주를 입력해주세요"
      required
    />
    ```
    
    - `cancelName` 상태와 연결된 `<input>` 요소
    - 사용자가 환불할 계좌의 예금주를 입력할 수 있음
    
- **계좌 번호 입력**
    
    ```jsx
    <input
      type="text"
      className="form-control"
      name="cancelNumber"
      id="cancelNumber"
      value={cancelNumber}
      onChange={(e) => setCancelNumber(e.target.value)}
      placeholder="계좌번호를 입력해주세요('-' 제외)"
      required
    />
    ```
    
    - `cancelNumber` 상태와 연결된 `<input>` 요소
    - 사용자가 환불받을 계좌의 계좌번호를 입력할 수 있음
    
- **취소 사유 입력**
    
    ```jsx
    <textarea
      className="form-control"
      id="reason"
      name="reason"
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      rows="3"
      placeholder="취소 사유를 입력해주세요"
      required
    ></textarea>
    ```
    
    - `reason` 상태와 연결된 `<textarea>` 요소
    - 사용자가 환불을 요청하는 이유를 입력할 수 있음
    
- **반환 구문**
    
    ```jsx
    return (
      <div className="col-md-9 col-lg-10 form-sectiona mb-5">
        {/* 폼 요소들 */}
        {/* 버튼들 */}
      </div>
    )
    ```
    
    - 폼 요소들과 버튼들이 포함된 HTML을 반환
    - 사용자가 입력한 데이터와 버튼 클릭 이벤트 핸들러들이 정의되어 있음


## UserCancelDoneContainer.jsx

---

- `ordersNo`에 대한 환불 정보를 가져와서 사용자에게 보여주는 React 함수형 컴포넌트
- `useState`를 사용하여 상태를 관리하고, `useEffect`를 사용하여 컴포넌트 생명주기에 따라 데이터를 가져오고 업데이트

### **1. 상태 관리**

```jsx
const [cancel, setCancel] = useState({})
```

- `useState` 훅을 사용하여 초기 상태로 빈 객체(`{}`)를 가진 `cancel` 상태를 정의
- 이 상태는 환불 정보를 관리

### **2. 데이터 가져오기**

```jsx
useEffect(() => {
  if (ordersNo) {
    getCancel(ordersNo)
  }
}, [ordersNo])
```

- `useEffect` 훅을 사용하여 컴포넌트가 마운트되거나 `ordersNo` 값이 변경될 때마다 호출되도록 설정
- `ordersNo`가 변경되면 `getCancel` 함수를 호출하여 해당 주문의 환불 정보를 가져옴

```jsx
const getCancel = async (ordersNo) => {
  try {
    const response = await orders.getCancel(ordersNo)
    const cancel = response.data
    setCancel(cancel)
  } catch (e) {
    console.error(`환불 조회중 에러 발생... ${e}`);
  }
}
```

- `getCancel` 함수는 주어진 `ordersNo`를 사용하여 서버에서 환불 정보를 가져오는 비동기 함수
- `orders.getCancel(ordersNo)`을 호출하여 서버 API를 통해 데이터를 요청하고, 응답을 받으면 상태인 `cancel`을 업데이트

### **3. 반환 구문**

```jsx
return (
  <>
    <UserCancelDoneForm
      cancel={cancel}
    />
  </>
)
```

- `UserCancelDoneForm` 컴포넌트를 렌더링
- `cancel` 상태를 `UserCancelDoneForm` 컴포넌트에 props로 전달하여 환불 정보를 표시


## UserCancelDoneForm.jsx

---

### **1. 프로퍼티(props)**

```jsx
const UserCancelDoneForm = ({ cancel }) => {
```

- `cancel` 객체가 props로 전달됩니다. 이 객체에는 환불 정보가 포함되어 있음

### **2. 화면 구성**

```jsx
return (
  <div className="container complete">
    <div className="form-container complete">
      <h2 className="text-center color_main">예약 취소</h2>
      <p className="text-center">예약 번호</p>
      <p className="text-center">{cancel.ordersNo}</p>
      <p className="text-center">환불 금액</p>
      <p className="text-center">{cancel.cancelAmount} 원</p>
      <p className="text-center">환불 계좌</p>
      <p className="text-center">{cancel.cancelAccount} {cancel.cancelNumber}</p>
      <hr className="completeHr" />
      <p className="text-center">회원님의 예약이 성공적으로 취소되었습니다.</p>
      <p className="text-center">취소 승인까지 1~2 영업일이 소요될 수 있습니다.</p>

      <div className="d-flex gap-5">
        <Link to={'/'} className="btn btn-primary sessuce color_main">메인화면</Link>
      </div>
    </div>
  </div>
);
```

- `<div className="container complete">`와 `<div className="form-container complete">`는 Bootstrap 클래스를 사용하여 스타일링을 적용
- `cancel` 객체에서 환불 정보를 추출하여 화면에 표시
    - 예약 번호: `{cancel.ordersNo}`
    - 환불 금액: `{cancel.cancelAmount} 원`
    - 환불 계좌: `{cancel.cancelAccount} {cancel.cancelNumber}`
- "회원님의 예약이 성공적으로 취소되었습니다."와 "취소 승인까지 1~2 영업일이 소요될 수 있습니다." 메시지를 표시
- 메인 화면으로 돌아가기 위한 링크를 제공하는 버튼을 추가

### **3. Link 컴포넌트**

```jsx
<Link to={'/'} className="btn btn-primary sessuce color_main">메인화면</Link>
```

- `react-router-dom`의 `Link` 컴포넌트를 사용하여 메인 화면으로 이동하는 링크를 생성
- 버튼에는 "메인화면" 텍스트가 표시되고, `'/main'` 경로로 이동



## ReservRead.jsx

---

### **1. 상태(State) 관리**

```jsx
const [isOpen, setIsOpen] = useState(true);
const [reservationData, setReservationData] = useState(null);
const [refundData, setRefundData] = useState(null);
```

- `isOpen`: 사이드바의 열림/닫힘 상태를 관리하는 상태 변수
- `reservationData`: 예약 정보를 저장하는 상태 변수
- 초기값은 `null`로 설정되어 예약 정보를 불러오기 전에 로딩 상태를 표시
- `refundData`: 환불 정보를 저장하는 상태 변수
- 초기값은 `null`로 설정되어 환불 정보를 불러오기 전에 로딩 상태를 표시

### **2. useEffect를 이용한 데이터 불러오기**

```jsx
useEffect(() => {
    const fetchReservationData = async () => {
        try {
            const response = await admin.getReservationDetails(ordersNo);
            const data = response.data;
            const cancel = data.cancel;

            setReservationData(data);
            setRefundData(cancel);
        } catch (error) {
            console.error('Error fetching reservation data', error);
        }
    };

    fetchReservationData();
}, [ordersNo]);
```

- `useEffect` 훅을 사용하여 컴포넌트가 렌더링될 때 `ordersNo`에 해당하는 예약 정보와 환불 정보를 가져옴
- `admin.getReservationDetails(ordersNo)`는 API를 호출하여 예약 정보와 환불 정보를 가져오는 비동기 함수
- `ordersNo`가 변경될 때마다 호출되도록 배열 `[ordersNo]`을 `useEffect`의 두 번째 인자로 전달

### **3. 사이드바 토글 처리**

```jsx
const toggleSidebar = () => {
    setIsOpen(!isOpen);
};
```

- 사이드바의 열림/닫힘 상태를 토글하는 함수

### **4. 환불 승인 처리**

```jsx
const onCancel = async (ordersNo) => {
    try {
        const response = await admin.checkCancel(ordersNo);
        const status = response.status;
        console.log(`환불 승인 결과.... ${status}`);
    } catch (e) {
        console.log(`환불 승인 중 오류 발생... ${e}`);
    }
};
```

- `onCancel` 함수는 환불을 승인하는 기능을 수행
- `admin.checkCancel(ordersNo)`을 호출하여 해당 주문 번호(`ordersNo`)에 대한 환불을 처리
- 환불 처리 결과(`status`)를 콘솔에 출력

### **5. 환불 승인 확인 팝업**

```jsx
const checkConfirm = () => {
    Swal.confirm('환불을 승인하시겠습니까?', '확인 버튼을 누르면 환불이 승인됩니다.', 'question', (result) => {
        if (result.isConfirmed) {
            onCancel(ordersNo);
            Swal.alert('환불 승인 성공', '', 'success');
        }
    });
};
```

- `checkConfirm` 함수는 사용자에게 환불 승인 여부를 확인하는 팝업을 띄우고, 확인 버튼을 클릭하면 `onCancel` 함수를 호출하여 환불을 승인
- 승인 성공 시에는 알림창으로 "환불 승인 성공" 메시지를 표시

### **6. 렌더링**

- `reservationData`가 `null`인 경우, "Loading..."을 표시하여 데이터가 로딩 중임을 나타냄
- `reservationData`와 `refundData`를 사용하여 예약 정보와 환불 정보를 화면에 표시
- 예약 수정 및 목록으로 돌아가는 버튼을 제공
- 환불 정보가 존재할 경우, 환불 승인 버튼을 렌더링

</details>
<br><br>

## 6-3. 개선할 점
- 유저가 더 좋은 서비스를 제공 받기 위해서 채팅에서 사진을 첨부하고 메세지를 전송할 수 있도록 실제 사용할 수 있는 서비스 플랫폼을 구현하고자 함
- 결제 시 쿠폰이나 회원 등급과 같은 실제 서비스에서 사용할 수 있는 할인 기능을 결제 시스템에 도입하고자 함
<br><br>

# 7. 자체 평가 의견
## 7-1. 개별 평가<br>
- 반예진
    - 화면 설계 단계의 중요성을 크게 느꼈으며 제가 구현할 기능에서 쓰이는 게 무엇인지 정확히 알고 적용하는 게 중요하다고 느꼈습니다. 평소에 배운 것을 응용하는 부분에서 어려움이 많이 있었는데 이번 프로젝트를 계기로 응용하는 방법에 대해 조금 더 배우는 시간이 되었습니다.
- 윤준호
    - 중간에 DB를 바꿀 일이 많아서 기능 구현에 어려움이 많았고, 시간이 부족하여 뺀 기능도 많아서 아쉬웠습니다. 다음부터는 예시로 쓸 페이지를 참고하여, 미리 DB가 쓰이는 부분을 체크하고 작성하는 것이 좋을 것 같습니다. 또한 Spring Security를 사용하여 작성하며 CRUD 구조와 MVC 패턴에 대해 더 자세히 알게 된 것 같습니다.
- 이종식
    - 여러 api를 이용해서 기능을 구현하는 것이  재미있었고 portone을 이용해서 주문과 결제를 구현하는 것과 WebSocket을 사용해서 실시간 채팅을 구현하는 것이 가장 기억에 남았습니다. 기술적인 어려운 부분도 많았고 기간 내에 원하던 기능을 모두 구현하지 못해 아쉬운 부분도 있었지만 이런 과정들 속에서 네트워크와 WebSocket, 웹 어플리케이션의 서비스의 흐름에 대해서 더 공부를 하게 되고 기간 내에 끝낼 수 있는 능력을 기를 수 있었고, 팀원과 소통을 하며 함꼐 프로그램을 구현시키고, 발전시키며 소통의 중요성을 알게 되었습니다.
- 정다운
    - 사용자가 파트너로 등록되기 위해서는 단순히 권한을 부여하는 것이 아니라 사용자가 파트너 신청을 하고, 관리자가 이를 승인함으로써 파트너로 등록되는 시스템을 구현하는 것이었습니다. 이러한 방식은 조금 복잡할 수 있지만, 테스트를 통해 구현되는 과정을 보며 즐거웠습니다. 초기에는 각자가 구현한 부분을 소통 없이 통합하다 보니 문제가 생기기도 했지만, 서로의 피드백을 주고 받으며 소통의 중요성을 깨달았고, 시간이 지날수록 이에 적응해 나갔습니다. 처음에는 기능을 구현하는 것에 대한 염려도 있었지만, 반복하면서 점점 자신감을 갖게 되었습니다. 또한, 소셜 로그인을 완벽하게 구현하지 못해 아쉬웠고 개발하는데 시간 분배의 중요성도 알게 되었습니다.
- 황다정
    - 래퍼런스와 사이트들을 보며 프로젝트의 방향을 설계하고 페이지를 구성하는 일이 즐거웠습니다. 캘린더 기능이 쉽게 되지 않아 생각보다 오래 붙잡고 있었던 부분이 아쉽습니다. Spring을 사용한 프로젝트를 통해 많은 공부를 하게 되었습니다. 또한 예약 세부 페이지 구현 시 날짜를 클릭하면 캘린더가 새롭게 뜨는 스크립트와 CSS 구현을 하지 못한 부분이 아쉬웠습니다. 다음 기회에 부족한 부분을 채우고 더 정진하여 팀 프로젝트에 도움이 되고 싶습니다.
  
## 7-2. 팀 평가
### 한계점<br>
- 서비스 예약, 실시간 채팅, 게시판과 같은 필수 기능은 모두 구현하였으나 유저의 내가 좋아하는 게시글을 모아 볼 수 있는 옵션 기능을 구현하지 못하였다.소셜 로그인 기능을 자세히 구현하지 못해 팁게시판 댓글 작성을 하지 못하고 파트너 신청이 불가하는 등 여러 제약이 걸렸다.
### 개선점<br>
- static과 같은 공통적으로 사용하는 파일 및코드와 팀원들이 개별적으로 사용하는 파일을 제대로 분리하지 않아 시간이 필요했지만, 적절한 관리를 통해서 모두 같은 개발 환경에서 프로젝트를 진행하도록 한다.
### 문제 해결 방법<br>
- 프로젝트를 설계할 때, 시간이 오래 걸려도 프로젝트 기간을 생각해 목표를 철저히 세우고 중간에 변경이 될 수 있는 부분을 최소화해야 한다고 생각하며, 틈틈이 깃허브를 통해 파일을 합치고 팀원과 소통을 원활히 할 수 있도록 하여 오류를 줄인다. 또한, 기능 구현을 위한 시간 및 역할 분배를 잘 하여 원하는 기능을 최대한 할 수 있도록 한다.

<br><br>

# 8. 리액트 전환
## 8-1. 목표<br>
1. 동기식으로 데이터를 응답하던 MVC 패턴으로 작성한 모든 컨트롤러를 비동기식으로 데이터를 응답하는 REST API로 전환
2. Thymeleaf를 이용해 작성한 HTML을 React를 이용해 컴포넌트 기반의 효율적인 웹 애플리케이션을 구축
3. SpringBoot 프로젝트의 한계점이 있었던 채팅 기능의 실시간 알림 기능을 개발

<br><br>
 
## 8-2. MVC 패턴에서 REST API로 전환<br>
<details>
    <summary>🧊 백엔드의 스프링 부트 코드 수정</summary>

![Untitled](https://github.com/JongsikLEE01/DaEut_React/assets/137877490/1492f31c-bf8d-4a6b-9ea1-b52f620c0f6b)

</details>
<br><br>


<details>
    <summary>🧊 JWT를 활용한 Spring Security 수정</summary>

![60c6de48-f109-4884-a55a-94b29b977e81](https://github.com/JongsikLEE01/DaEut_React/assets/137877490/d7d4f447-8be1-43ea-a306-3f94f07a97ec)

</details>
<br><br>


<details>
    <summary>🧊 Thymeleaf를 활용한 프론트에서 React로 전환</summary>

![Untitled (1)](https://github.com/JongsikLEE01/DaEut_React/assets/137877490/b53eeec0-6408-4548-8bd9-882e43da1e49)

</details>
<br><br>

## 버전
- MySQL
- Java 17
- SpringBoot 3.x.x

