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

case class TinyEntity(message: String)

case class LargeEntity(id: Int, message: String, entity: TinyEntity, extra: Array[String])

object Server extends App {

  implicit val actorSystem: ActorSystem = ActorSystem()
  implicit val ioSystem: IOSystem = IOSystem()

  implicit val tinyEntityCodec: JsonValueCodec[TinyEntity] = JsonCodecMaker.make[TinyEntity](CodecMakerConfig())
  implicit val largeEntityCodec: JsonValueCodec[LargeEntity] = JsonCodecMaker.make[LargeEntity](CodecMakerConfig())

  implicit val tinyEntityEncoder: HttpBodyEncoder[TinyEntity] = new HttpBodyEncoder[TinyEntity] {
    override def encode(data: TinyEntity): HttpBody = new HttpBody(writeToArray(data))
    override def contentType: String = "application/json"
  }

  implicit val largeEntityEncoder: HttpBodyEncoder[LargeEntity] = new HttpBodyEncoder[LargeEntity] {
    override def encode(data: LargeEntity): HttpBody = new HttpBody(writeToArray(data))
    override def contentType: String = "application/json"
  }

  HttpServer.start("Colossus", 8080)(initContext => new Initializer(initContext) {
    override def onConnect: RequestHandlerFactory = serverContext => new RequestHandler(serverContext) {
      override def handle: PartialHandler[Http] = {
        case req @ Get on Root / "api" / "get-tiny-json-entity" =>
          Callback.successful(req.ok(TinyEntity("Hello There")))
        case req @ Get on Root / "api" / "get-large-json-entity" =>
          Callback.successful(req.ok(
            LargeEntity(123, "Hello There", TinyEntity("Hello There Again"), Array("And", "Again"))))
        case req @ Get on Root / "api" / "get-plain-text" =>
          Callback.successful(req.ok("Hello There"))
      }
    }
  })
  println("START")
}
