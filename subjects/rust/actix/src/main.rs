extern crate actix_web;

#[macro_use] extern crate serde_derive;

use actix_web::{http, server, App, HttpRequest, HttpResponse, Json};

#[derive(Serialize, Deserialize)]
struct Message {
    id: i32,
    message: String,
    extra: Vec<String>
}

fn get_json_entity(req: &HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        .json(Message {
            id: 123,
            message: "Hello There".to_string(),
            extra: vec!("And".to_string(), "There".to_string())
        })
}

fn post_json_entity(message: Json<Message>) -> HttpResponse {
    HttpResponse::Ok().json(message.into_inner())
}

fn get_plain_text(req: &HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        .content_type("plain/text")
        .body("Hello There")
}

fn main() {
    println!("START");
    server::new(|| {
        App::new()
            .prefix("/api")
            .resource("/get-json-entity", |r| {
                r.method(http::Method::GET).f(get_json_entity)
            })
            .resource("/post-json-entity", |r| {
                r.method(http::Method::POST).with(post_json_entity)
            })
            .resource("/get-plain-text", |r| {
                r.method(http::Method::GET).f(get_plain_text)
            })
            .finish()
    })
    .bind("127.0.0.1:8080")
    .expect("Can not bind to port 8080")
    .run();
}
