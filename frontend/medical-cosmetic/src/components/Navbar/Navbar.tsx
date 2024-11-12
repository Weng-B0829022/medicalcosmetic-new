import { Link, useLocation } from "react-router-dom"
import { User } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../../components/ui/navigation-menu"

type NavigationItem = {
    label: string;
    href: string;
    subItems?: { label: string; href: string; }[];
}

const navigationItems: NavigationItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "發覺療程", href: "/discover" },
    { label: "我的療程", href: "/reserve" },
    { label: "聯絡客服", href: "/contect" },
    { label: "歷史療程", href: "/history" },
]

export default function Navbar() {
    const location = useLocation();

    return (
        <header className=" border-text bg-white fixed top-0 left-0 right-0 z-50">
            <div className="flex h-20 items-center w-full">
                <div className="pl-4"> 
                    <Link to="/" className="flex items-center gap-3">
                        <img 
                            src="/public/static/logo.png"
                            alt="Beauty Tech Logo" 
                            className="h-10 w-10 rounded-full "
                        />
                        <span className="text-xl h-10 flex items-center font-work-sans font-bold text-primary">
                            Beauty Tech
                        </span>
                    </Link>
                </div>
                <div className="flex justify-end flex-1">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-2">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    {item.subItems ? (
                                        <>
                                            <NavigationMenuTrigger 
                                                className="font-work-sans h-10 text-text "
                                            >
                                                {item.label}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[200px] gap-3 p-4 border-[3px] border-text bg-white">
                                                    {item.subItems.map((subItem) => (
                                                        <li key={subItem.label}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    to={subItem.href}
                                                                    className="block select-none space-y-1 rounded-md p-3 font-work-sans leading-none no-underline outline-none transition-colors "
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={item.href}
                                                className={`
                                                    px-4 py-2 rounded-md transition-colors
                                                    ${location.pathname === item.href 
                                                        ? ' font-bold '
                                                        : '  '
                                                    }
                                                `}
                                            >
                                                {item.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center gap-4 ml-6 mr-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full "
                            aria-label="User profile"
                        >
                            <User className="h-5 w-5 text-primary" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}