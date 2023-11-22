import "dotenv/config";

import mongoose from "mongoose";

import products from "../data/products.js";
import users from "../data/users.js";

import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


import { connectToDB } from "./db.js";

connectToDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const insertedUsers = await User.insertMany(users);
    const adminUser = insertedUsers[0]._id;
    const productsWithUser = products?.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(productsWithUser);
    console.log('data imported successfully')
  } catch (error) {
    console.log(`Error Import Data ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
      await Product.deleteMany();
      await User.deleteMany();
      await Order.deleteMany();
      console.log('data destroyed successfully')
    } catch (error) {
      console.log(`Error Destroy Data ${error.message}`);
      process.exit(1);
    }
  };

if(process.argv[2]==='-d'){
    destroyData()
} else {
    importData()
}
  


