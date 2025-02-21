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

### Mock Structure

1. **Feature-specific Mocks**
   - Located in `__mocks__` folder within feature directories
   - Contains only mocks relevant to that feature
   - Exports mocked events and methods

2. **Main Mock Aggregator**
   - Located at `src/__mocks__/webextension-polyfill.ts`
   - Imports and combines all feature-specific mocks
   - Provides a complete mock of the WebExtension API

### Test Patterns

Each feature's tests follow these patterns:

1. **Basic Event Emission**
   - Tests that events are properly emitted
   - Verifies event payload structure

2. **Unsubscription**
   - Tests cleanup on unsubscribe
   - Verifies removeListener is called

3. **Event Filtering**
   - Tests RxJS operators like `filter`
   - Verifies filtered events behave correctly

4. **RxJS Integration**
   - Tests integration with RxJS operators (`take`, `takeUntil`)
   - Verifies proper completion behavior

## Adding New Features

To add support for a new browser API namespace:

1. Create a new directory under `src/` for the namespace
2. Create the required files following the module structure
3. Create namespace-specific mocks in a `__mocks__` subdirectory
4. Add the mocks to the main mock aggregator
5. Export the new functionality from the main entry point 