package com.b205.gambyeol.users.domain;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor // 매개변수가 없는 생성자
@AllArgsConstructor // 모든 인자를 매개변수로 받는 생성자
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId; // PK

    @JoinColumn(name = "from_user_id")
    @ManyToOne
    private Users fromUser;

    @JoinColumn(name = "to_user_id")
    @ManyToOne
    private Users toUser;

    @Builder
    public Follow(Users fromUser, Users toUser) {
        this.fromUser = fromUser;
        this.toUser = toUser;
    }
}
