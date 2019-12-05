extern crate actix_web;
#[macro_use] extern crate serde_derive;

use actix_web::{App, HttpResponse, HttpServer, web};

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

#[derive(Serialize, Deserialize)]
struct TinyEntityWithId {
    id: i32,
    message: String
}

fn get_tiny_json_entity() -> HttpResponse {
    HttpResponse::Ok()
        .json(TinyEntity {
            message: "Hello There".to_string()
        })
}

fn get_large_json_entity() -> HttpResponse {
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

fn post_tiny_json_entity(entity: web::Json<TinyEntity>) -> HttpResponse {
    HttpResponse::Ok().json(entity.into_inner())
}

fn post_large_json_entity(entity: web::Json<LargeEntity>) -> HttpResponse {
    HttpResponse::Ok().json(entity.into_inner())
}

fn get_plain_text() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/plain")
        .body("Hello There")
}

fn get_tiny_json_entity_by_id(info: web::Path<(i32,)>) -> HttpResponse {
    HttpResponse::Ok()
        .json(TinyEntityWithId {
            id: info.0,
            message: "Hello There".to_string()
        })
}

fn main() {
    println!("START");
    HttpServer::new(|| {
        App::new().service(
            web::scope("/api")
                .route("/get-tiny-json-entity", web::get().to(get_tiny_json_entity))
                .route("/get-large-json-entity", web::get().to(get_large_json_entity))
                .route("/post-tiny-json-entity", web::post().to(post_tiny_json_entity))
                .route("/post-large-json-entity", web::post().to(post_large_json_entity))
                .route("/get-plain-text", web::get().to(get_plain_text))
                .route("/get-tiny-json-entity-by-id/{id}", web::get().to(get_tiny_json_entity_by_id))
        )
    })
    .bind("127.0.0.1:8080")
    .expect("Can not bind to port 8080")
    .run()
    .unwrap();
}
