package com.civicai.backend.service;

import com.civicai.backend.entity.Complaint;
import com.civicai.backend.repository.ComplaintRepository;
import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository repository;
    @Autowired
    private AIService AIService;
    public Complaint saveComplaint(@Nonnull Complaint complaint) {
        String aiResponse =
                AIService.analyzeComplaint(
                        complaint.getDescription()
                );
        try {
            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(aiResponse);

            String content = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            String[] lines = content.split("\\n");

            complaint.setCategory(
                    lines[0].replace("Category:", "").trim()
            );

            complaint.setDepartment(
                    lines[1].replace("Department:", "").trim()
            );

            complaint.setPriority(
                    lines[2].replace("Priority:", "").trim()
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        Optional<Complaint> existingComplaint =
                repository.findByLocationAndCategory(
                        complaint.getLocation(),
                        complaint.getCategory()
                );

        if (existingComplaint.isPresent()) {

            Complaint oldComplaint = existingComplaint.get();

            oldComplaint.setDuplicateCount(
                    oldComplaint.getDuplicateCount() + 1
            );

            return repository.save(oldComplaint);

        } else {

            complaint.setDuplicateCount(1);

            complaint.setStatus("Pending");

            return repository.save(complaint);
        }
    }

    public List<Complaint> getAllComplaints() {
        return repository.findAll();
    }
    public List<Complaint> getComplaintsByDepartment(String department) {
        return repository.findByDepartment(department);
    }
    public Complaint updateComplaintStatus(Long id, String status) {

        Complaint complaint = repository.findById(id).orElse(null);

        if (complaint != null) {
            complaint.setStatus(status);
            return repository.save(complaint);
        }

        return null;
    }
}