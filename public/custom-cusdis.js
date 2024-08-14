window.CUSDIS = {};
let e;

function t(t) {
  return (
    e ||
      ((e = document.createElement("iframe")),
      (function (e, t) {
        const s = window.matchMedia("(prefers-color-scheme: dark)");

        function d(d) {
          try {
            const i = JSON.parse(d.data);
            if ("cusdis" === i.from) {
              switch (i.event) {
                case "onload":
                  "auto" === t.dataset.theme &&
                    n("setTheme", s.matches ? "dark" : "light");
                  
                  // Remove the Cusdis attribution link
                  const poweredByLink = e.contentWindow.document.querySelector(
                    "a[href='https://cusdis.com']"
                  );
                  if (poweredByLink) poweredByLink.style.display = "none";
                  
                  break;
                case "resize":
                  e.style.height = i.data + "px";
              }
            }
          } catch (i) {}
        }

        function i(e) {
          const s = e.matches;
          "auto" === t.dataset.theme && n("setTheme", s ? "dark" : "light");
        }

        window.addEventListener("message", d);
        s.addEventListener("change", i);
      })(e, t)),
    (e.srcdoc = ((e) => {
      const t = e.dataset.host || "https://cusdis.com",
        n = e.dataset.iframe || `${t}/js/iframe.umd.js`;

      // Custom CSS to set black background and white text
      return `<!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="${t}/js/style.css">
          <base target="_parent" />
          <script>
            window.CUSDIS_LOCALE = ${JSON.stringify(window.CUSDIS_LOCALE)};
            window.__DATA__ = ${JSON.stringify(e.dataset)};
          </script>
          <style>
            :root {
              color-scheme: dark;
            }
            body {
              background-color: #0c0a09 !important;
              color: #00d155 !important;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              overflow-y:hidden;
            }
            #root {
              background-color: #0c0a09 !important;
              color: #00d155 !important; 
              padding: 10px; 
              border-radius: 8px;
            }
            .cusdis-comment,
            .cusdis-author,
            .cusdis-email,
            .cusdis-reply {
              background-color: #0c0a09 !important;
               color: #00d155 !important; 
              padding: 10px;
              border-radius: 8px;
            }
              .cusdis-reply{
                  color: #fff !important; 
              }
            input,
            textarea {
              background-color: #222 !important;
             color: #fff !important; /* Custom text color */
              border: none;
              padding: 8px;
              border-radius: 7px;
              width: calc(100% - 16px);
              backdrop-filter: blur(16px) saturate(180%);
              -webkit-backdrop-filter: blur(16px) saturate(180%);
              background-color: rgba(17, 25, 40, 0.75);
            }
            button {
              background-color: #00d155 !important;
              color: #000 !important;
              border: none;
              padding: 8px 14px;
              cursor: pointer;
              border-radius:7px;
            }
            button:hover {
              background-color: #000 !important;
              border:1px solid #00d155 !important;
              color: #fff !important;
            }

            @media (max-width: 768px) {
              input,
              textarea,
              button {
                width: calc(100% - 12px); /* Adjust width for smaller screens */
              }
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script src="${n}" type="module"></script>
        </body>
      </html>`;
    })(t)),
    (e.style.width = "100%"),
    (e.style.border = "0"),
    e
  );
}

function n(t, n) {
  e &&
    e.contentWindow.postMessage(
      JSON.stringify({ from: "cusdis", event: t, data: n })
    );
}

function s(e) {
  if (e) {
    e.innerHTML = "";
    const n = t(e);
    e.appendChild(n);
  }
}

function d() {
  let e;
  if (window.cusdisElementId) {
    e = document.querySelector(`#${window.cusdisElementId}`);
  } else if (document.querySelector("#cusdis_thread")) {
    e = document.querySelector("#cusdis_thread");
  } else if (document.querySelector("#cusdis")) {
    console.warn(
      "id `cusdis` is deprecated. Please use `cusdis_thread` instead"
    );
    e = document.querySelector("#cusdis");
  }
  if (e && !window.CUSDIS_PREVENT_INITIAL_RENDER) {
    s(e);
  }
}

window.renderCusdis = s;
window.CUSDIS.renderTo = s;
window.CUSDIS.setTheme = function (e) {
  n("setTheme", e);
};
window.CUSDIS.initial = d;
d();
