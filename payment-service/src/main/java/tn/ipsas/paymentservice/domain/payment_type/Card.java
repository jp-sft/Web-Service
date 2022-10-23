package tn.ipsas.paymentservice.domain.payment_type;

import lombok.*;
import tn.ipsas.paymentservice.domain.Payment;

import javax.persistence.*;
import java.util.Date;

@Entity
@DiscriminatorValue("CARD")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Card extends Payment {

    @Column(unique = true)
    private String number;

    @Enumerated(EnumType.STRING)
    @Column(name = "card_type")
    private CardType cardType;

    @Temporal(TemporalType.DATE)
    private Date expireDate;

}
