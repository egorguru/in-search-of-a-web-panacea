#[macro_use]
extern crate serde_derive;

use actix_web::{App, Error, HttpServer, HttpRequest, HttpResponse, web};
use actix_web::client::Client;

#[derive(Deserialize)]
struct Entity {
    first: String,
    second: String
}

async fn proxy(
    req: HttpRequest,
    query: web::Query<Entity>,
    payload: web::Payload,
    client: web::Data<Client>
) -> Result<HttpResponse, Error> {
    let url = format!(
        "http://127.0.0.1:8090/api/proxy?first={}&second={}",
        query.first, query.second
    );
    let res = client
        .request_from(url, req.head())
        .no_decompress()
        .send_stream(payload).await?;
    let mut client_resp = HttpResponse::build(res.status());
    let iterator = res.headers().iter().filter(|(h, _)| *h != "connection" && *h != "content-length");
    for (header_name, header_value) in iterator {
        client_resp.header(header_name.clone(), header_value.clone());
    }
    Ok(client_resp.streaming(res))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    println!("START");
    HttpServer::new(|| {
        App::new()
            .data(Client::new())
            .route("/api/proxy", web::get().to(proxy))
    })
        .bind("127.0.0.1:8080")?
        .run().await
}
