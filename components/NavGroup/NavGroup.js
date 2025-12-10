async function fetchHTML() {
  const resp = await fetch(new URL("./NavGroup.html", import.meta.url));
  return await resp.text();
}

export default class MainLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.shadowRoot.innerHTML = await fetchHTML();
  }
}
