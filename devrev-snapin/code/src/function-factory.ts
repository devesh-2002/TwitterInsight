import on_work_creation from './functions/on_work_creation';
import twitter from './functions/twitter';
export const functionFactory = {
  // Add your functions here
  on_work_creation,
  twitter
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
