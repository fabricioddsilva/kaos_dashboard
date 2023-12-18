package com.kaos.dashboard.repositories;

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
}
