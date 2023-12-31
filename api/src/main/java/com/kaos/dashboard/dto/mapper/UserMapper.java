package com.kaos.dashboard.dto.mapper;

import com.kaos.dashboard.dto.UserDTO;
import com.kaos.dashboard.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    private Long id = (long) Math.random() * 10;


    public UserDTO toDTO(User user){
        if(user == null){
            return null;
        } else if (user.getId() == 0){
            return new UserDTO(id, user.getName(), user.getSegment());
        }
        return new UserDTO(user.getId(), user.getName(), user.getSegment());
    }

public User toEntity(UserDTO userDTO){
    if(userDTO == null){
        return null;
    }

    User user = new User();
    if(userDTO.id()!= null){
        user.setId(userDTO.id());
    }
    user.setName(userDTO.name());
    user.setSegment(userDTO.segment());
    return user;
}
}


