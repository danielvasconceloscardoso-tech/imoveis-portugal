// Native disclosure menus remain usable without JavaScript. When the full-screen
// menu is open, keyboard and assistive-technology users stay in the same surface.
export function focusableElements(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
  )].filter((el) => el.tabIndex >= 0 && !el.closest('[hidden], [inert]') && el.getClientRects().length > 0);
}

export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
  if (event.key !== "Tab") return;
  const items = focusableElements(container), first = items[0], last = items[items.length - 1];
  if (!first) { event.preventDefault(); return; }
  const outside = !container.contains(document.activeElement);
  if (event.shiftKey && (document.activeElement === first || outside)) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || outside)) {
    event.preventDefault(); first.focus();
  }
}

// Isolate siblings along the ancestor chain, preserving any pre-existing inert
// state. This works for a menu nested in the header and a body-level dialog.
export function isolateBackground(container: HTMLElement): () => void {
  const previous = new Map<HTMLElement, boolean>();
  for (let child: HTMLElement | null = container; child && child !== document.body; child = child.parentElement) {
    for (const sibling of child.parentElement?.children ?? []) {
      if (!(sibling instanceof HTMLElement) || sibling === child || /^(SCRIPT|STYLE|LINK)$/.test(sibling.tagName)) continue;
      previous.set(sibling, sibling.inert);
      sibling.inert = true;
    }
  }
  return () => { previous.forEach((inert, element) => { element.inert = inert; }); previous.clear(); };
}

let closeMenu: ((restoreFocus: boolean) => void) | undefined;

export function closeNavigationMenus(restoreFocus = false): void {
  closeMenu?.(restoreFocus);
  document.querySelectorAll<HTMLDetailsElement>("details.cpick[open]").forEach((picker) => { picker.open = false; });
}

export function initNavigation(): void {
  const menu = document.querySelector<HTMLDetailsElement>("details.concierge");
  if (!menu || menu.dataset.keyboardReady) return;
  menu.dataset.keyboardReady = "true";
  const summary = menu.querySelector<HTMLElement>(":scope > summary")!;
  let active = false, release: (() => void) | undefined;
  closeMenu = (restoreFocus) => {
    menu.open = false;
    if (!active) return;
    active = false;
    release?.(); release = undefined;
    document.documentElement.classList.remove("nav-lock");
    if (restoreFocus) summary.focus({ preventScroll: true });
  };
  menu.addEventListener("toggle", () => {
    if (!menu.open) { closeMenu?.(true); return; }
    if (active) return;
    active = true;
    document.querySelectorAll<HTMLDetailsElement>("details.cpick[open]").forEach((picker) => { picker.open = false; });
    release = isolateBackground(menu);
    document.documentElement.classList.add("nav-lock");
    requestAnimationFrame(() => { if (menu.open) menu.querySelector<HTMLAnchorElement>(".cmenu a[href]")?.focus({ preventScroll: true }); });
  });
  document.addEventListener("keydown", (event) => {
    if (!active) return;
    if (event.key === "Escape") {
      event.preventDefault(); event.stopPropagation(); closeMenu?.(true);
    } else trapFocus(event, menu);
  }, true);
  document.addEventListener("focusin", (event) => {
    if (active && !menu.contains(event.target as Node)) focusableElements(menu)[0]?.focus({ preventScroll: true });
  });
  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (active && !menu.contains(target)) closeMenu?.(true);
    document.querySelectorAll<HTMLDetailsElement>("details.cpick[open]").forEach((picker) => { if (!picker.contains(target)) picker.open = false; });
  });
  menu.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest("a[href]")) closeMenu?.(false);
  });
  document.querySelectorAll<HTMLDetailsElement>("details.cpick").forEach((picker) => {
    picker.addEventListener("toggle", () => { if (picker.open) closeMenu?.(false); });
    picker.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && picker.open) {
        event.preventDefault(); event.stopPropagation(); picker.open = false;
        picker.querySelector<HTMLElement>(":scope > summary")?.focus();
      }
    });
  });
}
