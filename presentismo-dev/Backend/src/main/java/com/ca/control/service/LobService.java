
package com.ca.control.service;

import org.hibernate.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.InputStream;
import java.sql.Blob;

@Service
@Transactional
public class LobService {

    @PersistenceContext
    private EntityManager entityManager;          

    public Blob createBlob(InputStream content, long size) {
        return ((Session)entityManager).getLobHelper().createBlob(content, size);
    }
}
