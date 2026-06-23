package com.civicai.backend.repository;

import com.civicai.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    Optional<Complaint> findByLocationAndCategory(String location, String category);
    List<Complaint> findByDepartment(String department);
}

