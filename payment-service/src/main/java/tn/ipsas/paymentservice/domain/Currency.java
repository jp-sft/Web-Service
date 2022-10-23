package tn.ipsas.paymentservice.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "currencies") @Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String Code;

    // TODO : Add Country
    // TODO : Add Symbole

}
