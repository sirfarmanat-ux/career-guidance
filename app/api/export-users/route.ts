import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import { User } from '@/lib/models/models';

export async function GET() {
  try {
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
      collegePreferences: user.psychometricResults?.recommendations?.map((specId: string) => ({
        specialization: specId,
        colleges: [] // Placeholder
      })) || []
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error exporting users:', error);
    return NextResponse.json({ error: 'Failed to export users' }, { status: 500 });
  }
}