package com.erepnikov.proteus;

import io.sinistral.proteus.server.ServerRequest;
import io.sinistral.proteus.server.ServerResponse;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.nio.ByteBuffer;

@Path("/api")
public class Controller {

    @GET
    @Path("/get-json-entity")
    public ServerResponse<Message> getJsonEntity() {
        Message message = new Message(
                123,
                "Hello There",
                new String[] {"And", "There"}
        );
        return ServerResponse.response(message).applicationJson();
    }

    @GET
    @Path("/get-plain-text")
    public ServerResponse<ByteBuffer> getPlainText(ServerRequest request) {
        return ServerResponse.response("Hello There").textPlain();
    }
}
