package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows your HTML file to send requests here
public class ContactController {

    @PostMapping("/contact")
    public String handleContactForm(@RequestBody ContactRequest request) {
        // Print the data to the server console
        System.out.println("=== NEW CONTACT FORM SUBMISSION ===");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Message: " + request.getMessage());
        System.out.println("===================================");

        // Send a success response back to the frontend
        return "Message received successfully!";
    }
}