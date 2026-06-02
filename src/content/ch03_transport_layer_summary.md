# Chapter 3 - Transport Layer 정리본

## 0. 이 장의 목적

이 장은 application process 사이에 논리적 통신을 제공하는 transport layer를 다룬다. UDP와 TCP가 왜 다르고, TCP가 reliability, flow control, congestion control을 어떻게 제공하는지가 중심이다.

핵심은 다음 한 문장이다.

> Transport layer는 host-to-host 통신을 process-to-process 통신처럼 보이게 만들고, TCP는 그 위에 신뢰성·순서·흐름제어·혼잡제어를 추가한다.

## 1. 읽기 전략

- 텍스트 중심: UDP 특징, TCP header field 정의, congestion control 용어.
- 이미지 병행: demux 예시, rdt FSM, GBN/SR window, TCP ACK/retransmission, handshake, congestion graph.

### 이미지/도식 병행 권장 페이지
- p8-p14: multiplexing/demultiplexing. port/socket으로 어떤 프로세스에 전달되는지 그림 기반.
- p22-p55: reliable data transfer. rdt FSM, stop-and-wait, pipelining, GBN, Selective Repeat은 상태 전이/윈도우 그림이 사실상 본문이다.
- p58-p63: TCP segment, sequence/ACK, RTT estimation. 필드와 타임라인/그래프를 같이 봐야 한다.
- p67-p72: TCP 재전송 시나리오와 fast retransmit. ACK 누락/중복 ACK 흐름을 그림으로 추적.
- p74-p82: flow control, 3-way handshake, connection close. rwnd와 SYN/ACK/FIN 상태 전이 그림이 핵심.
- p86-p94: congestion 원인과 비용. offered load, throughput, queue, retransmission cost가 그래프로 설명된다.
- p96-p101: TCP congestion control. AIMD, slow start, loss reaction, 상태 전환 요약 그림 확인.

## 2. Transport layer의 위치

Network layer는 host 간 logical communication을 제공한다. Transport layer는 그 위에서 **process 간 logical communication**을 제공한다.

비유:

```text
host = 집
process = 집 안의 아이
network layer = 우편 서비스
transport layer = 집 안에서 누구에게 편지를 줄지 분배하는 사람
```

Transport layer는 end system에서만 동작한다. Router는 transport segment 내부를 애플리케이션 관점에서 처리하지 않는다.

## 3. Multiplexing / Demultiplexing

- **Multiplexing**: 여러 socket의 데이터를 모아 transport header를 붙이고 network layer로 내림.
- **Demultiplexing**: 들어온 segment의 header를 보고 올바른 socket/process에 전달.

UDP demux는 주로 destination port로 socket을 찾는다. TCP demux는 다음 4-tuple로 connection socket을 구분한다.

```text
(source IP, source port, destination IP, destination port)
```

그래서 같은 web server의 port 80으로 들어와도 client IP/port가 다르면 서로 다른 TCP connection으로 구분된다.

## 4. UDP

UDP는 “no-frills” transport protocol이다.

특징:

- connection setup 없음.
- segment 단위 전송.
- reliable delivery 보장 없음.
- ordering 보장 없음.
- congestion control 없음.
- header가 작고 지연이 낮다.

UDP header 핵심 field:

```text
source port
destination port
length
checksum
```

UDP checksum은 bit error를 탐지하기 위한 것이다. 단, 오류 탐지는 완벽하지 않다.

## 5. Reliable Data Transfer: rdt 계열

이 부분은 TCP를 이해하기 위한 이론적 모델이다. 실제 TCP를 바로 외우기보다, “불안정한 channel에서 무엇이 추가로 필요한가”를 단계적으로 본다.

### 5.1 rdt1.0

가정: channel이 완벽하다.

- bit error 없음.
- loss 없음.
- sender는 보내고 receiver는 받으면 끝.

### 5.2 rdt2.0

가정: bit error는 있지만 loss는 없다.

필요한 것:

- checksum.
- ACK/NAK.
- error가 있으면 retransmission.

문제: ACK/NAK 자체가 깨지면 sender가 무엇을 해야 하는지 모호하다.

### 5.3 rdt2.1 / rdt2.2

해결책:

- sequence number 도입.
- duplicate packet 감지.
- NAK 없이 duplicate ACK로도 재전송 유도 가능.

핵심은 receiver가 “새 packet인지, 중복 packet인지” 구분할 수 있어야 한다는 점이다.

### 5.4 rdt3.0

가정: bit error와 packet loss가 모두 있다.

추가 요소:

- timeout.
- timer.
- timeout이 발생하면 retransmission.

rdt3.0은 stop-and-wait 방식이라 단순하지만 link utilization이 낮다.

## 6. Pipelining, GBN, Selective Repeat

Stop-and-wait는 한 packet을 보내고 ACK를 기다리므로 비효율적이다. Pipelining은 ACK를 기다리지 않고 여러 packet을 연속으로 보낸다.

### 6.1 Go-Back-N

- Sender window 안의 여러 packet을 보낼 수 있음.
- Receiver는 순서대로 온 packet만 accept.
- 중간 packet이 손실되면 그 packet부터 뒤의 packet들을 다시 보냄.
- Receiver는 cumulative ACK 사용.

### 6.2 Selective Repeat

- Receiver가 순서가 어긋난 packet도 buffer에 저장.
- 손실된 packet만 선택적으로 재전송.
- Sender와 receiver 모두 window 관리가 필요.

비교:

| 항목 | Go-Back-N | Selective Repeat |
|---|---|---|
| 구현 | 상대적으로 단순 | 더 복잡 |
| 재전송 | 손실 지점 이후 대량 재전송 가능 | 손실 packet만 재전송 |
| receiver buffer | 적게 필요 | 더 필요 |
| 효율 | 손실 많으면 낮음 | 손실 많을 때 유리 |

## 7. TCP

TCP는 다음 특징을 가진다.

- point-to-point.
- reliable, in-order byte stream.
- pipelined.
- full duplex.
- connection-oriented.
- flow controlled.
- congestion controlled.

### 7.1 TCP sequence number와 ACK

TCP는 byte stream 기반이다. Sequence number는 segment 번호가 아니라 **segment에 들어 있는 첫 byte의 번호**로 이해해야 한다.

ACK number는 “다음에 받고 싶은 byte 번호”다.

```text
ACK = N
=> N-1번 byte까지는 받았고, 다음은 N번 byte를 원한다.
```

### 7.2 RTT estimation과 timeout

TCP는 timeout을 정하기 위해 RTT를 추정한다.

```text
EstimatedRTT = (1 - alpha) * EstimatedRTT + alpha * SampleRTT
DevRTT = RTT 변동성 추정
TimeoutInterval = EstimatedRTT + 4 * DevRTT
```

Timeout은 너무 짧으면 불필요한 재전송이 많아지고, 너무 길면 손실 회복이 느려진다.

### 7.3 TCP reliable data transfer

TCP sender 이벤트:

- application에서 data 받음.
- timer 시작.
- ACK 수신.
- timeout 발생.
- duplicate ACK 수신.

손실 감지 방식:

- timeout.
- triple duplicate ACK에 의한 fast retransmit.

### 7.4 TCP flow control

Flow control은 receiver buffer가 넘치지 않게 sender 속도를 조절하는 기능이다.

Receiver는 receive window(`rwnd`)를 advertise한다. Sender는 outstanding data가 receiver가 받아낼 수 있는 범위를 넘지 않도록 조절한다.

Flow control은 receiver 보호이고, congestion control은 network 보호다. 둘을 구분해야 한다.

### 7.5 TCP connection management

TCP는 3-way handshake로 connection을 연다.

```text
client -> server: SYN
server -> client: SYN + ACK
client -> server: ACK
```

2-way handshake로는 delayed duplicate segment 문제를 안전하게 처리하기 어렵다. 연결 종료는 FIN/ACK 교환과 TIME_WAIT 상태를 포함한다.

## 8. Congestion control

Congestion은 network 내부에 traffic이 너무 많이 들어와 queueing delay와 loss가 증가하는 상태다.

Congestion의 비용:

- delay 증가.
- loss 증가.
- retransmission 증가.
- 불필요하게 router capacity 낭비.
- upstream resource까지 낭비될 수 있음.

### 8.1 TCP AIMD

TCP congestion window(`cwnd`)는 네트워크에 보낼 수 있는 outstanding data 양을 제한한다.

AIMD:

- Additive Increase: loss가 없으면 조금씩 증가.
- Multiplicative Decrease: loss가 감지되면 크게 감소.

### 8.2 Slow Start

초기에는 cwnd를 빠르게 증가시킨다.

```text
ACK가 올 때마다 cwnd 증가
대략 RTT마다 cwnd가 두 배 증가
```

ssthresh에 도달하면 congestion avoidance로 넘어가 선형 증가한다.

### 8.3 Loss reaction

- Timeout: 심각한 혼잡으로 보고 cwnd를 1 MSS로 줄이고 slow start.
- Triple duplicate ACK: 일부 segment 손실로 보고 빠르게 재전송하고 cwnd를 절반 정도로 줄임.

## 9. 시험/복습 포인트

- UDP와 TCP 차이를 “connection, reliability, ordering, congestion control” 기준으로 설명할 수 있어야 한다.
- UDP/TCP demultiplexing 기준을 구분해야 한다.
- rdt1.0 -> rdt2.0 -> rdt2.1/2.2 -> rdt3.0에서 추가되는 장치를 설명할 수 있어야 한다.
- Stop-and-wait의 낮은 utilization 문제와 pipelining 필요성을 설명해야 한다.
- GBN과 Selective Repeat의 window/ACK/retransmission 차이를 구분해야 한다.
- TCP seq/ACK number를 byte 기준으로 설명할 수 있어야 한다.
- Flow control과 congestion control을 구분해야 한다.
- Slow start, congestion avoidance, fast retransmit, AIMD를 연결해서 설명할 수 있어야 한다.

## 10. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | Chapter 3 |
| 2 | 텍스트 중심 | Chapter 3: Transport Layer |
| 3 | 텍스트 중심 | Chapter 3 outline |
| 4 | 이미지 병행 | Transport services and protocols |
| 5 | 텍스트 중심 | Transport vs. network layer |
| 6 | 이미지 병행 | Internet transport-layer protocols |
| 7 | 텍스트 중심 | Chapter 3 outline |
| 8 | 이미지 병행 | Multiplexing/demultiplexing |
| 9 | 텍스트 중심 | How demultiplexing works |
| 10 | 텍스트 중심 | Connectionless demultiplexing |
| 11 | 이미지 병행 | Connectionless demux: example |
| 12 | 텍스트 중심 | Connection-oriented demux |
| 13 | 이미지 병행 | Connection-oriented demux: example |
| 14 | 이미지 병행 | Connection-oriented demux: example |
| 15 | 텍스트 중심 | Chapter 3 outline |
| 16 | 텍스트 중심 | UDP: User Datagram Protocol [RFC 768] |
| 17 | 텍스트 중심 | UDP: segment header |
| 18 | 텍스트 중심 | UDP checksum |
| 19 | 텍스트 중심 | Internet checksum: example |
| 20 | 텍스트 중심 | Chapter 3 outline |
| 21 | 텍스트 중심 | Principles of reliable data transfer |
| 22 | 이미지 병행 | characteristics of unreliable channel will determine |
| 23 | 이미지 병행 | characteristics of unreliable channel will determine |
| 24 | 텍스트 중심 | Reliable data transfer: getting started |
| 25 | 텍스트 중심 | we’ll: |
| 26 | 텍스트 중심 | rdt1.0: reliable transfer over a reliable channel |
| 27 | 텍스트 중심 | underlying channel may flip bits in packet |
| 28 | 텍스트 중심 | underlying channel may flip bits in packet |
| 29 | 이미지 병행 | rdt2.0: FSM specification |
| 30 | 이미지 병행 | rdt2.0: operation with no errors |
| 31 | 이미지 병행 | rdt2.0: error scenario |
| 32 | 텍스트 중심 | rdt2.0 has a fatal flaw! |
| 33 | 이미지 병행 | rdt2.1: sender, handles garbled ACK/NAKs |
| 34 | 이미지 병행 | Wait for |
| 35 | 텍스트 중심 | rdt2.1: discussion |
| 36 | 텍스트 중심 | rdt2.2: a NAK-free protocol |
| 37 | 텍스트 중심 | rdt2.2: sender, receiver fragments |
| 38 | 텍스트 중심 | rdt3.0: channels with errors and loss |
| 39 | 이미지 병행 | rdt3.0 sender |
| 40 | 이미지 병행 | sender |
| 41 | 이미지 병행 | rdt3.0 in action |
| 42 | 텍스트 중심 | Performance of rdt3.0 |
| 43 | 이미지 병행 | rdt3.0: stop-and-wait operation |
| 44 | 이미지 병행 | Pipelined protocols |
| 45 | 이미지 병행 | Pipelining: increased utilization |
| 46 | 이미지 병행 | Pipelined protocols: overview |
| 47 | 텍스트 중심 | Go-Back-N: sender |
| 48 | 이미지 병행 | GBN: sender extended FSM |
| 49 | 텍스트 중심 | ACK-only: always send ACK for correctly-received |
| 50 | 이미지 병행 | GBN in action |
| 51 | 텍스트 중심 | Selective repeat |
| 52 | 이미지 병행 | Selective repeat: sender, receiver windows |
| 53 | 텍스트 중심 | Selective repeat |
| 54 | 이미지 병행 | Selective repeat in action |
| 55 | 이미지 병행 | Selective repeat: |
| 56 | 텍스트 중심 | Chapter 3 outline |
| 57 | 텍스트 중심 | TCP: Overview RFCs: 793,1122,1323, 2018, 2581 |
| 58 | 이미지 병행 | TCP segment structure |
| 59 | 이미지 병행 | TCP seq. numbers, ACKs |
| 60 | 이미지 병행 | TCP seq. numbers, ACKs |
| 61 | 텍스트 중심 | TCP round trip time, timeout |
| 62 | 이미지 병행 | RTT: gaia.cs.umass.edu to fantasia.eurecom.fr |
| 63 | 텍스트 중심 | timeout interval: EstimatedRTT plus “safety margin” |
| 64 | 텍스트 중심 | Chapter 3 outline |
| 65 | 텍스트 중심 | TCP reliable data transfer |
| 66 | 텍스트 중심 | TCP sender events: |
| 67 | 이미지 병행 | TCP sender (simplified) |
| 68 | 이미지 병행 | TCP: retransmission scenarios |
| 69 | 이미지 병행 | TCP: retransmission scenarios |
| 70 | 텍스트 중심 | TCP ACK generation [RFC 1122, RFC 2581] |
| 71 | 텍스트 중심 | TCP fast retransmit |
| 72 | 이미지 병행 | fast retransmit after sender |
| 73 | 텍스트 중심 | Chapter 3 outline |
| 74 | 이미지 병행 | TCP flow control |
| 75 | 이미지 병행 | TCP flow control |
| 76 | 텍스트 중심 | Chapter 3 outline |
| 77 | 텍스트 중심 | Connection Management |
| 78 | 텍스트 중심 | Q: will 2-way handshake |
| 79 | 텍스트 중심 | Agreeing to establish a connection |
| 80 | 이미지 병행 | TCP 3-way handshake |
| 81 | 이미지 병행 | TCP 3-way handshake: FSM |
| 82 | 이미지 병행 | TCP: closing a connection |
| 83 | 텍스트 중심 | FIN_WAIT_2 |
| 84 | 텍스트 중심 | Chapter 3 outline |
| 85 | 텍스트 중심 | congestion: |
| 86 | 이미지 병행 | Causes/costs of congestion: scenario 1 |
| 87 | 이미지 병행 | one router, finite buffers |
| 88 | 이미지 병행 | idealization: perfect |
| 89 | 이미지 병행 | λin : original data |
| 90 | 이미지 병행 | λin : original data |
| 91 | 이미지 병행 | λin |
| 92 | 텍스트 중심 | R/2 |
| 93 | 이미지 병행 | four senders |
| 94 | 이미지 병행 | another “cost” of congestion: |
| 95 | 텍스트 중심 | Chapter 3 outline |
| 96 | 이미지 병행 | TCP congestion control: additive increase |
| 97 | 텍스트 중심 | TCP Congestion Control: details |
| 98 | 이미지 병행 | TCP Slow Start |
| 99 | 이미지 병행 | TCP: detecting, reacting to loss |
| 100 | 텍스트 중심 | Q: when should the |
| 101 | 이미지 병행 | Summary: TCP Congestion Control |
| 102 | 텍스트 중심 | TCP throughput |
| 103 | 텍스트 중심 | Chapter 3: summary |
