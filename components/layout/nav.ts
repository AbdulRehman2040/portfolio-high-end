// Section anchor contract — see DESIGN_SYSTEM.md. These ids are shared by
// the header, the mobile menu and every chapter section.
export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
