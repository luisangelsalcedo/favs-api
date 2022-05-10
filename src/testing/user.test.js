import axios from "axios";

let userMock;
let userValid;
let token;
let invalidPassword;
let invalidToken;

beforeAll(() => {
  axios.defaults.baseURL = "http://localhost:5000/auth/local";
  userMock = {
    email: `user${Date.now()}@email.com`,
    password: "1234",
    name: "Luis Salcedo",
  };

  invalidPassword = "invalidPassword";
  invalidToken = "invalidToken";
});

describe("Pruebas de registro de usuario", () => {
  // ❌
  it("Error: Registrar con datos vacíos", async () => {
    const endpoint = `/register`;

    try {
      await axios.post(endpoint, {});
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("email: is required");
      expect(data.message).toContain("password: is required");
    }
  });

  // ❌
  it("Error: Registrar correo electrónico no válido", async () => {
    const endpoint = `/register`;

    try {
      await axios.post(endpoint, { email: "esto no es un correo" });
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("invalid email address");
    }
  });

  // ❌
  it("Error: Registrar sin contraseña", async () => {
    const endpoint = `/register`;

    try {
      await axios.post(endpoint, { email: "other@email.com" });
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).not.toContain("email: is required");
      expect(data.message).toContain("password: is required");
    }
  });

  // ❌
  it("Error: Registrar sin correo electrónico", async () => {
    const endpoint = `/register`;

    try {
      await axios.post(endpoint, { password: invalidPassword });
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("email: is required");
      expect(data.message).not.toContain("password: is required");
    }
  });

  // ✅
  it("Success: Registrar correo electrónico y contraseña", async () => {
    const endpoint = `/register`;

    const { status, data } = await axios.post(endpoint, userMock);
    const { message, data: userCreated } = data;

    userValid = userCreated;

    expect(status).toEqual(201);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("user created");
    expect(userCreated).toMatchObject({ email: userMock.email });
    expect(userCreated._id.length).toBe(24);
  });

  // ❌
  it("Error: Registrar correo electrónico ya existente", async () => {
    const endpoint = `/register`;

    try {
      await axios.post(endpoint, userMock);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("email: is already taken");
    }
  });
});

describe("Pruebas de inicio de sesión", () => {
  // ❌
  it("Error: login con datos vacíos", async () => {
    const endpoint = `/login`;

    try {
      await axios.post(endpoint, {});
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(404);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("user not found");
    }
  });

  // ❌
  it("Error: login con correo electrónico no válido", async () => {
    const endpoint = `/login`;

    try {
      await axios.post(endpoint, { email: "esto no es un correo" });
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(404);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("user not found");
    }
  });

  // ❌
  it("Error: login con correo electrónico válido pero sin contraseña", async () => {
    const endpoint = `/login`;

    try {
      await axios.post(endpoint, { email: userMock.email });
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(422);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("password is required");
    }
  });

  // ❌
  it("Error: login con correo electrónico válido y contraseña inválida", async () => {
    const endpoint = `/login`;

    try {
      await axios.post(endpoint, {
        email: userMock.email,
        password: invalidPassword,
      });
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(403);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("password is not correct");
    }
  });

  // ✅
  it("Success: Login con datos correctos", async () => {
    const endpoint = `/login`;

    const { status, data } = await axios.post(endpoint, userMock);
    const { message, data: tokenGenerated } = data;

    token = tokenGenerated;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("user logged");
    expect(token.length).toBe(200);
  });
});

describe("Pruebas de validación de token", () => {
  // ❌
  it("Error: Validar token inválido", async () => {
    const endpoint = `/validate`;

    try {
      await axios.get(`${endpoint}/${invalidToken}`);
    } catch ({ response }) {
      const { status, data } = response;

      expect(status).toEqual(401);
      expect(data).toMatchObject({ error: true });
      expect(data).not.toMatchObject({ success: true });
      expect(data.message).toContain("invalid token");
    }
  });

  // ✅
  it("Success: Token válido", async () => {
    const endpoint = `/validate`;

    const { status, data } = await axios.get(`${endpoint}/${token}`);
    const { message, data: payload } = data;

    expect(status).toEqual(200);
    expect(data).not.toMatchObject({ error: true });
    expect(data).toMatchObject({ success: true });
    expect(message).toContain("verified token");
    expect(token.length).toBe(200);

    expect(payload).toMatchObject({ id: userValid._id });
  });
});
