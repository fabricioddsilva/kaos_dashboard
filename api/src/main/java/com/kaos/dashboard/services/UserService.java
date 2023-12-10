package com.kaos.dashboard.services;

import com.kaos.dashboard.dto.UserDTO;
import com.kaos.dashboard.dto.mapper.UserMapper;
import com.kaos.dashboard.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRep;

    private final UserMapper mapper;

    public UserService(UserRepository userRep, UserMapper mapper){
        this.userRep = userRep;
        this.mapper = mapper;
    }

    public List<UserDTO> list(){
        return userRep.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
}
