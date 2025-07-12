import test, { expect } from "@playwright/test";
import { HomePage } from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import { usersList } from "../../test-data/users";
import AuthController from "../../api/controllers/AuthControllers";
import { time } from "console";
import {
  request as playwrightRequest,
  APIRequestContext,
} from "@playwright/test";

test.describe.skip("POST /api/cars with APIRequestContext", () => {
  let apiContext: APIRequestContext;
  let sid: string;

  test.beforeAll(async () => {
    apiContext = await playwrightRequest.newContext();

    const loginResponse = await apiContext.post("/api/auth/signin", {
      data: {
        email: usersList.mainUser.email,
        password: usersList.mainUser.password,
        remember: false,
      },
    });

    sid = loginResponse.headers()["set-cookie"].split(";")[0];
    expect(sid).not.toBeUndefined();
  });

  test.skip("New car [/api/cars/]", async () => {
    const carToAdd = {
      carBrandId: 2,
      carModelId: 9,
      mileage: 45,
    };

    const response = await apiContext.post("/api/cars/", {
      data: carToAdd,
      headers: {
        Cookie: sid,
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.status).toBe("ok");
    expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
    expect(body.data.carModelId).toBe(carToAdd.carModelId);
    expect(body.data.mileage).toBe(carToAdd.mileage);
    expect(body.data.initialMileage).toBe(carToAdd.mileage);
    expect(body.data.brand).toBe("BMW");
  });

  test.skip("New car with invalid carModelId [/api/cars/]", async () => {
    const invalidCar = {
      carBrandId: 2,
      carModelId: 123,
      mileage: 25,
    };

    const response = await apiContext.post("/api/cars/", {
      data: invalidCar,
      headers: {
        Cookie: sid,
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(404);
    expect(body.status).toBe("error");
  });

  test.skip("Mileage is invalid [/api/cars/]", async () => {
    const invalidCar = {
      carBrandId: 2,
      carModelId: 9,
      mileage: "twenty five",
    };

    const response = await apiContext.post("/api/cars/", {
      data: invalidCar,
      headers: {
        Cookie: sid,
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.status).toBe("error");
    expect(body.message).toContain("mileage");
  });
});
