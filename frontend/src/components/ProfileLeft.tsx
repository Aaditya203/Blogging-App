import { useAuth } from "@/context/AuthContext";
import {
  Bookmark,
  ChartColumn,
  FileText,
  Home,
  LogOut,
  MessageCircle,
  PenLine,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAvatarInitials } from "./BlogCard";
import { useState } from "react";
import { ComingSoonBadge } from "./ComingSoon";

const menuItems = [
  { 
    key: "overview",
    title: "Overview",
    icon: Home,
    available: true,
    path:'/profile'
  },
  { 
    key:"my-blogs",
    title: "My Blogs",
    icon: FileText,
    available: true,
    path:"/profile/blogs"
  },
  { 
    key:"drafts",
    title: "Drafts",
    icon: PenLine,
    available: false,
    path:""
  },
  { 
    key:"bookmarks",
    title: "Bookmarks",
    icon: Bookmark,
    available: false,
    path:""
  },
  { 
    key:"stats",
    title: "Stats",
    icon: ChartColumn,
    available: false,
    path:""
  },
  { 
    key:"comments",
    title: "Comments",
    icon: MessageCircle,
    available: false,
    path:""
  },
  { 
    key:"settings",
    title: "Settings",
    icon: Settings,
    available: false,
    path:""
  },
];

type Props = {
  name:string;
  email:string;
}
export default function ProfileSidebar({name,email}:Props) {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [tooltipkey,setToolTipKey] = useState<string |null>(null);

  const activeKey = menuItems.find((item)=> item.available &&item.path===location.pathname)?.key ??"overview";
  const handleItemClick = (item:(typeof menuItems)[number])=>{
    if(!item.available){
      setToolTipKey(item.key)
      setTimeout(()=> setToolTipKey(null),1500);
      return;
    }
    navigate(item.path)
  }

  return (
    <aside className="flex flex-row lg:flex-col w-full lg:w-auto rounded-3xl border border-gray-200 p-3 sm:p-5 shadow-sm lg:h-[calc(100vh-120px)] overflow-x-auto lg:overflow-visible">
      

      {/* Profile */}

      <div className="flex items-center gap-4 shrink-0">

        <div className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-black text-base lg:text-xl font-semibold text-white">
          {getAvatarInitials(name)}
        </div>

        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-gray-900">
            {name}
          </h2>

          <p className="text-sm text-gray-500">
            {email}
          </p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex flex-row lg:flex-col lg:flex-1 gap-2 ml-3 lg:ml-0 lg:mt-10 overflow-x-auto lg:overflow-visible">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeKey === item.key;

          return (
            <div key={item.key} className="relative shrink-0">

            <button
            disabled={!item.available}
              onClick={()=>handleItemClick(item)}
              className={`
                  flex w-full items-center gap-3 rounded-xl px-3 lg:px-4 py-3 text-left transition-all duration-200
                  ${
                    !item.available
                      ? "text-gray-400 cursor-not-allowed opacity-70"
                      : isActive
                      ? "bg-gray-100 font-medium text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  }
                `}
            >
              <Icon className="h-5 w-5" />

              <span className="hidden lg:inline">{item.title}</span>
              {!item.available && <ComingSoonBadge/>}
            </button>
            {tooltipkey === item.key && (
                <span
                  className="absolute left-1/2 -top-9 -translate-x-1/2 whitespace-nowrap
                             rounded-md bg-gray-900 px-2 py-1 text-xs text-white
                             animate-in fade-in slide-in-from-bottom-1 duration-200 z-10"
                >
                  🚧 Coming soon
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}

      <button className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 lg:px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 shrink-0 ml-2 lg:ml-0" onClick={()=>{
        logout()
        navigate('/signin');
      }}>
        <LogOut className="h-5 w-5" />

        <span className="hidden lg:inline">Sign out</span>
      </button>

    </aside>
  );
}