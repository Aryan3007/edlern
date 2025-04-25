import { AdminSidebar } from "../comp/admin-sidebar";


interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {


  return (
    <div className="min-h-screen flex flex-row">
      <AdminSidebar />
      <main className="flex-1 p-2 max-w-7xl mx-auto  bg-background">{children}</main>
    </div>
  );
};

export default AdminLayout;