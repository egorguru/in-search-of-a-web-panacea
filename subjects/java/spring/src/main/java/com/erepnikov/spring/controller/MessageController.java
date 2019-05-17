package com.erepnikov.spring.controller;

import com.erepnikov.spring.domain.Message;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MessageController {

    @GetMapping("/get-json-entity")
    public Message getJsonEntity() {
        return new Message(
                123,
                "Hello There",
                new String[] {"And", "There"}
        );
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post-json-entity")
    public Message postJsonEntity(@RequestBody Message message) {
        return message;
    }

    @GetMapping("/get-plain-text")
    public String getPlainText() {
        return "Hello There";
    }
}
