import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default async function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {children}
      <Footer />
    </div>
  );
}