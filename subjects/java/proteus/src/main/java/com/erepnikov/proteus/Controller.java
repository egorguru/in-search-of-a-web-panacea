package com.erepnikov.proteus;

import io.sinistral.proteus.server.ServerRequest;
import io.sinistral.proteus.server.ServerResponse;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.nio.ByteBuffer;

@Path("/api")
public class Controller {

    @GET
    @Path("/get-tiny-json-entity")
    public ServerResponse<TinyEntity> getTinyJsonEntity() {
        TinyEntity entity = new TinyEntity("Hello There");
        return ServerResponse.response(entity).applicationJson();
    }

    @GET
    @Path("/get-large-json-entity")
    public ServerResponse<LargeEntity> getLargeJsonEntity() {
        LargeEntity entity = new LargeEntity(
                123,
                "Hello There",
                new TinyEntity("Hello There Again"),
                new String[] {"And", "Again"}
        );
        return ServerResponse.response(entity).applicationJson();
    }

    @GET
    @Path("/get-plain-text")
    public ServerResponse<ByteBuffer> getPlainText(ServerRequest request) {
        return ServerResponse.response("Hello There").textPlain();
    }

    @GET
    @Path("/get-tiny-json-entity-by-id/{id}")
    public ServerResponse<TinyEntityWithId> getTinyJsonEntityWithId(@PathParam("id") Integer id) {
        TinyEntityWithId entity = new TinyEntityWithId(id, "Hello There");
        return ServerResponse.response(entity).applicationJson();
    }
}
