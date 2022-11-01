package tn.ipsas.factureservice.model.user;

import lombok.*;

import javax.persistence.*;

//@MappedSuperclass
@Getter
@Setter
@ToString
@AllArgsConstructor @NoArgsConstructor
public class Login {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
    private Long id;

//    @Column(unique = true, nullable = false)
    private String login;

//    @Column(unique = true, nullable = false)
    private String password;
}
