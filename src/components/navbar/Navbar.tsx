"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/user/userSlice";
import { setCurrentUser } from "@/redux/features/auth/userSlice";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "AI Chat", href: "/ai-chat" },
  { name: "About Us", href: "/about" },
  { name: "Our Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

type User = { name: string } | null;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User>(null);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("VeluxaCleanUser");
    if (user) {
      // dispatch(setCurrentUser(JSON.parse(user)));
      setUser(JSON.parse(user));
    }
  }, []);

  if (pathname === "/ai-chat" || pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className='sticky top-0 z-50 w-full bg-[#F4F6FB] '>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='flex items-center justify-center'>
              <svg
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14.0798 7.75001C15.2221 6.91007 16.7778 6.91007 17.9201 7.75001L24.808 12.8147C25.6387 13.4255 26.1292 14.395 26.1292 15.4261V25.758H19.6465V17.066L15.9999 14.3847L12.3534 17.066V25.758H5.87061V15.4261C5.87061 14.395 6.36114 13.4255 7.19182 12.8147L14.0798 7.75001Z'
                  fill='#6ECEDA'
                />
                <rect
                  x='12.395'
                  y='25.7578'
                  width='7.24329'
                  height='5.24219'
                  fill='#4A4A4A'
                />
              </svg>
            </div>
            <span className='text-xl font-bold text-[#315D62]'>
              VeluxaClean
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className='hidden lg:flex'>
            <NavigationMenuList className='space-x-1'>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className='group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-lg font-medium text-[#315D62] transition-colors border border-transparent hover:border-gray-100 hover:text-[#315D62] focus:bg-gray-50 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Login Button */}
          <div className='hidden lg:flex'>
            {user ? (
              <Button
                onClick={() => handleLogout()}
                variant='outline'
                className='bg-transparent text-lg text-[#4A4A4A] border-[#c55b48] !rounded-full hover:bg-gray-50 cursor-pointer'
              >
                Logout
              </Button>
            ) : (
              <Button
                variant='outline'
                className='bg-white text-lg text-[#4A4A4A] border-[#6ECEDA] !rounded-full hover:bg-gray-50'
                asChild
              >
                <Link href='/login'>Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                className='lg:hidden'
                size='icon'
                aria-label='Toggle menu'
              >
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[300px] sm:w-[400px] bg-[#27484C]'
            >
              <div className='flex flex-col space-y-4 mt-8'>
                {/* Mobile Logo */}
                <div className='flex items-center justify-center space-x-2 pb-4 border-b border-[#3164699f]'>
                  <div className='flex h-8 w-8 items-center justify-center'>
                    <svg
                      width='32'
                      height='32'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14.0798 7.75001C15.2221 6.91007 16.7778 6.91007 17.9201 7.75001L24.808 12.8147C25.6387 13.4255 26.1292 14.395 26.1292 15.4261V25.758H19.6465V17.066L15.9999 14.3847L12.3534 17.066V25.758H5.87061V15.4261C5.87061 14.395 6.36114 13.4255 7.19182 12.8147L14.0798 7.75001Z'
                        fill='#6ECEDA'
                      />
                      <rect
                        x='12.395'
                        y='25.7578'
                        width='7.24329'
                        height='5.24219'
                        fill='#4A4A4A'
                      />
                    </svg>
                  </div>
                  <span className='text-xl font-bold text-[#D7D7D7]'>
                    VeluxaClean
                  </span>
                </div>

                {/* Mobile Navigation Links */}
                <nav className='flex-1 flex flex-col items-center justify-center space-y-5'>
                  {navigationItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className='flex items-center rounded-md px-3 py-2 text-sm font-medium text-[#D7D7D7] hover:bg-gray-100 hover:text-gray-900'
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Mobile Login Button */}
                <div className='w-full absolute bottom-5 flex items-center pt-4 border-t border-[#3164699f]'>
                  <SheetClose asChild>
                    <Button
                      variant='outline'
                      className='w-[90%] mx-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      asChild
                    >
                      <Link href='/login'>Login</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
