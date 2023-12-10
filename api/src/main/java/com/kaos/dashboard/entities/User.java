package com.kaos.dashboard.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table( name = "users")
public class User {
    @Id
    private long id;
    private String name;
    private String segment;
}
