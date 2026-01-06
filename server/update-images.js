import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  ssl:
    process.env.POSTGRES_SSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

async function updateImageUrls() {
  try {
    console.log("🔄 Updating image URLs to use Unsplash CDN...\n");

    const client = await pool.connect();

    // Update gallery images
    const galleryUpdates = [
      {
        category: "Classic",
        url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
      },
      {
        category: "Nail Art",
        url: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80",
      },
      {
        category: "Special Occasion",
        url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80",
      },
      {
        category: "Modern",
        url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80",
      },
      {
        category: "Colorful",
        url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80",
      },
      {
        category: "Bridal",
        url: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80",
      },
    ];

    console.log("📸 Updating gallery images...");
    for (const update of galleryUpdates) {
      await client.query(
        "UPDATE gallery SET image_url = $1 WHERE category = $2",
        [update.url, update.category]
      );
    }
    console.log("✅ Gallery images updated\n");

    // Update services images
    const serviceUpdates = [
      {
        name: "Luxury Spa Manicure",
        url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
      },
      {
        name: "Deluxe Pedicure",
        url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80",
      },
      {
        name: "Gel Manicure",
        url: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80",
      },
      {
        name: "Custom Nail Art",
        url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80",
      },
      {
        name: "Gel Extensions",
        url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80",
      },
      {
        name: "Bridal Package",
        url: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80",
      },
    ];

    console.log("💅 Updating services images...");
    for (const update of serviceUpdates) {
      await client.query("UPDATE services SET image_url = $1 WHERE name = $2", [
        update.url,
        update.name,
      ]);
    }
    console.log("✅ Services images updated\n");

    // Verify updates
    const galleryResult = await client.query(
      "SELECT title, image_url FROM gallery LIMIT 3"
    );
    console.log("📋 Sample gallery records:");
    galleryResult.rows.forEach((row) => {
      console.log(`   ${row.title}: ${row.image_url.substring(0, 50)}...`);
    });

    console.log("\n✨ All images updated successfully!");
    console.log("🌐 Images are now served from Unsplash CDN\n");

    client.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Update failed:", error.message);
    await pool.end();
    process.exit(1);
  }
}

updateImageUrls();
