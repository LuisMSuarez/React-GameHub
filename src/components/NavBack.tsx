import { Button } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "@/components/ui/tooltip";

const NavBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  if (location.pathname === "/") {
    return;
  }

  return (
    <Tooltip content="Go back">
      <Button borderRadius={6} onClick={() => navigate(-1)}>
        <IoMdArrowBack />
      </Button>
    </Tooltip>
  );
};

export default NavBack;
