import { JWTPayload } from "@shared/types";
import { date } from "joi";

// Mock environment variables
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.JWT_REFRESH_SECRET = "test-jwt-refresh-secret-key-for-testing-only";
process.env.JWT_EXPIRES_IN = "15m";
process.env.JWT_REFRESH_EXPIRES_IN = "7d";
process.env.BCRYPT_ROUNDS = "4"; // Lower rounds for faster tests
process.env.NODE_ENV = "test";

// Mock prisma client
const mockPrismaClient = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    deleteMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $disconnect: jest.fn(),
  $connect: jest.fn(),
};

// mock database module
jest.mock("../src/database", () => mockPrismaClient);

declare global {
  var mockPrisma: typeof mockPrismaClient;
}

global.mockPrisma = mockPrismaClient;

// global data for test
export const testUser = {
  id: "test-user-id",
  email: "testuser123@domain.com",
  password: "$2a$04$hashedpasswordhashedpasswordhashedpasswordhashedpassword",
  createdAt: new Date("2025-11-07T00:00:00Z"),
  updatedAt: new Date("2025-11-07T00:00:00Z"),
};

export const testJwtPayload: JWTPayload = {
  userId: "test-user-id",
  email: "",
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 60 * 15,
};

export const testRefreshToken = {
  id: "test-refresh-token-id",
  userId: testUser.id,
  token: "test-refresh-token",
  expiresAt: Math.floor(Date.now() / 1000) + 60 * 7, // 7 days from now
  createdAt: new Date(),
};

// helper function to reset mocks before each test
export function resetAllMocks() {
  Object.values(mockPrismaClient.user).forEach((mock) => {
    if (jest.isMockFunction(mock)) {
      mock.mockReset();
    }
  });

  Object.values(mockPrismaClient.refreshToken).forEach((mock) => {
    if (jest.isMockFunction(mock)) {
      mock.mockReset();
    }
  });
}
