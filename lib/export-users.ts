import { connectDB } from './mongo';
import { User } from './models/models';
import fs from 'fs';
import path from 'path';

async function exportUsersData() {
  await connectDB();

  const users = await User.find({}, {
    clerkUserId: 1,
    email: 1,
    firstName: 1,
    lastName: 1,
    fullName: 1,
    preferences: 1,
    psychometricResults: 1,
    _id: 0
  });

  const data = users.map(user => ({
    userId: user.clerkUserId,
    email: user.email,
    name: user.fullName,
    preferences: user.preferences,
    psychometricResults: user.psychometricResults,
    recommendations: user.psychometricResults?.recommendations || [],
    // Add college preferences based on recommendations
    collegePreferences: user.psychometricResults?.recommendations?.map((specId: string) => ({
      specialization: specId,
      // Placeholder for college data - in real implementation, fetch from College model
      colleges: []
    })) || []
  }));

  const filePath = path.join(process.cwd(), 'users-data.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log('Users data exported to users-data.json');
}

exportUsersData().catch(console.error);