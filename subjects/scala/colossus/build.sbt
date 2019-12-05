name := "colossus"

version := "1.0"

scalaVersion := "2.12.7"

libraryDependencies ++= Seq(
  "com.tumblr" %% "colossus" % "0.11.1-RC1",
  "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-macros" % "2.0.2"
)

assemblyJarName in assembly := "colossus.jar"
