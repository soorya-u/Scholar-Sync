export default function Gradient() {
  return (
    <div className="w-full h-full -z-50 absolute top-96 right-28">
      <div className="relative isolate size-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[17rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-[30rem]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[50%] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[40deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[50%] sm:w-[72.1875rem]"
          />
        </div>

        <div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8"></div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[17rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-[30rem]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[50%] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[40deg] bg-gradient-to-tr from-secondary to-primary opacity-30 sm:left-[50%] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
