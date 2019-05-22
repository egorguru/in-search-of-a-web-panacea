package com.erepnikov.proteus;

import io.sinistral.proteus.ProteusApplication;

public class Server extends ProteusApplication {

    public static void main(String[] args) {
        System.setProperty("http.port", "8080");
        System.setProperty("application.path", "");
        Server server = new Server();
        server.addController(Controller.class);
        server.start();
        System.out.println("START");
    }
}
