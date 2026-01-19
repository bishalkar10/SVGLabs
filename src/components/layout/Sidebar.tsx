import { NavLink } from "react-router-dom";
import classes from "@/components/layout/Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.brand}>
        <div className={classes.logo}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2V7.5L5.4 17.5C4.9 18.6 5.7 20 7 20H17C18.3 20 19.1 18.6 18.6 17.5L14 7.5V2H10Z"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11L12.7 11.9C12.8 12.0 12.9 12.1 13 12.1H14V13.1H13C12.9 13.1 12.8 13.2 12.7 13.3L12 14.2L11 13.3C10.9 13.2 10.8 13.1 10.7 13.1H10V12.1H10.7C10.8 12.1 10.9 12.0 11 11.9L12 11Z"
              fill="var(--accent-secondary)"
            />
            <circle cx="12" cy="13" r="1.5" fill="var(--bg-sidebar)" />
            <path
              d="M12 10.5V14.5M10 12.5H14"
              stroke="var(--accent-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className={classes.brandName}>SVGEdit</span>
      </div>

      <nav className={classes.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <use href="/spritesheet.svg#icon-code" />
          </svg>
          SVG to ICO
        </NavLink>

        {/* <NavLink
          to="/optimizer"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <use href="/spritesheet.svg#icon-settings" />
          </svg>
          Optimizer
        </NavLink>

        <NavLink
          to="/spritesheet"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <use href="/spritesheet.svg#icon-upload" />
          </svg>
          Spritesheet
        </NavLink> */}

        {/* <div className={classes.sectionLabel} style={{ marginTop: "20px" }}>
          Settings
        </div>
        <div className={classes.navItem}>
          <span className={classes.icon}>⚙️</span>
          Settings
        </div> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
