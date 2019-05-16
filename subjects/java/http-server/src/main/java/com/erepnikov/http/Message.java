package com.erepnikov.http;

import java.util.Date;

public class Message {

    private Integer id;

    private String message;

    private String[] extra;

    private Date date;

    public Message() {}

    public Message(Integer id, String message, String[] extra, Date date) {
        this.id = id;
        this.message = message;
        this.extra = extra;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String[] getExtra() {
        return extra;
    }

    public void setExtra(String[] extra) {
        this.extra = extra;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
