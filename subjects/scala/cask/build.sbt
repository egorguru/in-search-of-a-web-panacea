name := "cask"

version := "1.0"

scalaVersion := "2.12.7"

libraryDependencies ++= Seq(
  "com.lihaoyi" %% "cask" % "0.2.8",
  "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-macros" % "2.0.2"
)

assemblyJarName in assembly := "cask.jar"
