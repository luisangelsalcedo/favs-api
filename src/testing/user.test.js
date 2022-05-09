import axios from "axios";
import bcrypt from "bcrypt";

fdescribe("User endpoint testing", () => {
  let user;
  let token;

  beforeAll(() => {
    axios.defaults.baseURL = "http://localhost:5000";
    user = {
      email: `user${Date.now()}@email.com`,
      password: "1234",
      name: "Luis Salcedo",
    };
  });

  it("It should create a new user with encrypted password", async () => {
    const endpoint = `/auth/local/register`;
    const { data, status } = await axios.post(endpoint, user);

    const encryptedPassword = await bcrypt.compare(
      user.password,
      data.user.password
    );
    expect(status).toEqual(201);
    expect(data.user).toMatchObject({ email: user.email });
    expect(encryptedPassword).toEqual(true);
  });

  it("It should validate duplicate users", () => {
    const endpoint = `/auth/local/register`;

    axios.post(endpoint, user).catch(error => {
      const status = error.response.status;
      const message = error.response.data.message;

      expect(status).toEqual(400);
      expect(message).toBe("Duplicate user");
    });
  });

  it("It should login and return a token", async () => {
    const endpoint = `/auth/local/login`;
    const { data, status } = await axios.post(endpoint, user);

    token = data.token;
    expect(status).toEqual(200);
    expect(token.length).toBe(200);
  });

  it("It should authenticate token and return user name and id", async () => {
    const endpoint = `/auth/local/validate?token=${token}`;
    const { data, status } = await axios.get(endpoint);

    expect(status).toEqual(200);
    expect(data).toMatchObject({ name: user.name });
    expect(data.id.length).toBe(24);
  });
});
