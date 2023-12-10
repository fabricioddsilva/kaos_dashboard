package com.kaos.dashboard.controllers;

import com.kaos.dashboard.dto.ExtractsDTO;
import com.kaos.dashboard.services.ExtractsServices;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/extracts")
public class ExtractsController {

    private ExtractsServices services;

    @GetMapping
    public List<ExtractsDTO> list(){
        return services.list();
    }

    @GetMapping("/doctype")
    public ExtractsDTO docType(){
        return services.docType();
    }
}
