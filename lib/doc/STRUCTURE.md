# Project Structure

## Overview

BrowserRx is a RxJS wrapper for WebExtensions API events, making browser extension events reactive. The project follows a modular structure where each browser API namespace has its own dedicated module.

## Directory Structure

```
lib/
├── src/
│   ├── __mocks__/
│   │   └── webextension-polyfill.ts      # Main mock aggregator
│   ├── tabs/
│   │   ├── __mocks__/
│   │   │   └── tabs.ts                   # Tabs-specific mocks
│   │   ├── tabs.ts                       # Tabs implementation
│   │   ├── tabs.spec.ts                  # Tabs tests
│   │   ├── tabs-models.ts                # Tabs event interfaces
│   │   └── index.ts                      # Tabs barrel file
│   ├── browser-action/
│   │   ├── __mocks__/
│   │   │   └── browser-action.ts         # BrowserAction-specific mocks
│   │   ├── browser-action.ts             # BrowserAction implementation
│   │   ├── browser-action.spec.ts        # BrowserAction tests
│   │   ├── browser-action-models.ts      # BrowserAction event interfaces
│   │   └── index.ts                      # BrowserAction barrel file
│   └── index.ts                          # Main entry point
```

## Module Structure

Each browser API namespace (e.g., tabs, browserAction) follows the same structure:

1. **Implementation File** (`*.ts`)
   - Contains the RxJS Observable wrappers for browser events
   - Uses `fromBrowserEvent` utility to transform browser events into Observables

2. **Models File** (`*-models.ts`)
   - Defines TypeScript interfaces for event payloads
   - Ensures type safety when working with event data

3. **Test File** (`*.spec.ts`)
   - Contains comprehensive tests for the implementation
   - Tests basic event emission, unsubscription, filtering, and RxJS operators
   - Uses dedicated mocks for browser events

4. **Mock File** (`__mocks__/*.ts`)
   - Contains Vitest mocks for browser events and methods
   - Located close to the feature code for better maintainability
   - Exports mocked events and methods specific to the namespace

5. **Barrel File** (`index.ts`)
   - Exports all public APIs from the module
   - Simplifies imports for consumers

## Testing Strategy

### Test Configuration

The project uses Vitest with the following configuration (`vitest.config.ts`):
```typescript
{
  test: {
    environment: 'jsdom',
    include: ['**/*.spec.ts'],
    globals: true,
    testTimeout: 1000,
    hookTimeout: 1000,
    alias: {
      'webextension-polyfill': resolve(__dirname, 'src/__mocks__/webextension-polyfill.ts')
    }
  }
}
```

Key configuration points:
- Uses JSDOM environment for browser API simulation
- Automatically aliases `webextension-polyfill` imports to our mock implementation
- Global test setup with reasonable timeouts

### Test Structure

Each feature's tests follow these patterns:

1. **Basic Event Emission**
   ```typescript
   it('should emit when event occurs', () => {
     const mockFn = vi.fn();
     const testEvent = { /* event data */ };
     
     browserRxFeature.onEvent.subscribe(mockFn);
     
     const [eventSubject] = WebExtensionMock.feature.onEvent.addListener.mock.calls[0];
     eventSubject(/* event args */);
     
     expect(mockFn).toHaveBeenCalledWith(testEvent);
   });
   ```

2. **Unsubscription**
   ```typescript
   it('should complete when unsubscribed', () => {
     const subscription = browserRxFeature.onEvent.subscribe();
     subscription.unsubscribe();
     expect(WebExtensionMock.feature.onEvent.removeListener).toHaveBeenCalled();
   });
   ```

3. **RxJS Operator Tests**
   - Tests `filter` operator with event-specific conditions
   - Tests `take(1)` for single event consumption
   - Tests `takeUntil` for external completion

4. **Event Filtering**
   ```typescript
   it('should emit filtered events', () => {
     browserRxFeature.onEvent.pipe(
       filter(event => /* condition */)
     ).subscribe(mockFn);
     
     // Test non-matching event
     eventSubject(nonMatchingEvent);
     expect(mockFn).not.toHaveBeenCalled();
     
     // Test matching event
     eventSubject(matchingEvent);
     expect(mockFn).toHaveBeenCalled();
   });
   ```

### Mock Structure

1. **Feature-specific Mocks**
   ```typescript
   export const mockEvent = {
     addListener: vi.fn(),
     removeListener: vi.fn(),
     hasListener: vi.fn()
   };
   
   export const feature = {
     onEvent: mockEvent
   };
   ```

2. **Main Mock Aggregator**
   - Located at `src/__mocks__/webextension-polyfill.ts`
   - Imports and combines all feature-specific mocks
   - Automatically used via Vitest alias configuration

## Adding New Features

To add support for a new browser API namespace:

1. Create a new directory under `src/` for the namespace
2. Create the required files following the module structure
3. Create namespace-specific mocks in a `__mocks__` subdirectory
4. Add the mocks to the main mock aggregator
5. Export the new functionality from the main entry point
6. Add comprehensive tests following the established patterns 