# Chapter 5 - Network Layer: Control Plane 정리본

## 0. 이 장의 목적

이 장은 network layer의 **control plane**을 다룬다. 즉, packet이 가야 할 경로를 어떻게 계산하고, router들의 forwarding table이 어떻게 만들어지는지를 설명한다.

핵심은 다음 한 문장이다.

> Control plane은 network-wide 정보를 바탕으로 좋은 route를 계산하고, 그 결과가 data plane의 forwarding table로 내려간다.

## 1. 읽기 전략

- 텍스트 중심: LS/DV 정의, OSPF/BGP/ICMP/SNMP 용어.
- 이미지 병행: graph abstraction, Dijkstra 예제, distance vector table, AS hierarchy, BGP path advertisement, SDN architecture, OpenFlow.

### 이미지/도식 병행 권장 페이지
- p8-p17: graph abstraction과 Dijkstra. 비용 그래프, shortest path tree, oscillation 예시가 그림 중심이다.
- p19-p28: Distance Vector/Bellman-Ford. 이웃 테이블 갱신, link cost change, count-to-infinity는 표/흐름 그림으로 추적.
- p31-p38: AS, intra/inter-AS, OSPF hierarchy. 라우팅 확장성 문제를 계층 그림으로 이해.
- p41-p48: BGP. eBGP/iBGP, path advertisement, AS-PATH/NEXT-HOP, forwarding table 결합이 그림 중심이다.
- p51-p68: SDN/OpenFlow/controller 구조. data plane switch, controller, app, state management 사이 연결이 핵심.
- p74-p78: network management/SNMP. manager-agent-MIB 관계와 message type 그림을 확인.

## 2. Control plane 개요

Network layer에는 두 기능이 있다.

- **Forwarding**: packet을 router input에서 output으로 옮기는 data plane 기능.
- **Routing**: source에서 destination까지 path를 결정하는 control plane 기능.

Control plane 구현 방식:

1. **Per-router control plane**: 각 router 안의 routing component가 서로 정보를 주고받아 table 계산.
2. **Logically centralized control plane**: controller가 global view를 기반으로 table 계산. SDN 방식.

## 3. Routing algorithm의 목표

Routing protocol의 목표는 source에서 destination까지 “좋은 path”를 찾는 것이다. 좋은 path는 보통 cost가 낮은 path다.

Graph abstraction:

```text
G = (N, E)
N = routers
E = links
c(x,y) = link cost
```

Cost는 bandwidth, delay, monetary cost, policy 등으로 정의될 수 있다.

## 4. Link State Routing / Dijkstra

Link State 방식:

1. 각 router가 전체 network topology와 link cost를 안다.
2. 모든 router가 같은 link-state database를 가진다.
3. Dijkstra algorithm으로 shortest path tree를 계산한다.

Dijkstra 핵심 변수:

- `N'`: shortest path가 확정된 node 집합.
- `D(v)`: source에서 v까지 현재 알려진 최소 비용.
- `p(v)`: v로 가는 shortest path에서 직전 node.

장점:

- 전체 topology 기반이라 계산 결과가 명확하다.
- convergence가 비교적 빠를 수 있다.

단점:

- topology 정보 flood 필요.
- router 수가 크면 overhead 증가.
- 비용 설정에 따라 oscillation이 생길 수 있다.

## 5. Distance Vector / Bellman-Ford

Distance Vector 방식은 각 router가 destination별 비용 vector를 유지하고, 이웃과 정보를 교환한다.

Bellman-Ford 식:

```text
D_x(y) = min_v { c(x,v) + D_v(y) }
```

의미:

- x에서 y로 가는 최단 비용은,
- 이웃 v로 먼저 간 비용 `c(x,v)`와,
- v가 y까지 가는 비용 `D_v(y)`를 더한 값 중 최소.

특징:

- iterative.
- asynchronous.
- distributed.

문제:

- bad news travels slow.
- count-to-infinity 문제.
- poisoned reverse 같은 완화 기법이 필요.

## 6. LS vs DV 비교

| 항목 | Link State | Distance Vector |
|---|---|---|
| 정보 범위 | 전체 topology | 이웃의 distance vector |
| 계산 | 각 router가 Dijkstra | Bellman-Ford 반복 갱신 |
| 메시지 | link state flooding | 이웃 간 vector 교환 |
| 장점 | 전체 구조 기반, 명확 | 단순, 분산적 |
| 단점 | flooding/계산 overhead | loop/count-to-infinity 가능 |

## 7. Routing scalability와 AS

Internet 전체를 하나의 routing algorithm으로 돌리는 것은 불가능하다. 그래서 router를 **Autonomous System(AS)** 단위로 묶는다.

- **Intra-AS routing**: AS 내부 routing. 예: OSPF.
- **Inter-AS routing**: AS 사이 routing. 예: BGP.

이 구조는 규모 문제와 관리 정책 문제를 동시에 해결한다.

## 8. OSPF

OSPF는 intra-AS routing protocol이다.

특징:

- link-state 방식.
- Dijkstra 사용.
- link-state advertisement를 flood.
- authentication 지원.
- multiple same-cost paths 허용.
- unicast/multicast routing 통합 가능.

Hierarchical OSPF는 area와 backbone area로 나눈다. Local area 내부 detail을 줄이고 backbone을 통해 area 간 routing을 수행한다.

## 9. BGP

BGP는 inter-AS routing protocol이다. Internet routing의 핵심이다.

BGP는 단순히 최단 경로만 고르지 않는다. **policy**가 중요하다.

기본 개념:

- **eBGP**: 다른 AS의 router와 BGP 정보 교환.
- **iBGP**: 같은 AS 내부 router 사이에서 BGP 정보 전달.
- **AS-PATH**: destination prefix까지 지나가는 AS 목록.
- **NEXT-HOP**: 해당 route로 나가기 위한 다음 router/interface.

BGP는 path vector protocol로 볼 수 있다. AS-PATH 덕분에 loop를 감지할 수 있고, 정책 기반 route 선택이 가능하다.

Forwarding table은 BGP만으로 만들어지지 않는다. BGP가 prefix에 대한 inter-AS path와 next-hop을 알려주면, OSPF 같은 intra-AS routing이 next-hop까지의 내부 경로를 알려준다.

## 10. SDN

SDN은 control plane을 data plane device에서 분리한다.

전통적 router는 control plane과 data plane이 한 장비에 수직 통합되어 있다. SDN은 data plane switch를 단순화하고, remote controller가 control logic을 담당한다.

SDN 구성:

- **Data plane switches**: generalized forwarding, flow table 기반 처리.
- **SDN controller**: network-wide state 관리, switch 제어.
- **Control applications**: routing, access control, load balancing 등 policy/app logic.
- **Southbound API**: controller와 switch 사이. 예: OpenFlow.
- **Northbound API**: application과 controller 사이.

OpenFlow message:

- controller-to-switch: flow rule 추가/삭제, packet out, stats request.
- switch-to-controller: packet in, flow removed, port status, stats reply.

SDN 장점:

- 중앙화된 network-wide view.
- traffic engineering 용이.
- forwarding behavior를 programmable하게 제어.

과제:

- controller reliability.
- scalability.
- consistency.
- 보안.

## 11. ICMP와 Traceroute

ICMP는 network layer의 제어/오류 메시지를 전달한다.

예:

- destination unreachable.
- time exceeded.
- echo request/reply.

Traceroute는 TTL을 1부터 증가시키며 packet을 보내고, 각 hop에서 TTL이 0이 되면 router가 ICMP time exceeded를 보내는 원리를 이용한다.

## 12. SNMP / Network management

Network management는 device 상태를 관찰하고 제어하는 영역이다.

구성:

- managing server.
- managed device.
- network management agent.
- MIB: 관리 대상 object 정보.
- SNMP protocol.

SNMP message type은 get, set, response, trap 등이 핵심이다.

## 13. 시험/복습 포인트

- LS와 DV를 graph 정보 범위, 알고리즘, 메시지 교환 방식으로 비교할 수 있어야 한다.
- Dijkstra table을 손으로 채울 수 있어야 한다.
- Bellman-Ford 식을 해석할 수 있어야 한다.
- Count-to-infinity 문제를 설명할 수 있어야 한다.
- AS, intra-AS, inter-AS를 구분해야 한다.
- OSPF와 BGP의 역할 차이를 설명할 수 있어야 한다.
- BGP의 AS-PATH, NEXT-HOP, policy 성격을 알아야 한다.
- SDN에서 data plane switch, controller, control application, OpenFlow의 관계를 설명할 수 있어야 한다.
- ICMP와 traceroute의 관계를 설명할 수 있어야 한다.

## 14. 페이지별 판독 모드

| Page | 판독 모드 | 페이지 핵심/제목 |
|---:|---|---|
| 1 | 텍스트 중심 | Chapter 5: network layer control plane |
| 2 | 텍스트 중심 | 5.1 introduction |
| 3 | 텍스트 중심 | Network-layer functions |
| 4 | 이미지 병행 | Per-router control plane |
| 5 | 이미지 병행 | data |
| 6 | 텍스트 중심 | 5.1 introduction |
| 7 | 텍스트 중심 | Routing protocols |
| 8 | 이미지 병행 | graph: G = (N,E) |
| 9 | 이미지 병행 | Graph abstraction: costs |
| 10 | 텍스트 중심 | Routing algorithm classification |
| 11 | 텍스트 중심 | 5.1 introduction |
| 12 | 텍스트 중심 | A link-state routing algorithm |
| 13 | 이미지 병행 | Dijsktra’s algorithm |
| 14 | 이미지 병행 | Dijkstra’s algorithm: example |
| 15 | 이미지 병행 | Dijkstra’s algorithm: another example |
| 16 | 이미지 병행 | Dijkstra’s algorithm: example (2) |
| 17 | 이미지 병행 | Dijkstra’s algorithm, discussion |
| 18 | 텍스트 중심 | 5.1 introduction |
| 19 | 이미지 병행 | Distance vector algorithm |
| 20 | 이미지 병행 | Bellman-Ford example |
| 21 | 이미지 병행 | Distance vector algorithm |
| 22 | 텍스트 중심 | key idea: |
| 23 | 텍스트 중심 | iterative, asynchronous: |
| 24 | 이미지 병행 | x y z |
| 25 | 이미지 병행 | x y z |
| 26 | 이미지 병행 | Distance vector: link cost changes |
| 27 | 이미지 병행 | Distance vector: link cost changes |
| 28 | 이미지 병행 | Comparison of LS and DV algorithms |
| 29 | 텍스트 중심 | 5.1 introduction |
| 30 | 텍스트 중심 | Making routing scalable |
| 31 | 이미지 병행 | aggregate routers into regions known as “autonomous |
| 32 | 이미지 병행 | AS3 |
| 33 | 이미지 병행 | Inter-AS tasks |
| 34 | 텍스트 중심 | Intra-AS Routing |
| 35 | 텍스트 중심 | OSPF (Open Shortest Path First) |
| 36 | 텍스트 중심 | OSPF “advanced” features |
| 37 | 이미지 병행 | Hierarchical OSPF |
| 38 | 이미지 병행 | two-level hierarchy: local area, backbone. |
| 39 | 텍스트 중심 | 5.1 introduction |
| 40 | 텍스트 중심 | Internet inter-AS routing: BGP |
| 41 | 이미지 병행 | eBGP, iBGP connections |
| 42 | 이미지 병행 | BGP basics |
| 43 | 텍스트 중심 | Path attributes and BGP routes |
| 44 | 이미지 병행 | BGP path advertisement |
| 45 | 이미지 병행 | BGP path advertisement |
| 46 | 텍스트 중심 | BGP messages |
| 47 | 이미지 병행 | BGP, OSPF, forwarding table entries |
| 48 | 이미지 병행 | BGP, OSPF, forwarding table entries |
| 49 | 텍스트 중심 | 5.1 introduction |
| 50 | 텍스트 중심 | Software defined networking (SDN) |
| 51 | 이미지 병행 | Recall: per-router control plane |
| 52 | 이미지 병행 | data |
| 53 | 텍스트 중심 | Software defined networking (SDN) |
| 54 | 이미지 병행 | Vertically integrated |
| 55 | 이미지 병행 | Traffic engineering: difficult traditional routing |
| 56 | 이미지 병행 | Traffic engineering: difficult |
| 57 | 이미지 병행 | Traffic engineering: difficult |
| 58 | 이미지 병행 | SDN perspective: data plane switches |
| 59 | 이미지 병행 | SDN perspective: SDN controller |
| 60 | 이미지 병행 | SDN perspective: control applications |
| 61 | 이미지 병행 | Network-wide distributed, robust state management |
| 62 | 이미지 병행 | OpenFlow protocol |
| 63 | 이미지 병행 | OpenFlow: controller-to-switch messages |
| 64 | 이미지 병행 | OpenFlow: switch-to-controller messages |
| 65 | 이미지 병행 | Link-state info |
| 66 | 이미지 병행 | Link-state info |
| 67 | 이미지 병행 | topology |
| 68 | 이미지 병행 | Network |
| 69 | 텍스트 중심 | SDN: selected challenges |
| 70 | 텍스트 중심 | 5.1 introduction |
| 71 | 텍스트 중심 | ICMP: internet control message protocol |
| 72 | 텍스트 중심 | Traceroute and ICMP |
| 73 | 텍스트 중심 | 5.1 introduction |
| 74 | 이미지 병행 | What is network management? |
| 75 | 이미지 병행 | Infrastructure for network management |
| 76 | 이미지 병행 | SNMP protocol |
| 77 | 이미지 병행 | SNMP protocol: message types |
| 78 | 이미지 병행 | SNMP protocol: message formats |
| 79 | 텍스트 중심 | Chapter 5: summary |
