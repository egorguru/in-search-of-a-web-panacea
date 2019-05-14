package com.erepnikov.spring.controller;

import com.erepnikov.spring.domain.Message;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MessageController {

    @GetMapping("/get")
    public Message get() {
        Message message = new Message();
        message.setMessage("hello");
        return message;
    }

    @PostMapping("/post")
    public Message post(@RequestBody Message message) {
        return message;
    }
}
