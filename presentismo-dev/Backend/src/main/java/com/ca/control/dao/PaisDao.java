package com.ca.control.dao;

import com.ca.control.model.Pais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaisDao  extends JpaRepository<Pais, Integer> {
}
