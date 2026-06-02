# Chapter 7 - Wireless and Mobile Networks 정리본

## 0. 이 장의 목적

이 장은 wireless link와 mobility를 다룬다. 무선은 매체 자체가 불안정해서 생기는 문제이고, mobility는 사용자가 network attachment point를 바꿀 때 주소와 routing을 어떻게 유지할지의 문제다.

핵심은 다음 한 문장이다.

> Wireless는 link 품질과 multiple access 문제이고, mobility는 사용자가 움직여도 통신 상대가 계속 도달할 수 있게 하는 addressing/routing 문제다.

## 1. 읽기 전략

- 텍스트 중심: 용어 정의, 802.11 특징, Mobile IP 기능 목록.
- 이미지 병행: wireless taxonomy, hidden terminal, CDMA, 802.11 CSMA/CA와 RTS/CTS, cellular architecture, mobility routing.

### 이미지/도식 병행 권장 페이지
- p3-p10: wireless network 구성요소와 taxonomy. host/base station/link/infrastructure/ad hoc/mesh 관계를 그림으로 확인.
- p13-p17: SNR-BER, hidden terminal, CDMA. 무선 링크가 유선보다 어려운 이유가 그래프/공간 그림에 있다.
- p20-p33: 802.11 Wi-Fi. BSS/AP, scanning, CSMA/CA, RTS-CTS, frame addressing, subnet 내 mobility가 도식 중심이다.
- p35-p44: cellular/3G/4G/LTE. radio access network, core network, tunneling, QoS 구조를 그림으로 봐야 한다.
- p46-p57: 5G 개요. 세대 비교, OWA/OTP, 5G architecture는 표와 블록도가 핵심이다.
- p60-p71: mobility 원리. home/visited network, correspondent, HA/FA, indirect/direct routing의 차이를 그림으로 추적.
- p74-p85: Mobile IP와 cellular mobility. registration, handoff, paging, LTE mobility의 흐름도가 핵심이다.

## 2. Wireless network 구성요소

구성요소:

- **Wireless host**: laptop, smartphone 등. mobile일 수도 있고 stationary일 수도 있다.
- **Base station**: wired network에 연결되어 wireless host와 wired network 사이 packet을 relay. Wi-Fi AP, cellular tower 등.
- **Wireless link**: host와 base station 또는 host끼리 연결하는 무선 link.
- **Network infrastructure**: base station 뒤쪽의 wired/core network.

중요 구분:

- Wireless는 반드시 mobile을 의미하지 않는다.
- Mobile은 attachment point가 바뀌는 문제다.

## 3. Infrastructure mode vs ad hoc mode

| 구분 | Infrastructure mode | Ad hoc mode |
|---|---|---|
| Base station | 있음 | 없음 |
| Internet 연결 | base station을 통해 연결 | 직접 없을 수 있음 |
| Routing | infrastructure가 담당 | node들이 스스로 구성 |
| 예시 | Wi-Fi AP, cellular | MANET, VANET, 임시 네트워크 |

Wireless taxonomy는 single-hop/multi-hop, infrastructure/no infrastructure 기준으로 나뉜다.

## 4. Wireless link characteristics

무선 link가 유선보다 어려운 이유:

- **Path loss**: 신호가 전파되며 약해짐.
- **Interference**: 같은 주파수 대역의 다른 장치가 간섭.
- **Multipath propagation**: 신호가 반사되어 여러 경로로 도착.

SNR(signal-to-noise ratio)이 높을수록 signal을 noise에서 구분하기 쉽다. SNR이 낮으면 BER(bit error rate)이 올라간다.

물리 계층은 SNR에 따라 rate/modulation을 조절한다. 높은 rate는 더 좋은 SNR을 요구한다.

## 5. Hidden terminal problem

A와 C가 서로를 듣지 못하지만 둘 다 B에게 전송할 수 있으면, A와 C는 서로의 전송을 감지하지 못한 채 B에서 collision을 일으킬 수 있다.

이것이 wireless에서 CSMA/CD가 어려운 이유 중 하나다. 보내는 동안 자기 신호가 너무 강해서 collision detection이 쉽지 않고, hidden terminal도 존재한다.

## 6. CDMA

CDMA는 사용자마다 고유 code를 부여하고 같은 frequency를 공유하게 하는 방식이다.

핵심 직관:

- sender는 data bit를 code와 곱해 전송한다.
- receiver는 같은 code로 correlation하여 원하는 sender의 signal을 복원한다.
- 서로 orthogonal한 code를 쓰면 같은 채널에서도 분리 가능하다.

## 7. IEEE 802.11 Wi-Fi

### 7.1 Architecture

Wi-Fi LAN은 보통 BSS(Basic Service Set)로 구성된다.

- wireless host가 AP에 associate한다.
- AP는 distribution system을 통해 외부 network와 연결된다.
- channel을 선택하고 beacon을 통해 네트워크 정보를 알린다.

### 7.2 Scanning

- **Passive scanning**: AP beacon frame을 듣고 association.
- **Active scanning**: host가 probe request를 보내고 AP가 probe response.

### 7.3 CSMA/CA

802.11은 collision detection이 아니라 collision avoidance를 쓴다.

기본 흐름:

```text
channel이 idle인지 감지
idle이면 일정 시간 대기
random backoff
frame 전송
receiver가 ACK 전송
```

ACK가 중요한 이유는 wireless link error가 많기 때문이다. ACK가 없으면 sender는 loss로 보고 재전송한다.

### 7.4 RTS/CTS

RTS/CTS는 hidden terminal 문제를 줄이기 위한 예약 방식이다.

```text
sender -> AP: RTS
AP -> 주변 노드: CTS
주변 노드는 NAV를 보고 대기
sender가 data 전송
receiver가 ACK
```

Overhead가 있지만 큰 frame에서 collision 비용을 줄일 수 있다.

### 7.5 802.11 frame addressing

802.11 frame은 AP를 거칠 수 있으므로 address field가 여러 개 있다. Ethernet보다 주소 필드가 복잡한 이유는 wireless host, AP, router/interface 사이 전달 경로를 표현해야 하기 때문이다.

### 7.6 Mobility within same subnet

Host가 같은 IP subnet 안에서 AP를 바꾸면 IP address는 유지된다. Switch가 self-learning을 통해 host의 위치를 새 port로 갱신하면 forwarding이 계속 가능하다.

## 8. Cellular Internet Access

Cellular network는 radio access network와 core network로 나뉜다.

- 2G: voice 중심.
- 3G: voice + data.
- 4G LTE: all-IP core, data 중심, tunneling.
- 5G: 더 높은 data rate, 낮은 latency, massive device, network slicing 같은 방향.

LTE 구성 직관:

- UE: 사용자 단말.
- eNodeB: radio access 기지국.
- MME: mobility/session control.
- SGW/PGW: data plane gateway, external Internet 연결.

4G는 3G에 비해 voice/circuit 중심 구조에서 all-IP packet core로 이동한 것이 중요하다.

## 9. Mobility 원리

Mobility는 network 관점에서 “사용자가 attachment point를 바꿔도 계속 통신 가능하게 하는 문제”다.

용어:

- **Home network**: permanent address가 속한 네트워크.
- **Visited network**: mobile node가 현재 붙어 있는 네트워크.
- **Correspondent**: mobile node와 통신하는 상대.
- **Home agent**: home network에서 mobile node의 현재 위치를 관리.
- **Foreign agent**: visited network에서 mobile node를 지원.
- **Care-of address**: 현재 위치를 나타내는 임시 주소.

## 10. Mobility 접근법

### 10.1 Routing이 직접 처리

Router들이 mobile node의 현재 위치를 routing table에 반영하게 할 수 있다. 하지만 전 세계 router가 개인 단말 이동을 계속 반영하는 것은 scalability가 좋지 않다.

### 10.2 Indirect routing

Correspondent는 mobile의 permanent address로 보낸다. Home agent가 packet을 받아 visited network로 tunnel한다.

장점:

- correspondent는 mobile 이동을 몰라도 된다.
- transparent하다.

단점:

- triangle routing 문제. 경로가 비효율적일 수 있다.

### 10.3 Direct routing

Correspondent가 home agent에게 mobile의 care-of address를 알아내고 직접 보낸다.

장점:

- triangle routing 문제 완화.

단점:

- correspondent가 mobility를 알아야 하므로 transparent하지 않다.
- 이동할 때 correspondent에게 갱신이 필요하다.

## 11. Mobile IP

Mobile IP는 indirect routing 구조를 protocol화한 것이다.

핵심 기능:

- agent discovery.
- registration with home agent.
- care-of address 사용.
- tunneling.

Foreign/home agent는 ICMP advertisement를 통해 자신을 알릴 수 있다.

## 12. Cellular mobility

Cellular network는 home network, visited network, HLR/HSS 같은 subscriber database, MSC/MME 같은 mobility control element를 통해 이동성을 처리한다.

핵심 상황:

- **Handoff**: 통신 중인 사용자가 cell/base station을 바꿈.
- **Paging**: idle 상태의 단말이 어느 cell에 있는지 정확히 모르므로 network가 단말을 찾음.
- **Registration/location update**: 단말 위치 정보를 network에 갱신.

LTE에서는 idle UE와 active UE의 mobility 처리가 다르다. Idle UE는 paging으로 찾고, active UE는 handover 절차로 연결을 유지한다.

## 13. Higher-layer impact

이론적으로 IP best-effort service model이 유지되면 upper layer 영향은 최소여야 한다. 그러나 실제 wireless/mobility는 loss, delay variation, handoff interruption을 유발한다. TCP는 이를 congestion으로 오해할 수 있어 throughput 저하가 생길 수 있다.

## 14. 시험/복습 포인트

- Wireless와 mobility를 구분해야 한다.
- Infrastructure/ad hoc, single-hop/multi-hop taxonomy를 설명할 수 있어야 한다.
- Path loss, interference, multipath, SNR/BER 관계를 설명해야 한다.
- Hidden terminal problem을 그림 없이도 설명할 수 있어야 한다.
- 802.11이 CSMA/CD가 아니라 CSMA/CA를 쓰는 이유를 설명해야 한다.
- RTS/CTS의 목적과 overhead를 알아야 한다.
- Wi-Fi frame address가 복잡한 이유를 이해해야 한다.
- 3G/4G/LTE 구조 변화, all-IP core의 의미를 말할 수 있어야 한다.
- Home network, visited network, home agent, foreign agent, care-of address를 구분해야 한다.
- Indirect routing과 direct routing의 trade-off를 설명할 수 있어야 한다.
- Cellular handoff와 paging을 구분해야 한다.

## 15. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | Ch. 7: Wireless and Mobile Networks |
| 2 | 텍스트 중심 | Chapter 7 outline |
| 3 | 이미지 병행 | Elements of a wireless network |
| 4 | 이미지 병행 | wireless hosts |
| 5 | 이미지 병행 | base station |
| 6 | 이미지 병행 | wireless link |
| 7 | 이미지 병행 | Characteristics of selected wireless links |
| 8 | 이미지 병행 | infrastructure mode |
| 9 | 이미지 병행 | ad hoc mode |
| 10 | 이미지 병행 | Wireless network taxonomy |
| 11 | 텍스트 중심 | Chapter 7 outline |
| 12 | 텍스트 중심 | Wireless Link Characteristics (1) |
| 13 | 이미지 병행 | Wireless Link Characteristics (2) |
| 14 | 이미지 병행 | Wireless network characteristics |
| 15 | 텍스트 중심 | Code Division Multiple Access (CDMA) |
| 16 | 이미지 병행 | CDMA encode/decode |
| 17 | 이미지 병행 | CDMA: two-sender interference |
| 18 | 텍스트 중심 | Chapter 7 outline |
| 19 | 텍스트 중심 | IEEE 802.11 Wireless LAN |
| 20 | 이미지 병행 | 802.11 LAN architecture |
| 21 | 이미지 병행 | 802.11: Channels, association |
| 22 | 이미지 병행 | 802.11: passive/active scanning |
| 23 | 이미지 병행 | IEEE 802.11: multiple access |
| 24 | 이미지 병행 | IEEE 802.11 MAC Protocol: CSMA/CA |
| 25 | 이미지 병행 | Avoiding collisions (more) |
| 26 | 이미지 병행 | Collision Avoidance: RTS-CTS exchange |
| 27 | 이미지 병행 | frame |
| 28 | 이미지 병행 | Internet |
| 29 | 이미지 병행 | frame |
| 30 | 이미지 병행 | 802.11: mobility within same subnet |
| 31 | 이미지 병행 | 802.11: advanced capabilities |
| 32 | 이미지 병행 | power management |
| 33 | 이미지 병행 | radius of |
| 34 | 텍스트 중심 | Chapter 7 outline |
| 35 | 이미지 병행 | Mobile |
| 36 | 이미지 병행 | Cellular networks: the first hop |
| 37 | 이미지 병행 | BSC |
| 38 | 이미지 병행 | 3G (voice+data) network architecture |
| 39 | 이미지 병행 | radio |
| 40 | 이미지 병행 | radio |
| 41 | 이미지 병행 | 4G: differences from 3G |
| 42 | 이미지 병행 | Functional split of major LTE components |
| 43 | 이미지 병행 | Radio+Tunneling: UE – eNodeB – PGW |
| 44 | 이미지 병행 | Quality of Service in LTE |
| 45 | 텍스트 중심 | Next major phase of mobile |
| 46 | 이미지 병행 | COMPARISON OF 1G TO 5G TECHNOLOGIES |
| 47 | 텍스트 중심 | Key concepts |
| 48 | 이미지 병행 | Basic Architecture of 5G |
| 49 | 텍스트 중심 | (OTP) |
| 50 | 이미지 병행 | Open Wireless Architecture |
| 51 | 이미지 병행 | Network Layer |
| 52 | 이미지 병행 | Open Transport Protocol (OTP) |
| 53 | 텍스트 중심 | Application (service) Layer |
| 54 | 이미지 병행 | Hardware & Software of 5G |
| 55 | 이미지 병행 | Features of 5G |
| 56 | 이미지 병행 | Features (Conti…) |
| 57 | 이미지 병행 | Advantages of 5G |
| 58 | 텍스트 중심 | Chapter 7 outline |
| 59 | 텍스트 중심 | What is mobility? |
| 60 | 이미지 병행 | wide area |
| 61 | 이미지 병행 | Mobility: more vocabulary |
| 62 | 이미지 병행 | How do you contact a mobile friend: |
| 63 | 텍스트 중심 | Mobility: approaches |
| 64 | 텍스트 중심 | Mobility: approaches |
| 65 | 이미지 병행 | wide area |
| 66 | 이미지 병행 | Mobility via indirect routing |
| 67 | 이미지 병행 | Indirect Routing: comments |
| 68 | 이미지 병행 | Indirect routing: moving between networks |
| 69 | 이미지 병행 | Mobility via direct routing |
| 70 | 이미지 병행 | Mobility via direct routing: comments |
| 71 | 이미지 병행 | wide area |
| 72 | 텍스트 중심 | Chapter 7 outline |
| 73 | 텍스트 중심 | Mobile IP |
| 74 | 이미지 병행 | Mobile IP: indirect routing |
| 75 | 이미지 병행 | Mobile IP: agent discovery |
| 76 | 이미지 병행 | Mobile IP: registration example |
| 77 | 이미지 병행 | Components of cellular network architecture |
| 78 | 텍스트 중심 | Handling mobility in cellular networks |
| 79 | 이미지 병행 | Public |
| 80 | 이미지 병행 | Mobile |
| 81 | 이미지 병행 | Mobile |
| 82 | 이미지 병행 | home network |
| 83 | 이미지 병행 | home network |
| 84 | 이미지 병행 | Handling Mobility in LTE |
| 85 | 이미지 병행 | Mobility: cellular versus Mobile IP |
| 86 | 텍스트 중심 | Wireless, mobility: impact on higher layer protocols |
| 87 | 텍스트 중심 | Chapter 7 summary |
