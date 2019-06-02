package com.erepnikov.http;

public class TinyEntity {

    private String message;

    public TinyEntity() {}

    public TinyEntity(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
