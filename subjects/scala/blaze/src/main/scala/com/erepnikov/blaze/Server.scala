package com.erepnikov.blaze

import java.net.InetSocketAddress

import com.github.plokhotnyuk.jsoniter_scala.core.{JsonValueCodec, writeToArray}
import com.github.plokhotnyuk.jsoniter_scala.macros.{CodecMakerConfig, JsonCodecMaker}
import org.http4s.blaze.channel.nio1.NIO1SocketServerGroup
import org.http4s.blaze.http.RouteAction._
import org.http4s.blaze.http._
import org.http4s.blaze.http.http1.server.Http1ServerStage
import org.http4s.blaze.pipeline.LeafBuilder

import scala.concurrent.Future

case class TinyEntity(message: String)

case class LargeEntity(id: Int, message: String, entity: TinyEntity, extra: Array[String])

object Server {

  implicit val tinyEntityCodec: JsonValueCodec[TinyEntity] = JsonCodecMaker.make[TinyEntity](CodecMakerConfig())
  implicit val largeEntityCodec: JsonValueCodec[LargeEntity] = JsonCodecMaker.make[LargeEntity](CodecMakerConfig())

  def serve(req: HttpRequest): Future[RouteAction] = Future.successful {
    req.url match {
      case "/api/get-tiny-json-entity" => Ok(
        writeToArray(TinyEntity("Hello There")),
        Seq("content-type" -> "application/json"))
      case "/api/get-large-json-entity" => Ok(
        writeToArray(LargeEntity(123, "Hello There", TinyEntity("Hello There Again"), Array("And", "Again"))),
        Seq("content-type" -> "application/json"))
      case "/api/get-plain-text" => Ok("Hello, World!".getBytes(), Seq("content-type" -> "text/plain"))
      case _ => String("Not found", 404, "Not Found", Nil)
    }
  }

  def main(args: Array[String]): Unit = {
    println("START")
    NIO1SocketServerGroup
      .fixedGroup()
      .bind(new InetSocketAddress(8080), _ =>
        Future.successful(LeafBuilder(new Http1ServerStage(serve, HttpServerStageConfig()))))
      .getOrElse(sys.error("Error on Start Up"))
      .join()
  }
}
