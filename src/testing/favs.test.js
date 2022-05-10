import axios from "axios";

let favsMock;
let userMock;
let ownerID;
let token;
let id;
let invalidID;
let validID;

beforeAll(async () => {
  axios.defaults.baseURL = "http://localhost:5000/";
  favsMock = {
    name: `lista ${Date.now()}`,
  };
  userMock = {
    email: `owner${Date.now()}@email.com`,
    password: "1234",
  };
  const { data: register } = await axios.post("auth/local/register", userMock);
  const { data: login } = await axios.post("auth/local/login", userMock);

  ownerID = register.data._id;
  token = login.data;
  invalidID = "invalidID";
  validID = "123456789012345678901234";

  const newHeaders = {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  axios.defaults.headers = newHeaders;
});

describe("Pruebas de registro de una lista de favoritos", () => {
  // ❌
  it("Error: Crear una lista de favoritos sin nombre", async () => {
    const endpoint = "api/favs";

    try {
      await axios.post(endpoint, {});
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("name: is required");
    }
  });

  // ✅
  it("Success: Crear una lista de favoritos con un nombre nuevo", async () => {
    const endpoint = "api/favs";

    const { status, data } = await axios.post(endpoint, favsMock);
    const { message, data: favsCreated } = data;

    id = favsCreated._id;

    expect(status).toEqual(201);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("favs created");
    expect(favsCreated).toMatchObject(favsMock);
    expect(favsCreated).toMatchObject({ owner: ownerID });
    expect(id.length).toBe(24);
  });

  // ❌
  it("Error: Crear una lista de favoritos con un nombre ya registrado", async () => {
    const endpoint = "api/favs";

    try {
      await axios.post(endpoint, favsMock);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("name: is already taken");
    }
  });

  // ✅
  it("Success: Crear 3 lista de favoritos más del mismo propietario", async () => {
    const endpoint = "api/favs";

    await axios.post(endpoint, { name: `Libros favoritos ${Date.now()}` });
    await axios.post(endpoint, { name: `Lista de tareas ${Date.now()}` });
    await axios.post(endpoint, { name: `Películas favoritas ${Date.now()}` });

    const { status, data } = await axios.get(endpoint);
    const { data: arrFavs } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(arrFavs.length).toEqual(4);
    expect(arrFavs[0]).toMatchObject({ owner: ownerID });
    expect(arrFavs[1]).toMatchObject({ owner: ownerID });
    expect(arrFavs[2]).toMatchObject({ owner: ownerID });
    expect(arrFavs[3]).toMatchObject({ owner: ownerID });
  });
});

describe("Pruebas de obtención de listas de favoritos", () => {
  // ✅
  it("Success: obtener un arreglo con todas las listas de favoritos registras según su propietario", async () => {
    const endpoint = "api/favs";

    const { status, data } = await axios.get(endpoint);
    const { data: arrFavs } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(Array.isArray(arrFavs)).toEqual(true);
    expect(arrFavs[0]).toMatchObject({ owner: ownerID });
  });
});

describe("Pruebas de obtención de una listas de favoritos según su ID", () => {
  // ❌
  it("Error: Obtener una lista de favoritos con un id inválido", async () => {
    const endpoint = `api/favs/${invalidID}`;

    try {
      await axios.get(endpoint);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(500);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("Cast to ObjectId failed");
    }
  });

  // ❌
  it("Error: Obtener una lista de favoritos con un id válido inexistente", async () => {
    const endpoint = `api/favs/${validID}`;

    try {
      await axios.get(endpoint);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(404);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("favs list not found");
    }
  });

  // ✅
  it("Success: Obtener una lista de favoritos con un id válido existente", async () => {
    const endpoint = `api/favs/${id}`;

    const { status, data } = await axios.get(endpoint);
    const { data: favs } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(favs).toMatchObject(favsMock);
  });
});

describe("Pruebas de actualización de una listas de favoritos según su ID", () => {
  // ✅
  it("Success: Actualizar una lista de favoritos: Actualizar nombre de lista", async () => {
    const endpoint = `api/favs/${id}`;
    const update = { name: "cantantes favoritos" };

    const { status, data } = await axios.put(endpoint, update);
    const { message, data: favs } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("favs list has been updated");
    expect(favs).toMatchObject(update);
  });

  // ❌
  it("Error: Actualizar una lista de favoritos: Insertar un item sin título", async () => {
    const endpoint = `api/favs/${id}`;
    const update = { list: [{}] };

    try {
      await axios.put(endpoint, update);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("item title is required");
    }
  });

  // ✅
  it("Success: Actualizar una lista de favoritos: Insertar un item con título", async () => {
    const endpoint = `api/favs/${id}`;
    const update = { list: [{ title: "Gustavo Cerati" }] };

    const { status, data } = await axios.put(endpoint, update);

    const { message, data: favs } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("favs list has been updated");
    expect(favs.list.length).toEqual(1);
  });

  // ✅
  it("Success: Actualizar una lista de favoritos: Insertar 3 item con título más", async () => {
    const endpoint = `api/favs/${id}`;
    const update = {
      list: [
        { title: "Luis Alberto Spinetta" },
        { title: "Andres Calamaro" },
        { title: "Fito Paez" },
        { title: "Joaquin Sabina" },
      ],
    };

    const { status, data } = await axios.put(endpoint, update);

    const { message, data: favs } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("favs list has been updated");
    expect(favs.list.length).toEqual(4);
  });
});

describe("Pruebas de borrado de una lista de favoritos según su ID", () => {
  // ❌
  it("Error: Eliminar una lista de favoritos con un id inválido", async () => {
    const endpoint = `api/favs/${invalidID}`;

    try {
      await axios.delete(endpoint);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(500);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("Cast to ObjectId failed");
    }
  });

  // ❌
  it("Error: Eliminar una lista de favoritos con un id válido inexistente", async () => {
    const endpoint = `api/favs/${validID}`;

    try {
      await axios.delete(endpoint);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(404);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("favs list not found");
    }
  });

  // ✅
  it("Success: Eliminar una lista de favoritos con un id válido existente", async () => {
    const endpoint = `api/favs/${id}`;

    const { status, data } = await axios.delete(endpoint);
    const { message, data: favs } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("favs list has been removed");
  });
});
