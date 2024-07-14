const mongoose = require("mongoose");
const { Users } = require("../../models");

async function seedData() {
  try {
    const existingUsers = await Users.find();

    if (existingUsers.length === 0) {
      const initialUsers = [
        { username: "user1", email: "user1@example.com", password: "admin123", is_super_admin: true },
        { username: "user2", email: "user2@example.com", password: "user123" },
        { username: "user3", email: "user3@example.com", password: "user123" },
        { username: "user4", email: "user4@example.com", password: "user123" },
        { username: "user4", email: "user5@example.com", password: "user123" },
      ];

      await Users.insertMany(initialUsers);

      console.log("Initial data inserted successfully.");
    } else {
      console.log("Data already exists in the database. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
