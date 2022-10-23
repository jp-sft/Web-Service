package tn.ipsas.paymentservice.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import tn.ipsas.paymentservice.domain.Currency;

@RepositoryRestResource
public interface CurrencyService extends PagingAndSortingRepository<Currency, Long> {
}
