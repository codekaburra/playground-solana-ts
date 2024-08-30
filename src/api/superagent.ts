import * as superagent from "superagent";

export async function post(url: string, data: string | object) {
  try {
    return superagent
      .post(url)
      .send(data)
      .set("Content-Type", "application/json");
  } catch (err) {
    console.error(err);
  }
}
