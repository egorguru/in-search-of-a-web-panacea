package com.erepnikov.spring.controller;

import com.erepnikov.spring.domain.Message;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MessageController {

    @GetMapping("/get-json-entity")
    public Message get() {
        return new Message(
                123,
                "Hello There",
                new String[] {"And", "There"}
        );
    }

    @ResponseStatus(HttpMethod.CREATE)
    @PostMapping("/post-json-entity")
    public Message post(@RequestBody Message message) {
        return message;
    }
}
