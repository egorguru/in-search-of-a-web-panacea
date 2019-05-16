package com.erepnikov.socket;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class Server {

    public static void main(String[] args) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ServerSocket server = new ServerSocket(8080);
        System.out.println("START");
        while (true) {
            try (Socket socket = server.accept(); OutputStream os = socket.getOutputStream()) {
                Message message = new Message(
                        123,
                        "Hello There",
                        new String[] {"And", "There"},
                        new Date()
                );
                String json = mapper.writeValueAsString(message);
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
