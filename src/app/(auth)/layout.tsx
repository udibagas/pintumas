import { Image } from "antd";

export default function AuthLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Image
            preview={false}
            src="/pintumas.png"
            alt="Pintumas"
            width={30}
          />
          <div className="font-bold text-2xl text-[#b8932e]">PINTUMAS</div>
        </div>
        {children}
      </div>
    </div>
  )
}
