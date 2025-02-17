# BrowserRx Tab Monitor Example

This example demonstrates the usage of browserRx.tabs functionality by creating a simple browser extension that monitors and displays tab events.

## Features

- Monitors tab creation, updates, activation, and removal events
- Displays events in real-time through a popup interface
- Logs events to the console through a background service worker

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```
   
   For development with watch mode:
   ```bash
   npm run dev
   ```

3. Load the extension in your browser:
   - Chrome/Edge:
     1. Go to `chrome://extensions` or `edge://extensions`
     2. Enable "Developer mode"
     3. Click "Load unpacked"
     4. Select the `dist` directory inside this example folder

## Usage

1. Click the extension icon in your browser toolbar to open the popup
2. The popup will display tab events in real-time as they occur
3. Events are also logged to the browser console (View > Developer > JavaScript Console)

## Events Monitored

- **Tab Created**: When a new tab is created
- **Tab Updated**: When a tab's properties change (URL, title, etc.)
- **Tab Activated**: When a tab becomes the active tab
- **Tab Removed**: When a tab is closed

Each event displays:
- Event type
- Timestamp
- Detailed event data

## Build Configuration

The extension is built using Vite with the following configuration:
- TypeScript support
- Automatic copying of manifest.json and popup.html
- Development mode with watch capability
- Output directory: `dist` 