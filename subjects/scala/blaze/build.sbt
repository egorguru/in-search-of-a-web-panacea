name := "blaze"

version := "1.0"

scalaVersion := "2.12.7"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-blaze-server" % "0.21.0-M6",
  "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-macros" % "0.55.4"
)

assemblyJarName in assembly := "blaze.jar"
