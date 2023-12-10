package com.kaos.dashboard.services;

import com.kaos.dashboard.dto.ExtractsDTO;
import com.kaos.dashboard.dto.mapper.ExtractsMapper;
import com.kaos.dashboard.repositories.ExtractsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExtractsServices {

    private final ExtractsRepository repository;

    private final ExtractsMapper mapper;

    public ExtractsServices(ExtractsMapper mapper,  ExtractsRepository repository){
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<ExtractsDTO> list(){
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public ExtractsDTO docType(){
        
    }

}
