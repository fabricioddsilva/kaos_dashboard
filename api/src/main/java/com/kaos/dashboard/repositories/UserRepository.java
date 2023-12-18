package com.kaos.dashboard.repositories;

import com.kaos.dashboard.dto.projections.UserDocTypeCount;
import com.kaos.dashboard.dto.projections.UserExtracts;
import com.kaos.dashboard.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select * from users order by name", nativeQuery = true)
    public List<User> orderByName();

    @Query(value = "select u.*, count(e.id) as ocorrencias from users as u join extracts as e on e.user_id = u.id group by u.id order by ocorrencias DESC", nativeQuery = true)
    public List<UserExtracts> userExtracts();

    @Query(value = "select u.*, e.doc_type, count(e.id) as contagem from users as u join extracts as e on u.id = e.user_id where u.id = :id group by u.id, e.doc_type order by contagem desc", nativeQuery = true)
    public List<UserDocTypeCount> userDocTypeCountDesc(Long id);

    @Query(value = "select u.*, e.doc_type, count(e.id) as contagem from users as u join extracts as e on u.id = e.user_id where u.id = :id group by u.id, e.doc_type order by contagem asc", nativeQuery = true)
    public List<UserDocTypeCount> userDocTypeCountAsc(Long id);
}
