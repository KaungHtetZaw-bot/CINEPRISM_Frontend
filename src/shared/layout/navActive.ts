/**
 * Shared active-state rules for navigation menus.
 *
 * NavLink's default descendant matching wrongly highlights "Movies" on
 * /media/movie/genre/28/action, so each item defines its own match rule.
 */

export interface NavItem {
  path: string;
}

export const isActiveNavItem = (pathname: string, item: NavItem): boolean => {
  switch (item.path) {
    // Browse tabs match their own page only — not genre results or details
    case '/media/movie':
      return pathname === '/media/movie';
    case '/media/tv':
      return pathname === '/media/tv';
    // Genre picker AND genre-filtered results belong to "Genres"
    case '/media/genres/movie':
      return pathname.startsWith('/media/genres') || /\/genre\/\d+/.test(pathname);
    default:
      return pathname === item.path;
  }
};
