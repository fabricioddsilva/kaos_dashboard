package com.kaos.dashboard.dto;

public record ExtractsDTO(
        Long id,
        Long user_id,
        Integer pages_process,
        String doc_type
) {
}
