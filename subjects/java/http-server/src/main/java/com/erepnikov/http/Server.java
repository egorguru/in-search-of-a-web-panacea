package com.erepnikov.http;

import com.sun.net.httpserver.HttpServer;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class Server {

    static class Message {

        private String message;

        Message() {}

        Message(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api", t -> {
            String path = t.getRequestURI().getPath().substring(4);
            t.getResponseHeaders().add("Content-Type", "application/json");
            OutputStream os = t.getResponseBody();
            byte[] res;
            switch (path) {
                case "/get": {
                    res = mapper.writeValueAsBytes(new Message("Hello There"));
                    t.sendResponseHeaders(200, res.length);
                    break;
                }
                case "/post": {
                    Message requestBody = mapper.readValue(t.getRequestBody(), Message.class);
                    res = mapper.writeValueAsBytes(requestBody);
                    t.sendResponseHeaders(200, res.length);
                    break;
                }
                default: {
                    res = mapper.writeValueAsBytes(new Message("Not Found"));
                    t.sendResponseHeaders(404, 0);
                }
            }
            os.write(res);
            os.close();
        });
        server.setExecutor(null);
        server.start();
        System.out.println("START");
    }
}
