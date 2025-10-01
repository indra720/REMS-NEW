import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Briefcase, Heart, TrendingUp, Award, Coffee } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers = () => {
  const benefits = [
    { icon: Heart, title: "Health Insurance", description: "Comprehensive medical coverage for you and your family" },
    { icon: TrendingUp, title: "Career Growth", description: "Clear advancement paths and skill development programs" },
    { icon: Award, title: "Performance Bonus", description: "Quarterly and annual performance-based incentives" },
    { icon: Coffee, title: "Flexible Hours", description: "Work-life balance with flexible working arrangements" },
  ];

  const jobs = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "4-6 years",
      skills: ["React", "Node.js", "AWS", "MongoDB"],
      description: "Build and maintain our core platform using modern web technologies."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5-8 years",
      skills: ["Product Strategy", "Analytics", "Agile", "User Research"],
      description: "Drive product strategy and roadmap for our real estate platform."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Delhi, India",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      description: "Create exceptional user experiences for our web and mobile applications."
    },
    {
      title: "Sales Manager",
      department: "Sales",
      location: "Pune, India",
      type: "Full-time",
      experience: "3-6 years",
      skills: ["B2B Sales", "CRM", "Relationship Building", "Negotiations"],
      description: "Drive sales growth and manage key client relationships."
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      description: "Analyze data to derive insights and build predictive models."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Digital Marketing", "Content Strategy", "SEO", "Analytics"],
      description: "Develop and execute marketing campaigns to drive user acquisition."
    },
  ];

  const culture = [
    "Innovation-driven environment",
    "Collaborative team culture",
    "Learning and development focus",
    "Diversity and inclusion",
    "Work-life balance",
    "Open communication",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-background to-purple-50 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Join Our Team</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Build Your Career With Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join a team that's revolutionizing real estate in India. We're looking for passionate individuals who want to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">View Open Positions</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Team Members" },
              { number: "15+", label: "Office Locations" },
              { number: "4.8", label: "Employee Rating" },
              { number: "95%", label: "Retention Rate" },
            ].map((stat, index) => (
              <Card key={index} className="text-center border-none bg-background/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-5 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Culture</h2>
            <p className="text-xl text-muted-foreground mb-12">
              We believe in creating an environment where everyone can thrive and do their best work.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {culture.map((item, index) => (
                <Badge key={index} variant="secondary" className="p-3 text-sm">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobs.map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge variant="outline">{job.department}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.experience}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Apply Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-5 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Apply Online", description: "Submit your application through our careers portal" },
                { step: "2", title: "Initial Screening", description: "Our HR team will review your application" },
                { step: "3", title: "Interview Process", description: "Technical and cultural fit interviews" },
                { step: "4", title: "Offer & Onboarding", description: "Join our team and start your journey" },
              ].map((process, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="font-semibold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground text-sm">{process.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Don't see a role that fits? Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Submit Resume
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
              Contact HR
            </Button>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Careers;
