// This script seeds demo accounts for each team member into the database.
// Run with: npx ts-node backend/scripts/seedDemoTeamUsers.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, UserRole } from '../src/models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/data-science-hub';

const teamMembers = [
  {
    name: 'Ogechi Daniel Koel',
    email: 'ogechikoel@gmail.com',
    password: 'demo1234', // CHANGE after demo
    role: UserRole.STUDENT,
    status: 'active',
  },
  {
    name: 'Nobert Wafula',
    email: 'wakasalanobert5746@gmail.com',
    password: 'demo1234',
    role: UserRole.CLIENT,
    status: 'active',
  },
  {
    name: 'Enock Bereka',
    email: 'enochosenwafulah@gmail.com',
    password: 'demo1234',
    role: UserRole.STUDENT,
    status: 'active',
  },
  {
    name: 'Timothy Achala',
    email: 'timothyachala695@gmail.com',
    password: 'demo1234',
    role: UserRole.CLIENT,
    status: 'active',
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const member of teamMembers) {
    const exists = await User.findOne({ email: member.email });
    if (exists) {
      console.log(`User already exists: ${member.email}`);
      continue;
    }
    const user = new User(member);
    await user.save();
    console.log(`Created user: ${member.name} (${member.email})`);
  }

  await mongoose.disconnect();
  console.log('Seeding complete.');
}

seed().catch(err => {
  console.error('Error seeding demo users:', err);
  process.exit(1);
});
