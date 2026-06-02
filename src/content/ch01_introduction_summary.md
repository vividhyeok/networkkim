# Chapter 1 - Introduction 정리본

## 0. 이 장의 목적

이 장은 네트워크 전체 지도를 잡는 장이다. 이후 장에서 HTTP, TCP, IP, Ethernet을 깊게 보기 전에, **인터넷을 구성하는 물리적 장치, 프로토콜, 계층, 성능 지표, 보안 문제**를 한 번에 훑는다.

핵심은 다음 한 문장이다.

> 인터넷은 end system들이 access network를 통해 network core에 붙고, core의 packet switch들이 packet을 store-and-forward 방식으로 전달하는 거대한 network of networks다.

## 1. 읽기 전략

- 텍스트 중심으로 읽어도 되는 부분: 용어 정의, 역사, 계층 이름, 보안 공격 이름.
- 이미지 병행이 필요한 부분: 인터넷 전체 구조, access network 종류, packet/circuit switching 비교, delay/throughput, encapsulation.

### 이미지/도식 병행 권장 페이지
- p4, p6-p7: 인터넷을 장비/서비스 관점으로 보여주는 전체 구조도. host, access network, ISP, router/switch 위치를 그림으로 봐야 층위가 잡힌다.
- p11-p18: network edge와 access network. DSL, cable, home network, enterprise Ethernet, wireless access는 선 연결/공유 매체 구도가 핵심이다.
- p24-p30: network core. store-and-forward, queueing/loss, forwarding/routing, circuit switching, FDM/TDM, packet vs circuit 비교가 도식 중심이다.
- p35-p41: ISP 계층/IXP/content provider 구조. “network of networks”가 어떻게 확장되는지 그림이 핵심이다.
- p43-p53: delay/loss/throughput. 전송 지연/전파 지연/병목 구간은 그림을 같이 봐야 공식이 자연스럽다.
- p58-p62: layering/encapsulation. 계층별 header가 쌓이는 그림이 핵심이다.
- p66-p68: 보안 공격 예시. malware, sniffing, spoofing이 어디서 발생하는지 그림으로 확인.

## 2. 큰 흐름

1. 인터넷을 두 관점으로 정의한다.
   - **nuts and bolts view**: host, link, router, switch, ISP, protocol 같은 실제 부품 관점.
   - **service view**: 애플리케이션에게 통신 서비스를 제공하는 인프라 관점.
2. 네트워크 가장자리(edge)를 본다.
   - end system, access network, physical media.
3. 네트워크 중심(core)을 본다.
   - packet switching, circuit switching, ISP 구조.
4. 성능 지표를 본다.
   - delay, loss, throughput.
5. 계층 구조를 본다.
   - application/transport/network/link/physical.
6. 보안과 역사를 훑는다.

## 3. 핵심 개념

### 3.1 인터넷의 구성요소

- **Host = end system**: PC, smartphone, server처럼 네트워크 앱이 실행되는 끝 장치.
- **Communication link**: fiber, copper, radio, satellite 등으로 bit를 전달하는 물리 매체.
- **Bandwidth / transmission rate**: 초당 보낼 수 있는 bit 수. 단위는 bps.
- **Packet switch**: packet 단위로 데이터를 받아 다음 방향으로 넘기는 장치. 대표적으로 router와 switch.
- **Protocol**: 메시지의 형식, 순서, 메시지를 받았을 때의 행동을 정한 규칙.

인터넷은 단일 거대망이 아니라 여러 ISP와 기관망이 서로 연결된 **network of networks**다. 그래서 RFC, IETF 같은 표준화 체계가 중요하다.

### 3.2 Protocol의 의미

사람 사이의 대화도 일종의 protocol이다. 예를 들어 “몇 시야?”라고 묻고 시간을 대답하는 순서가 있다. 네트워크 protocol도 같다.

Protocol은 다음을 정한다.

- 어떤 메시지를 보내는가.
- 메시지 필드는 어떤 형식인가.
- 어떤 순서로 주고받는가.
- 메시지를 받으면 어떤 동작을 하는가.

HTTP, TCP, IP, 802.11 같은 것이 모두 protocol이다.

### 3.3 Network edge

Network edge는 사용자의 기기가 인터넷에 붙는 영역이다.

- **DSL**: 전화선 기반. 음성/데이터를 주파수 대역으로 나눠 사용.
- **Cable network**: 케이블 TV망 기반. 여러 사용자가 access link를 공유하므로 혼잡 가능.
- **Home network**: modem/router/Wi-Fi AP가 섞여 가정 내 장치들을 연결.
- **Enterprise Ethernet**: 회사/학교 내부 LAN. switch 중심 구조.
- **Wireless access**: Wi-Fi, cellular 등. AP/base station을 거쳐 인터넷에 접속.

여기서 중요한 구분은 **dedicated access**인지 **shared access**인지다. shared access에서는 여러 사용자가 같은 매체를 쓰므로 충돌/혼잡/접속 제어 문제가 생긴다.

### 3.4 Physical media

Bit는 실제 매체를 통해 전파된다.

- **Guided media**: copper, coax, fiber처럼 신호가 물리 경로를 따라간다.
- **Unguided media**: radio처럼 공기 중으로 퍼진다.

Fiber는 고속·장거리·낮은 오류율에 강하고, radio는 이동성은 좋지만 간섭과 감쇠에 취약하다.

### 3.5 Packet switching

인터넷 core는 기본적으로 packet switching을 쓴다.

- 큰 메시지를 packet으로 쪼갠다.
- router는 packet 전체를 받은 뒤 다음 link로 보낸다.
- 이것을 **store-and-forward**라고 한다.

전송 시간의 기본식은 다음과 같다.

```text
transmission delay = L / R
L = packet length(bits)
R = link transmission rate(bits/sec)
```

Packet switching에서는 link를 미리 예약하지 않는다. 그래서 bursty traffic에 효율적이다. 대신 queueing delay와 packet loss가 생길 수 있다.

### 3.6 Circuit switching

Circuit switching은 통신 전에 회선 자원을 예약한다. 전화망식 사고방식이다.

- **FDM**: frequency division multiplexing. 주파수 대역을 나눈다.
- **TDM**: time division multiplexing. 시간을 슬롯으로 나눈다.

장점은 보장된 자원이고, 단점은 사용하지 않는 시간에도 자원이 묶인다는 점이다. 인터넷의 bursty data에는 packet switching이 일반적으로 더 적합하다.

### 3.7 Delay, loss, throughput

하나의 node에서 packet delay는 네 가지로 나뉜다.

```text
nodal delay = processing delay + queueing delay + transmission delay + propagation delay
```

- **Processing delay**: header 확인, 오류 확인, forwarding decision 시간.
- **Queueing delay**: output link 앞 queue에서 기다리는 시간. 혼잡에 따라 크게 변한다.
- **Transmission delay**: packet bit를 link에 밀어 넣는 시간. L/R.
- **Propagation delay**: 신호가 매체를 따라 이동하는 시간. distance / propagation speed.

Packet loss는 queue가 꽉 찼을 때 발생한다. Throughput은 end-to-end로 실제 전달되는 속도이며, 보통 가장 느린 link가 병목이 된다.

### 3.8 Protocol layering

인터넷 protocol stack은 보통 5계층으로 설명한다.

| Layer | 역할 | 예시 |
|---|---|---|
| Application | 앱 간 메시지 의미 | HTTP, SMTP, DNS |
| Transport | process 간 논리 통신 | TCP, UDP |
| Network | host 간 packet 전달 | IP |
| Link | 인접 node 간 frame 전달 | Ethernet, Wi-Fi |
| Physical | bit의 물리적 전송 | copper, fiber, radio |

계층화의 장점은 복잡성을 줄이고, 한 계층 구현을 바꿔도 다른 계층에 주는 영향을 줄이는 것이다. 핵심 그림은 **encapsulation**이다. 위 계층 데이터에 아래 계층 header가 계속 붙는다.

### 3.9 Network security

초반 장에서는 보안을 깊게 다루지는 않지만, 인터넷이 공격 대상이 되는 기본 유형을 소개한다.

- **Malware**: host에 침투해 data 탈취/파괴/봇넷 구성.
- **DoS/DDoS**: 서버나 network resource를 과도한 traffic으로 마비.
- **Packet sniffing**: broadcast/shared media에서 packet을 엿봄.
- **IP spoofing**: source address를 위조해 packet 전송.

## 4. 시험/복습 포인트

- Internet을 nuts-and-bolts view와 service view로 각각 설명할 수 있어야 한다.
- Protocol 정의를 “format, order, actions”로 설명할 수 있어야 한다.
- Packet switching과 circuit switching의 차이를 FDM/TDM까지 연결해 설명할 수 있어야 한다.
- `L/R`, `d/s`, nodal delay 4요소를 구분할 수 있어야 한다.
- Throughput에서 병목 link를 찾을 수 있어야 한다.
- 5계층과 encapsulation 방향을 설명할 수 있어야 한다.

## 5. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | Chapter 1 |
| 2 | 텍스트 중심 | Chapter 1: introduction |
| 3 | 텍스트 중심 | Chapter 1: roadmap |
| 4 | 이미지 병행 | What’s the Internet: “nuts and bolts” view |
| 5 | 이미지 병행 | “Fun” Internet-connected devices |
| 6 | 이미지 병행 | Internet: “network of networks” |
| 7 | 이미지 병행 | What’s the Internet: a service view |
| 8 | 텍스트 중심 | What’s a protocol? |
| 9 | 이미지 병행 | a human protocol and a computer network protocol: |
| 10 | 텍스트 중심 | Chapter 1: roadmap |
| 11 | 이미지 병행 | A closer look at network structure: |
| 12 | 이미지 병행 | Access networks and physical media |
| 13 | 이미지 병행 | ISP |
| 14 | 이미지 병행 | Access network: cable network |
| 15 | 이미지 병행 | ISP |
| 16 | 이미지 병행 | Access network: home network |
| 17 | 이미지 병행 | Enterprise access networks (Ethernet) |
| 18 | 이미지 병행 | Wireless access networks |
| 19 | 텍스트 중심 | Host: sends packets of data |
| 20 | 텍스트 중심 | Physical media |
| 21 | 텍스트 중심 | Physical media: coax, fiber |
| 22 | 텍스트 중심 | Physical media: radio |
| 23 | 텍스트 중심 | Chapter 1: roadmap |
| 24 | 이미지 병행 | mesh of interconnected |
| 25 | 이미지 병행 | Packet-switching: store-and-forward |
| 26 | 이미지 병행 | Packet Switching: queueing delay, loss |
| 27 | 이미지 병행 | Two key network-core functions |
| 28 | 이미지 병행 | Alternative core: circuit switching |
| 29 | 이미지 병행 | Circuit switching: FDM versus TDM |
| 30 | 이미지 병행 | Packet switching versus circuit switching |
| 31 | 텍스트 중심 | great for bursty data |
| 32 | 텍스트 중심 | Internet structure: network of networks |
| 33 | 텍스트 중심 | Internet structure: network of networks |
| 34 | 텍스트 중심 | Internet structure: network of networks |
| 35 | 이미지 병행 | Internet structure: network of networks |
| 36 | 이미지 병행 | ISP C |
| 37 | 이미지 병행 | ISP C |
| 38 | 이미지 병행 | ISP C |
| 39 | 이미지 병행 | ISP C |
| 40 | 텍스트 중심 | Internet structure: network of networks |
| 41 | 이미지 병행 | Tier-1 ISP: e.g., Sprint |
| 42 | 텍스트 중심 | Chapter 1: roadmap |
| 43 | 이미지 병행 | How do loss and delay occur? |
| 44 | 이미지 병행 | Four sources of packet delay |
| 45 | 이미지 병행 | dtrans: transmission delay: |
| 46 | 이미지 병행 | Caravan analogy |
| 47 | 이미지 병행 | Caravan analogy (more) |
| 48 | 텍스트 중심 | R: link bandwidth (bps) |
| 49 | 이미지 병행 | “Real” Internet delays and routes |
| 50 | 텍스트 중심 | “Real” Internet delays, routes |
| 51 | 이미지 병행 | Packet loss |
| 52 | 텍스트 중심 | Throughput |
| 53 | 이미지 병행 | Throughput (more) |
| 54 | 텍스트 중심 | Throughput: Internet scenario |
| 55 | 텍스트 중심 | Chapter 1: roadmap |
| 56 | 텍스트 중심 | Protocol “layers” |
| 57 | 텍스트 중심 | Organization of air travel |
| 58 | 이미지 병행 | ticket (purchase) |
| 59 | 텍스트 중심 | Why layering? |
| 60 | 텍스트 중심 | Internet protocol stack |
| 61 | 텍스트 중심 | ISO/OSI reference model |
| 62 | 이미지 병행 | source |
| 63 | 텍스트 중심 | Chapter 1: roadmap |
| 64 | 텍스트 중심 | Network security |
| 65 | 텍스트 중심 | Bad guys: put malware into hosts via Internet |
| 66 | 이미지 병행 | target |
| 67 | 이미지 병행 | Bad guys can sniff packets |
| 68 | 이미지 병행 | Bad guys can use fake addresses |
| 69 | 텍스트 중심 | Chapter 1: roadmap |
| 70 | 텍스트 중심 | Internet history |
| 71 | 텍스트 중심 | 1970: ALOHAnet satellite |
| 72 | 텍스트 중심 | 1983: deployment of |
| 73 | 텍스트 중심 | early 1990’s: ARPAnet |
| 74 | 텍스트 중심 | 2005-present |
| 75 | 텍스트 중심 | Introduction: summary |
| 76 | 텍스트 중심 | Chapter 1 |
| 77 | 이미지 병행 | Transport (TCP/UDP) |
