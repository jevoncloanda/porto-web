export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation, shared by the header and the footer. */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];
