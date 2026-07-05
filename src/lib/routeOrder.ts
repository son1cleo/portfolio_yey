export const ROUTE_ORDER = ["/", "/about", "/projects", "/contact"];

export function getRouteIndex(pathname: string) {
  const index = ROUTE_ORDER.indexOf(pathname);
  return index === -1 ? ROUTE_ORDER.length : index;
}
