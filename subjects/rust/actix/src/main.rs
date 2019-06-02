extern crate actix_web;

#[macro_use] extern crate serde_derive;

use actix_web::{http, server, App, HttpRequest, HttpResponse, Json};

#[derive(Serialize, Deserialize)]
struct TinyEntity {
    message: String
}

#[derive(Serialize, Deserialize)]
struct LargeEntity {
    id: i32,
    message: String,
    entity: TinyEntity,
    extra: Vec<String>
}

fn get_tiny_json_entity(req: &HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        .json(TinyEntity {
            message: "Hello There".to_string()
        })
}

fn get_large_json_entity(req: &HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        .json(LargeEntity {
            id: 123,
            message: "Hello There".to_string(),
            entity: TinyEntity {
                message: "Hello There Again".to_string()
            },
            extra: vec!("And".to_string(), "Again".to_string())
        })
}

fn post_tiny_json_entity(entity: Json<TinyEntity>) -> HttpResponse {
    HttpResponse::Ok().json(entity.into_inner())
}

fn post_large_json_entity(entity: Json<LargeEntity>) -> HttpResponse {
    HttpResponse::Ok().json(entity.into_inner())
}

fn get_plain_text(req: &HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/plain")
        .body("Hello There")
}

fn main() {
    println!("START");
    server::new(|| {
        App::new()
            .prefix("/api")
            .resource("/get-tiny-json-entity", |r| {
                r.method(http::Method::GET).f(get_tiny_json_entity)
            })
            .resource("/get-large-json-entity", |r| {
                r.method(http::Method::GET).f(get_large_json_entity)
            })
            .resource("/post-tiny-json-entity", |r| {
                r.method(http::Method::POST).with(post_tiny_json_entity)
            })
            .resource("/post-large-json-entity", |r| {
                r.method(http::Method::POST).with(post_large_json_entity)
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
