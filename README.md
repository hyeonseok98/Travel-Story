# ✈️ Travel Story
- 서비스 소개: Travel Story는 다양한 해외 여행지 정보를 제공하고, 맞춤형 여행 일정을 손쉽게 계획할 수 있는 서비스입니다. 

- 사용자가 일정을 등록하면 자동으로 경로가 지도에 시각화되며, 이를 통해 편리하게 여행을 준비하고 관리할 수 있습니다.

<br>

## 👨‍👩‍👧‍👦 Our Team

|                  이효현                  |                 박요셉                 |                     임현석                     |                    박초원                    |                      이준혁                       | 김인우 |
| :--------------------------------------: | :------------------------------------: | :--------------------------------------------: | :------------------------------------------: | :-----------------------------------------------: | :----: |
| [@reeny404](https://github.com/reeny404) | [@0dytpq0](https://github.com/0dytpq0) | [@hyeonseok98](https://github.com/hyeonseok98) | [@parkchowon](https://github.com/parkchowon) | [@LeeJunhyeok369](https://github.com/BLAKE198492) |        |
|                 TL / FE                  |                   FE                   |                       FE                       |                      FE                      |                        FE                         |   DS   |

<br>

### [👊 프로젝트 노션 바로가기](https://www.notion.so/teamsparta/1-B1-cf05aab3c68a4955a33a2c82d764ff06)

### [👊 웹페이지 바로가기](https://final-project-b1.vercel.app)

### [💜 프론트엔드 깃허브 바로가기](https://github.com/0dytpq0/final-project-b1)

<br><br>

## 프로젝트 기능

### 🛡 OAuth2 소셜로그인 (kakao)

> - Kakao 계정을 통한 간편 로그인이 가능합니다.
> - 작성한 게시글 등은 회원 탈퇴 시에 같이 삭제 처리 됩니다.

 <br>

### 📊 Google Maps API를 활용한 실시간 지도 제공 기능

> - 사용자의 여행 일정에 따라 지도에 해당 장소를 표시합니다.
> - 장소간의 경로를 선으로 이어 대략적인 경로를 표시하여 줍니다.

 <br>

### 🗨 여행지 정보 제공

> - 나라, 도시별 여행지에 대한 정보를 제공합니다.
> - 1.리뷰 작성/수정/삭제 : 각 여행지 별 리뷰를 적어 만족도를 나타낼 수 있습니다.
> - 2.일정에 추가 : 해당 여행지를 본인의 일정으로 추가할 수 있습니다.
> - 3.북마크 : 가고 싶은 여행지에 대해 북마크를 하여 보관할 수 있습니다.

 <br>

### 🔍 검색 기능

> - 여행지의 이름을 검색 시 관련된 여행지가 검색되고 이후 해당 여행지의 정보를 열람할 수 있습니다.
> - 사용자가 원하는 나라에 대해 필터링하여 원하는 나라의 여행지만 검색 할 수 있습니다.
> - 연관 검색어, 최근 검색어 등 사용자가 검색한 것들에 대해 정보를 제공해 줍니다.

 <br>

### 👨‍💻 마이페이지 기능

> - 마이페이지에서 내가 작성한 리뷰, 나의 북마크, 최근 본 장소 등을 확인 할 수 있습니다.
> - 프로필 수정을 할 수 있습니다.

 <br>

### 📢 일정 관리 기능

> - 사용자는 여행에 대한 일정을 생성하여 관리할 수 있습니다.
> - 북마크 한 장소, 내가 현재 보고 있는 장소 등을 일정에 스케쥴로 입력할 수 있으며, 교통 수단, 메모 등 여행에 필요한 정보들을 직접 메모하여 관리할 수 있습니다.
> - 내가 입력한 정보에 한하여 지도에서 해당 장소를 확인할 수 있습니다.

 <br>

## 적용 기술

### ◻ Tanstack Query

> 비동기 작업을 관리하고 데이터의 최신 상태를 유지하는데 서버 요청 횟수를 최소화 할 수 있으며 강력한 성능을 보여주기에 사용했습니다.

### ◻ Supabase

> 백엔드의 부재를 무마하고자 BaaS를 사용했으며, 이를 통해 백엔드 API를 쉽게 구축하고, 개발 시간을 단축시켰습니다.

### ◻ Zustand

> 상태관리를 간소화하고 성능을 최적화하기 위해 선택했습니다.
> 여러 선택지가 있지만, 전역적으로 관리해야될 상태가 많지 않았고, 보일러 플레이트 코드를 최소화 하기 위해 사용했습니다.

### ◻ Storybook

> 협업간 컴포넌트에 대한 이해와 사용에 도움을 주기 위해 Storybook을 사용하였습니다.

### ◻ class-variance-authority

> 컴포넌트 제작에 있어 복잡함을 피하고 팀원들간에 원할한 협업을 위해 사용하였습니다.

<br><br>

## ⚙ Development Environment

`react: ^18.2.0` `react-google-maps/api: ^2.19.3,` `supabase/supabase-js: ^2.44.4` `webstomp-client: ^1.2.6` `axios: ^1.1.3``tanstack/react-query: ^5.51.9` `axios: ^1.7.2` `cookies-next: ^4.2.1` `clsx: ^0.29.0` `tailwindcss: ^3.4.1``class-variance-authority: ^0.7.0` `immer: ^10.1.1` `lodash: ^4.17.21` `zustand: ^4.5.4` `storybook/nextjs: ^8.2.5`

<br><br>


## 🌐 Architecture

![architecture](https://github.com/user-attachments/assets/102ec17c-0843-4dc8-8dab-d1bc31e759de)

<br>

## [📋 ERD Diagram](https://www.erdcloud.com/d/eKNQHmYBeSy7MrvQy)
![ERD diagram](https://github.com/user-attachments/assets/500bb010-7eda-4cec-85e8-83ce27fea26a)


<br>

## 📝 Technologies & Tools (FE) 📝

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> 
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> 
<img src="https://img.shields.io/badge/Supabase-09D3AC?style=for-the-badge&logo=Supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/> 
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white"/> 
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/> 
<img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"/> 
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/> 
<img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>

<br>
<br>
<br>

◻ Copyright ©2024 Sparta-React 5th Final : B team 1 all rights reserved.
