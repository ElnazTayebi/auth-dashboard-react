type AuthCardProps = {
  title: string;
  children?: React.ReactNode;
};

const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md space-y-4">
      <h1 className="text-lg font-semibold text-center">{title}</h1>
      {children}
    </div>
  );
};
export default AuthCard;
