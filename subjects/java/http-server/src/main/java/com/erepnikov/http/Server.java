package com.erepnikov.http;

import com.sun.net.httpserver.HttpServer;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class Server {

    public void serve() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api", t -> {
            String path = t.getRequestURI().getPath().substring(4);
            OutputStream os = t.getResponseBody();
            byte[] res;
            switch (path) {
                case "/get-json-entity": {
                    Message message = new Message(
                            123,
                            "Hello There",
                            new String[] {"And", "There"}
                    );
                    res = mapper.writeValueAsBytes(message);
                    t.getResponseHeaders().add("Content-Type", "application/json");
                    t.sendResponseHeaders(200, res.length);
                    break;
                }
                case "/post-json-entity": {
                    Message requestBody = mapper.readValue(t.getRequestBody(), Message.class);
                    res = mapper.writeValueAsBytes(requestBody);
                    t.getResponseHeaders().add("Content-Type", "application/json");
                    t.sendResponseHeaders(201, res.length);
                    break;
                }
                case "/get-plain-text": {
                    res = "Hello There".getBytes();
                    t.getResponseHeaders().add("Content-Type", "plain/text");
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
        server.setExecutor(null);
        server.start();
    }

    public static void main(String[] args) throws Exception {
        new Server().serve();
        System.out.println("START");
    }
}
