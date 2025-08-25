// src/api/axios.ts
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

/*
ex) archive/에서 activities API를 호출할 때:
src/axios/axios.ts, src/authRequest.ts, src/app/queryClient.ts
-> src/features/archive/api/activityApi.ts
-> src/features/archive/hooks/useActivities.ts
-> src/features/archive/ArchiveMainPage.tsx, src/features/archive/ArchiveDetailPage.tsx
*/
