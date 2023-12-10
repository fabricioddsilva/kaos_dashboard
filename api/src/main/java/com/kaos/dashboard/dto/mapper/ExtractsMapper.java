package com.kaos.dashboard.dto.mapper;

import com.kaos.dashboard.dto.ExtractsDTO;
import com.kaos.dashboard.entities.Extracts;
import org.springframework.stereotype.Component;

@Component
public class ExtractsMapper {
    public ExtractsDTO toDTO(Extracts extracts) {
        if (extracts == null) {
            return null;
        }
        return new ExtractsDTO(extracts.getId(), extracts.getUser_id(), extracts.getPages_process(), extracts.getDoc_type());
    }

    public Extracts toEntity(ExtractsDTO extractsDTO) {
        if (extractsDTO == null) {
            return null;
        }

        Extracts extracts = new Extracts();
        if (extractsDTO.id() != null) {
            extracts.setId(extractsDTO.id());
        }
        extracts.setUser_id(extractsDTO.user_id());
        extracts.setPages_process(extractsDTO.pages_process());
        extracts.setDoc_type(extractsDTO.doc_type());
        return extracts;
    }
}
