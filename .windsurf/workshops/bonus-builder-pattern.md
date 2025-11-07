---
description: Bonus Track - Builder Pattern & Result Type for Safe ValueObject Construction
---

# 🚀 Bonus Track: The Builder Pattern + Result Type

## The Problem with Current Implementation

Your current `Email` ValueObject has a critical design flaw:

```typescript
export class Email extends ValueObject<string> {
  constructor(email: string) {
    const trimmedEmail = email.trim();
    if (!Email.isValid(trimmedEmail)) {
      throw new Error(`Invalid email format: ${email}`);
    }
    super(trimmedEmail.toLowerCase());
  }
}
```

### Why is this a problem?

1. **Constructors should do minimal work** - They should initialize state, not validate
2. **Exceptions are not errors** - They're for exceptional cases, not normal validation failures
3. **Error handling is implicit** - Callers must use try/catch blocks
4. **Testing is harder** - You need to test exception throwing, not return values
5. **Composability is poor** - Can't easily chain operations or handle multiple failures

### The Principle

> **Constructors must have NO logic and must NOT throw exceptions**

Instead, use a **Builder** to handle construction logic, and return a **Result** type to represent success or failure.

---

## Part 1: Understanding the Builder Pattern

### What is the Builder Pattern?

The Builder pattern separates object construction from its representation. Instead of putting validation logic in the constructor, you use a builder object that:

1. Accepts input
2. Validates it
3. Returns a Result (Success or Failure)

### Example: Before vs After

**❌ Before (Current - Problematic):**
```typescript
try {
  const email = new Email('test@example.com');
  sendNotification(email);
} catch (error) {
  console.error('Invalid email:', error.message);
}
```

**✅ After (Builder + Result - Better):**
```typescript
const emailResult = EmailBuilder.create('test@example.com').build();

if (emailResult.isSuccess) {
  sendNotification(emailResult.value);
} else {
  console.error('Invalid email:', emailResult.error);
}
```

### Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Error Handling** | try/catch (implicit) | Result type (explicit) |
| **Constructor Logic** | Validation in constructor | Only initialization |
| **Testing** | Test exception throwing | Test return values |
| **Composability** | Hard to chain | Easy to chain |
| **Readability** | Hidden errors | Visible errors |

---

## Part 2: The Result Pattern

You already have a `Result` type in your project:

```typescript
export type Result<T, E = Error> = Success<T> | Failure<E>;

export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;
  constructor(public readonly value: T) {}
}

export class Failure<E> {
  readonly isSuccess = false;
  readonly isFailure = true;
  constructor(public readonly error: E) {}
}

export const success = <T>(value: T): Success<T> => new Success(value);
export const failure = <E>(error: E): Failure<E> => new Failure(error);
```

### How to Use Result

```typescript
// Creating a success
const result: Result<Email> = success(email);

// Creating a failure
const result: Result<Email, string> = failure('Invalid email format');

// Checking the result
if (result.isSuccess) {
  console.log(result.value); // Email object
} else {
  console.log(result.error); // Error message
}
```

---

## Part 3: Implementing the Builder Pattern with TDD (simple builder)

### Step 1: Write Tests First

Create a new test file: `tests/unit/domain/value-objects/email-builder.test.ts`

```typescript
import { EmailBuilder } from 'domain/value-objects/email-builder';

describe('EmailBuilder', () => {
  describe('build', () => {
    it('should return Success with valid email', () => {
      const result = EmailBuilder.build('test@example.com');
      
      expect(result.XXXXX).toBe(true);
       // TODO: write assertions
    });

    it('should return Failure with invalid email', () => {
      const result = EmailBuilder.build('invalid-email');
      
     // TODO: write assertions
    });

    it('should normalize email to lowercase', () => {
      const result = EmailBuilder.build('TEST@EXAMPLE.COM');

       // TODO: write assertions
    });

    it('should trim whitespace', () => {
      const result = EmailBuilder.build('  test@example.com  ');

       // TODO: write assertions
    });

    it('should return Failure for empty email', () => {
      const result = EmailBuilder.build('');
      
      // TODO: write assertions
    });

    it('should return Failure for email exceeding 254 characters', () => {
      const longEmail = 'a'.repeat(255) + '@example.com';
      const result = EmailBuilder.build(longEmail);
      
      // TODO: write assertions
    });
  });
});
```

### Step 2: Implement the Builder

Create: `src/domain/value-objects/email-builder.ts`

```typescript
import { Email } from './email.js';
import { Result, success, failure } from '../../shared/types/result.js';

export class EmailBuilder {
  public static build(email: string): Result<Email, string> {
  
     
    // Validate using Email.isValid() and return a Failure if invalid
   .............

    // If valid, create and return the Email as a Success
    ...........
  }
}
```

### Step 3: Refactor Email Constructor

Modify `src/domain/value-objects/email.ts`:

```typescript
export class Email extends ValueObject<string> {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  private static hasConsecutiveDots(email: string): boolean {
    return email.includes('..');
  }

  // ✅ Constructor should be not accessible from outside
  constructor(email: string) {
    super(email.toLowerCase());
  }

  // Validation is now a static method (used by builder)
  public static isValid(email: string): boolean {
    return typeof email === 'string' && 
           email.length > 0 && 
           email.length <= 254 && 
           !Email.hasConsecutiveDots(email) &&
           Email.EMAIL_REGEX.test(email);
  }

  // Use builder instead of static create
  public static create(email: string): Result<Email, string> {
    return EmailBuilder.build(email);
  }

}
```

---

## Part 4: Exercise - Refactor Email with Builder Pattern

### Your Task

> 🫵 **CHECKPOINT Bonus.1**: Before refactoring, answer:
> - Why should constructors NOT throw exceptions?
> - What's the difference between validation errors and exceptions?
> - How does the Result type help with error handling?

### Step-by-Step Refactoring

1. **Create EmailBuilder** following TDD (test first)
   - Write tests in `email-builder.test.ts`
   - Implement `EmailBuilder` class
   - Ensure all tests pass

2. **Refactor Email constructor**
   - Remove all validation logic
   - Remove all exception throwing
   - Keep only initialization

3. **Update Email.create()**
   - Change from `static create(email: string): Email`
   - To: `static create(email: string): Result<Email, string>`
   - Use the builder internally

4. **Update existing tests**
   - Change from testing exceptions
   - To testing Result types

### Before Your Refactoring

```typescript
// ❌ Old way - exception throwing
try {
  const email = new Email('invalid');
} catch (error) {
  // Handle error
}
```

### After Your Refactoring

```typescript
// ✅ New way - Result type
const result = Email.create('invalid');
if (result.isSuccess) {
  const email = result.value;
} else {
  console.error(result.error);
}
```

> 🫵 **CHECKPOINT Bonus.2**: After refactoring, verify:
> - [ ] Email constructor has NO validation logic
> - [ ] Email constructor does NOT throw exceptions
> - [ ] EmailBuilder handles all validation
> - [ ] Email.create() returns Result<Email, string>
> - [ ] All tests pass
> - [ ] Error handling is explicit (no try/catch needed)

---

## Part 5: Advanced - Fluent Builder API

Once you have the basic builder working, you can enhance it with a fluent API:

```typescript
const result = EmailBuilder.create('test@example.com')
  .withValidation((email) => !email.includes('spam'))
  .withNormalization((email) => email.toLowerCase())
  .build();
```

### Test-Driven Implementation

```typescript
describe('EmailBuilder - Fluent API', () => {
  it('should chain multiple validations', () => {
    const result = EmailBuilder.create('test@example.com')
      .withValidation((email) => email.length > 5)
      .withValidation((email) => email.includes('@'))
      .build();
    
    expect(result.isSuccess).toBe(true);
  });

  it('should fail if any validation fails', () => {
    const result = EmailBuilder.create('test@example.com')
      .withValidation((email) => email.length > 100) // This will fail
      .build();
    
    expect(result.isFailure).toBe(true);
  });
});
```

---

## Part 6: Bonus Challenge - Apply to Other ValueObjects

Now that you understand the pattern, apply it to your `UserName` ValueObject:

1. Create `UserNameBuilder` following the same pattern
2. Refactor `UserName` constructor to have NO logic
3. Write comprehensive tests
4. Update all usages to use the builder

> 🫵 **CHECKPOINT Bonus.3**: 
> - Did you follow TDD (test first)?
> - Does the builder handle all edge cases?
> - Are error messages clear and helpful?
> - Could a junior dev understand the error from the Result?

---

## Key Principles

✅ **Constructors should only initialize state**

✅ **Validation belongs in builders, not constructors**

✅ **Use Result types instead of exceptions for expected errors**

✅ **Error handling should be explicit, not implicit**

✅ **Builder pattern makes code more composable and testable**

✅ **TDD helps you design better APIs**

---

## Real-World Example

Here's how this pattern is used in production code:

```typescript
// Creating a user with validated email and name
const emailResult = Email.create('john@example.com');
const nameResult = UserName.create('John Doe');

if (emailResult.isSuccess && nameResult.isSuccess) {
  const user = new User(
    new UserId(1),
    emailResult.value,
    nameResult.value
  );
  
  await userRepository.save(user);
} else {
  const errors = [];
  if (emailResult.isFailure) errors.push(emailResult.error);
  if (nameResult.isFailure) errors.push(nameResult.error);
  
  return failure(errors.join(', '));
}
```

No try/catch blocks, no hidden exceptions, clear error handling!

---

## Further Reading

- **Builder Pattern**: https://refactoring.guru/design-patterns/builder
- **Ditching Try/Catch for Good!**: https://www.youtube.com/watch?v=AdmGHwvgaVs
- **Result Type (TypeScript)**:   https://www.dennisokeeffe.com/blog/2024-07-14-creating-a-result-type-in-typescript
- **Result Type (again)**: https://imhoff.blog/posts/using-results-in-typescript
- **Railway-Oriented Programming**: https://fsharpforfunandprofit.com/posts/recipe-part2/
- **Functional Error Handling in TypeScript**: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- **TypeScript Result Types - and Why You Should Use Them** : https://hamy.xyz/blog/2025-07_typescript-result-types  
 - **in Java** : https://medium.com/@johnmcclean/dysfunctional-programming-in-java-5-no-exceptions-5f37ac594323

---

## Questions to Discuss

1. **When should you use exceptions vs Result types?**
   - Exceptions:  
   - Results: 

2. **Is the builder pattern overkill for simple ValueObjects?**
   - For simple cases:  
   - For complex cases:  

3. **How does this relate to functional programming?**
   - Result type is a  _______
   - Builder is a way to ______ operations
   - Both enable functional error handling

4. **Can you use this pattern with async operations?**
   - Yes! Use `_______ <Result<T, E>>` for async builders
   - Enables elegant async error handling, provide an example

5. **How would you handle multiple validation errors?**
   - Collect all errors in the Result
   - Return `Result<Email, _______  >` instead of `Result<Email, string>`
   - Provide detailed feedback to users
