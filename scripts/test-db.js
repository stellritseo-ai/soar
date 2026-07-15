import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri = "mongodb+srv://sora_db_user:dF8rsHBOMdKSkvGa@sora.8mllofs.mongodb.net/soar?appName=sora";

const SiteSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  updated_at: { type: Date, default: Date.now }
});

const SiteSetting = mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
    const settings = await SiteSetting.find({});
    console.log("All settings in database:");
    console.log(JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error("Database query error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
