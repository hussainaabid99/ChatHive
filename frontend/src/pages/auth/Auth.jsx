export const Auth = ({ children }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-theme">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
};
