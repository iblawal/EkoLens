export interface Route {
  id: number;

  from: string;
  to: string;

  transport: string[];

  boardingPoint: string;

  route: string[];

  dropOff: string;

  landmark: string;

  fare: number;

  duration: number; // minutes

  safety: string;

  traffic: string;
}