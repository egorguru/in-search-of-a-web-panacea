package com.erepnikov.spring.controller;

import com.erepnikov.spring.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MessageController {

    @GetMapping("/get-tiny-json-entity")
    public TinyEntity getTinyJsonEntity() {
        return new TinyEntity("Hello There");
    }

    @GetMapping("/get-large-json-entity")
    public LargeEntity getLargeJsonEntity() {
        return new LargeEntity(
                123,
                "Hello There",
                new TinyEntity("Hello There Again"),
                new String[] {"And", "Again"}
        );
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post-tiny-json-entity")
    public TinyEntity postTinyJsonEntity(@RequestBody TinyEntity entity) {
        return entity;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post-large-json-entity")
    public LargeEntity postLargeJsonEntity(@RequestBody LargeEntity entity) {
        return entity;
    }

    @GetMapping("/get-plain-text")
    public String getPlainText() {
        return "Hello There";
    }

    @GetMapping("/get-tiny-json-entity-by-id/{id}")
    public TinyEntityWithId getTinyJsonEntity(@PathVariable("id") Integer id) {
        return new TinyEntityWithId(id, "Hello There");
    }
}
