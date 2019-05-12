package com.erepnikov.http;

import com.sun.net.httpserver.HttpServer;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.OutputStream;
import java.net.InetSocketAddress;

public class Server {

    static class Message {

        private String hello;

        Message(String hello) {
            this.hello = hello;
        }

        public String getHello() {
            return hello;
        }

        public void setHello(String hello) {
            this.hello = hello;
        }
    }

    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/get", t -> {
            Message message = new Message("world");
            byte[] res = mapper.writeValueAsBytes(message);
            t.getResponseHeaders().add("Content-Type", "application/json");
            t.sendResponseHeaders(200, res.length);
            OutputStream os = t.getResponseBody();
            os.write(res);
            os.close();
        });
        server.setExecutor(null);
        server.start();
        System.out.println("Server has been started");
    }
}
