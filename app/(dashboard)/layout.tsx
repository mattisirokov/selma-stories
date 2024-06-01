import BottomNavigation from "@/components/BottomNavigation";

const userDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={"flex h-screen w-screen flex-col"}>
      <div className={"h-full w-full"}>{children}</div>
      <BottomNavigation />
    </main>
  );
};

export default userDashboardLayout;
