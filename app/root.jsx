import {
  NavLink,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import { useState } from "react";

import resetStyles from "~/styles/reset.css";
import globalStyles from "~/styles/global.css";
import rootStyles from "~/styles/root.css";

export function meta() {
  return { title: "futurebrian" };
}

function activeClass(isActive, className) {
  return `${className} ${isActive ? "active" : ""}`.trim();
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );
}

function Nav() {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav>
      <NavLink exact to="/">
        <h1>
          <div>future</div>
          brian
        </h1>
      </NavLink>
      <div>
        <div className="menu-button-wrapper">
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen(!isOpen)}
            style={{
              padding: isOpen ? "8px" : "0 24px",
              borderRadius: isOpen ? "100%" : 40,
            }}
          >
            {isOpen ? <CloseIcon /> : "menu"}
          </button>
        </div>
        {isOpen && (
          <div className="menu-links">
            <>
              <NavLink
                exact
                onClick={() => setOpen(false)}
                className={(isActive) =>
                  activeClass(isActive, "link link--keyboards")
                }
                to="/keyboards"
              >
                keyboards
              </NavLink>
              <NavLink
                exact
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  activeClass(isActive, "link link--keycaps")
                }
                to="/keycaps"
              >
                keycaps
              </NavLink>
            </>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={globalStyles} />
        <link rel="stylesheet" href={rootStyles} />
        <Links />
      </head>
      <body>
        <Nav />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
