# 1. Flow Chart

![friendChart.png](../images/friendChart.png)

# 2. GIF

![friendRequest.gif](../images/friendRequest.gif)

# 3. 핵심 기능

친구 기능은 최대한 사용자 간의 상호 작용을 원활히 하고, 친구 관계를 효과적으로 관리하는 데에 초점을 두었습니다. 

핵심 기능으로는 친구 요청 보내기 (ID로 친구 요청, 이름으로 친구 요청), 친구 요청 응답 처리 (수락, 거절), 친구 목록 관리 (친구 목록 조회, 대기 중인 친구 요청 조회, 친구 요청 삭제)와 같은 기능들을 제공하고 있습니다. 

<details> 

## 3.1 친구 요청 보내기
### 3.1.1. ID로 친구 요청: 
`sendFriendRequestById` 함수를 통해, 사용자 ID로 다른 사용자에게 친구 요청을 보낼 수 있습니다. 요청 상태는 'PENDING'으로 설정됩니다.
### 3.1.2. 이름으로 친구 요청: 
`sendFriendRequestByName` 함수를 사용하여, 사용자 이름으로 친구 요청을 보낼 수 있습니다. 이 경우에도 요청 상태는 'PENDING'입니다.
## 3.2 친구 요청 응답 처리
### 3.2.1. 친구 요청 수락:
`acceptFriendRequest` 함수를 통해 받은 친구 요청을 수락할 수 있습니다. 상태는 'ACCEPTED'로 변경됩니다.
### 3.2.2. 친구 요청 거절:
`rejectFriendRequest` 함수를 통해 받은 친구 요청을 거절할 수 있으며, 상태는 'REJECTED'로 설정됩니다.
## 3.3 친구 목록 관리
### 3.3.1. 친구 목록 조회:
`getFriendsList` 함수를 사용해 사용자의 친구 목록을 조회할 수 있습니다.
### 3.3.2. 대기 중인 친구 요청 조회:
`getPendingFriendRequests` 함수로 현재 대기 중인 친구 요청들을 확인할 수 있습니다.
### 3.3.3. 친구 요청 삭제:
`deleteFriendRequest` 함수를 사용하여 기존에 보낸 친구 요청을 취소하거나 삭제할 수 있습니다.
### 3.3.4 친구 1:1 DM 연결 : 
 `useOnClickDM`을 통해 친구 목록 관리에서 DM 페이지로의 리다이렉션이 발생합니다. 
- 방이 존재하지 않을 경우: 새로운 DM방을 생성하기 위해 addDmRoomMutation을 호출합니다. 이때 방 이름은 로그인한 사용자의 이름과 친구의 이름을 조합해 생성하고, 뮤테이션을 통해 서버에 새로운 방을 추가 요청합니다.
- 방이 존재할 경우: navigate 함수를 사용하여 해당 DM 방의 페이지로 이동합니다.
## 3.4.상태 변경 시 UI 피드백
각 기능(친구 요청 보내기, 수락, 거절 등) 성공 또는 실패 시 사용자에게 피드백을 제공하기 위해 커스텀 토스트 메시지(`useCustomToast`)를 활용합니다.

</details>

# 4. Blog

[**React Query와 Custom Hooks를 이용한 친구 관리 시스템 구현하기**](https://velog.io/@mikio/ReactQueryCustomHooksWeAreFriends)
