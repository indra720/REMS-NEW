import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Building,
  LogOut,
  ChevronUp,
  ChevronDown,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const Header = ({ isLoggeIn, setisLoggedIn, isregister, setisregister }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isAssociateOpen, setIsAssociateOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (isLoggeIn) {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        if (user && user.role) {
          setUserRole(user.role.toLowerCase());
        } else {
          setUserRole(null);
        }
      }
    } else {
      setUserRole(null);
    }
  }, [isLoggeIn]);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user"); // Also remove user from localStorage
    setisLoggedIn(false);
    setUserRole(null); // Reset role on logout
    navigate("/login");
  };

  const propertyLinks = [
    {
      href: "/search",
      title: "Search Properties",
      description: "Find your dream property",
    },
    {
      href: "/add-property",
      title: "Add Property",
      description: "List your property",
    },
    {
      href: "/post-property",
      title: "Post Property",
      description: "Post property for sale/rent",
    },
    {
      href: "/book-visit",
      title: "Book Visit",
      description: "Schedule property visits",
    },
    {
      href: "/price-trends",
      title: "Price Trends",
      description: "Market price analysis",
    },
    {
      href: "/area-converter",
      title: "Area Converter",
      description: "Convert area units",
    },
  ];

  const allDashboardLinks = [
    { href: "/dashboard", title: "Dashboard", description: "User dashboard" },
    { href: "/admin", title: "Admin", description: "Admin panel" },
    { href: "/agent", title: "Agent", description: "Agent dashboard" },
    { href: "/owner", title: "Owner Dashboard", description: "Owner dashboard" },
  ];

  const dashboardLinks = userRole === 'admin' 
    ? allDashboardLinks.filter(link => link.href !== '/dashboard') // Admin sees all specific dashboards
    : allDashboardLinks.filter(link => link.href === `/${userRole}`);

  const companyLinks = [
    {
      href: "/about",
      title: "About Us",
      description: "Learn about our company",
    },
    {
      href: "/our-services",
      title: "Our Services",
      description: "Explore our services",
    },
    { href: "/careers", title: "Careers", description: "Join our team" },
    {
      href: "/testimonials",
      title: "Testimonials",
      description: "What clients say",
    },
    {
      href: "/real-estate-investments",
      title: "Investments",
      description: "Investment opportunities",
    },
    {
      href: "/builders-in-india",
      title: "Builders",
      description: "Top builders in India",
    },
  ];

  const supportLinks = [
    { href: "/contact", title: "Contact Us", description: "Get in touch" },
    {
      href: "/customer-service",
      title: "Customer Service",
      description: "24/7 support",
    },
    {
      href: "/request-info",
      title: "Request Info",
      description: "Get information",
    },
    {
      href: "/feedback",
      title: "Feedback",
      description: "Share your thoughts",
    },
    {
      href: "/report-problem",
      title: "Report Problem",
      description: "Report issues",
    },
    {
      href: "/rent-receipt",
      title: "Rent Receipt",
      description: "Generate rent receipts",
    },
  ];

  const contactLinks = [
    { href: "/contact", title: "Whatsapp", description: "Get in touch" },
    { href: "/contact", title: "Call", description: "24/7 support" },
    { href: "/contact", title: "Email", description: "24/7 support" },
    { href: "/contact", title: "Office Address", description: "Get in touch" },
  ];
  const associateLinks = [
    { href: "/contact", title: "Become a Agent", description: "Get in touch" },
    {
      href: "/customer-service",
      title: "Become a Associate",
      description: "24/7 support",
    },
  ];

  const legalLinks = [
    {
      href: "/terms",
      title: "Terms & Conditions",
      description: "Terms of service",
    },
    {
      href: "/privacy",
      title: "Privacy Policy",
      description: "Privacy information",
    },
    {
      href: "/summons-notices",
      title: "Summons/Notices",
      description: "Legal notices",
    },
    {
      href: "/grievances",
      title: "Grievances",
      description: "File complaints",
    },
  ];

  const getDashboardPathForRole = (role) => {
    if (!role) return null;
    const specialRoles = ['admin', 'agent', 'owner'];
    if (specialRoles.includes(role)) {
      return `/${role}`;
    }
    // Default for 'customer' and other roles
    return '/dashboard'; 
  };

  const renderDesktopDashboardLink = () => {
    if (!userRole) return null;

    // Super User Dropdown
    if (userRole === 'super_user') {
      return (
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboards</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {allDashboardLinks.map((link) => (
                <li key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {link.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {link.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    // Standard Dashboard Link for other roles
    const dashboardPath = getDashboardPathForRole(userRole);
    const dashboardLink = dashboardPath ? allDashboardLinks.find(l => l.href === dashboardPath) : null;

    if (dashboardLink) {
      return (
        <NavigationMenuItem>
          <Link 
            to={dashboardLink.href} 
            className={cn(
              navigationMenuTriggerStyle(),
              isActive(dashboardLink.href) ? "bg-accent text-accent-foreground" : ""
            )}
          >
            {dashboardLink.title}
          </Link>
        </NavigationMenuItem>
      );
    }

    return null;
  };

  const renderMobileDashboardLink = () => {
    if (!userRole) return null;

    // Special Dropdown for Super User on Mobile
    if (userRole === 'super_user') {
      return (
        <MobileNavLinkGroup
          title="Dashboard"
          links={allDashboardLinks}
          isOpen={isDashboardOpen}
          toggleOpen={() => setIsDashboardOpen(!isDashboardOpen)}
        />
      );
    }

    // Standard Dashboard Link for other roles on Mobile
    const dashboardPath = getDashboardPathForRole(userRole);
    const dashboardLink = dashboardPath ? allDashboardLinks.find(l => l.href === dashboardPath) : null;

    if (dashboardLink) {
      return (
        <NavLink 
          href={dashboardLink.href} 
          mobile 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {dashboardLink.title}
        </NavLink>
      );
    }

    return null;
  };

  const NavLink = ({
    href,
    children,
    mobile = false,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    mobile?: boolean;
    onClick?: () => void;
  }) => (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        mobile
          ? "block px-3 py-2 text-base font-medium transition-colors hover:text-purple-600"
          : "text-sm font-medium transition-colors hover:text-purple-600",
        isActive(href) ? "text-purple-600" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );

  const MobileNavLinkGroup = ({ title, links, isOpen, toggleOpen }) => (
    <div className="flex flex-col space-y-2">
                <h4
                  className="font-medium flex items-center justify-between cursor-pointer"
                  onClick={toggleOpen}
                >
                  <span>{title}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </h4>      {isOpen && (
        <div className="flex flex-col space-y-2 pl-4">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              mobile
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden xl:flex">
          <Link to="/index" className="mr-6 flex items-center space-x-2">
            <Building className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              PropertyHub
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/search"
                        >
                          <Building className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Property Search
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Find your perfect property with our advanced search
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {propertyLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {isLoggeIn && renderDesktopDashboardLink()}

              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {companyLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {supportLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {contactLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Become a Associate ?
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {associateLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger >
                  <Link to="/property-valuation">
                  Want Property valuation ?
                  </Link>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="z-50">
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 xl:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 w-full mt-16">
            <Link to="/index" className="flex items-center space-x-2 " onClick={() => setIsMobileMenuOpen(false)}>
              {/* <Building className="h-6 w-6" /> */}
              <span className="font-bold">PropertyHub</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-y-auto">
              <div className="flex flex-col space-y-3">
                <MobileNavLinkGroup
                  title="Properties"
                  links={propertyLinks}
                  isOpen={isPropertiesOpen}
                  toggleOpen={() => setIsPropertiesOpen(!isPropertiesOpen)}
                />

                {isLoggeIn && renderMobileDashboardLink()}

                <MobileNavLinkGroup
                  title="Company"
                  links={companyLinks}
                  isOpen={isCompanyOpen}
                  toggleOpen={() => setIsCompanyOpen(!isCompanyOpen)}
                />

                <MobileNavLinkGroup
                  title="Support"
                  links={supportLinks}
                  isOpen={isSupportOpen}
                  toggleOpen={() => setIsSupportOpen(!isSupportOpen)}
                />

                <MobileNavLinkGroup
                  title="Legal"
                  links={legalLinks}
                  isOpen={isLegalOpen}
                  toggleOpen={() => setIsLegalOpen(!isLegalOpen)}
                />

                <MobileNavLinkGroup
                  title="Become a Associate ?"
                  links={associateLinks}
                  isOpen={isAssociateOpen}
                  toggleOpen={() => setIsAssociateOpen(!isAssociateOpen)}
                />

                <NavLink href="/property-valuation" mobile onClick={() => setIsMobileMenuOpen(false)}>
                  Want Property Valuation ?
                </NavLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/index" className="md:hidden">
              <Building className="h-6 w-6" />
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            {!isLoggeIn && (
              <div>
                <Button asChild variant="ghost">
                  <Link to="/login" className="text-purple-600 hover:text-purple-800">Login</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/register" className="text-purple-600 hover:text-purple-800">Register</Link>
                </Button>
              </div>
            )}
            {isLoggeIn && (
              <>
                {/* Desktop buttons */}
                <div className="hidden xl:flex items-center space-x-2">
                  <Button asChild variant="ghost">
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>

                {/* Mobile dropdown */}
                <div className="xl:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="rounded-full border h-9 w-9 p-0">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;