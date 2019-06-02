package com.erepnikov.socket;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Server {

    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(8080);
        System.out.println("START");
        while (true) {
            try (Socket socket = server.accept(); OutputStream os = socket.getOutputStream()) {
                String content = "Hello There";
                String result = String.format(
                        "HTTP/1.1 200 OK%nContent-Type: text/plain%nContent-Length: %s%n%n%s",
                        content.length(), content
                );
                os.write(result.getBytes());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
