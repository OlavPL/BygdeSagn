import AppUser from '@/types/AppUser';
import { createContext } from 'react';

export interface ContextInterface {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  userSession: AppUser | undefined;
}

export const AppContext = createContext<ContextInterface>({
  title: 'Tittel',
  setTitle: () => {},
  userSession: undefined,
});