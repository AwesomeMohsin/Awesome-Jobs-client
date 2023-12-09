import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Route.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>


)
