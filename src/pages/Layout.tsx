import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  /* In Chakra UI v3, the 'none' value for the display property is used to
    completely hide an element. In Chakra UI v3, the block value for the
    display property is used to make an element behave as a block-level
    element. This means the element will take up the full width available and
    stack vertically with other elements.
  */
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
