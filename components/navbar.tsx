"use client"

import Link from "next/link"
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const Navbar = () => {
  const { isSignedIn } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { href: "/properties", label: "Properties" },
    { href: "/search", label: "Search" },
    ...(isSignedIn ? [{ href: "/dashboard", label: "Dashboard" }] : []),
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            RealEstate
          </Link>
          <div className="hidden md:flex space-x-4">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} className="hover:text-primary">
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Register</Button>
              </SignUpButton>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-lg hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
