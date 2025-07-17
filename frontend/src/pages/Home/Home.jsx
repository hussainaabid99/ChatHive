import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { useFetchWorkspaces } from "@/hooks/apis/workspaces/useFetchWorkspaces";
import { useEffect } from "react";

export const Home = () => {
  const { isFetching, workspaces } = useFetchWorkspaces();

  useEffect(() => {
    if (isFetching) return;

    console.log("Workspaces downloaded", workspaces);

    if (workspaces.length === 0 || !workspaces) {
      console.log("No workspaces");
    }
  }, [workspaces, isFetching]);

  return (
    <>
      <h1>Home</h1>
      <UserButton />
    </>
  );
};
