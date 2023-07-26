# CoinRank
Show Top100 CoinRank and Chart

## 1. 프로젝트 개요

### 1-1 개발 동기
- API 사용 능력 향상과 실시간으로 데이터를 업데이트하는 나만의 웹 제작

서비스화면
![image](https://user-images.githubusercontent.com/87384858/219588209-58614c3b-1062-4fd5-843e-e48f9cd8b653.png)

## 2. 프로젝트 상세

### 2-1 일정
2023-01-12 ~ 2023-02-22

### 2-2 기술

|Front-end|Back-end|
|:---:|:---:|
|React|Mysql|
|Next.js|
|TypeScript|
|MUI|
|Bootstrab|
|Recoil|

### 2-3 기술 설명
### React
- 다양한 react-hook을 사용한 반응형 웹을 만들기 유용하고 리액트를 사용하는 사용자가 많기 때문에 참고할 자료가 굉장히 많았고, 다양한 라이브러리
를 사용할 수 있으며, 컴포넌트 단위로 작업을 하기 때문에 재사용성과 확장성, 협업에 유리하기 때문에 적합하다고 생각했습니다

### Next.js
- React의 FramWork로 React보다 비교적 편한 라우팅과 API Route를 사용하기 위해서 선택했습니다.

### TypeScript
- 함수 실행 시, 컴파일 과정에서 실시간으로 타입을 검사하므로 디버깅이 쉽고 안정된 프로그램 작성을 가능하게 하고 
  협업 진행시 타입을 알려주기 떄문에 타입을 혼동할 일이 줄어들기 때문에 사용했습니다.

### MUI
- 로그인, 회원가입부분을 MUI를 이용하여 만들었습니다.

### Bootstrab
- 코인 Table을 Bootstrab을 이용하여 만들었습니다.

### Recoil
- 전역상태관리 라이브러리로 빠르고 유연한 상태관리를 지원하며 한 컴포너트에서 값이 변경되면 변경된 값이 사용된
  모든 컴포넌트에서 변경이 되므로 전역적으로 사용하기 유용하여 사용했습니다.

### Mysql
- 팀 프로젝트의 메인 DB로 사용중이며 데이터 조회, 추가, 삭제 기능위주로 사용이 되고 있습니다.
- 관심 종목 DB로 중복체크만을 위해 고유ID값만을 추가, 삭제, 조회하고 index는 자동증가로 사용하고 있습니다.


## 3. 화면 구성
### 시작페이지
![image](https://user-images.githubusercontent.com/87384858/219588209-58614c3b-1062-4fd5-843e-e48f9cd8b653.png)

### 메인페이지
![image](https://user-images.githubusercontent.com/87384858/219951358-c7b5ffdd-cc8e-4bbe-bda4-7bd3f51d8c40.png)

### 관심종목
![image](https://user-images.githubusercontent.com/87384858/219951386-21242a24-09ec-48d0-9f3e-6fbece3e15bc.png)

### 차트페이지
![image](https://user-images.githubusercontent.com/99184080/221513485-752b8ad1-03cf-493f-9059-b173fda03970.png)

### 로그인페이지
![image](https://user-images.githubusercontent.com/87384858/219588658-adc259c4-c12e-4e8b-83ae-122df754bf39.png)

### 회원가입페이지
![image](https://user-images.githubusercontent.com/87384858/219589143-87b03fd0-5c32-427b-81c8-f636bf860b62.png)


### 2-4 아쉬웠던 점
- 로그인, 회원가입 기능을 만들지 못해서 추후에 기능을 추가할 예정입니다.
- my-SQL 호스트 문제로 vercel 배포시 DB를 활용한 관심종목 기능에서 에러가 발생했습니다.
