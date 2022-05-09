import axios from "axios";

describe("Favs list endpoint testing", () => {
  let favs1;
  let favs2;
  let id;

  beforeAll(async () => {
    axios.defaults.baseURL = "http://localhost:5000";
    favs1 = { name: "Lista de peliculas" };
    favs2 = { name: "Lista de compras" };

    const user = {
      email: `user${Date.now()}@email.com`,
      password: "1234",
    };
    await axios.post("/auth/local/register", user);
    const { data } = await axios.post("/auth/local/login", user);
    const { token } = data;
    const newHeaders = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios.defaults.headers = newHeaders;
  });

  it("It should create a new favorites list", async () => {
    const endpoint = `/api/favs`;
    const { data, status } = await axios.post(endpoint, favs1);

    id = data.favs._id;

    expect(status).toEqual(201);
    expect(data.favs).toMatchObject(favs1);
  });

  it("It should get two favorites lists", async () => {
    const endpoint = `/api/favs`;
    await axios.post(endpoint, favs2);
    const { data, status } = await axios.get(endpoint);

    expect(status).toEqual(200);
    expect(data.arrFavs.length).toBe(2);
  });

  it("It should get a favorites list according to their id", async () => {
    const endpoint = `/api/favs/${id}`;
    const { data, status } = await axios.get(endpoint);

    expect(status).toEqual(200);
    expect(data.favs).toMatchObject(favs1);
  });

  it("It should remove a favorites list according to their id and leave only one", async () => {
    const endpoint = `/api/favs/`;
    const { data, status } = await axios.delete(`${endpoint}${id}`);
    const getAll = await axios.get(endpoint);

    expect(status).toEqual(200);
    expect(data.notice).toBe(`${favs1.name} has been removed`);
    expect(getAll.data.arrFavs.length).toBe(1);
  });
});
