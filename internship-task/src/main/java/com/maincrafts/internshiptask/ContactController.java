package com.maincrafts.internshiptask;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    @PostMapping("/contact")
    public String handleContact(@RequestParam String name,
                                @RequestParam String email,
                                @RequestParam String message) {
        
        // Prints the submitted data to the VS Code terminal
        System.out.println("Name: " + name + ", Email: " + email + ", Message: " + message);
        
        return "Form submitted successfully!";
    }
}