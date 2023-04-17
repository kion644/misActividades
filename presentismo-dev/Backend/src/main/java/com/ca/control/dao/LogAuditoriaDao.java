package com.ca.control.dao;

import com.ca.control.model.LogAuditoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogAuditoriaDao extends JpaRepository<LogAuditoria, Long> {

}
