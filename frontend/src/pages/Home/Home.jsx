import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspaces } from "@/hooks/apis/workspaces/useFetchWorkspaces";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { isFetching, workspaces } = useFetchWorkspaces();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) return;

    console.log("Workspaces downloaded", workspaces);

    if (workspaces.length === 0 || !workspaces) {
      console.log("No workspaces");
      setOpenCreateWorkspaceModal(true);
    } else {
      navigate(`/workspaces/${workspaces[0]._id}`);
    }
  }, [workspaces, isFetching, navigate]);

  return (
    <>
      <h1>Home</h1>
      <UserButton />
    </>
  );
};
