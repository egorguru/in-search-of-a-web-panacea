name := "blaze"

version := "1.0"

scalaVersion := "2.12.7"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-blaze-server" % "0.20.1",
  "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-macros" % "0.48.1"
)

assemblyJarName in assembly := "blaze.jar"
