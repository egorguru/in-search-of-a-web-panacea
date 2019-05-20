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

case class Message(id: Int, message: String, extra: Array[String])

object Server {

  implicit val codec: JsonValueCodec[Message] = JsonCodecMaker.make[Message](CodecMakerConfig())

  def serve(req: HttpRequest): Future[RouteAction] = Future.successful {
    req.url match {
      case "/api/get-plain-text" => Ok("Hello, World!".getBytes(), Seq("content-type" -> "text/plain"))
      case "/api/get-json-entity" => Ok(
        writeToArray(Message(123, "Hello There", Array("And", "There"))),
        Seq("content-type" -> "application/json"))
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
