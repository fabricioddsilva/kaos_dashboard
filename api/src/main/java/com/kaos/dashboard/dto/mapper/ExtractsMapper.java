package com.kaos.dashboard.dto.mapper;

import com.kaos.dashboard.dto.ExtractsDTO;
import com.kaos.dashboard.dto.UserDTO;
import com.kaos.dashboard.entities.Extracts;
import org.springframework.stereotype.Component;

@Component
public class ExtractsMapper {

    private Long id = (long) Math.random() * 10;
    public ExtractsDTO toDTO(Extracts extracts) {
        if (extracts == null) {
            return null;
        } else if (extracts.getId() == 0){
            return new ExtractsDTO(id, extracts.getUser_id(), extracts.getPages_process(), extracts.getDoc_type());
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
