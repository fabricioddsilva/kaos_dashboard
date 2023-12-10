package com.kaos.dashboard.repositories;

import com.kaos.dashboard.entities.Extracts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExtractsRepository extends JpaRepository<Extracts, Long> {

    @Query(value = "select doc_type from extracts", nativeQuery = true)
    public Extracts docType();
}
