import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { status, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      console.log("logout success");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { status, logout };
};

export default useLogout;
