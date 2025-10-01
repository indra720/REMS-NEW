import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, ArrowRightLeft, RefreshCw, Copy, BookOpen } from "lucide-react";
import { useState } from "react";

const AreaConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState("");

  const areaUnits = [
    { value: "sqft", label: "Square Feet (sq ft)" },
    { value: "sqm", label: "Square Meter (sq m)" },
    { value: "acre", label: "Acre" },
    { value: "hectare", label: "Hectare" },
    { value: "bigha", label: "Bigha" },
    { value: "katha", label: "Katha" },
    { value: "gaj", label: "Gaj (Square Yard)" },
    { value: "marla", label: "Marla" },
    { value: "kanal", label: "Kanal" },
    { value: "cent", label: "Cent" },
    { value: "guntha", label: "Guntha" },
    { value: "dismil", label: "Dismil" }
  ];

  const conversionTable = [
    { unit: "1 Square Foot", equals: "0.092903 Square Meter" },
    { unit: "1 Square Meter", equals: "10.7639 Square Feet" },
    { unit: "1 Acre", equals: "43,560 Square Feet" },
    { unit: "1 Hectare", equals: "10,000 Square Meters" },
    { unit: "1 Bigha", equals: "27,000 Square Feet (varies by region)" },
    { unit: "1 Katha", equals: "720 Square Feet (varies by region)" },
    { unit: "1 Gaj", equals: "9 Square Feet" },
    { unit: "1 Marla", equals: "272.25 Square Feet" },
    { unit: "1 Kanal", equals: "5,445 Square Feet" },
    { unit: "1 Cent", equals: "435.6 Square Feet" },
    { unit: "1 Guntha", equals: "1,089 Square Feet" },
    { unit: "1 Dismil", equals: "435.6 Square Feet" }
  ];

  const regionalUnits = [
    {
      region: "North India",
      units: [
        { name: "Bigha", value: "27,000 sq ft (in Punjab)" },
        { name: "Biswa", value: "1,350 sq ft" },
        { name: "Katha", value: "1,361.25 sq ft (in Bihar)" },
        { name: "Marla", value: "272.25 sq ft" },
        { name: "Kanal", value: "5,445 sq ft" }
      ]
    },
    {
      region: "South India",
      units: [
        { name: "Cent", value: "435.6 sq ft" },
        { name: "Guntha", value: "1,089 sq ft" },
        { name: "Ground", value: "2,400 sq ft" },
        { name: "Kuncham", value: "484 sq ft" },
        { name: "Ankanam", value: "72 sq ft" }
      ]
    },
    {
      region: "West India",
      units: [
        { name: "Guntha", value: "1,089 sq ft" },
        { name: "Bigha", value: "17,424 sq ft (in Rajasthan)" },
        { name: "Vigha", value: "1,742.4 sq ft" },
        { name: "Katha", value: "720 sq ft" },
        { name: "Chatak", value: "180 sq ft" }
      ]
    },
    {
      region: "East India",
      units: [
        { name: "Katha", value: "720 sq ft" },
        { name: "Cottah", value: "720 sq ft" },
        { name: "Chittak", value: "45 sq ft" },
        { name: "Lessa", value: "144 sq ft" },
        { name: "Dhur", value: "68.0625 sq ft" }
      ]
    }
  ];

  const quickConversions = [
    { from: "1000 sq ft", to: "92.9 sq m" },
    { from: "1 acre", to: "4,047 sq m" },
    { from: "1 hectare", to: "2.47 acres" },
    { from: "100 sq m", to: "1,076 sq ft" },
    { from: "1 bigha", to: "0.62 acres" },
    { from: "1 kanal", to: "605 sq yd" }
  ];

  const handleConvert = () => {
    if (!fromValue || !fromUnit || !toUnit) return;
    
    // This is a simplified conversion - in a real app, you'd have proper conversion logic
    const conversions: { [key: string]: number } = {
      sqft: 1,
      sqm: 10.7639,
      acre: 43560,
      hectare: 107639,
      bigha: 27000,
      katha: 720,
      gaj: 9,
      marla: 272.25,
      kanal: 5445,
      cent: 435.6,
      guntha: 1089,
      dismil: 435.6
    };

    const fromValueInSqFt = parseFloat(fromValue) * (conversions[fromUnit] || 1);
    const resultValue = fromValueInSqFt / (conversions[toUnit] || 1);
    
    setResult(resultValue.toFixed(4));
  };

  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    if (result && fromValue) {
      setFromValue(result);
      setResult(fromValue);
    }
  };

  const handleReset = () => {
    setFromValue("");
    setFromUnit("");
    setToUnit("");
    setResult("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative py-10 bg-gradient-to-br from-purple-600/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-300">
              Area Unit Converter
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Convert between different area units used across India for real estate measurements
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calculator className="w-5 h-5" />
              <span>Accurate • Fast • Easy to Use</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Converter */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Calculator className="w-6 h-6" />
                Area Unit Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Section */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">From</Label>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Enter value"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                      className="text-lg h-12"
                    />
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {areaUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12"
                    onClick={handleSwapUnits}
                  >
                    <ArrowRightLeft className="w-5 h-5" />
                  </Button>
                </div>

                {/* To Section */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">To</Label>
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Result"
                      value={result}
                      readOnly
                      className="text-lg h-12 bg-muted"
                    />
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {areaUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={handleConvert} className="gap-2 bg-purple-600 hover:bg-purple-600" size="lg">
                  <Calculator className="w-4 h-4" />
                  Convert
                </Button>
                <Button variant="outline" onClick={handleReset} className="gap-2" size="lg">
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
                {result && (
                  <Button variant="outline" className="gap-2" size="lg">
                    <Copy className="w-4 h-4" />
                    Copy Result
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Conversions */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Quick Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickConversions.map((conversion, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg text-center">
                    <p className="font-semibold">{conversion.from}</p>
                    <ArrowRightLeft className="w-4 h-4 mx-auto my-2 text-muted-foreground" />
                    <p className="text-muted-foreground">{conversion.to}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Regional Units */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Regional Area Units in India</h2>
            <p className="text-muted-foreground">Understanding local land measurement units across different regions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regionalUnits.map((region, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{region.region}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {region.units.map((unit, idx) => (
                    <div key={idx} className="border-b border-border last:border-0 pb-2 last:pb-0">
                      <p className="font-medium">{unit.name}</p>
                      <p className="text-sm text-muted-foreground">{unit.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conversion Reference Table</h2>
            <p className="text-muted-foreground">Common area unit conversions for easy reference</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Standard Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conversionTable.map((conversion, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium ">{conversion.unit}</span>
                      <span className="text-muted-foreground">=</span>
                      <span className="text-primary font-medium text-purple-600">{conversion.equals}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tips for Area Measurement</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Always Verify</h3>
                <p className="text-sm text-muted-foreground">
                  Local units can vary by region. Always verify with local authorities or surveyors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center ">
                <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-primary text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Know Your Region</h3>
                <p className="text-sm text-muted-foreground">
                  Different states may have different values for the same unit name.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
                  <ArrowRightLeft className="w-6 h-6 text-primary text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Double Check</h3>
                <p className="text-sm text-muted-foreground">
                  Always cross-verify important measurements with multiple sources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default AreaConverter;