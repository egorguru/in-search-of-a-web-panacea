package com.erepnikov.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

public class Server {

    public void serve() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api", t -> {
            String path = t.getRequestURI().getPath().substring(4);
            OutputStream os = t.getResponseBody();
            byte[] res;
            switch (path) {
                case "/get-tiny-json-entity": {
                    TinyEntity entity = new TinyEntity("Hello There");
                    res = mapper.writeValueAsBytes(entity);
                    t.getResponseHeaders().add("Content-Type", "application/json");
                    t.sendResponseHeaders(200, res.length);
                    break;
                }
                case "/get-large-json-entity": {
                    LargeEntity entity = new LargeEntity(
                            123,
                            "Hello There",
                            new TinyEntity("Hello There Again"),
                            new String[] {"And", "Again"}
                    );
                    res = mapper.writeValueAsBytes(entity);
                    t.getResponseHeaders().add("Content-Type", "application/json");
                    t.sendResponseHeaders(200, res.length);
                    break;
                }
                case "/post-tiny-json-entity": {
                    TinyEntity requestBody = mapper.readValue(t.getRequestBody(), TinyEntity.class);
                    res = mapper.writeValueAsBytes(requestBody);
                    t.getResponseHeaders().add("Content-Type", "application/json");
                    t.sendResponseHeaders(201, res.length);
                    break;
                }
                case "/post-large-json-entity": {
                    LargeEntity requestBody = mapper.readValue(t.getRequestBody(), LargeEntity.class);
                    res = mapper.writeValueAsBytes(requestBody);
                    t.getResponseHeaders().add("Content-Type", "application/json");
                    t.sendResponseHeaders(201, res.length);
                    break;
                }
                case "/get-plain-text": {
                    res = "Hello There".getBytes();
                    t.getResponseHeaders().add("Content-Type", "text/plain");
                    t.sendResponseHeaders(200, res.length);
                    break;
                }
                default: {
                    res = new byte[] {};
                    t.sendResponseHeaders(404, 0);
                }
            }
            os.write(res);
            os.close();
        });
        server.setExecutor(Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2));
        server.start();
    }

    public static void main(String[] args) throws Exception {
        new Server().serve();
        System.out.println("START");
    }
}
