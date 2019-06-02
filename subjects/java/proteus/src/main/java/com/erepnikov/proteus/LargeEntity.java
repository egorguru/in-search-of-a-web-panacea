package com.erepnikov.proteus;

public class LargeEntity {

    private Integer id;

    private String message;

    private TinyEntity entity;

    private String[] extra;

    public LargeEntity() {}

    public LargeEntity(Integer id, String message, TinyEntity entity, String[] extra) {
        this.id = id;
        this.message = message;
        this.entity = entity;
        this.extra = extra;
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

    public TinyEntity getTinyEntity() {
        return entity;
    }

    public void setTinyEntity(TinyEntity entity) {
        this.entity = entity;
    }

    public String[] getExtra() {
        return extra;
    }

    public void setExtra(String[] extra) {
        this.extra = extra;
    }
}
