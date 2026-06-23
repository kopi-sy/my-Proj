package com.civicai.backend.controller;

import com.civicai.backend.service.AIService;
import com.civicai.backend.entity.Complaint;
import com.civicai.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService service;
    @Autowired
    private AIService AIService;

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        return service.saveComplaint(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return service.getAllComplaints();
    }

    @GetMapping("/department/{department}")
    public List<Complaint> getComplaintsByDepartment(@PathVariable String department) {
        return service.getComplaintsByDepartment(department);
    }

    @PutMapping("/{id}")
    public Complaint updateStatus(@PathVariable Long id,
                                  @RequestBody Complaint complaint) {
        return service.updateComplaintStatus(id, complaint.getStatus());
    }

    @PostMapping("/analyze")
    public String analyzeComplaint(@RequestBody Complaint complaint) {
        return AIService.analyzeComplaint(complaint.getDescription());
    }
}