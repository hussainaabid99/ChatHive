export const Auth = ({ children }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-gradient-to-br from-theme-indigo to-theme-medium/90">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
};
