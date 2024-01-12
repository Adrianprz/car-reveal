import { Html } from "@react-three/drei";

export function Header() {
  return (
    <Html as="header" wrapperClass="header" zIndexRange={[0, 0]}>
      <div className="header__container">
        <div className="header__block">
          <a href="/" title="Home" className="header__link">
            Logo
          </a>
        </div>
        <div className="header__block">
          <ul className="list">
            <li>
              <a href="/" title="Home">
                Home
              </a>
            </li>
            <li>
              <a href="/" title="About">
                About
              </a>
            </li>
            <li>
              <a href="/" title="Models">
                Models
              </a>
            </li>
            <li>
              <a href="/" title="Configure">
                Configure
              </a>
            </li>
          </ul>
        </div>
        <div className="header__block">
          <ul className="list">
            <li>
              <a href="/" title="Login">
                Login
              </a>
            </li>
            <li>
              <a href="/" title="Register">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Html>
  );
}
