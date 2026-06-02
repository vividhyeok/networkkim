# Blockchain Technology - Peer-to-Peer Network 정리본

## 0. 이 자료의 목적

이 자료는 blockchain을 peer-to-peer network 관점에서 소개한다. Bitcoin을 예시로 삼지만, Bitcoin 자체와 blockchain technology를 구분하는 것이 핵심이다.

핵심은 다음 한 문장이다.

> Blockchain은 P2P network에 복제된 ledger를 block 단위로 묶고, 이전 block hash를 참조하게 하여 변경이 어렵도록 만든 data structure이자 합의 시스템이다.

## 1. 읽기 전략

- 텍스트 중심: 역사, Bitcoin 설명, 단점, 용어 정의.
- 이미지 병행: block 연결 구조, torrent와 blockchain 차이, middleman 제거, distributed ledger 흐름, database vs blockchain 비교, mining 절차.

### 이미지/도식 병행 권장 페이지
- p2: block이 data/reference로 연결되는 기본 구조를 그림으로 확인.
- p4, p6-p7: Bitcoin 역사/타임라인은 순서 관계 확인용.
- p9-p10: middleman 제거 예시는 거래 경로 비교용 그림이다.
- p12: Bitcoin과 blockchain의 포함 관계 구분 그림.
- p14-p21: mining, distributed ledger, database vs blockchain, transaction/block flow. 개념 관계와 절차가 표/그림 중심이다.

## 2. Blockchain 정의

Blockchain은 data block이 계속 추가되는 list이며, 각 block은 이전 block을 참조한다.

핵심 특성:

- transaction을 block으로 모은다.
- 여러 server/node가 ledger에 접근한다.
- block들이 chronological order로 cryptographically chained 된다.
- peer-to-peer network 위에서 동작한다.

가장 중요한 구조는 다음이다.

```text
Block N: data + previous block hash/reference
Block N+1: data + hash/reference to Block N
Block N+2: data + hash/reference to Block N+1
```

이 구조 때문에 과거 block을 바꾸면 그 뒤 block들의 hash 연결이 깨진다.

## 3. 역사 흐름

- 1982: David Chaum이 blockchain-like protocol 제안.
- 1991: Haber와 Stornetta가 문서 timestamp 변조 방지 목적의 cryptographically secured chain 연구.
- 1992: Merkle tree를 포함하여 여러 document certificate을 하나의 block에 모을 수 있게 효율화.
- 2008: Satoshi Nakamoto가 Bitcoin 논문을 통해 blockchain을 cryptocurrency에 적용.
- 2009: Bitcoin network 시작.

Bitcoin의 의의는 trusted authority나 central server 없이 double-spending problem을 해결한 첫 digital currency라는 점이다.

## 4. Torrent network와 Blockchain의 차이

둘 다 P2P라는 공통점이 있다. 하지만 목적이 다르다.

| 항목 | Torrent | Blockchain |
|---|---|---|
| 공유 대상 | 여러 file 조각 | 하나의 ledger/history |
| 핵심 문제 | file distribution | ledger consistency와 consensus |
| 신뢰 방식 | file 조각을 받아 완성 | 다수 network가 ledger 내용을 검증/합의 |
| 변경 가능성 | file을 받는 것이 핵심 | history tampering 방지가 핵심 |

자료에서 강조하는 차이는 “many different files”가 아니라 **one shared file/ledger**에 가깝고, 내용은 majority network decision에 의해 결정된다는 점이다.

## 5. Bitcoin

Bitcoin은 blockchain technology의 첫 대표 application이다. 핵심 아이디어는 trust 대신 cryptographic proof를 사용해 두 당사자가 trusted third party 없이 직접 거래하는 것이다.

Middleman 제거:

- 기존 결제: 사용자 -> 은행/중개자 -> 상대방.
- Bitcoin: 사용자 -> P2P network 검증 -> 상대방.

즉, 중개 기관을 완전히 없앤다기보다, trust의 근거를 기관에서 cryptographic proof와 distributed consensus로 옮긴다.

## 6. Bitcoin의 단점

자료에서 제시한 단점:

- block creation이 느림. 약 10분.
- privacy 부족. transaction이 broadcast됨.
- power consumption이 큼. PoW 때문.

대안 방향:

- sustainable power 사용.
- PoW를 PoS로 대체.

## 7. Bitcoin과 Blockchain 구분

Bitcoin은 blockchain의 application이고, blockchain은 underlying data structure/technology다.

```text
Blockchain = 여러 용도로 쓸 수 있는 기반 기술
Bitcoin = blockchain을 cryptocurrency에 적용한 사례
```

따라서 “blockchain = Bitcoin”으로 외우면 안 된다.

## 8. Mining

Mining은 transaction을 검증하고 block에 추가하기 위해 cryptographic puzzle을 푸는 과정이다.

핵심 개념:

- **Hash**: data의 digital fingerprint.
- **Previous block hash**: block들을 cryptographically link하는 값.
- **Target**: 유효한 hash가 되기 위한 기준값.
- **Nonce**: miner가 바꿔가며 valid hash를 찾는 parameter.
- **Reward**: valid block을 먼저 찾은 miner가 받는 보상.

PoW mining 직관:

```text
block data + previous hash + nonce -> hash
hash < target 이면 valid block
아니면 nonce를 바꿔 다시 시도
```

Nonce 범위만으로 부족하면 timestamp나 transaction 구성 변화 등을 통해 새로운 hash search space를 만든다.

## 9. Distributed ledger

Distributed ledger는 ledger가 중앙 DB 하나에만 있는 것이 아니라 여러 참여자에게 복제되어 있는 구조다.

흐름:

1. 사용자가 digital signature로 transaction 생성.
2. transaction을 network에 broadcast.
3. node/miner들이 transaction을 검증.
4. transaction들이 block으로 묶임.
5. block이 consensus를 거쳐 ledger에 추가.
6. 여러 node가 갱신된 ledger를 공유.

## 10. Database vs Blockchain ledger

| 항목 | Database | Blockchain |
|---|---|---|
| 관리 주체 | admin/centralized control | 누구 한 명이 전부 통제하지 않음 |
| 접근 권한 | 권한 있는 entity만 접근 | public blockchain은 누구나 접근 가능 |
| 쓰기 권한 | 권한 있는 entity만 write | 적절한 proof/consensus를 통해 write |
| 속도 | 빠름 | 상대적으로 느림 |
| history | ownership/history가 약하거나 관리 방식에 의존 | record와 ownership history가 남음 |

이 비교에서 시험 포인트는 “blockchain이 DB보다 항상 좋다”가 아니다. Blockchain은 trust decentralization과 tamper-resistance를 얻는 대신 속도와 비용을 희생한다.

## 11. Transaction과 block

- **Transaction**: value transfer 기록.
- **Block**: 여러 transaction의 collection.
- **Chain**: block들이 hash reference로 연결된 구조.

Block은 단순 저장 묶음이 아니라 이전 block과 연결되어 history를 만든다.

## 12. 시험/복습 포인트

- Blockchain을 “linked list of blocks + cryptographic hash + P2P ledger”로 설명할 수 있어야 한다.
- Bitcoin이 blockchain의 application이라는 점을 구분해야 한다.
- Double-spending problem을 왜 central authority 없이 해결하려 했는지 설명할 수 있어야 한다.
- Torrent와 blockchain의 P2P 차이를 말할 수 있어야 한다.
- Hash, nonce, target, proof-of-work, mining reward를 연결해야 한다.
- Database와 blockchain ledger의 장단점을 비교해야 한다.
- PoW의 전력 소비 문제와 PoS 대체 방향을 설명할 수 있어야 한다.

## 13. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | Blockchain Technology : Peer-to-Peer Network |
| 2 | 이미지 병행 | What is A Blockchain? |
| 3 | 텍스트 중심 | History of Blockchain |
| 4 | 이미지 병행 | History of Blockchain |
| 5 | 이미지 병행 | Difference between a Torrent Network and a |
| 6 | 이미지 병행 | The history of Bitcoin |
| 7 | 이미지 병행 | The history of Bitcoin |
| 8 | 텍스트 중심 | ●Bitcoin |
| 9 | 이미지 병행 | Cutting the middleman |
| 10 | 이미지 병행 | Cutting the middleman |
| 11 | 텍스트 중심 | Cons of Bitcoin |
| 12 | 이미지 병행 | Bitcoin ≠ blockchain |
| 13 | 텍스트 중심 | Blockchain terminologies |
| 14 | 이미지 병행 | Blockchain terminologies |
| 15 | 이미지 병행 | Blockchain terminologies |
| 16 | 이미지 병행 | Distinction between databases and blockchain ledgers |
| 17 | 이미지 병행 | Distinction between databases and blockchain ledgers |
| 18 | 이미지 병행 | Blockchain terminologies |
| 19 | 이미지 병행 | Blockchain terminologies |
| 20 | 이미지 병행 | Blockchain terminologies |
| 21 | 이미지 병행 | Blockchain terminologies |
