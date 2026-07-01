import { BarChart3, PenLine, Users } from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Write with Focus",
    description: "A clean, distraction-free editor to help you write better.",
  },
  {
    icon: Users,
    title: "Build Your Audience",
    description: "Share your knowledge and grow your readership.",
  },
  {
    icon: BarChart3,
    title: "Track Your Impact",
    description: "Beautiful analytics to understand what matters.",
  },
];

const AuthHero = () => {
  return (
    <div className="relative hidden lg:flex flex-col justify-between bg-neutral-50 p-16 border-r border-neutral-200">

      <div className="pt-5 pl-5">

        <h1 className="text-5xl font-black leading-tight font-fair">
          Share your ideas.
          <br />
          Inspire the world.
        </h1>

        <p className="mt-8 text-lg text-neutral-600 leading-8 max-w-md font-inter">
          Blogify is a minimal blogging platform for writers, developers,
          designers and thinkers.
        </p>

        <div className="mt-16 space-y-8">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5"
            >
              <div className="h-14 w-14 rounded-2xl border bg-white flex items-center justify-center">

                <feature.icon className="w-6 h-6" />

              </div>

              <div>

                <h3 className="font-bold text-lg font-inter">
                  {feature.title}
                </h3>

                <p className="text-neutral-500 font-inter">
                  {feature.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

      <img
        src="E:/blog/frontend/src/asset/background.png"
        alt=""
        className="w-full rounded-xl object-cover mt-16"
      />

    </div>
  );
};

export default AuthHero;