package com.example.be.mapper;

import com.example.be.dto.request.Account.AccountDTO;
import com.example.be.dto.response.Account.AccountResponse;
import com.example.be.entity.Account;
import com.example.be.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    @Mapping(source = "idRole",target = "role.id")
    Account toEntity(AccountDTO accountDTO);
    @Mapping(source = "role.id",target = "idRole")
    AccountDTO toDTO(Account account);
    default Account toEntity(AccountDTO dto, Role role) {
        if (dto == null) return null;
        Account entity = toEntity(dto);
        entity.setRole(role);
        return entity;
    }
    @Mapping(source = "role.id",target = "roleId")
    @Mapping(source = "createdAt",target = "createdAt",dateFormat = "yyyy-MM-dd HH:mm:ss")
    @Mapping(source = "updatedAt",target = "updatedAt",dateFormat = "yyyy-MM-dd HH:mm:ss")
    @Mapping(source = "birthday",target = "birthday",dateFormat = "yyyy-MM-dd")
    AccountResponse toResponse(Account account);
}
