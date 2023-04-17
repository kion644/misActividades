package com.ca.control.service;

import com.ca.control.dao.PaisDao;
import com.ca.control.model.Pais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PaisService {

    @Autowired
    PaisDao paisDao;


    public List<Pais> findAll() throws Exception{
        try{
            return paisDao.findAll();
        }
        catch (Exception e){
            throw e;
        }
    }
}
