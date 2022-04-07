package com.b205.gambyeol.users.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
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
