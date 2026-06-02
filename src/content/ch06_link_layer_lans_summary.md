# Chapter 6 - Link Layer and LANs 정리본

## 0. 이 장의 목적

이 장은 protocol stack의 아래쪽인 link layer를 다룬다. IP datagram이 하나의 link를 건너갈 때 frame으로 encapsulate되고, MAC address, ARP, Ethernet, switch, VLAN 같은 LAN 기술이 어떻게 동작하는지 본다.

핵심은 다음 한 문장이다.

> Link layer는 datagram을 frame에 담아 물리적으로 인접한 node까지 전달하는 계층이고, LAN에서는 MAC address와 switch/ARP가 핵심이다.

## 1. 읽기 전략

- 텍스트 중심: link layer 서비스 목록, Ethernet 특징, SNMP식 암기가 아닌 용어 정의.
- 이미지 병행: CRC/parity, multiple access 충돌, ARP 경로, switch self-learning, VLAN trunk, MPLS, web request 종합 시나리오.

### 이미지/도식 병행 권장 페이지
- p3, p7-p8: link layer 위치와 NIC/adaptor 동작. “인접 노드 간 frame 전달”을 그림으로 확인.
- p10-p14: error detection. parity/checksum/CRC 계산 구조는 식과 그림을 같이 봐야 한다.
- p16-p39: multiple access. TDMA/FDMA/ALOHA/CSMA/CD/polling/token/DOCSIS는 시간축·충돌 그림이 핵심이다.
- p42-p51: MAC address와 ARP, 다른 LAN으로 가는 datagram. IP 주소는 최종 목적지 기준, MAC 주소는 hop마다 바뀌는 흐름을 그림으로 추적.
- p54-p58: Ethernet topology/frame/standard. frame field와 bus/star 구조 확인.
- p60-p69: switch self-learning/forwarding. forwarding table이 어떻게 채워지는지 그림과 표로 추적.
- p70-p74: VLAN/trunk/802.1Q. 포트 기반 VLAN과 trunk tagging 그림이 핵심.
- p76-p80: MPLS. IP prefix 대신 label로 경로를 정하는 구조 확인.
- p83-p94: data center와 web request 하루 흐름. DHCP-DNS-ARP-TCP-HTTP가 연결되는 종합 시나리오.

## 2. Link layer 기본

용어:

- **Node**: host와 router.
- **Link**: 인접 node를 연결하는 communication channel.
- **Frame**: link-layer packet. IP datagram을 encapsulate한다.

Link layer의 책임은 end-to-end가 아니라 **one-hop**, 즉 물리적으로 인접한 node 사이 전송이다.

## 3. Link layer services

주요 서비스:

- **Framing**: datagram에 header/trailer를 붙여 frame 생성.
- **Link access**: shared medium에서 누가 언제 보낼지 결정.
- **MAC addressing**: frame header의 source/destination MAC address.
- **Reliable delivery**: 인접 node 사이 신뢰성. 유선에서는 덜 쓰이고 무선에서는 중요.
- **Flow control**: 인접 sender/receiver 속도 조절.
- **Error detection/correction**: bit error 탐지/수정.
- **Half/full duplex**: 양방향 전송 동시성 여부.

Link layer는 NIC/adaptor 또는 chipset에 hardware/software/firmware 조합으로 구현된다.

## 4. Error detection

### 4.1 Parity

- Single-bit parity: 1bit error 탐지 가능.
- Two-dimensional parity: single-bit error 위치를 찾아 correction 가능.

### 4.2 Internet checksum

16-bit word를 1의 보수 덧셈으로 더해 checksum을 만든다. Transport layer에서 이미 본 방식이다.

### 4.3 CRC

CRC는 실제 link layer에서 널리 쓰이는 강력한 error detection 방식이다.

개념:

```text
Data bits D를 binary number처럼 보고
generator G로 나누어 떨어지도록 r-bit CRC R을 붙임
receiver는 <D,R>을 G로 나누어 remainder가 0인지 확인
```

Ethernet, Wi-Fi 등에 쓰인다.

## 5. Multiple access protocol

Broadcast channel에서는 여러 node가 같은 medium을 공유한다. 동시에 보내면 collision이 생긴다.

이상적인 multiple access protocol은 다음을 만족하고 싶다.

- 한 node만 보낼 때는 R bps 모두 사용.
- M개 node가 보낼 때는 각자 평균 R/M bps.
- decentralized.
- simple.

### 5.1 Channel partitioning

- **TDMA**: time slot으로 나눔.
- **FDMA**: frequency band로 나눔.

낭비가 적은 상황도 있지만, 사용자가 없으면 할당된 slot/band가 비는 문제가 있다.

### 5.2 Random access

- **Slotted ALOHA**: slot 시작 시점에만 전송. 충돌 시 확률적으로 재전송.
- **Pure ALOHA**: 아무 때나 전송. 효율이 더 낮다.
- **CSMA**: 보내기 전에 channel이 idle인지 감지.
- **CSMA/CD**: collision detection. Ethernet에서 사용.

CSMA/CD의 핵심은 “listen before transmit”와 “collision detected면 중단 후 backoff”다.

### 5.3 Taking turns

- **Polling**: master가 순서대로 전송 기회를 부여.
- **Token passing**: token을 가진 node만 전송.

충돌은 줄지만 master failure, token overhead 같은 문제가 있다.

### 5.4 DOCSIS

Cable access network에서는 downstream/upstream을 나누고, cable headend가 upstream slot을 관리한다. 여러 cable modem이 shared upstream을 쓰므로 multiple access 문제가 존재한다.

## 6. MAC address와 ARP

IP address는 network layer 주소이고, MAC address는 link layer 주소다.

- IP address: 계층적, routing에 사용.
- MAC address: LAN 내부 interface 식별, 보통 48-bit.

ARP는 같은 LAN 안에서 IP address에 대응하는 MAC address를 찾는 protocol이다.

ARP 흐름:

```text
A: 이 IP 가진 host의 MAC 누구?
LAN broadcast로 ARP query
해당 host가 ARP reply로 MAC 알려줌
A는 ARP table에 cache
```

다른 LAN으로 보낼 때 중요한 점:

- IP datagram의 source/destination IP는 최종 host 기준으로 유지된다.
- Ethernet frame의 source/destination MAC은 hop마다 바뀐다.
- Host는 외부 subnet 목적지로 보낼 때 next-hop router의 MAC address를 frame destination으로 쓴다.

## 7. Ethernet

Ethernet은 dominant wired LAN technology다.

특징:

- connectionless.
- unreliable: ACK/NAK 없음.
- MAC protocol과 frame format이 여러 속도 표준에서 유지됨.

Ethernet frame:

```text
preamble | destination MAC | source MAC | type | data | CRC
```

Bus topology에서는 collision domain 문제가 있었고, switch 기반 star topology로 넘어오며 collision 문제가 크게 줄었다.

## 8. Switch

Switch는 link-layer device다.

특징:

- store-and-forward.
- frame의 destination MAC을 보고 forwarding/filtering.
- self-learning으로 forwarding table을 만든다.
- host는 switch 존재를 몰라도 된다. transparent.

Self-learning:

```text
frame이 port로 들어오면
source MAC이 어느 port에 있는지 table에 기록
목적지 MAC을 알고 있으면 해당 port로만 forwarding
모르면 flood
```

Switch와 router 비교:

| 항목 | Switch | Router |
|---|---|---|
| Layer | Link layer | Network layer |
| 주소 | MAC | IP |
| 범위 | LAN 내부 | subnet/네트워크 간 |
| table | forwarding table | forwarding/routing table |

## 9. VLAN

VLAN은 하나의 물리 switch를 여러 logical LAN처럼 나누는 기술이다.

Port-based VLAN:

- switch port를 VLAN group으로 묶는다.
- 서로 다른 VLAN은 layer 2에서 분리된다.
- VLAN 간 통신은 router 또는 layer-3 switch 필요.

여러 switch에 VLAN을 걸치려면 trunk port가 필요하다. Trunk port는 여러 VLAN의 frame을 운반하고, 802.1Q tag로 VLAN ID를 표시한다.

## 10. MPLS

MPLS는 IP 주소의 longest prefix matching 대신 fixed-length label을 사용해 forwarding한다.

핵심:

- packet에 MPLS label을 붙인다.
- MPLS-capable router는 label을 보고 forwarding.
- traffic engineering에 유리하다.

## 11. Data center networking

Data center는 많은 server rack과 top-of-rack switch, aggregation switch로 구성된다. 목표는 높은 bandwidth, redundancy, scalable interconnection이다.

## 12. A day in the life of a web request

이 장 마지막은 지금까지 배운 내용을 한 흐름으로 묶는다.

1. 노트북이 네트워크에 접속.
2. DHCP로 IP, gateway, DNS server를 받음.
3. DNS query로 web server IP를 얻음.
4. ARP로 default gateway MAC을 얻음.
5. TCP connection을 형성.
6. HTTP request를 보냄.
7. HTTP response를 받음.

이 시나리오는 application, transport, network, link layer가 실제로 어떻게 연결되는지 보여주는 종합 문제다.

## 13. 시험/복습 포인트

- Link layer가 end-to-end가 아니라 adjacent node 간 전송이라는 점을 설명해야 한다.
- Frame과 datagram의 관계를 알아야 한다.
- CRC 기본 원리를 설명할 수 있어야 한다.
- TDMA/FDMA/ALOHA/CSMA/CD/polling/token의 차이를 구분해야 한다.
- IP address와 MAC address의 역할 차이를 설명해야 한다.
- ARP가 같은 LAN에서만 직접 MAC을 찾는다는 점을 알아야 한다.
- 다른 LAN으로 보낼 때 IP 주소는 유지되고 MAC 주소는 hop마다 바뀐다는 점이 핵심이다.
- Switch self-learning 과정을 표로 추적할 수 있어야 한다.
- VLAN과 trunk/802.1Q tag를 설명할 수 있어야 한다.
- DHCP-DNS-ARP-TCP-HTTP 종합 흐름을 그릴 수 있어야 한다.

## 14. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | Chapter 6: Link layer and LANs |
| 2 | 텍스트 중심 | Link layer, LANs: outline |
| 3 | 이미지 병행 | Link layer: introduction |
| 4 | 텍스트 중심 | Link layer: context |
| 5 | 텍스트 중심 | Link layer services |
| 6 | 텍스트 중심 | flow control: |
| 7 | 이미지 병행 | Where is the link layer implemented? |
| 8 | 이미지 병행 | Adaptors communicating |
| 9 | 텍스트 중심 | Link layer, LANs: outline |
| 10 | 이미지 병행 | Error detection |
| 11 | 이미지 병행 | Parity checking |
| 12 | 텍스트 중심 | Internet checksum (review) |
| 13 | 이미지 병행 | Cyclic redundancy check |
| 14 | 이미지 병행 | CRC example |
| 15 | 텍스트 중심 | Link layer, LANs: outline |
| 16 | 이미지 병행 | Multiple access links, protocols |
| 17 | 텍스트 중심 | Multiple access protocols |
| 18 | 텍스트 중심 | An ideal multiple access protocol |
| 19 | 텍스트 중심 | MAC protocols: taxonomy |
| 20 | 이미지 병행 | Channel partitioning MAC protocols: TDMA |
| 21 | 이미지 병행 | FDMA: frequency division multiple access |
| 22 | 텍스트 중심 | Random access protocols |
| 23 | 이미지 병행 | Slotted ALOHA |
| 24 | 이미지 병행 | Pros: |
| 25 | 이미지 병행 | suppose: N nodes with |
| 26 | 이미지 병행 | Pure (unslotted) ALOHA |
| 27 | 이미지 병행 | Pure ALOHA efficiency |
| 28 | 이미지 병행 | CSMA (carrier sense multiple access) |
| 29 | 이미지 병행 | CSMA collisions |
| 30 | 이미지 병행 | CSMA/CD (collision detection) |
| 31 | 이미지 병행 | CSMA/CD (collision detection) |
| 32 | 이미지 병행 | Ethernet CSMA/CD algorithm |
| 33 | 이미지 병행 | CSMA/CD efficiency |
| 34 | 텍스트 중심 | “Taking turns” MAC protocols |
| 35 | 이미지 병행 | polling: |
| 36 | 이미지 병행 | token passing: |
| 37 | 이미지 병행 | cable headend |
| 38 | 이미지 병행 | DOCSIS: data over cable service interface spec |
| 39 | 텍스트 중심 | Summary of MAC protocols |
| 40 | 텍스트 중심 | Link layer, LANs: outline |
| 41 | 텍스트 중심 | MAC addresses and ARP |
| 42 | 이미지 병행 | LAN addresses and ARP |
| 43 | 텍스트 중심 | LAN addresses (more) |
| 44 | 이미지 병행 | ARP: address resolution protocol |
| 45 | 이미지 병행 | ARP protocol: same LAN |
| 46 | 이미지 병행 | walkthrough: send datagram from A to B via R |
| 47 | 이미지 병행 | 1A-23-F9-CD-06-9B |
| 48 | 이미지 병행 | 1A-23-F9-CD-06-9B |
| 49 | 이미지 병행 | 1A-23-F9-CD-06-9B |
| 50 | 이미지 병행 | 1A-23-F9-CD-06-9B |
| 51 | 이미지 병행 | 1A-23-F9-CD-06-9B |
| 52 | 텍스트 중심 | Link layer, LANs: outline |
| 53 | 텍스트 중심 | Ethernet |
| 54 | 이미지 병행 | Ethernet: physical topology |
| 55 | 이미지 병행 | Ethernet frame structure |
| 56 | 이미지 병행 | Ethernet frame structure (more) |
| 57 | 텍스트 중심 | Ethernet: unreliable, connectionless |
| 58 | 텍스트 중심 | 802.3 Ethernet standards: link & physical layers |
| 59 | 텍스트 중심 | Link layer, LANs: outline |
| 60 | 이미지 병행 | Ethernet switch |
| 61 | 이미지 병행 | Switch: multiple simultaneous transmissions |
| 62 | 이미지 병행 | Switch forwarding table |
| 63 | 이미지 병행 | Switch: self-learning |
| 64 | 이미지 병행 | Switch: frame filtering/forwarding |
| 65 | 이미지 병행 | Self-learning, forwarding: example |
| 66 | 이미지 병행 | Interconnecting switches |
| 67 | 이미지 병행 | Self-learning multi-switch example |
| 68 | 이미지 병행 | Institutional network |
| 69 | 이미지 병행 | Switches vs. routers |
| 70 | 이미지 병행 | VLANs: motivation |
| 71 | 이미지 병행 | VLANs |
| 72 | 이미지 병행 | Port-based VLAN |
| 73 | 이미지 병행 | VLANS spanning multiple switches |
| 74 | 이미지 병행 | type |
| 75 | 텍스트 중심 | Link layer, LANs: outline |
| 76 | 이미지 병행 | Multiprotocol label switching (MPLS) |
| 77 | 텍스트 중심 | MPLS capable routers |
| 78 | 이미지 병행 | MPLS versus IP paths |
| 79 | 이미지 병행 | MPLS versus IP paths |
| 80 | 이미지 병행 | MPLS signaling |
| 81 | 텍스트 중심 | in out out |
| 82 | 텍스트 중심 | Link layer, LANs: outline |
| 83 | 이미지 병행 | Data center networks |
| 84 | 이미지 병행 | Server racks |
| 85 | 이미지 병행 | Server racks |
| 86 | 텍스트 중심 | Link layer, LANs: outline |
| 87 | 텍스트 중심 | Synthesis: a day in the life of a web request |
| 88 | 이미지 병행 | A day in the life: scenario |
| 89 | 이미지 병행 | router |
| 90 | 이미지 병행 | router |
| 91 | 이미지 병행 | router |
| 92 | 이미지 병행 | router |
| 93 | 이미지 병행 | router |
| 94 | 이미지 병행 | router |
| 95 | 텍스트 중심 | Chapter 6: Summary |
| 96 | 텍스트 중심 | Chapter 6: let’s take a breath |
