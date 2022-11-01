package tn.ipsas.clientservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@DiscriminatorValue("CUSTOMER")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Customer extends User {
    private String city; //TODO: Create City Table For Statistique
    //TODO: Add Customer type (Entreprise, ..)
}
