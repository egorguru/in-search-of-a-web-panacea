package com.erepnikov.spring.controller;

import com.erepnikov.spring.domain.Message;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @GetMapping("/api/get")
    public Message get() {
        Message message = new Message();
        message.setWorld("hello");
        return message;
    }
}
