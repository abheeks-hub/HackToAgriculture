import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";

const AgricultureDashboard = () => {
  const [cropData, setCropData] = useState([]);
  const [weather, setWeather] = useState(null);
  const [soilType, setSoilType] = useState("");
  const [recommendedCrops, setRecommendedCrops] = useState([]);

  useEffect(() => {
    fetchCropPrices();
  }, []);

  const fetchCropPrices = async () => {
    // Mock API Call
    setCropData([
      { name: "Wheat", price: "$250 per ton" },
      { name: "Rice", price: "$300 per ton" },
      { name: "Corn", price: "$200 per ton" },
    ]);
  };

  const fetchWeather = async () => {
    // Mock API Call
    setWeather({ temperature: "28°C", condition: "Cloudy" });
  };

  const handleSoilInputChange = (e) => {
    setSoilType(e.target.value);
  };

  const recommendCrops = () => {
    const cropRecommendations = {
      "loamy": ["Wheat", "Barley", "Corn"],
      "sandy": ["Peanuts", "Watermelon", "Carrots"],
      "clay": ["Rice", "Soybeans", "Lettuce"],
    };
    setRecommendedCrops(cropRecommendations[soilType.toLowerCase()] || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agriculture Crop Prices & Weather</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Crop Prices</h2>
            <ul>
              {cropData.map((crop, index) => (
                <li key={index} className="border-b py-2">
                  {crop.name}: {crop.price}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Cloud className="mr-2" /> Weather
            </h2>
            <Button onClick={fetchWeather} className="mb-4">Get Weather</Button>
            {weather && (
              <>
                <p>Temperature: {weather.temperature}</p>
                <p>Condition: {weather.condition}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Soil-Based Crop Recommendation</h2>
        <Input
          placeholder="Enter soil type (e.g., loamy, sandy, clay)"
          value={soilType}
          onChange={handleSoilInputChange}
          className="mb-2"
        />
        <Button onClick={recommendCrops} className="mb-4">Get Recommendations</Button>
        <ul>
          {recommendedCrops.map((crop, index) => (
            <li key={index} className="border-b py-2">{crop}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgricultureDashboard;
