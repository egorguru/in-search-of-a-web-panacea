package com.erepnikov.colossus

import akka.actor.ActorSystem
import colossus.core._
import colossus.protocols.http._
import colossus.service.Callback.Implicits._
import colossus.service.GenRequestHandler.PartialHandler
import com.github.plokhotnyuk.jsoniter_scala.core._
import com.github.plokhotnyuk.jsoniter_scala.macros._

case class Message(id: Int, message: String, extra: Array[String])

object Server extends App {

  implicit val actorSystem: ActorSystem = ActorSystem()
  implicit val ioSystem: IOSystem = IOSystem()

  implicit val codec: JsonValueCodec[Message] = JsonCodecMaker.make[Message](CodecMakerConfig())

  implicit val messageEncoder: HttpBodyEncoder[Message] = new HttpBodyEncoder[Message] {
    override def encode(data: Message): HttpBody = new HttpBody(writeToArray(data))
    override def contentType: String = "application/json"
  }

  HttpServer.start("Colossus", 8080)(initContext => new Initializer(initContext) {
    println("START")
    override def onConnect: RequestHandlerFactory = serverContext => new RequestHandler(serverContext) {
      override def handle: PartialHandler[Http] = {
        case req if req.head.url == "/api/get-json-entity" => req.ok(Message(123, "Hello There", Array("And", "There")))
        case req if req.head.url == "/api/get-plain-text" => req.ok("Hello There")
      }
    }
  })
}
