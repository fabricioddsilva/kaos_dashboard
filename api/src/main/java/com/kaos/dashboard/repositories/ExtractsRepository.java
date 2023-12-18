package com.kaos.dashboard.repositories;

import com.kaos.dashboard.dto.projections.DocTypeCount;
import com.kaos.dashboard.entities.Extracts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExtractsRepository extends JpaRepository<Extracts, Long> {

    @Query(value = "SELECT doc_type as doc_type, count(id) as contagem FROM extracts GROUP BY doc_type ORDER BY contagem DESC", nativeQuery = true)
    public List<DocTypeCount> doctypeDesc();

    @Query(value = "SELECT doc_type as doc_type, count(id) as contagem FROM extracts GROUP BY doc_type ORDER BY contagem ASC", nativeQuery = true)
    public List<DocTypeCount> doctypeAsc();
}
