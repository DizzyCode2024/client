# 0. 공통 핵심 기능 (DM, Channel)

DM과 Channel에 공통적으로 사용되는 핵심 기능으로는 메시지 입력 및 파일 첨부 기능, 무한 스크롤 채팅 로딩, 실시간 메시지 업데이트 등이 있습니다. 

<details>

## 0.1. 메시지 입력 및 파일 첨부 기능

### 0.1.1. 메시지 입력

- `MessageInput`: 사용자가 텍스트 메시지를 입력하고, 파일을 첨부할 수 있는 입력 필드 컴포넌트입니다.
- 사용자는 `Input` 컴포넌트를 사용하여 `Enter` 키를 누르거나 전송 버튼을 클릭하여 메시지를 전송할 수 있습니다.

### 0.1.2. 파일 첨부 기능

- `useDropzone`을 사용하여 드래그 앤 드롭 인터페이스를 제공, 파일을 쉽게 첨부할 수 있습니다.
- 첨부된 파일은 `FilePreview` 컴포넌트를 통해 미리 보고, 제거할 수 있습니다.

## 0.2. 무한 스크롤 채팅 로딩

### 0.2.1. 과거 메시지 목록 불러오기

- `DmContainer` , `ChatContainer` 에서 메시지 목록을 보여주고, 무한 스크롤을 통해 과거의 메시지를 불러옵니다.

### 0.2.2. 무한 쿼리 기능

- `useInfiniteQuery`: `react-query`의 무한 쿼리 기능을 사용하여 페이지네이션된 메시지 데이터를 관리합니다.
- `useRef` 및 `useCallback`: 스크롤 이벤트를 관리합니다.

## 0.3. 실시간 메시지 업데이트

- `DMSection`, `ChatSection` 으로 실시간으로 메시지를 받고 업데이트하는 전체 DM 섹션, Chat 섹션을 포함합니다.
- `useSocketStore` 및 `useStompClient`: WebSocket 연결을 관리하고 STOMP 프로토콜을 사용하여 실시간 메시지 구독 및 발행을 합니다.
- `subscribe` 및 `unsubscribe`: 특정 토픽을 구독하고 구독 해제를 관리합니다.

</details>

# 1. Flow Chart

![DmChart.png](../images/DmChart.png)

# 2. GIF

# 3. DM 핵심 기능

DM의 핵심적인 기능에는 DM방 생성, DM방 목록 조회, 친구 초대 기능, 방 멤버 제거, DM 방 삭제 기능이 있습니다. 

<details>

## 3.1. DM 방 생성

- `createDmRoomApi`를 호출하여 서버에 새 방을 생성합니다.
- 성공 시, 생성된 방의 ID로 현재 DM 방의 ID를 설정하고, 방 목록 쿼리를 무효화하여 최신 목록을 반영합니다.
- 사용자를 새로 생성된 방의 채팅 화면으로 리디렉션합니다.

## 3.2. DM 방 목록 조회

- `getDmRooms` 함수를 호출하여 서버에서 DM 방 목록을 가져옵니다.
- `react-query`의 `useQuery`를 사용하여 데이터 캐싱, 로딩 상태 관리, 에러 핸들링을 자동으로 처리합니다.

## 3.3 DM 방 상세 조회

- 주어진 방 ID를 사용하여 `fetchDmRoomDetailsApi`를 호출합니다.
- 방 정보가 변경될 수 있으므로, 해당 쿼리 키를 기반으로 쿼리 결과를 캐시합니다.

## 3.4. 방 멤버 추가

- `addMemberMutation` 을 통해 특정 DM 방에 새로운 멤버를 추가합니다.
- `addMemberToRoomApi`를 호출하여 서버에 멤버 추가를 요청합니다.

## 3.5. DM 방 탈퇴

- `deleteRoomMutation` 을 통해 DM 방을 탈퇴합니다.
- `deleteRoomApi` 를 호출하여 서버에 유저의 방 제거를 요청합니다.

</details>

# 4. Channel 핵심 기능

# 5. Blog

[**리액트로 구현하고 이해해보는 웹 소켓 + STOMP**](https://velog.io/@mikio/websocket-stomp)
