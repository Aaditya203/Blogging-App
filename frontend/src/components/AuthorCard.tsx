
import { Button } from './ui/button';
import { getAvatarInitials } from './BlogCard';

interface AuthorCardProps {
  name: string;
  username: string;
  bio: string;
}

export default function AuthorCard({
  name,
  username,
  bio,
}: AuthorCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-black text-base sm:text-lg font-semibold text-white">
          {getAvatarInitials(name)}
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-black font-inter truncate">
            {name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="text-gray-500 font-inter truncate">
              @{username}
            </span>

            <span className="text-gray-300">•</span>

            <button className="font-medium text-blue-600 hover:text-blue-700 font-inter">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-sm leading-6 sm:leading-7 text-gray-600">
        {bio}
      </p>

      {/* Button */}
      
      <Button
        variant="outline"
        className="mt-5 w-full h-10 sm:h-11 font-medium font-inter">
        View Profile
      </Button>
    </div>
  );
}