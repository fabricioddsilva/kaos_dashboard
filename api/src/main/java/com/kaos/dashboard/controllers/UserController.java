package com.kaos.dashboard.controllers;

import com.kaos.dashboard.dto.UserDTO;
import com.kaos.dashboard.dto.projections.UserDocTypeCount;
import com.kaos.dashboard.dto.projections.UserExtracts;
import com.kaos.dashboard.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private UserService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserExtracts> list(){
        return service.list();
    }

    @GetMapping("/{id}/doctype")
    public List<UserDocTypeCount> userDocTypeCounts(@PathVariable Long id){
        return service.userDocTypeCounts(id);
    }

}
