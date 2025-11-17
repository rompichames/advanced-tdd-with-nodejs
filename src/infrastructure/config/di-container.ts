import 'reflect-metadata';
import { container } from 'tsyringe';
import { AntiSpamPort } from '../../domain/ports/anti-spam.port.js';
import { MockAntiSpamAdapter } from '../external-services/mock-anti-spam.adapter.js';
import { RealAntiSpamAdapter } from '../external-services/real-anti-spam.adapter.js';

/**
 * Configure dependency injection container
 * This is where we decide which implementation to use
 */
export function setupDIContainer(environment: 'test' | 'integration' | 'production') {
  if (environment === 'test') {
    // Unit tests: Use mock (fast, deterministic)
    container.register<AntiSpamPort>('AntiSpamPort', {
      useClass: MockAntiSpamAdapter,
    });
  } else if (environment === 'integration') {
    // Integration tests: Use real service
    const apiKey = process.env.ANTI_SPAM_API_KEY || 'test-key';
    container.register<AntiSpamPort>('AntiSpamPort', {
      useValue: new RealAntiSpamAdapter(apiKey),
    });
  } else {
    // Production: Use real service with real API key
    const apiKey = process.env.ANTI_SPAM_API_KEY;
    if (!apiKey) {
      throw new Error('ANTI_SPAM_API_KEY environment variable is required');
    }
    container.register<AntiSpamPort>('AntiSpamPort', {
      useValue: new RealAntiSpamAdapter(apiKey),
    });
  }
}
