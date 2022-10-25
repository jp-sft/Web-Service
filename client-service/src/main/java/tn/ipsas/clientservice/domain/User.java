package tn.ipsas.clientservice.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="user_type",discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@ToString
@AllArgsConstructor @NoArgsConstructor
public class User extends Account{

    @Column(nullable = false)
    private String firstName ;

    private String lastName;

    @Temporal(TemporalType.DATE)
    @Column(name="birth_days")
    private Date dateOfBirth; // ToDo: Rename to birthDays

    @Column(name="gender")
    private String sex; //TODO: Create Gender Enum Type and rename to gender

    private String email;

    private String phoneNumber;

    private String address;
}
