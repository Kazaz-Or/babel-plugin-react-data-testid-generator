# Vite Example - Data TestId Generator

This example demonstrates how to use `babel-plugin-react-data-testid-generator` with **Vite**.

## Key Features

- ⚡ **Lightning fast** development with Vite
- 🔧 **Babel plugin integration** through `@vitejs/plugin-react`
- 🎨 **Beautiful modern UI** with gradient effects and animations
- 🔍 **Automatic test IDs** generated for all React elements
- 📱 **Responsive design** that works on all devices

## How It Works

The plugin is configured in `vite.config.js` through the React plugin's babel options:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-data-testid-generator', {
            attributes: ['data-testid']
          }]
        ]
      }
    })
  ]
})
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3001`

4. **Inspect the DOM** to see the automatically generated `data-testid` attributes!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run serve` - Build and serve (combined)

## What You'll See

- 📊 **Interactive components** with counters and modals
- 🃏 **Beautiful card layouts** for users and products
- 🧪 **Test components** including class and functional components
- 🎯 **Conditional rendering** with dynamic content
- ✨ **Modern animations** and hover effects

## Unique Test IDs

Each component gets unique test IDs to avoid conflicts:
- First button: `Button.button`
- Second button: `Button.button2`
- Third button: `Button.button3`

Perfect for automated testing! 🚀 