package com.erepnikov.colossus

import akka.actor.ActorSystem
import colossus.core._
import colossus.protocols.http.HttpMethod.Get
import colossus.protocols.http.UrlParsing.{/, Root, on}
import colossus.protocols.http._
import colossus.service.Callback
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
    override def onConnect: RequestHandlerFactory = serverContext => new RequestHandler(serverContext) {
      override def handle: PartialHandler[Http] = {
        case req @ Get on Root / "api" / "get-json-entity" =>
          Callback.successful(req.ok(Message(123, "Hello There", Array("And", "There"))))
        case req @ Get on Root / "api" / "get-plain-text" =>
          Callback.successful(req.ok("Hello There"))
      }
    }
  })
  println("START")
}
