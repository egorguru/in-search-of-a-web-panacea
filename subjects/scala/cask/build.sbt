name := "cask"

version := "1.0"

scalaVersion := "2.12.7"

libraryDependencies ++= Seq(
  "com.lihaoyi" %% "cask" % "0.2.0",
  "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-macros" % "0.48.1"
)

assemblyJarName in assembly := "cask.jar"
