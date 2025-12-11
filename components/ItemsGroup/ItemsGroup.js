async function fetchHTML() {
  const resp = await fetch(new URL("./ItemsGroup.html", import.meta.url));
  return await resp.text();
}

async function fetchData() {
  // const json = {
  //   debugInfo: "doGet called. Path: data, Action: read",
  //   data: [
  //     {
  //       role: "Assistente de Direção",
  //       project: "Pecado Imperdoável",
  // //       cover: "1-PKVxmqHskL3f3MDsPadIKk6GuoAAog3",
  // //     },
  // //     {
  // //       role: "Assistente de Direção",
  // //       project: "Hecatombe",
  // //       cover: "13dhrk-7nrJWk5mShvJIAi-KnMokij3dd",
  // //     },
  // //   ],
  // // };
  // return json;

  const resp = await fetch(
    "https://script.google.com/macros/s/AKfycby_2CY0Yx6zcLcFjyvldXAAj2JHwS_1Owp0Q7dJWKXurANZaBW3LKReQ-ClUuTa0ubX/exec?path=data&action=read"
  );
  return await resp.json();
}

async function organizeHtmlData() {
  const data = await fetchData();
  const htmlString = await fetchHTML();

  const parser = new DOMParser();

  const newHtml = data.data.map((item, index) => {
    const doc = parser.parseFromString(htmlString, "text/html");

    doc.querySelector(".role").innerHTML = item.role;
    doc.querySelector(".project").innerHTML = item.project;
    doc.querySelector("img").src =
      "https://lh3.googleusercontent.com/d/" + item.cover;

    return doc.body.innerHTML;
  });

  return newHtml.toString().replaceAll(",", "");
}

export default class MainLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.shadowRoot.innerHTML =
      (await organizeHtmlData()) +
      `<link rel="stylesheet" href="./components/ItemsGroup/ItemsGroup.css" />
`;
  }
}
