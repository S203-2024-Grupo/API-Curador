import UserController from "../controllers/User.js";
import { User } from "../models/User.js";

// Mocking the User model
jest.mock("../models/User.js");

describe("UserController", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    User.mockClear();
  });

  it("should list all users", async () => {
    // Arrange
    const mockUsers = [{ id: 1, name: "Test User" }];
    const response = {
      json: jest.fn().mockReturnValue(mockUsers),
    };
    User.findAll.mockResolvedValue(mockUsers);

    // Act
    await UserController.list(null, response);

    // Assert
    expect(response.json).toBeCalledWith(mockUsers);
  });

  // Add more tests for find, create, update, delete and login
});
