import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { checkUser } from '@/lib/clerk';
import { User } from '@/lib/models/models';

export async function GET() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await checkUser(clerkUser);

    return NextResponse.json({
      clerkUserId: user.clerkUserId,
      imageUrl: user.imageUrl,
      email: user.email,
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      onboardingStatus: user.onboardingStatus,
      preferences: user.preferences,
      psychometricResults: user.psychometricResults,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to load user profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { psychometricResults } = body;

    await User.findOneAndUpdate(
      { clerkUserId: clerkUser.id },
      { psychometricResults: { ...psychometricResults, completedAt: new Date() } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
