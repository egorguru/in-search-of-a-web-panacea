# In Search of a Web Panacea
This is the benchmark needed to find the perfect programming language and web development framework at least the fastest.

# Results
- [Stage 1](https://artaeum.com/articles/16) (06.07.2019)

# How to run?
If you want to run the benchmark yourself, then follow these instructions:

## Requirements

### Benchmark:
- Node.js and NPM

### Subjects require languages support and build tools such as:
- Java, Maven
- Scala, SBT
- Rust, Cargo
- Node.js, NPM (should already be to start the benchmark)

## Installation
```bash
$ git clone https://github.com/EgorRepnikov/in-search-of-a-web-panacea.git
```

## Commands

### **Build**
```bash
$ npm run build
```

### **Run Benchmark**
```bash
$ npm run start
```
or
```bash
$ npm start
```
**Params**:
| Keys                                | Description                   | Default              |
|-------------------------------------|-------------------------------|----------------------|
| -t \| -type \| --type               | Benchmark Type                | get-tiny-json-entity |
| -c \| -connections \| --connections | Count of Connections          | 100                  |
| -p \| -pipelining \| --pipelining   | Count of Pipelines            | 10                   |
| -d \| -duration \| --duration       | Duration of Benchmark running | 40                   |

The command may look like this:
```bash
$ npm start -- -t get-plain-text -c 50 -p 5 -d 30
```

# How to add a new test subject?
It is recommended to add the source code of the test subject to the appropriate language in the folder in the subjects folder. For example, you add the source code of some Java-framework: `subjects/java/some-framework` <- sources here

Then you have to add a test subject to settings/subjects.json and create the new object:
```json
{
  ...previous subjects,
  "Some Java Framework": {
    "dir": "java/some-framework", // Source folder
    "build": "mvn clean package", // Command to start the build process
    "run": { // Command to start the built project
      "command": "java",
      "args": ["-jar", "target/some-framework.jar"] // Keys
    },
    "supports": [ // Implemented endpoints for testing (benchmark-types)
      "get-tiny-json-entity",
      "get-plain-text"
    ]
  }
}
```

# How to add a new benchmark type?
You can add a new type in the benchmark types file:
```json
{
  ...previous types,
  "post-some-json-entity": {
    "url": "http://localhost:8080/api/post-some-json-entity",
    "method": "POST",
    "headers": { "Content-Type": "application/json" },
    "body": "{\"some\":\"entity\"}"
  }
}
```
In-Search-of-a-Web-Panacea uses autocannon, so additional fields can be found in its documentation.

# Author
**Egor Repnikov** - [GitHub](https://github.com/EgorRepnikov)

# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
