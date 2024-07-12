import { useState } from "react";
import AdminLoginForm from "../components/admin/AdminLoginForm";
import AdminDashBoard from "../components/admin/AdminDashBoard";
import { Box } from "@chakra-ui/react";

export default function Admin() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Box p="32px">
      {isLogin ? (
        <AdminDashBoard setIsLogin={setIsLogin} />
      ) : (
        <AdminLoginForm setIsLogin={setIsLogin} />
      )}
    </Box>
  );
}
