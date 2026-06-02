# Chapter 4 - Network Layer: Data Plane 정리본

## 0. 이 장의 목적

이 장은 network layer 중에서도 **data plane**을 다룬다. 즉, router가 실제로 들어온 datagram을 어느 output port로 내보내는지, IP datagram이 어떻게 생겼는지, IPv4 주소와 NAT/DHCP/IPv6가 어떻게 연결되는지 보는 장이다.

핵심은 다음 한 문장이다.

> Data plane은 각 router 내부에서 packet header를 보고 forwarding table에 따라 output port를 고르는 로컬 기능이다.

## 1. 읽기 전략

- 텍스트 중심: 서비스 모델, IP header field 설명, IPv6 변화 요약.
- 이미지 병행: forwarding/routing 구분, router architecture, longest prefix matching, queuing/scheduling, fragmentation, subnet, DHCP, NAT, tunneling.

### 이미지/도식 병행 권장 페이지
- p3, p5-p7: network layer 위치와 data/control plane 분리. 라우터별 제어 vs 논리 중앙 제어 그림이 핵심.
- p11-p20: router 내부 구조와 switching fabric. input/output port, lookup, memory/bus/interconnection 구조는 그림으로 봐야 한다.
- p21-p28: queueing/scheduling. input/output queue, HOL blocking, priority/RR/WFQ는 그림 기반.
- p31-p33: IP datagram format과 fragmentation. header field, ID/flag/offset 관계를 도식으로 확인.
- p35-p40: IP addressing/subnet/CIDR. subnet mask와 prefix matching은 주소 범위를 그림으로 봐야 한다.
- p43-p48: DHCP scenario. discover-offer-request-ack 흐름을 그림으로 확인.
- p51-p55: NAT. 내부 IP:port와 외부 IP:port 매핑 테이블이 핵심이다.
- p60-p63: IPv6 transition/tunneling. IPv6 datagram이 IPv4 payload로 들어가는 구조를 그림으로 확인.

## 2. Network layer의 역할

Network layer는 sending host에서 transport segment를 datagram으로 encapsulate하고, receiving host에서 datagram을 transport layer로 넘긴다.

Router는 지나가는 IP datagram의 header field를 검사하고 forwarding한다. Network layer protocol은 host와 router 모두에 존재한다.

## 3. Forwarding vs Routing

| 개념 | 의미 | 비유 |
|---|---|---|
| Forwarding | router input port로 들어온 packet을 적절한 output port로 옮기는 로컬 동작 | 교차로에서 어느 출구로 나갈지 결정 |
| Routing | source부터 destination까지 전체 경로를 결정하는 네트워크 전체 동작 | 여행 전체 경로 계획 |

Chapter 4는 forwarding, 즉 data plane을 중심으로 본다. Routing algorithm은 Chapter 5에서 본격적으로 다룬다.

## 4. Data plane과 Control plane

- **Data plane**: per-router, local, packet forwarding 담당.
- **Control plane**: network-wide logic, route/forwarding table 계산 담당.

Control plane 구조는 두 가지가 있다.

1. Per-router control: 각 router가 routing algorithm을 실행하고 서로 정보를 교환.
2. Logically centralized control: SDN controller가 forwarding table을 계산하고 router/switch에 내려줌.

## 5. Router architecture

Router 내부 구성:

- **Input port**: physical/link layer 처리, lookup, forwarding decision.
- **Switching fabric**: input port에서 output port로 packet 이동.
- **Output port**: queueing, scheduling, link layer 처리.
- **Routing processor**: control plane 기능 수행.

### 5.1 Longest prefix matching

Forwarding table에는 destination address range 또는 prefix가 들어 있다. 여러 prefix가 match될 때는 가장 긴 prefix를 선택한다.

```text
matching prefix가 여러 개면
=> 가장 구체적인 prefix, 즉 longest prefix를 선택
```

### 5.2 Switching fabric

Switching 방식:

- **Memory**: CPU/메모리를 거쳐 packet 이동. 느림.
- **Bus**: 공유 bus를 통해 이동. bus bandwidth가 병목.
- **Interconnection network**: crossbar 같은 구조. 병렬 이동 가능.

### 5.3 Queueing과 scheduling

Queue는 input port와 output port에 생길 수 있다.

- Input queue: switching fabric 속도가 부족하면 발생. HOL blocking 가능.
- Output queue: output link보다 들어오는 packet 속도가 빠르면 발생.

Scheduling policy:

- FIFO.
- Priority scheduling.
- Round Robin.
- Weighted Fair Queuing.

Buffer는 너무 작으면 loss가 많고, 너무 크면 delay가 커질 수 있다.

## 6. IP datagram

IPv4 datagram header에는 version, header length, type of service, length, identifier, flags, fragment offset, TTL, upper-layer protocol, checksum, source/destination IP 등이 들어간다.

중요 field:

- **TTL**: loop 방지를 위해 hop마다 감소.
- **Protocol**: payload가 TCP인지 UDP인지 등 upper layer 표시.
- **Header checksum**: IPv4 header 오류 확인.
- **Fragmentation 관련 field**: ID, flag, offset.

## 7. Fragmentation / Reassembly

Link마다 MTU가 다르다. Datagram이 MTU보다 크면 fragment된다.

- Fragment는 destination host에서 reassembly된다.
- Router가 중간에서 reassembly하지 않는다.
- 같은 original datagram의 fragment는 같은 ID를 가진다.
- offset은 fragment 위치를 나타낸다.

IPv6에서는 router fragmentation을 제거하고, source가 path MTU discovery를 하는 방향으로 바뀐다.

## 8. IPv4 addressing, subnet, CIDR

IP address는 interface에 부여된다. Host나 router 자체가 아니라 network interface가 주소를 가진다는 점이 중요하다.

### 8.1 Subnet

Subnet은 router를 지나지 않고 서로 도달 가능한 interface들의 집합으로 볼 수 있다.

Subnet 판별:

```text
IP address AND subnet mask = network prefix
같은 prefix면 같은 subnet
```

### 8.2 CIDR

CIDR 표기:

```text
a.b.c.d/x
x = prefix length
```

예: `200.23.16.0/20`은 앞 20bit가 network prefix라는 뜻이다.

## 9. DHCP

DHCP는 host가 IP address와 network configuration을 자동으로 받는 protocol이다.

기본 흐름은 DORA다.

```text
DHCP Discover
DHCP Offer
DHCP Request
DHCP ACK
```

DHCP로 받을 수 있는 정보:

- IP address.
- subnet mask.
- default gateway.
- DNS server address.

## 10. NAT

NAT는 내부 private IP를 외부 public IP 하나 또는 소수로 공유하게 해 준다.

NAT table은 다음 식별자를 매핑한다.

```text
내부 IP:port <-> 외부 NAT IP:port
```

장점:

- IPv4 주소 절약.
- 내부 주소 체계 변경이 외부에 드러나지 않음.
- 내부 host가 직접 노출되지 않는 효과.

단점:

- end-to-end principle을 약화.
- inbound connection이 어려움.
- P2P/VoIP 등에 문제.
- port field에 의존.

## 11. IPv6

IPv6의 동기:

- IPv4 주소 공간 부족.
- header 단순화.
- 빠른 processing.

IPv6 특징:

- 128-bit address.
- fixed-size 40-byte header.
- header checksum 제거.
- fragmentation/reassembly를 router가 하지 않음.
- option은 extension header로 처리.

Transition 방식 중 하나가 tunneling이다. IPv6 datagram을 IPv4 datagram payload 안에 넣어 IPv4 network를 통과시킨다.

## 12. 시험/복습 포인트

- Forwarding과 routing을 구분할 수 있어야 한다.
- Data plane과 control plane을 구분해야 한다.
- Longest prefix matching 문제를 풀 수 있어야 한다.
- Router input/output port, switching fabric, queueing 위치를 설명할 수 있어야 한다.
- IPv4 fragmentation에서 ID/flag/offset을 해석할 수 있어야 한다.
- Subnet/CIDR 계산을 할 수 있어야 한다.
- DHCP DORA 순서를 말할 수 있어야 한다.
- NAT table 변환을 packet header 변화와 함께 설명할 수 있어야 한다.
- IPv6에서 바뀐 점과 tunneling을 설명할 수 있어야 한다.

## 13. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | 4.1 Overview of Network |
| 2 | 텍스트 중심 | Chapter 4: network layer |
| 3 | 이미지 병행 | Network layer |
| 4 | 텍스트 중심 | Two key network-layer functions |
| 5 | 이미지 병행 | Network layer: data plane, control plane |
| 6 | 이미지 병행 | Per-router control plane |
| 7 | 이미지 병행 | data |
| 8 | 텍스트 중심 | Network service model |
| 9 | 텍스트 중심 | Network layer service models: |
| 10 | 텍스트 중심 | 4.1 Overview of Network |
| 11 | 이미지 병행 | Router architecture overview |
| 12 | 이미지 병행 | line |
| 13 | 이미지 병행 | line |
| 14 | 이미지 병행 | Destination Address Range |
| 15 | 이미지 병행 | Longest prefix matching |
| 16 | 이미지 병행 | Longest prefix matching |
| 17 | 이미지 병행 | Switching fabrics |
| 18 | 이미지 병행 | Switching via memory |
| 19 | 이미지 병행 | Switching via a bus |
| 20 | 이미지 병행 | Switching via interconnection network |
| 21 | 이미지 병행 | Input port queuing |
| 22 | 텍스트 중심 | Output ports |
| 23 | 이미지 병행 | Output port queueing |
| 24 | 텍스트 중심 | How much buffering? |
| 25 | 이미지 병행 | Scheduling mechanisms |
| 26 | 이미지 병행 | Scheduling policies: priority |
| 27 | 이미지 병행 | Scheduling policies: still more |
| 28 | 이미지 병행 | Weighted Fair Queuing (WFQ): |
| 29 | 텍스트 중심 | 4.1 Overview of Network |
| 30 | 텍스트 중심 | The Internet network layer |
| 31 | 이미지 병행 | ver |
| 32 | 이미지 병행 | IP fragmentation, reassembly |
| 33 | 이미지 병행 | offset |
| 34 | 텍스트 중심 | 4.1 Overview of Network |
| 35 | 이미지 병행 | IP addressing: introduction |
| 36 | 이미지 병행 | IP addressing: introduction |
| 37 | 이미지 병행 | Subnets |
| 38 | 이미지 병행 | recipe |
| 39 | 이미지 병행 | how many? |
| 40 | 이미지 병행 | IP addressing: CIDR |
| 41 | 텍스트 중심 | IP addresses: how to get one? |
| 42 | 텍스트 중심 | DHCP: Dynamic Host Configuration Protocol |
| 43 | 이미지 병행 | DHCP client-server scenario |
| 44 | 텍스트 중심 | DHCP server: 223.1.2.5 |
| 45 | 텍스트 중심 | DHCP: more than IP addresses |
| 46 | 이미지 병행 | connecting laptop needs |
| 47 | 이미지 병행 | DCP server formulates |
| 48 | 텍스트 중심 | DHCP: Wireshark |
| 49 | 텍스트 중심 | IP addresses: how to get one? |
| 50 | 텍스트 중심 | IP addressing: the last word... |
| 51 | 이미지 병행 | NAT: network address translation |
| 52 | 이미지 병행 | motivation: local network uses just one IP address as far |
| 53 | 이미지 병행 | implementation: NAT router must: |
| 54 | 이미지 병행 | 10.0.0.1 |
| 55 | 이미지 병행 | 16-bit port-number field: |
| 56 | 텍스트 중심 | 4.1 Overview of Network |
| 57 | 텍스트 중심 | IPv6: motivation |
| 58 | 이미지 병행 | IPv6 datagram format |
| 59 | 텍스트 중심 | Other changes from IPv4 |
| 60 | 이미지 병행 | Transition from IPv4 to IPv6 |
| 61 | 이미지 병행 | Tunneling |
| 62 | 이미지 병행 | flow: X |
| 63 | 이미지 병행 | IPv6: adoption |
