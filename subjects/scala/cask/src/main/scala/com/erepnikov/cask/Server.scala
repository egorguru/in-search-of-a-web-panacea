package com.erepnikov.cask

import cask._
import com.github.plokhotnyuk.jsoniter_scala.core.{JsonValueCodec, writeToArray}
import com.github.plokhotnyuk.jsoniter_scala.macros.{CodecMakerConfig, JsonCodecMaker}
import io.undertow.Undertow

case class Message(id: Int, message: String, extra: Array[String])

object Controller extends Routes {

  implicit val codec: JsonValueCodec[Message] = JsonCodecMaker.make[Message](CodecMakerConfig())

  @get("/api/get-json-entity")
  def getJsonEntity() = Response(
    data = writeToArray(Message(123, "Hello There", Array("And", "There"))),
    headers = Seq("Content-Type" -> "application/json")
  )

  @get("/api/get-plain-text")
  def getPlainText() = Response(
    data = "Hello There",
    headers = Seq("Content-Type" -> "plain/text")
  )

  initialize()
}

object Server extends Main(Controller) {

  override def main(args: Array[String]): Unit = {
    val server = Undertow.builder
      .addHttpListener(8080, host)
      .setHandler(defaultHandler)
      .build
    server.start()
    println("START")
  }
}
