export async function handler(event) {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbz3usuAc1SOpXfnz9OHUs-oU9QxnKhWQyv1kBFbj3oDbT3Refq8IHYoanIhxFLXbJjIGQ/exec";

  const method = event.httpMethod;
  let response;

  if (method === "GET") {
    response = await fetch(`${GAS_URL}?${event.rawQuery || ""}`);
  }

  if (method === "POST") {
    response = await fetch(GAS_URL, {
      method: "POST",
      body: event.body,
      headers: { "Content-Type": "application/json" }
    });
  }

  let text = await response.text();

  // 🔥 Remove Google security prefix if exists
  if (text.startsWith(")]}'")) {
    text = text.substring(4);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: text
  };
}
