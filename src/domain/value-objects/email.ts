import { ValueObject } from '../../shared/types/common.js';
import { AntiSpamPort } from '../ports/anti-spam.port.js';


export class Email extends ValueObject<string> {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private static hasConsecutiveDots(email: string): boolean {
    return email.includes('..');
  }

  constructor(email: string) {

    if (!Email.isValid(email.trim())) {
      throw new Error(`Invalid email format: ${email}`);
    }
    super(email.trim().toLowerCase());
  }

  public static isValid(email: string): boolean {
    return email.length > 0 && email.length <= 254 && !Email.hasConsecutiveDots(email) && Email.EMAIL_REGEX.test(email);
  }

  public static create(email: string): Email {
    return new Email(email);
  }

  /**
   * Creates an Email with both format AND anti-spam validation
   * This is where the adapter is injected
   */
  public static async createWithAntiSpamCheck(
    email: string,
    antiSpamService: AntiSpamPort
  ): Promise<Email> {
    // First: validate format
    if (!Email.isValid(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }

    // Second: check anti-spam service
    const isBlocked = await antiSpamService.isBlocked(email);
    if (isBlocked) {
      throw new Error(`Email is blocked or blacklisted: ${email}`);
    }

    // If both checks pass, create the email
    return new Email(email);
  }

  public getDomain(): string {
    return this.value.split('@')[1];
  }

  public getLocalPart(): string {
    return this.value.split('@')[0];
  }
}
