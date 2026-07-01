
import { updateProfileDetails } from '@/services/auth.service';
import { ChevronDown, Link2, X } from 'lucide-react';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const countries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
];

type Profile = {
    id:string;
    name:string;
    username:string;
    bio:string | null;
    country: string | null;
    portfolio: string | null;
    joinedAt: string;
    email:string
}

type Props = {
    isOpen:boolean;
    onClose: () => void;
    profile:Profile | null;
    onProfileUpdated:(profile:Profile) => void;
}

const EditProfile = ({isOpen,onClose,profile,onProfileUpdated}:Props) => {
    
    const [name,setName] = useState("");
    const [bio,setBio] = useState("");
    const [country,setCountry] = useState("");
    const [portfolio,setPortfolio] = useState("");
    useEffect(()=>{
      if(isOpen && profile){
        setName(profile.name);
        setBio(profile.bio ?? "")
        setCountry(profile.country ?? "")
        setPortfolio(profile.portfolio ?? "")
      }
    },[isOpen,profile])

    if(!isOpen){
        return null;
    }
    async function handleSave(){
      try{
        const response = await updateProfileDetails(name,bio,country,portfolio);
        onProfileUpdated(response)
        onClose()
      }
      catch(error){
        toast.error("Failed to update profile")
      }
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-3 sm:p-4">

      <div className="w-full max-w-3xl max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-4 sm:px-8 py-4 sm:py-6 shrink-0">

          <h2 className="text-xl sm:text-3xl font-bold text-black">
            Edit Profile
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-neutral-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 sm:space-y-7 p-4 sm:p-8 overflow-y-auto">

          {/* Name */}

          <div>
            <label className="mb-3 block text-sm font-semibold text-neutral-700">
              Full Name
            </label>

            <input
              value={name!}
              onChange={(e) => setName(e.target.value)}
              className="h-12 sm:h-14 w-full rounded-xl border border-neutral-300 px-4 sm:px-5 text-base sm:text-lg outline-none transition focus:border-black"
            />
          </div>

          {/* Bio */}

          <div>
            <div className="mb-3 flex justify-between">

              <label className="text-sm font-semibold text-neutral-700">
                Bio
              </label>

            </div>

            <div className="relative">

              <textarea
                rows={5}
                maxLength={160}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full resize-none rounded-xl border border-neutral-300 p-4 sm:p-5 text-base sm:text-lg outline-none transition focus:border-black sm:rows-5"
              />

              <span className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-sm text-neutral-400">
                {bio.length}/160
              </span>
            </div>
          </div>

          {/* Country */}

          <div>

            <label className="mb-3 block text-sm font-semibold text-neutral-700">
              Country
            </label>

            <div className="relative">

              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-12 sm:h-14 w-full appearance-none rounded-xl border border-neutral-300 bg-white px-4 sm:px-5 pr-10 sm:pr-12 text-base sm:text-lg outline-none transition focus:border-black"
              >
                <option value="" disabled>Select a country</option>
                {countries.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>

              <ChevronDown
                className="pointer-events-none absolute right-4 sm:right-5 top-1/2 -translate-y-1/2"
                size={20}
              />

            </div>
          </div>

          {/* Portfolio */}

          <div>

            <label className="mb-3 block text-sm font-semibold text-neutral-700">
              Portfolio Link
              <span className="ml-1 text-neutral-400">
                (Optional)
              </span>
            </label>

            <div className="relative">

              <Link2
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />

              <input
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="h-12 sm:h-14 w-full rounded-xl border border-neutral-300 pl-11 sm:pl-12 pr-4 sm:pr-5 text-base sm:text-lg outline-none transition focus:border-black"
              />

            </div>

            <p className="mt-3 text-sm text-neutral-400">
              Share your portfolio or personal website link.
            </p>

          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 border-t p-4 sm:p-8 shrink-0">

          <button
            onClick={onClose}
            className="h-12 sm:h-14 flex-1 rounded-xl border border-neutral-300 text-base sm:text-lg font-medium transition hover:bg-neutral-100 py-2"
          >
            Cancel
          </button>

          <button onClick={handleSave}
            className="h-12 sm:h-14 flex-1 rounded-xl bg-black text-base sm:text-lg font-medium text-white transition hover:bg-neutral-900 py-2"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  )
}

export default EditProfile