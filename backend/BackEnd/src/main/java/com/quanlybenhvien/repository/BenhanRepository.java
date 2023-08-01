package com.quanlybenhvien.repository;

import com.quanlybenhvien.entity.Benhan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BenhanRepository extends JpaRepository<Benhan, String> {

    List<Benhan> findByMsbn(String msbn);
}