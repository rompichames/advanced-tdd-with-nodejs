import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';

// This is a placeholder - you'll need to import your actual domain entities
// import { User } from '../../../src/domain/entities/User.js';

interface UserData {
  email: string;
  name?: string;
}

// Shared state for the scenario
let userData: UserData;
let createdUser: any;
let error: Error | null = null;

Given('the system is initialized', function () {
  // Initialize any required system state
  userData = {} as UserData;
  createdUser = null;
  error = null;
});

Given('I have valid user data with email {string}', function (email: string) {
  userData = {
    email,
    name: 'Test User'
  };
});

Given('I have user data with invalid email {string}', function (email: string) {
  userData = {
    email,
    name: 'Test User'
  };
});

Given('I have user data with email {string}', function (email: string) {
  userData = {
    email,
    name: 'Test User'
  };
});

Given('a user exists with email {string}', function (email: string) {
  // Create a user in the system
  userData = { email, name: 'Existing User' };
  // TODO: Use your actual User entity/service to create the user
  createdUser = {
    id: '123',
    email,
    name: 'Existing User',
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

When('I create a new user', function () {
  try {
    // TODO: Replace with actual User entity creation
    // Example: createdUser = User.create(userData);
    createdUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    error = null;
  } catch (e) {
    error = e as Error;
    createdUser = null;
  }
});

When('I attempt to create a new user', function () {
  try {
    // TODO: Replace with actual User entity creation that validates
    // This should throw an error for invalid data
    if (!userData.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    createdUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    error = null;
  } catch (e) {
    error = e as Error;
    createdUser = null;
  }
});

When('I update the user email to {string}', function (newEmail: string) {
  try {
    // TODO: Replace with actual User entity update method
    // Example: createdUser = createdUser.updateEmail(newEmail);
    createdUser = {
      ...createdUser,
      email: newEmail,
      updatedAt: new Date()
    };
    error = null;
  } catch (e) {
    error = e as Error;
  }
});

Then('the user should be created successfully', function () {
  assert.ok(createdUser, 'User should be created');
  assert.strictEqual(error, null, 'No error should occur');
});

Then('the user email should be {string}', function (expectedEmail: string) {
  assert.strictEqual(createdUser.email, expectedEmail);
});

Then('the user creation should fail', function () {
  assert.ok(error, 'Error should be thrown');
  assert.strictEqual(createdUser, null, 'User should not be created');
});

Then('I should receive an error message about invalid email', function () {
  assert.ok(error, 'Error should be thrown');
  assert.ok(error?.message.includes('email'), 'Error message should mention email');
});

Then('the user email should be updated to {string}', function (expectedEmail: string) {
  assert.strictEqual(createdUser.email, expectedEmail);
});

Then('the updated timestamp should be recent', function () {
  const now = new Date();
  const updatedAt = new Date(createdUser.updatedAt);
  const diffInSeconds = (now.getTime() - updatedAt.getTime()) / 1000;
  assert.ok(diffInSeconds < 5, 'Updated timestamp should be within last 5 seconds');
});

Then('the result should be {string}', function (expectedResult: string) {
  if (expectedResult === 'success') {
    assert.ok(createdUser, 'User should be created');
    assert.strictEqual(error, null, 'No error should occur');
  } else {
    assert.ok(error, 'Error should be thrown');
    assert.strictEqual(createdUser, null, 'User should not be created');
  }
});
