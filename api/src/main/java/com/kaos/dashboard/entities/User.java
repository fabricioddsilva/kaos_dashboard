package com.kaos.dashboard.entities;

import jakarta.persistence.*;
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
