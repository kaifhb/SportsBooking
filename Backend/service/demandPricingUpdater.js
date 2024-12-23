import cron from "node-cron";
import Booking from "../model/Booking.js";
import Centre from "../model/Centres.js";
import Sport from "../model/Sports.js";

const MAX_CENTRE_CAPACITY = 10; // Example max capacity for a centre
const MAX_SPORT_CAPACITY = 50; // Example max capacity across all sports

// Function to update demand and pricing for centres
const updateCentreDemandAndPricing = async () => {
  try {
    const centres = await Centre.find();

    for (const centre of centres) {
      const totalBookings = await Booking.countDocuments({
        centre: centre._id,
      });

      // Calculate demand score (0-100)
      const demandScore = Math.min(
        (totalBookings / MAX_CENTRE_CAPACITY) * 100,
        100
      );

      // Set pricing factor based on demand score
      let priceFactor;
      if (demandScore > 80) priceFactor = 1.5; // High demand
      else if (demandScore > 50) priceFactor = 1.2; // Medium demand
      else priceFactor = 1.0; // Normal demand

      // Update the centre with the new demand and price factor
      await Centre.findByIdAndUpdate(centre._id, {
        priceFactor,
      });
    }
    console.log("Centre demand and pricing updated successfully.");
  } catch (error) {
    console.error("Error updating centre demand:", error);
  }
};

// Function to update demand and pricing for sports
const updateSportDemandAndPricing = async () => {
  try {
    const sports = await Sport.find();

    for (const sport of sports) {
      const totalBookings = await Booking.countDocuments({ sport: sport._id });

      // Calculate demand score (0-100)
      const demandScore = Math.min(
        (totalBookings / MAX_SPORT_CAPACITY) * 100,
        100
      );

      // Set pricing factor based on demand score
      let priceFactor;
      if (demandScore > 80) priceFactor = 1.5; // High demand
      else if (demandScore > 50) priceFactor = 1.2; // Medium demand
      else priceFactor = 1.0; // Normal demand

      // Update the sport with the new demand and price factor
      await Sport.findByIdAndUpdate(sport._id, {
        priceFactor,
      });
    }
    console.log("Sport demand and pricing updated successfully.");
  } catch (error) {
    console.error("Error updating sport demand:", error);
  }
};

// Function to run both updates
const updateDemandAndPricing = async () => {
  console.log("Starting demand and pricing updates...");
  await updateCentreDemandAndPricing();
  await updateSportDemandAndPricing();
  console.log("Demand and pricing updates completed.");
};

// Start the cron job
const startDemandPricingUpdater = () => {
  cron.schedule("0 */2 * * *", async () => {
    await updateDemandAndPricing();
    console.log("Scheduled demand and pricing update executed.");
  });
};


export default startDemandPricingUpdater;