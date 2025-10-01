import { Link } from "react-router-dom";
import { Building, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Award, Users, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Top section with beautiful gradient cards */}
      <div className="container px-4 py-16 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-4">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <h3 className="font-bold text-xl mb-2">10K+</h3>
              <p className="text-white/80">Properties Listed</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-blue-400" />
              <h3 className="font-bold text-xl mb-2">50K+</h3>
              <p className="text-white/80">Happy Customers</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-3 text-green-400" />
              <h3 className="font-bold text-xl mb-2">100%</h3>
              <p className="text-white/80">Verified Properties</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-3 text-red-400" />
              <h3 className="font-bold text-xl mb-2">24/7</h3>
              <p className="text-white/80">Customer Support</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 md:grid-cols-2">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-2xl">PropertyHub</span>
            </div>
            <p className="text-white/80 text-lg">
              Your trusted partner in finding the perfect property. We make buying, selling, and renting properties simple and transparent with cutting-edge technology and expert guidance.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white/90">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Mail className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-white/90">contact@propertyhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-white/90">123 Property Street, Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-blue-400">Properties</h3>
            <ul className="space-y-3">
              <li><Link to="/search" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Search Properties</Link></li>
              <li><Link to="/add-property" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Add Property</Link></li>
              <li><Link to="/post-property" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Post Property</Link></li>
              <li><Link to="/book-visit" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Book Visit</Link></li>
              <li><Link to="/price-trends" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Price Trends</Link></li>
              <li><Link to="/area-converter" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Area Converter</Link></li>
            </ul>
          </div>

          {/* Services & Tools */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-green-400">Services & Tools</h3>
            <ul className="space-y-3">
              <li><Link to="/our-services" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Our Services</Link></li>
              <li><Link to="/real-estate-investments" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Investments</Link></li>
              <li><Link to="/builders-in-india" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Builders in India</Link></li>
              <li><Link to="/rent-receipt" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Rent Receipt</Link></li>
              <li><Link to="/articles" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Articles & News</Link></li>
              <li><Link to="/mobile-apps" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Support & Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-purple-400">Support & Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">About Us</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Contact Us</Link></li>
              <li><Link to="/customer-service" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Customer Service</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Careers</Link></li>
              <li><Link to="/testimonials" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Testimonials</Link></li>
              <li><Link to="/safety-guide" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Safety Guide</Link></li>
              <li><Link to="/feedback" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Feedback</Link></li>
              <li><Link to="/report-problem" className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Report Problem</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl backdrop-blur border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-bold text-2xl mb-3 text-blue-400">Stay in the Loop</h3>
              <p className="text-white/80 text-lg">
                Get the latest property updates, market insights, and exclusive deals delivered to your inbox.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                  Subscribe
                </Button>
              </div>
              <p className="text-white/60 text-sm">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/summons-notices" className="text-white/70 hover:text-white transition-colors">Legal Notices</Link>
            <Link to="/grievances" className="text-white/70 hover:text-white transition-colors">Grievances</Link>
            <Link to="/sitemap" className="text-white/70 hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-8 border-t border-white/20 md:flex-row">
          <div className="text-white/70 text-center md:text-left">
            <p className="text-lg">© 2024 PropertyHub. All rights reserved.</p>
            <p className="text-sm mt-1">Making property dreams come true since 2020</p>
          </div>
          
          {/* Social Links */}
          <div className="sm:flex items-center space-x-3 mt-6 md:mt-0">
            <p className="text-white/70 mr-3">Follow us:</p>
            <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
              <a href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;