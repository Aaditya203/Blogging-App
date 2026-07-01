import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExploreComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col items-center px-8 py-20 text-center">
          {/* Icon */}
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
            <Compass className="h-7 w-7 text-neutral-700" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-fair font-semibold tracking-tight text-neutral-900">
            Our Explore page is currently
            <br />
            being curated.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-500">
            We are crafting a sophisticated discovery experience to bring you
            the highest signal editorial content. Check back soon for new
            perspectives.
          </p>

          {/* Button */}
          <Link
            to="/dashboard"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <div className="flex items-center gap-2">
                <ArrowLeft size={18}/>
             <div>Return Home</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}