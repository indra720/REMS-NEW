// // import Header from "@/components/Header";
// // import Footer from "@/components/Footer";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import { TrendingUp, MapPin, DollarSign, BarChart3, Target, Clock, Shield, Star, Users, Building, Award } from "lucide-react";

// // const RealEstateInvestments = () => {
// //   const investmentOptions = [
// //     {
// //       title: "Premium Residential Projects",
// //       location: "Gurgaon Sector 65",
// //       minInvestment: "₹25 Lakh",
// //       expectedReturn: "18-22%",
// //       duration: "3-5 years",
// //       riskLevel: "Medium",
// //       image: "/placeholder.svg",
// //       features: ["Prime location", "Luxury amenities", "Metro connectivity"]
// //     },
// //     {
// //       title: "Commercial Spaces",
// //       location: "Noida Sector 62",
// //       minInvestment: "₹50 Lakh",
// //       expectedReturn: "15-20%",
// //       duration: "5-7 years",
// //       riskLevel: "Low",
// //       image: "/placeholder.svg",
// //       features: ["IT hub", "High rental yield", "Corporate tenants"]
// //     },
// //     {
// //       title: "Affordable Housing",
// //       location: "Pune PMRDA",
// //       minInvestment: "₹15 Lakh",
// //       expectedReturn: "20-25%",
// //       duration: "2-4 years",
// //       riskLevel: "Medium",
// //       image: "/placeholder.svg",
// //       features: ["Government backed", "Subsidies available", "Growing demand"]
// //     }
// //   ];

// //   const portfolioStats = [
// //     { label: "Total Investments", value: "₹2.5 Cr", growth: "+12%" },
// //     { label: "Active Projects", value: "15", growth: "+3" },
// //     { label: "Average Returns", value: "19.5%", growth: "+2.1%" },
// //     { label: "Portfolio Value", value: "₹3.2 Cr", growth: "+28%" }
// //   ];

// //   const investmentGuides = [
// //     {
// //       title: "Beginner's Guide to Real Estate Investment",
// //       description: "Learn the basics of property investment and how to get started",
// //       readTime: "8 min read",
// //       category: "Beginner"
// //     },
// //     {
// //       title: "Commercial vs Residential: Which is Better?",
// //       description: "Compare different types of real estate investments",
// //       readTime: "12 min read",
// //       category: "Analysis"
// //     },
// //     {
// //       title: "Tax Benefits in Real Estate Investment",
// //       description: "Understand tax implications and saving opportunities",
// //       readTime: "15 min read",
// //       category: "Tax Planning"
// //     }
// //   ];

// //   const riskColors = {
// //     "Low": "bg-green-100 text-green-800",
// //     "Medium": "bg-yellow-100 text-yellow-800",
// //     "High": "bg-red-100 text-red-800"
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* <Header /> */}
      
// //       {/* Hero Section */}
// //       <section className="relative py-20 bg-gradient-to-br from-purple-100 to-purple-50">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center max-w-4xl mx-auto">
// //             <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
// //               Real Estate Investments
// //             </h1>
// //             <p className="text-xl text-muted-foreground mb-8">
// //               Build wealth through smart real estate investments with expert guidance and curated opportunities
// //             </p>
// //             <div className="flex flex-wrap gap-4 justify-center">
// //               <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
// //                 <Target className="w-5 h-5" />
// //                 Start Investing
// //               </Button>
// //               <Button variant="outline" size="lg" className="gap-2">
// //                 <BarChart3 className="w-5 h-5" />
// //                 View Portfolio
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Portfolio Stats */}
// //       <section className="py-12 bg-muted/50">
// //         <div className="container mx-auto px-4">
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //             {portfolioStats.map((stat, index) => (
// //               <Card key={index}>
// //                 <CardContent className="p-6">
// //                   <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
// //                   <p className="text-sm text-muted-foreground">{stat.label}</p>
// //                   <div className="text-sm text-green-600 font-medium mt-1">{stat.growth}</div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Investment Opportunities */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl font-bold mb-4">Featured Investment Opportunities</h2>
// //             <p className="text-muted-foreground">Handpicked projects with high growth potential</p>
// //           </div>

// //           <Tabs defaultValue="residential" className="w-full">
// //             <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-12">
// //               <TabsTrigger value="residential">Residential</TabsTrigger>
// //               <TabsTrigger value="commercial">Commercial</TabsTrigger>
// //               <TabsTrigger value="plots">Plots & Land</TabsTrigger>
// //               <TabsTrigger value="reits">REITs</TabsTrigger>
// //             </TabsList>

// //             <TabsContent value="residential">
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                 {investmentOptions.map((option, index) => (
// //                   <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
// //                     <div className="aspect-video bg-muted flex items-center justify-center">
// //                       <Building className="w-12 h-12 text-muted-foreground" />
// //                     </div>
// //                     <CardHeader>
// //                       <div className="flex items-start justify-between">
// //                         <CardTitle className="text-lg">{option.title}</CardTitle>
// //                         <Badge className={riskColors[option.riskLevel as keyof typeof riskColors]}>
// //                           {option.riskLevel} Risk
// //                         </Badge>
// //                       </div>
// //                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
// //                         <MapPin className="w-4 h-4" />
// //                         {option.location}
// //                       </div>
// //                     </CardHeader>
// //                     <CardContent className="space-y-4">
// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div>
// //                           <p className="text-xs text-muted-foreground">Min Investment</p>
// //                           <p className="font-semibold">{option.minInvestment}</p>
// //                         </div>
// //                         <div>
// //                           <p className="text-xs text-muted-foreground">Expected Return</p>
// //                           <p className="font-semibold text-green-600">{option.expectedReturn}</p>
// //                         </div>
// //                       </div>
                      
// //                       <div className="flex items-center gap-1 text-sm">
// //                         <Clock className="w-4 h-4" />
// //                         <span>{option.duration}</span>
// //                       </div>

// //                       <div className="space-y-2">
// //                         <p className="text-sm font-medium">Key Features:</p>
// //                         <div className="flex flex-wrap gap-1">
// //                           {option.features.map((feature, idx) => (
// //                             <Badge key={idx} variant="secondary" className="text-xs">
// //                               {feature}
// //                             </Badge>
// //                           ))}
// //                         </div>
// //                       </div>

// //                       <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Invest Now</Button>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </div>
// //             </TabsContent>

// //             <TabsContent value="commercial">
// //               <div className="text-center py-12">
// //                 <h3 className="text-xl font-semibold mb-4">Commercial Investment Opportunities</h3>
// //                 <p className="text-muted-foreground mb-8">Premium office spaces and retail investments</p>
// //                 <Button className="bg-purple-600 hover:bg-purple-700 text-white">Explore Commercial Projects</Button>
// //               </div>
// //             </TabsContent>

// //             <TabsContent value="plots">
// //               <div className="text-center py-12">
// //                 <h3 className="text-xl font-semibold mb-4">Land & Plot Investments</h3>
// //                 <p className="text-muted-foreground mb-8">Strategic land acquisitions in developing areas</p>
// //                 <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Available Plots</Button>
// //               </div>
// //             </TabsContent>

// //             <TabsContent value="reits">
// //               <div className="text-center py-12">
// //                 <h3 className="text-xl font-semibold mb-4">Real Estate Investment Trusts</h3>
// //                 <p className="text-muted-foreground mb-8">Diversified real estate portfolios for smaller investments</p>
// //                 <Button className="bg-purple-600 hover:bg-purple-700 text-white">Explore REITs</Button>
// //               </div>
// //             </TabsContent>
// //           </Tabs>
// //         </div>
// //       </section>

// //       {/* Investment Process */}
// //       <section className="py-16 bg-muted/50">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl font-bold mb-4">How It Works</h2>
// //             <p className="text-muted-foreground">Simple steps to start your real estate investment journey</p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
// //             {[
// //               { step: "1", title: "Register & Verify", desc: "Create your account and complete KYC verification", icon: <Users className="w-8 h-8" /> },
// //               { step: "2", title: "Choose Investment", desc: "Select from curated investment opportunities", icon: <Target className="w-8 h-8" /> },
// //               { step: "3", title: "Invest Securely", desc: "Make your investment through secure payment gateway", icon: <Shield className="w-8 h-8" /> },
// //               { step: "4", title: "Track Returns", desc: "Monitor your investment performance and returns", icon: <TrendingUp className="w-8 h-8" /> }
// //             ].map((step, index) => (
// //               <div key={index} className="text-center">
// //                 <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4 text-purple-600">
// //                   {step.icon}
// //                 </div>
// //                 <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-4 text-sm font-bold">
// //                   {step.step}
// //                 </div>
// //                 <h3 className="font-semibold mb-2">{step.title}</h3>
// //                 <p className="text-sm text-muted-foreground">{step.desc}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Investment Guides */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl font-bold mb-4">Investment Guides & Resources</h2>
// //             <p className="text-muted-foreground">Learn from experts and make informed investment decisions</p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {investmentGuides.map((guide, index) => (
// //               <Card key={index} className="hover:shadow-lg transition-all duration-300">
// //                 <CardHeader>
// //                   <div className="flex items-center justify-between mb-2">
// //                     <Badge variant="secondary">{guide.category}</Badge>
// //                     <span className="text-xs text-muted-foreground">{guide.readTime}</span>
// //                   </div>
// //                   <CardTitle className="text-lg">{guide.title}</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-muted-foreground mb-4">{guide.description}</p>
// //                   <Button variant="outline" className="w-full">Read More</Button>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-16 bg-purple-600 text-white">
// //         <div className="container mx-auto px-4 text-center">
// //           <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
// //           <p className="text-xl mb-8">Join thousands of investors building wealth through real estate</p>
// //           <div className="flex flex-wrap gap-4 justify-center">
// //             <Button size="lg" variant="secondary">
// //               Get Started Today
// //             </Button>
// //             <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
// //               Schedule Consultation
// //             </Button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* <Footer /> */}
// //     </div>
// //   );
// // };

// // export default RealEstateInvestments;




// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { TrendingUp, MapPin, DollarSign, BarChart3, Target, Clock, Shield, Users, Building, Award } from "lucide-react";

// const RealEstateInvestments = () => {
//   const investmentOptions = [
//     {
//       title: "Premium Residential Projects",
//       location: "Gurgaon Sector 65",
//       minInvestment: "₹25 Lakh",
//       expectedReturn: "18-22%",
//       duration: "3-5 years",
//       riskLevel: "Medium",
//       image: "/placeholder.svg",
//       features: ["Prime location", "Luxury amenities", "Metro connectivity"]
//     },
//     {
//       title: "Commercial Spaces",
//       location: "Noida Sector 62",
//       minInvestment: "₹50 Lakh",
//       expectedReturn: "15-20%",
//       duration: "5-7 years",
//       riskLevel: "Low",
//       image: "/placeholder.svg",
//       features: ["IT hub", "High rental yield", "Corporate tenants"]
//     },
//     {
//       title: "Affordable Housing",
//       location: "Pune PMRDA",
//       minInvestment: "₹15 Lakh",
//       expectedReturn: "20-25%",
//       duration: "2-4 years",
//       riskLevel: "Medium",
//       image: "/placeholder.svg",
//       features: ["Government backed", "Subsidies available", "Growing demand"]
//     }
//   ];

//   const portfolioStats = [
//     { label: "Total Investments", value: "₹2.5 Cr", growth: "+12%" },
//     { label: "Active Projects", value: "15", growth: "+3" },
//     { label: "Average Returns", value: "19.5%", growth: "+2.1%" },
//     { label: "Portfolio Value", value: "₹3.2 Cr", growth: "+28%" }
//   ];

//   const investmentGuides = [
//     {
//       title: "Beginner's Guide to Real Estate Investment",
//       description: "Learn the basics of property investment and how to get started",
//       readTime: "8 min read",
//       category: "Beginner"
//     },
//     {
//       title: "Commercial vs Residential: Which is Better?",
//       description: "Compare different types of real estate investments",
//       readTime: "12 min read",
//       category: "Analysis"
//     },
//     {
//       title: "Tax Benefits in Real Estate Investment",
//       description: "Understand tax implications and saving opportunities",
//       readTime: "15 min read",
//       category: "Tax Planning"
//     }
//   ];

//   const riskColors = {
//     "Low": "bg-green-100 text-green-800",
//     "Medium": "bg-yellow-100 text-yellow-800",
//     "High": "bg-red-100 text-red-800"
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-100 to-purple-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-4xl mx-auto">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
//               Real Estate Investments
//             </h1>
//             <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
//               Build wealth through smart real estate investments with expert guidance and curated opportunities
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
//                 <Target className="w-5 h-5" />
//                 Start Investing
//               </Button>
//               <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
//                 <BarChart3 className="w-5 h-5" />
//                 View Portfolio
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Portfolio Stats */}
//       <section className="py-8 sm:py-12 bg-muted/50">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             {portfolioStats.map((stat, index) => (
//               <Card key={index}>
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="text-xl sm:text-2xl font-bold text-purple-600">{stat.value}</div>
//                   <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
//                   <div className="text-xs sm:text-sm text-green-600 font-medium mt-1">{stat.growth}</div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Investment Opportunities */}
//       <section className="py-12 sm:py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-4">Featured Investment Opportunities</h2>
//             <p className="text-muted-foreground">Handpicked projects with high growth potential</p>
//           </div>

//           <Tabs defaultValue="residential" className="w-full">
//             <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-full sm:max-w-2xl mx-auto mb-8 sm:mb-12 h-auto p-1">
//               <TabsTrigger value="residential" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 Residential
//               </TabsTrigger>
//               <TabsTrigger value="commercial" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 Commercial
//               </TabsTrigger>
//               <TabsTrigger value="plots" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 <span className="hidden sm:inline">Plots & Land</span>
//                 <span className="sm:hidden">Plots</span>
//               </TabsTrigger>
//               <TabsTrigger value="reits" className="text-xs sm:text-sm px-2 sm:px-4 py-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
//                 REITs
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="residential">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//                 {investmentOptions.map((option, index) => (
//                   <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
//                     <div className="aspect-video bg-muted flex items-center justify-center">
//                       <Building className="w-8 sm:w-12 h-8 sm:h-12 text-muted-foreground" />
//                     </div>
//                     <CardHeader className="p-4 sm:p-6">
//                       <div className="flex items-start justify-between">
//                         <CardTitle className="text-base sm:text-lg">{option.title}</CardTitle>
//                         <Badge className={riskColors[option.riskLevel as keyof typeof riskColors]}>
//                           {option.riskLevel} Risk
//                         </Badge>
//                       </div>
//                       <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
//                         <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
//                         {option.location}
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-xs text-muted-foreground">Min Investment</p>
//                           <p className="font-semibold text-sm sm:text-base">{option.minInvestment}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-muted-foreground">Expected Return</p>
//                           <p className="font-semibold text-green-600 text-sm sm:text-base">{option.expectedReturn}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-1 text-xs sm:text-sm">
//                         <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
//                         <span>{option.duration}</span>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-xs sm:text-sm font-medium">Key Features:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {option.features.map((feature, idx) => (
//                             <Badge key={idx} variant="secondary" className="text-xs">
//                               {feature}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base">
//                         Invest Now
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="commercial">
//               <div className="text-center py-8 sm:py-12">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-4">Commercial Investment Opportunities</h3>
//                 <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Premium office spaces and retail investments</p>
//                 <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
//                   Explore Commercial Projects
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="plots">
//               <div className="text-center py-8 sm:py-12">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-4">Land & Plot Investments</h3>
//                 <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Strategic land acquisitions in developing areas</p>
//                 <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
//                   View Available Plots
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="reits">
//               <div className="text-center py-8 sm:py-12">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-4">Real Estate Investment Trusts</h3>
//                 <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Diversified real estate portfolios for smaller investments</p>
//                 <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
//                   Explore REITs
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>

//       {/* Investment Process */}
//       <section className="py-12 sm:py-16 bg-muted/50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-4">How It Works</h2>
//             <p className="text-muted-foreground text-sm sm:text-base">Simple steps to start your real estate investment journey</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
//             {[
//               { step: "1", title: "Register & Verify", desc: "Create your account and complete KYC verification", icon: <Users className="w-6 sm:w-8 h-6 sm:h-8" /> },
//               { step: "2", title: "Choose Investment", desc: "Select from curated investment opportunities", icon: <Target className="w-6 sm:w-8 h-6 sm:h-8" /> },
//               { step: "3", title: "Invest Securely", desc: "Make your investment through secure payment gateway", icon: <Shield className="w-6 sm:w-8 h-6 sm:h-8" /> },
//               { step: "4", title: "Track Returns", desc: "Monitor your investment performance and returns", icon: <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8" /> }
//             ].map((step, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4 text-purple-600">
//                   {step.icon}
//                 </div>
//                 <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-4 text-xs sm:text-sm font-bold">
//                   {step.step}
//                 </div>
//                 <h3 className="font-semibold mb-2 text-sm sm:text-base">{step.title}</h3>
//                 <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Investment Guides */}
//       <section className="py-12 sm:py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-4">Investment Guides & Resources</h2>
//             <p className="text-muted-foreground text-sm sm:text-base">Learn from experts and make informed investment decisions</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
//             {investmentGuides.map((guide, index) => (
//               <Card key={index} className="hover:shadow-lg transition-all duration-300">
//                 <CardHeader className="p-4 sm:p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <Badge variant="secondary" className="text-xs">{guide.category}</Badge>
//                     <span className="text-xs text-muted-foreground">{guide.readTime}</span>
//                   </div>
//                   <CardTitle className="text-base sm:text-lg">{guide.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 sm:p-6 pt-0">
//                   <p className="text-muted-foreground mb-4 text-sm sm:text-base">{guide.description}</p>
//                   <Button variant="outline" className="w-full text-sm sm:text-base">Read More</Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 sm:py-16 bg-purple-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Investing?</h2>
//           <p className="text-lg sm:text-xl mb-6 sm:mb-8">Join thousands of investors building wealth through real estate</p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" variant="secondary" className="w-full sm:w-auto">
//               Get Started Today
//             </Button>
//             <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600 w-full sm:w-auto">
//               Schedule Consultation
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default RealEstateInvestments;



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, DollarSign, BarChart3, Target, Clock, Shield, Users, Building, Award } from "lucide-react";

const RealEstateInvestments = () => {
  const investmentOptions = [
    {
      title: "Premium Residential Projects",
      location: "Gurgaon Sector 65",
      minInvestment: "₹25 Lakh",
      expectedReturn: "18-22%",
      duration: "3-5 years",
      riskLevel: "Medium",
      image: "/placeholder.svg",
      features: ["Prime location", "Luxury amenities", "Metro connectivity"]
    },
    {
      title: "Commercial Spaces",
      location: "Noida Sector 62",
      minInvestment: "₹50 Lakh",
      expectedReturn: "15-20%",
      duration: "5-7 years",
      riskLevel: "Low",
      image: "/placeholder.svg",
      features: ["IT hub", "High rental yield", "Corporate tenants"]
    },
    {
      title: "Affordable Housing",
      location: "Pune PMRDA",
      minInvestment: "₹15 Lakh",
      expectedReturn: "20-25%",
      duration: "2-4 years",
      riskLevel: "Medium",
      image: "/placeholder.svg",
      features: ["Government backed", "Subsidies available", "Growing demand"]
    }
  ];

  const portfolioStats = [
    { label: "Total Investments", value: "₹2.5 Cr", growth: "+12%" },
    { label: "Active Projects", value: "15", growth: "+3" },
    { label: "Average Returns", value: "19.5%", growth: "+2.1%" },
    { label: "Portfolio Value", value: "₹3.2 Cr", growth: "+28%" }
  ];

  const investmentGuides = [
    {
      title: "Beginner's Guide to Real Estate Investment",
      description: "Learn the basics of property investment and how to get started",
      readTime: "8 min read",
      category: "Beginner"
    },
    {
      title: "Commercial vs Residential: Which is Better?",
      description: "Compare different types of real estate investments",
      readTime: "12 min read",
      category: "Analysis"
    },
    {
      title: "Tax Benefits in Real Estate Investment",
      description: "Understand tax implications and saving opportunities",
      readTime: "15 min read",
      category: "Tax Planning"
    }
  ];

  const riskColors = {
    "Low": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "High": "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-100 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Real Estate Investments
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Build wealth through smart real estate investments with expert guidance and curated opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                <Target className="w-5 h-5" />
                Start Investing
              </Button>
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <BarChart3 className="w-5 h-5" />
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-8 sm:py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {portfolioStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{stat.value}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  <div className="text-xs sm:text-sm text-green-600 font-medium mt-1">{stat.growth}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Featured Investment Opportunities</h2>
            <p className="text-muted-foreground">Handpicked projects with high growth potential</p>
          </div>

          <Tabs defaultValue="residential" className="w-full">
            <TabsList className="flex flex-col sm:grid sm:grid-cols-4 w-full max-w-full sm:max-w-2xl mx-auto mb-8 sm:mb-12 h-auto p-1 gap-1 sm:gap-0">
              <TabsTrigger value="residential" className="w-full justify-center text-sm px-4 py-3 sm:py-2">
                Residential
              </TabsTrigger>
              <TabsTrigger value="commercial" className="w-full justify-center text-sm px-4 py-3 sm:py-2">
                Commercial
              </TabsTrigger>
              <TabsTrigger value="plots" className="w-full justify-center text-sm px-4 py-3 sm:py-2">
                Plots & Land
              </TabsTrigger>
              <TabsTrigger value="reits" className="w-full justify-center text-sm px-4 py-3 sm:py-2">
                REITs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="residential">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {investmentOptions.map((option, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Building className="w-8 sm:w-12 h-8 sm:h-12 text-muted-foreground" />
                    </div>
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base sm:text-lg">{option.title}</CardTitle>
                        <Badge className={riskColors[option.riskLevel as keyof typeof riskColors]}>
                          {option.riskLevel} Risk
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
                        {option.location}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Min Investment</p>
                          <p className="font-semibold text-sm sm:text-base">{option.minInvestment}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Expected Return</p>
                          <p className="font-semibold text-green-600 text-sm sm:text-base">{option.expectedReturn}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span>{option.duration}</span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs sm:text-sm font-medium">Key Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {option.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base">
                        Invest Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commercial">
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Commercial Investment Opportunities</h3>
                <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Premium office spaces and retail investments</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                  Explore Commercial Projects
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="plots">
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Land & Plot Investments</h3>
                <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Strategic land acquisitions in developing areas</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                  View Available Plots
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="reits">
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Real Estate Investment Trusts</h3>
                <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Diversified real estate portfolios for smaller investments</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                  Explore REITs
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Simple steps to start your real estate investment journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: "1", title: "Register & Verify", desc: "Create your account and complete KYC verification", icon: <Users className="w-6 sm:w-8 h-6 sm:h-8" /> },
              { step: "2", title: "Choose Investment", desc: "Select from curated investment opportunities", icon: <Target className="w-6 sm:w-8 h-6 sm:h-8" /> },
              { step: "3", title: "Invest Securely", desc: "Make your investment through secure payment gateway", icon: <Shield className="w-6 sm:w-8 h-6 sm:h-8" /> },
              { step: "4", title: "Track Returns", desc: "Monitor your investment performance and returns", icon: <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8" /> }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4 text-purple-600">
                  {step.icon}
                </div>
                <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-4 text-xs sm:text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Guides */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Investment Guides & Resources</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Learn from experts and make informed investment decisions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {investmentGuides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{guide.category}</Badge>
                    <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                  </div>
                  <CardTitle className="text-base sm:text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">{guide.description}</p>
                  <Button variant="outline" className="w-full text-sm sm:text-base">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">Join thousands of investors building wealth through real estate</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600 w-full sm:w-auto">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstateInvestments;