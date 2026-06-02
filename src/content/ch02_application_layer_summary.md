# Chapter 2 - Application Layer 정리본

## 0. 이 장의 목적

이 장은 네트워크 애플리케이션이 어떻게 만들어지고, 대표적인 application-layer protocol들이 어떤 방식으로 동작하는지 보는 장이다.

핵심은 다음 한 문장이다.

> 네트워크 앱은 end system에서 실행되는 process들이 socket을 통해 transport service를 사용하여 메시지를 주고받는 구조다.

## 1. 읽기 전략

- 텍스트 중심: protocol 정의, HTTP method/status code, DNS record type, socket code.
- 이미지 병행: client-server/P2P 구조, HTTP timing/cache, email 흐름, DNS 질의 흐름, BitTorrent, CDN.

### 이미지/도식 병행 권장 페이지
- p4, p6-p7: 애플리케이션이 end system에서만 돌고, client-server/P2P가 어떻게 다른지 구조 그림으로 확인.
- p24, p27, p33-p42: HTTP RTT, request format, cookie, proxy cache, conditional GET은 메시지 흐름/형식 그림이 중요하다.
- p44-p52: e-mail 구조. user agent, mail server, SMTP, POP3/IMAP의 방향성이 그림으로 들어온다.
- p62-p63, p66-p67: DNS recursive/iterative query와 message format. 질의 흐름을 도식으로 봐야 헷갈리지 않는다.
- p71-p79: P2P distribution/BitTorrent. 서버-클라이언트와 P2P의 시간 공식, chunk 교환, tit-for-tat 그림이 핵심이다.
- p81-p92: video streaming/CDN/DASH/Netflix. 클라이언트 적응, CDN node 선택, redirection 구조가 그림 중심이다.
- p97, p101: UDP/TCP socket interaction. 코드보다 클라이언트/서버 호출 순서를 그림으로 이해하는 페이지.

## 2. 큰 흐름

1. 네트워크 앱의 구조를 본다.
   - client-server, P2P.
2. process와 socket을 본다.
   - app process는 socket을 통해 transport layer를 사용한다.
3. HTTP/Web을 본다.
   - request/response, persistent connection, cookie, cache.
4. e-mail을 본다.
   - SMTP는 push, POP3/IMAP은 pull.
5. DNS를 본다.
   - 이름을 IP 주소로 바꾸는 분산 계층 DB.
6. P2P와 BitTorrent를 본다.
7. streaming/CDN/DASH를 본다.
8. UDP/TCP socket programming을 본다.

## 3. 핵심 개념

### 3.1 Network application은 어디서 도는가

Application은 network core 장비가 아니라 **end system**에서 실행된다. Router는 user application을 실행하지 않고 packet forwarding에 집중한다.

이 구조의 의미는 크다.

- 개발자는 router 내부 소프트웨어를 건드리지 않아도 새 앱을 만들 수 있다.
- 앱은 end system끼리 protocol만 맞추면 빠르게 배포된다.

### 3.2 Client-server와 P2P

| 구조 | 특징 | 장점 | 단점 |
|---|---|---|---|
| Client-server | 항상 켜진 server, 고정 IP, client는 server와 통신 | 관리 쉽고 안정적 | server 확장 비용 큼 |
| P2P | peer들이 서로 서비스 요청/제공 | self-scalability | 관리/검색/보안 복잡 |

P2P의 핵심은 새 peer가 demand를 늘리면서 동시에 upload capacity도 제공한다는 점이다.

### 3.3 Process, socket, address

- **Process**: host 안에서 실행 중인 program.
- **Socket**: process가 network로 메시지를 내보내고 받는 문.
- **Identifier**: 메시지를 받을 process를 찾기 위해 IP address와 port number가 필요하다.

정리하면 다음과 같다.

```text
host 식별 = IP address
process 식별 = port number
network app 통신 = process -> socket -> transport layer
```

### 3.4 Application-layer protocol이 정하는 것

Application-layer protocol은 다음을 정의한다.

- message type: request인지 response인지.
- message syntax: field가 어떻게 배열되는지.
- message semantics: field의 의미.
- timing/rule: 언제 보내고 어떻게 응답하는지.

### 3.5 Transport service 요구사항

앱마다 transport layer에 요구하는 것이 다르다.

- file transfer, web, e-mail: reliable data transfer가 중요.
- streaming, VoIP: 약간의 loss보다 timing이 중요할 수 있음.
- bandwidth-sensitive app: 일정 throughput 필요.
- elastic app: 가능한 만큼 쓰면 됨. Web이 대표적.

TCP는 reliable, in-order, congestion control, flow control, connection-oriented를 제공한다. UDP는 최소 기능만 제공하고 빠르고 단순하다. TCP/UDP 자체는 암호화를 제공하지 않으므로 TLS 같은 보안 계층이 붙는다.

## 4. HTTP/Web

### 4.1 HTTP 기본

HTTP는 Web의 application-layer protocol이다.

- client: browser.
- server: Web server.
- 기본 동작: client가 request를 보내고 server가 response를 보냄.
- TCP 위에서 동작.
- HTTP server는 기본적으로 client 상태를 저장하지 않는 **stateless** protocol로 설명된다.

### 4.2 Non-persistent vs persistent HTTP

Non-persistent HTTP는 object마다 TCP connection을 새로 만든다. 기본적으로 한 object를 받는 데 TCP connection setup 1 RTT + HTTP request/first byte response 1 RTT가 필요하다.

Persistent HTTP는 하나의 TCP connection으로 여러 object를 주고받아 RTT 낭비를 줄인다.

### 4.3 HTTP message

Request message의 핵심 구조는 다음과 같다.

```text
request line: method URL version
header lines
blank line
optional entity body
```

자주 나오는 method:

- GET: resource 요청.
- POST: form data 등을 body에 담아 전송.
- HEAD: body 없이 header만 요청.
- PUT: resource upload/replace.

Response message는 status line, header, body로 구성된다.

대표 status code:

| Code | 의미 |
|---:|---|
| 200 | OK |
| 301 | Moved Permanently |
| 400 | Bad Request |
| 404 | Not Found |
| 505 | HTTP Version Not Supported |

### 4.4 Cookie

HTTP는 stateless이므로 사용자를 기억하려면 cookie를 쓴다.

- server가 `Set-Cookie` header로 cookie를 보낸다.
- browser가 이후 request에 cookie를 포함한다.
- server는 backend database와 cookie ID를 연결해 사용자 상태를 복원한다.

### 4.5 Web cache / proxy

Web cache는 client 대신 origin server의 object를 저장해 둔다.

효과:

- client response time 감소.
- access link traffic 감소.
- origin server 부하 감소.

Conditional GET은 cache가 가진 object가 최신인지 확인하는 방식이다. `If-Modified-Since`를 보내고, 변경이 없으면 server가 `304 Not Modified`로 body 없이 응답한다.

## 5. Electronic mail

E-mail 시스템은 세 부분으로 볼 수 있다.

- **User agent**: 사용자가 메일을 작성/읽는 프로그램.
- **Mail server**: mailbox와 outgoing message queue를 관리.
- **SMTP**: mail server 사이에서 메일을 전송하는 protocol.

SMTP는 TCP 25번 포트를 사용하며, client에서 server로 메일을 **push**한다. 수신자가 메일을 읽을 때는 POP3 또는 IMAP을 사용한다.

| Protocol | 역할 |
|---|---|
| SMTP | sender mail server -> receiver mail server 전송 |
| POP3 | client가 server에서 메일 다운로드 |
| IMAP | server에 메일을 남겨두고 folder/status 동기화 |

## 6. DNS

DNS는 domain name을 IP address로 바꾸는 분산 DB다.

중앙집중 DNS가 아닌 이유:

- single point of failure.
- traffic volume.
- distant centralized database로 인한 delay.
- maintenance 어려움.

DNS hierarchy:

```text
root DNS server
 -> TLD DNS server (.com, .org, .kr 등)
 -> authoritative DNS server
 -> host name에 대한 IP address
```

Local DNS server는 hierarchy에 엄밀히 속하지는 않지만, 사용자의 질의를 받아 cache하고 대신 질의해 준다.

대표 RR type:

| Type | 의미 |
|---|---|
| A | hostname -> IPv4 address |
| NS | domain의 authoritative name server |
| CNAME | alias name -> canonical name |
| MX | mail server 정보 |

DNS 공격은 DDoS, redirect attack, cache poisoning 등이 핵심이다.

## 7. P2P와 BitTorrent

Client-server file distribution은 server upload capacity가 병목이 된다. P2P는 peer들이 서로 조각을 나눠주므로 peer 수가 늘어도 전체 upload capacity가 같이 늘어난다.

BitTorrent 흐름:

1. file을 chunk로 나눈다.
2. peer가 torrent에 참여한다.
3. tracker가 peer 목록을 알려준다.
4. peer들은 서로 chunk를 교환한다.
5. rarest first로 희귀 chunk를 우선 요청한다.
6. tit-for-tat으로 upload를 잘 해주는 peer에게 우선 upload한다.

## 8. Streaming, DASH, CDN

Streaming stored video는 delay, bandwidth 변화, encoding rate 선택 문제가 중요하다.

DASH의 핵심:

- server는 같은 video를 여러 bitrate version으로 저장한다.
- manifest file에 segment URL과 bitrate 정보를 둔다.
- client가 현재 bandwidth와 buffer 상태를 보고 segment 품질을 선택한다.

CDN은 content copy를 여러 지역 node에 배치하여 client와 가까운 곳에서 content를 제공한다. 핵심은 **content placement**와 **request routing**이다.

## 9. Socket programming

UDP는 connection 없이 datagram을 주고받는다. TCP는 server가 먼저 socket을 열고 listen하며, client가 connect하면 connection socket을 통해 byte stream을 주고받는다.

정리:

```text
UDP: sendto/recvfrom, destination IP+port를 매번 명시
TCP: connect/accept 이후 connected socket으로 read/write
```

## 10. 시험/복습 포인트

- Client-server와 P2P의 scalability 차이를 설명할 수 있어야 한다.
- Socket을 “process의 network door”로 설명할 수 있어야 한다.
- HTTP request/response 구조, status code, cookie, cache를 구분할 수 있어야 한다.
- SMTP/POP3/IMAP의 방향성을 구분해야 한다.
- DNS hierarchy와 RR type을 설명할 수 있어야 한다.
- DASH와 CDN의 역할을 구분해야 한다.
- UDP/TCP socket interaction 순서를 그릴 수 있어야 한다.

## 11. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | Chapter 2: outline |
| 2 | 텍스트 중심 | Chapter 2: application layer |
| 3 | 텍스트 중심 | Some network apps |
| 4 | 이미지 병행 | Creating a network app |
| 5 | 텍스트 중심 | Application architectures |
| 6 | 이미지 병행 | Client-server architecture |
| 7 | 이미지 병행 | P2P architecture |
| 8 | 텍스트 중심 | Processes communicating |
| 9 | 텍스트 중심 | Sockets |
| 10 | 텍스트 중심 | Addressing processes |
| 11 | 텍스트 중심 | App-layer protocol defines |
| 12 | 텍스트 중심 | What transport service does an app need? |
| 13 | 텍스트 중심 | Transport service requirements: common apps |
| 14 | 텍스트 중심 | Internet transport protocols services |
| 15 | 텍스트 중심 | Internet apps: application, transport protocols |
| 16 | 텍스트 중심 | Securing TCP |
| 17 | 텍스트 중심 | Chapter 2: outline |
| 18 | 텍스트 중심 | Web and HTTP |
| 19 | 텍스트 중심 | HTTP overview |
| 20 | 텍스트 중심 | HTTP overview (continued) |
| 21 | 텍스트 중심 | HTTP connections |
| 22 | 텍스트 중심 | Non-persistent HTTP |
| 23 | 텍스트 중심 | Non-persistent HTTP (cont.) |
| 24 | 이미지 병행 | Non-persistent HTTP: response time |
| 25 | 텍스트 중심 | Persistent HTTP |
| 26 | 텍스트 중심 | HTTP request message |
| 27 | 이미지 병행 | HTTP request message: general format |
| 28 | 텍스트 중심 | Uploading form input |
| 29 | 텍스트 중심 | Method types |
| 30 | 텍스트 중심 | HTTP response message |
| 31 | 텍스트 중심 | HTTP response status codes |
| 32 | 텍스트 중심 | Trying out HTTP (client side) for yourself |
| 33 | 이미지 병행 | User-server state: cookies |
| 34 | 이미지 병행 | Cookies: keeping “state” (cont.) |
| 35 | 이미지 병행 | Cookies (continued) |
| 36 | 이미지 병행 | Web caches (proxy server) |
| 37 | 텍스트 중심 | More about Web caching |
| 38 | 이미지 병행 | Caching example: |
| 39 | 이미지 병행 | assumptions: |
| 40 | 이미지 병행 | institutional |
| 41 | 이미지 병행 | Caching example: install local cache |
| 42 | 이미지 병행 | Conditional GET |
| 43 | 텍스트 중심 | Chapter 2: outline |
| 44 | 이미지 병행 | Electronic mail |
| 45 | 이미지 병행 | Electronic mail: mail servers |
| 46 | 텍스트 중심 | Electronic Mail: SMTP [RFC 2821] |
| 47 | 이미지 병행 | user |
| 48 | 텍스트 중심 | Sample SMTP interaction |
| 49 | 텍스트 중심 | Try SMTP interaction for yourself: |
| 50 | 텍스트 중심 | SMTP: final words |
| 51 | 텍스트 중심 | Mail message format |
| 52 | 이미지 병행 | Mail access protocols |
| 53 | 텍스트 중심 | POP3 protocol |
| 54 | 텍스트 중심 | POP3 (more) and IMAP |
| 55 | 텍스트 중심 | Chapter 2: outline |
| 56 | 텍스트 중심 | DNS: domain name system |
| 57 | 텍스트 중심 | DNS: services, structure |
| 58 | 텍스트 중심 | Root DNS Servers |
| 59 | 텍스트 중심 | DNS: root name servers |
| 60 | 텍스트 중심 | TLD, authoritative servers |
| 61 | 텍스트 중심 | Local DNS name server |
| 62 | 이미지 병행 | requesting host |
| 63 | 이미지 병행 | recursive query: |
| 64 | 텍스트 중심 | DNS: caching, updating records |
| 65 | 텍스트 중심 | DNS records |
| 66 | 텍스트 중심 | DNS protocol, messages |
| 67 | 텍스트 중심 | name, type fields |
| 68 | 텍스트 중심 | Inserting records into DNS |
| 69 | 텍스트 중심 | Attacking DNS |
| 70 | 텍스트 중심 | Chapter 2: outline |
| 71 | 이미지 병행 | Pure P2P architecture |
| 72 | 이미지 병행 | File distribution: client-server vs P2P |
| 73 | 이미지 병행 | File distribution time: client-server |
| 74 | 이미지 병행 | File distribution time: P2P |
| 75 | 이미지 병행 | 0.5 |
| 76 | 이미지 병행 | P2P file distribution: BitTorrent |
| 77 | 이미지 병행 | peer joining torrent: |
| 78 | 텍스트 중심 | BitTorrent: requesting, sending file chunks |
| 79 | 이미지 병행 | BitTorrent: tit-for-tat |
| 80 | 텍스트 중심 | Chapter 2: outline |
| 81 | 이미지 병행 | Video Streaming and CDNs: context |
| 82 | 텍스트 중심 | video: sequence of images |
| 83 | 텍스트 중심 | Multimedia: video |
| 84 | 이미지 병행 | Streaming stored video: |
| 85 | 이미지 병행 | Streaming multimedia: DASH |
| 86 | 이미지 병행 | Streaming multimedia: DASH |
| 87 | 텍스트 중심 | Content distribution networks |
| 88 | 텍스트 중심 | Content distribution networks |
| 89 | 이미지 병행 | Content Distribution Networks (CDNs) |
| 90 | 이미지 병행 | Content Distribution Networks (CDNs) |
| 91 | 이미지 병행 | CDN content access: a closer look |
| 92 | 이미지 병행 | Case study: Netflix |
| 93 | 텍스트 중심 | Chapter 2: outline |
| 94 | 텍스트 중심 | Socket programming |
| 95 | 텍스트 중심 | Socket programming |
| 96 | 텍스트 중심 | Socket programming with UDP |
| 97 | 이미지 병행 | Client/server socket interaction: UDP |
| 98 | 텍스트 중심 | Example app: UDP client |
| 99 | 텍스트 중심 | Example app: UDP server |
| 100 | 텍스트 중심 | Socket programming with TCP |
| 101 | 이미지 병행 | Client/server socket interaction: TCP |
| 102 | 텍스트 중심 | Example app: TCP client |
| 103 | 텍스트 중심 | Example app: TCP server |
| 104 | 텍스트 중심 | Chapter 2: summary |
| 105 | 텍스트 중심 | typical request/reply |
