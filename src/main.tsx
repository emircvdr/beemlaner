import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import "./index.css"

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './components/theme-provider'
import { SidebarProvider } from './components/ui/sidebar'
import { Toaster } from './components/ui/sonner'


// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider>
        <SidebarProvider>
          <Toaster />
          <RouterProvider router={router} />
        </SidebarProvider>
      </ThemeProvider>
    </StrictMode>,
  )
}