import Gradient from "../Gradient";

export default function NotFound({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Gradient />
      <div className="flex min-h-full flex-col items-center justify-center gap-16">
        <div className="flex items-center justify-center gap-2">
          <img src={"/logo.png"} alt="Logo" width={50} height={50} />
          <h1 className="font-playwrite text-4xl text-primary">Scholar Sync</h1>
        </div>
        <h1 className="font-playwrite text-5xl text-amber-400 px-4 text-center leading-[3.7rem]">{message}</h1>
      </div>
    </div>
  );
}
