import { routes } from "@/data/routes";
import { Route } from "@/types/route";

export function searchRoutes(from: string, to: string): Route[] {
  return routes.filter((route) => {
    return (
      route.from.toLowerCase().trim() === from.toLowerCase().trim() &&
      route.to.toLowerCase().trim() === to.toLowerCase().trim()
    );
  });
}