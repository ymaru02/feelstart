# Apache Kafka

[TOC]

**`강의` 아파치 카프카 | 데이터를 카프카로 전송🚀하는 프로듀서**

## 카프카 프로듀서란?

카프카 프로듀서란 데이터를 프로듀싱 즉 **생산**하는 역할을 한다.
즉 데이터를 kafka topic 에 생성한다는 말과 같다.

프로듀서는 데이터를 카프카에 **보내는** 역할도 하고 있다.
예를 들어, 엄청난 양의 클릭로그들을 **대량으로, 그리고 실시간으로** 카프카에 적재할 때 프로듀서를 사용할 수 있다.



### 프로듀서의 역할

- topic에 전송할 메시지를 생성할 수 있다
- 특정 topic으로 데이터를 publish, 전송할 수 있다
이를 통해 기본적인 카프카 데이터 전송이 완성된다.
- kafka broker로 데이터를 전송할 때 전송 성공여부를 알 수 있고, 처리를 실패할 경우 재시도할 수 있다.

<br/>

카프카 클라이언트인 컨슈머와 프로듀서를 사용하기 위해서는 아파치 카프카 라이브러리를 추가해야 한다.
라이브러리는 gradle 이나 maven 같은 도구들을 사용하여 편리하게 가져올 수 있다.

카프카 클라이언트를 디펜던시로 잡을 때 주의할 점은 버전을 맞추는 것으로, 카프카는 브로커 버전과 클라이언트 버전의 **하위호환성**이 완벽하게 모든 버전에 대해서 지원하지 않기 때문이다.
일부 카프카 브로커 버전은 특정 카프카 클라이언트 버전을 지원하지 않을 수도 있다.

![Kafka14](Apache_Kafka.assets/14.png)



클라이언트 버전별 하위호환성에 대한 설명은 [하위호환성 참고 블로그 링크](https://blog.voidmainvoid.net/193)

<br/>

### 카프카 프로듀서를 작성한 코드 참고

![Kafka15](Apache_Kafka.assets/15.png)

부트스트랩 서버설정을 로컬 호스트의 카프카를 바라보도록 설정

→ 카프카 브로커의 주소목록은 되도록이면 2개 이상의 ip와 port를 설정하도록 권장한다.
	둘 중 한개의 브로커가 비정상일 경우 다른 정상적인 브로커에 연결되어 사용 가능하기 때문이다.
	그러므로 실제로 애플리케이션을 카프카와 연동할 때는 반드시 2개 이상의 브로커 정보를 넣는 것을 추천한다.

나머지 key 와 value에 대해 스트링**시리얼라이저[^1]**로 직렬화를 설정

→ 키는 메시지를 보내면, 토픽의 파티션이 지정될 때 쓰인다.



 ![Kafka16](Apache_Kafka.assets/16.png)

![Kafka17](Apache_Kafka.assets/17.png)

 카프카 클라이언트에서 제공하는 ProducerRecord 클래스를 사용해 전송할 객체인 ProducerRecord 인스턴스를 생성할 때 어느 토픽에 넣을 것인지, 어떤 key와 value를 담을 것인지 선언할 수 있다.

<br/>

이번 코드는 key없이 click_log 토픽에 login이라는 value를 보낸다.

만약 key를 포함하여 보내고 싶다면 아래 코드와 같이 ProducerRecord 를 선언하면 된다.

![Kafka18](Apache_Kafka.assets/18.png)

파라미터 개수에 따라 자동으로 오버로딩되어 인스턴스가 생성되므로 이 점을 유의해서 ProducerRecord를 생성해야 한다.

<br/>

데이터가 도착할 토픽, 데이터, 카프카 브로커의 호스트와 포트까지 데이터를 전송할 모든 준비가 되었다. 

이전에 생성된 프로듀서 인스턴스에 send()의 파라미터로 ProducerRecord를 넣으면 전송이 이루어지게 된다.

전송이 완료되면 close() 를 통해 프로듀서가 종료된다.



### 프로듀서가 전송한 데이터의 흐름

key가 null인 데이터를 파티션이 1개인 토픽에 보내면 다음과 같이 차례대로 쌓이게 된다.

파티션이 1개 더 늘어나면 key가 null이므로 데이터가 round-robin으로 2개의 파티션에 차곡차곡 쌓이게 된다.

![Kafka19](Apache_Kafka.assets/19.png)

<br/>

반면에 key가 존재하는 데이터를 토픽에 보내면 key를 특정한 hash값으로 변경시켜 파티션과 1대 1 매칭을 시킨다. 즉, 각 파티션에 동일한 key의 value만 쌓이게 된다.

예시로 buy라는 value의 key를 1로, review라는 value의 key를 2라고 지정한다.

![Kafka20](Apache_Kafka.assets/20.png)

<br/>

그런데 이 때 토픽에 새로운 파티션을 한 개 더 추가하면 key와 파티션의 매칭이 깨지기 때문에 key와 파티션 연결은 보장되지 않는다.

![Kafka](Apache_Kafka.assets/21.png)

그러므로 key를 사용할 경우, 이 점을 유의하셔서 파티션 개수를 생성하고 추후에 생성하지 않는 것을 추천한다.

<br/>

카프카 프로듀서의 기본적인 구현은 매우 간단하지만 **데이터 유실 혹은 브로커의 이슈에 대처**하기 위해서는 추가적인 옵션들과 코드가 필요하다.

<br/>

<br/>



## Broker, Replication, ISR 핵심요소

Broker, Replication, ISR 이 3가지 요소들은 카프카를 운영하는데 아주 중요한 역할을 하고 있다.

 **replication** 즉, 복제는 카프카 아키텍처의 핵심이다.
클러스터에서 서버가 장애가 생겼을 때 카프카의 가용성을 보장하는 가장 좋은 방법이 복제이기 때문이다.

<br/>

### Kafka broker

Kafka broker는 카프카가 설치되어 있는 서버 단위를 말한다.

보통 3개 이상의 broker로 구성하여 사용하는 것을 권장한다.

![Kafka22](Apache_Kafka.assets/22.png)

만약 파티션이 1개이고 replication이 1인 topic이 존재하고 브로커가 3대라면 브로커 3대 중 1대에 해당 topic의 정보(데이터)가 저장된다.



#### Kafka replication

replication은 partition의 복제를 뜻한다.

만약 replication이 1이라면  partition은 1개만 존재한다는 것이고 replication이 2라면 partition은 원본 1개와 복제본 1개로 총 2개가 존재한다.

만약 replication이 3이라면 partition은 원본 1개 복제복 2개로 총 3개가 존재한다.







## 참고자료

[아파치 카프카 | 데이터를 카프카로 전송🚀하는 프로듀서](https://www.youtube.com/watch?v=aAu0FE3nvbk&list=PL3Re5Ri5rZmkY46j6WcJXQYRlDRZSUQ1j&index=3)

[아파치 카프카 | Broker, Replication, ISR 👀핵심요소 3가지!](https://www.youtube.com/watch?v=qpEEoGpWVig&list=PL3Re5Ri5rZmkY46j6WcJXQYRlDRZSUQ1j&index=4)

<br/>

<br/>

[^1]: key 혹은  value를 직렬화하기 위해 사용됨, [Byte array, String, Integer 시리얼라이즈를 사용할 수 있다.]