package tn.ipsas.factureservice.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

//@Entity
//@DiscriminatorValue("ADMINISTRATOR")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Administrator extends User {
    private String role; //TODO: create Admin Role Enum Type
}
