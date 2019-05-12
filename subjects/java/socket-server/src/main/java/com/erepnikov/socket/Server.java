package com.erepnikov.socket;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

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

    public static void main(String[] args) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ServerSocket server = new ServerSocket(8080);
        System.out.println("Server has been started");
        while (true) {
            try (Socket socket = server.accept(); OutputStream os = socket.getOutputStream()) {
                String json = mapper.writeValueAsString(new Message("world"));
                String result = String.format(
                        "HTTP/1.1 200 OK%nContent-Type: application/json%nContent-Length: %s%n%n%s",
                        json.length(), json
                );
                os.write(result.getBytes());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
