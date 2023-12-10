package com.kaos.dashboard.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Extracts {

    @Id
    private long id;

    private long user_id;

    private int pages_process;

    private String doc_type;
}
