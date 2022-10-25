package tn.ipsas.clientservice.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import tn.ipsas.clientservice.domain.User;

@RepositoryRestResource
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
}

