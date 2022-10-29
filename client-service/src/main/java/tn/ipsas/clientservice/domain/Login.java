package tn.ipsas.clientservice.domain;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@MappedSuperclass
@Getter
@Setter
@ToString
@AllArgsConstructor @NoArgsConstructor
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    //TODO: Les clients n'ont pas besoin de login et password
    @Column(unique = false, nullable = true)
    private String login;

    @Column(unique = false, nullable = true)
    private String password;
}
