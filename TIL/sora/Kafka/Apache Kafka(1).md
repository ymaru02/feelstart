# Apache Kafka

[TOC]

**`강의` 빅데이터의 기본 💁‍♂️ 아파치 카프카! 개요 및 설명 | What is apache kafka?**

## 개요 및 설명

### 카프카는 무엇인가?

#### Before Kafka

![kafka1](Apache_Kafka.assets/1.jpg)

데이터를 전송하는 소스 애플리케이션과 데이터를 받는 타겟 애플리케이션으로 구성

처음에는 간단하게 단방향 통신을 수행

![kafka2](Apache_Kafka.assets/2.jpg)

점점 소스 애플리케이션과 타겟 애플리케이션이 많아지면서 데이터를 전송하는 라인이 복잡해짐

문제는 소스 애플리케이션과 타켓 애플리케이션 개수가 늘어날수록 데이터를 전송하는 라인이 많아짐

![kafka3](Apache_Kafka.assets/3.png)

=> 배포와 장애에 대응하기 어렵다, 데이터를 전송할 때 프로토콜 포맷(형식)의 파편화가 심해진다, 추후에 **데이터 포맷**[^1] 내부에 변경사항이 있을 때 유지보수하기 어려워진다.



이런 복잡함을 해결하기 위해 LinkedIn에서 내부적으로 Kafka를 최초로 개발했고 현재는 오픈소스로 제공하고 있다.

아파치 카프카는 소스 애플리케이션과 타겟 애플리케이션의 **커플링**[^2]을 약하게 하기 위해 나왔다.

![kafka4](Apache_Kafka.assets/4.png)

<br/>

#### After Kafka

![kafka5](Apache_Kafka.assets/5.png)

소스 애플리케이션은 아파치 카프카에 데이터를 전송

타겟 애플리케이션은 카프카에서 데이터를 가져옴

예시로, 소스 애플리케이션은 쇼핑몰의 클릭 로그, 은행의 결제 로그 등을 보낼 수 있습니다.

타겟 애플리케이션은 로그 적재, 로그 처리 등의 역할을 합니다.

소스 애플리케이션에서 보낼 수 있는 데이터 포맷은 거의 제한이 없음( json, tsv, avro etc...)

<br/>

<br/>

### 카프카를 통해 무엇을 할 수 있을까?

![kafka6](Apache_Kafka.assets/6.png)

Kafka는 확장성이 뛰어난 분산 메시지 큐(FIFO : First In First Out)로, 각종 데이터를 담는 Topic 이라는 개념이 있는데 쉽게 말하면 **queue**라고 보면 된다.

queue에 데이터를 넣는 역할은 Kafka Producer가 하고 queue에서 데이터를 가져가는 역할은 Kafka Consumer가 한다.

Producer와 Consumer는 라이브러리로 되어 있어서 애플리케이션에서 구현이 가능하다.

이와 같이 카프카는 아주 유연한 queue 역할을 한다.



#### Kafka 의 특징으로는 

-  분산 아키텍쳐 구성, Fault-tolerance한 architecture(with zookeeper), **데이터 유실 방지**를 위한 구성이 잘되어 있음
  즉, **고가용성으로서 서버가 이슈가 생기거나 갑작스럽게 랙(전원이) 내려간다던가 하는 상황에서도 데이터를 손실없이 복구할 수 있다.**

-  Pub / Sub 메시징 모델을 채용

- Producer가 Batch형태로 broker로 메시지 전송이 가능하여 속도 개선

- 파일 시스템에 메시지를 저장하므로, 데이터의 영속성 보장

- Consume된 메시지를 곧바로 삭제하지 않고 offset을 통한 consumer-group별 개별 consume가능

- **낮은 지연(latency)과 높은 처리량(Throughput)을 통해서 아주 효과적으로 아주 많은 데이터를 처리**

  

이러한 운영상의 특징들 때문에 많은 기업이 내부에 카프카를 사용하고 있다.

 <br/>

<br/>

### Kafka 사용 주요 사례

**LinkedIn** : activity streams, operational metrics, data bus(400 nodes, 18k topics, 220B msg/day in May 2014)

**Netflix** : real-time monitoring and event processing

**Twitter** : as part of their Storm real-time data pipelines

**Spotify** : log delivery, Hadoop

**11번가** : 카프카를 이용한 비동기 주문시스템([카프카 컨슈머 애플리케이션 배포 전략 medium post](https://medium.com/11st-pe-techblog/카프카-컨슈머-애플리케이션-배포-전략-4cb2c7550a72))

<br/>

<br/>

<br/>

## 참고자료

[빅데이터의 기본 💁‍♂️ 아파치 카프카! 개요 및 설명 | What is apache kafka?](https://www.youtube.com/watch?v=waw0XXNX-uQ&amp;list=PL3Re5Ri5rZmkY46j6WcJXQYRlDRZSUQ1j&amp;index=1)

[빅 데이터 처리를 위한 아파치 Kafka 개요 및 설명](https://blog.voidmainvoid.net/179)

<br/>

<br/>

[^1]: 통신, 처리, 해석하는데 적합하도록 형식화된 표현(Syntax)
[^2]: 결합, 소프트웨어 모듈 간의 상호 의존 정도를 말함



