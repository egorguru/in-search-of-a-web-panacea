# In Search of a Web Panacea
This is the benchmark needed to find the perfect programming language and web development framework at least the fastest.

![Image of ISoaWP](https://github.com/EgorRepnikov/in-search-of-a-web-panacea/raw/master/image.png)

# Results
## get-tiny-json-entity

| Name | Requests Total | Latency Average | 2xx | Non 2xx | CPU % Average | Memory MB Average | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bare Node.js | 2607953 | 2.24 | 2607953 | 0 | _ | _ | 60.55 |
| Dragonrend.js | 3545549 | 1.65 | 3545549 | 0 | _ | _ | 60.51 |
| Express.js | 2473805 | 2.35 | 2473805 | 0 | _ | _ | 60.47 |
| Fastify.js | 3026307 | 1.91 | 3026307 | 0 | _ | _ | 60.44 |
| Koa.js | 2930610 | 1.97 | 2930610 | 0 | _ | _ | 60.48 |
| Java Http Server | 2599748 | 2.23 | 2599748 | 0 | 249 | 462.7 | 60.43 |
| Spring Boot | 2186704 | 2.73 | 2186704 | 0 | 410 | 474.2 | 60.87 |
| Proteus | 2713172 | 2.17 | 2713172 | 0 | 101 | 259.5 | 60.6 |
| Colossus | 3482496 | 1.69 | 3482496 | 0 | 132 | 272.8 | 60.57 |
| Blaze | 3390464 | 1.72 | 3390464 | 0 | 116 | 212.8 | 60.54 |
| Actix | 3304113 | 1.77 | 3304113 | 0 | 97.5 | 11 | 60.59 |

# get-large-json-entity

| Name | Requests Total | Latency Average | 2xx | Non 2xx | CPU % Average | Memory MB Average | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bare Node.js | 2646970 | 2.19 | 2646970 | 0 | _ | _ | 60.49 |
| Dragonrend.js | 3513369 | 1.67 | 3513369 | 0 | _ | _ | 60.59 |
| Express.js | 2413458 | 2.4 | 2413458 | 0 | _ | _ | 60.44 |
| Fastify.js | 3033961 | 1.9 | 3033961 | 0 | _ | _ | 60.42 |
| Koa.js | 2886179 | 2 | 2886179 | 0 | _ | _ | 60.41 |
| Java Http Server | 2626802 | 2.21 | 2626802 | 0 | 256 | 432 | 60.49 |
| Spring Boot | 2175857 | 2.74 | 2175857 | 0 | 407 | 416.5 | 60.79 |
| Proteus | 2740137 | 2.15 | 2740137 | 0 | 104 | 256.2 | 60.59 |
| Colossus | 3486113 | 1.67 | 3486113 | 0 | 132 | 271.8 | 60.57 |
| Blaze | 3485128 | 1.68 | 3485128 | 0 | 121 | 211.2 | 60.56 |
| Actix | 3393272 | 1.72 | 3393272 | 0 | 96.5 | 11 | 60.54 |

## post-tiny-json-entity

| Name | Requests Total | Latency Average | 2xx | Non 2xx | CPU % Average | Memory MB Average | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bare Node.js | 2634937 | 2.2 | 2634937 | 0 | _ | _ | 60.45 |
| Dragonrend.js | 3321675 | 1.76 | 3321675 | 0 | _ | _ | 60.45 |
| Express.js | 2280709 | 2.55 | 2280709 | 0 | _ | _ | 60.51 |
| Fastify.js | 2890691 | 1.99 | 2890691 | 0 | _ | _ | 60.38 |
| Koa.js | 2672092 | 2.17 | 2672092 | 0 | _ | _ | 60.47 |
| Java Http Server | 2675910 | 2.16 | 2675910 | 0 | 214 | 502 | 60.37 |
| Spring Boot | 2060132 | 2.89 | 2060132 | 0 | 473 | 447.2 | 60.77 |
| Actix | 3822047 | 1.53 | 3822047 | 0 | 105 | 10.8 | 60.5 |

## post-large-json-entity

| Name | Requests Total | Latency Average | 2xx | Non 2xx | CPU % Average | Memory MB Average | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bare Node.js | 2595860 | 2.24 | 2595860 | 0 | _ | _ | 60.55 |
| Dragonrend.js | 3245853 | 1.81 | 3245853 | 0 | _ | _ | 60.59 |
| Express.js | 2289065 | 2.54 | 2289065 | 0 | _ | _ | 60.53 |
| Fastify.js | 2843923 | 2.03 | 2843923 | 0 | _ | _ | 60.42 |
| Koa.js | 2618795 | 2.21 | 2618795 | 0 | _ | _ | 60.5 |
| Spring Boot | 2076500 | 2.87 | 2076500 | 0 | 477 | 391.4 | 60.83 |
| Actix | 3896895 | 1.5 | 3896895 | 0 | 115 | 10.6 | 60.41 |

## get-plain-text

| Name | Requests Total | Latency Average | 2xx | Non 2xx | CPU % Average | Memory MB Average | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Bare Node.js | 2652808 | 2.2 | 2652808 | 0 | _ | _ | 60.59 |
| Dragonrend.js | 3524767 | 1.67 | 3524767 | 0 | _ | _ | 60.58 |
| Express.js | 2514659 | 2.31 | 2514659 | 0 | _ | _ | 60.5 |
| Fastify.js | 3074613 | 1.87 | 3074613 | 0 | _ | _ | 60.39 |
| Koa.js | 2973095 | 1.94 | 2973095 | 0 | _ | _ | 60.44 |
| Java Http Server | 2687110 | 2.15 | 2687110 | 0 | 249 | 435.2 | 60.42 |
| Spring Boot | 2622008 | 2.26 | 2622008 | 0 | 420 | 445.9 | 60.69 |
| Proteus | 2806507 | 2.09 | 2806507 | 0 | 99.8 | 265 | 60.53 |
| Colossus | 3452516 | 1.7 | 3452516 | 0 | 132 | 415.3 | 60.61 |
| Blaze | 3416356 | 1.72 | 3416356 | 0 | 113 | 212.5 | 60.53 |
| Actix | 3501122 | 1.67 | 3501122 | 0 | 98.6 | 10.9 | 60.52 |

## get-tiny-json-entity-by-id

| Name | Requests Total | Latency Average | 2xx | Non 2xx | CPU % Average | Memory MB Average | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dragonrend.js | 3571999 | 1.64 | 3571999 | 0 | _ | _ | 60.64 |
| Express.js | 2512260 | 2.31 | 2512260 | 0 | _ | _ | 60.53 |
| Fastify.js | 3088123 | 1.87 | 3088123 | 0 | _ | _ | 60.41 |
| Koa.js | 2963847 | 1.94 | 2963847 | 0 | _ | _ | 60.38 |
| Spring Boot | 2138346 | 2.78 | 2138346 | 0 | 469 | 451.4 | 60.8 |
| Proteus | 3160474 | 1.86 | 3160474 | 0 | 113 | 268.8 | 60.68 |
| Colossus | 3615735 | 1.61 | 3615735 | 0 | 135 | 308.5 | 60.51 |
| Actix | 3810874 | 1.54 | 3810874 | 0 | 103 | 11.1 | 60.44 |

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

### **Run Benchmark**
```bash
$ npm run start
```
or
```bash
$ npm start
```
Then you should follow the instructions of CLI.

# How to add a new test subject?
It is recommended to add the source code of the test subject to the appropriate language in the folder in the subjects folder. For example, you add the source code of some Java-framework: `subjects/java/some-framework` <- sources here

Then you have to add a test subject to settings/subjects.json and create the new object:
```js
{
  // previous subjects
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

> **Important** The subject should print a "START" signal at startup.

# How to add a new benchmark type?
You can add a new type in the benchmark types file:
```js
{
  // previous types
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
