import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// In a real app, this would be stored in a database
// For now, we'll use a simple in-memory store (will reset on server restart)
const userXPStore = new Map<string, number>();

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentXP = userXPStore.get(userId) || 0;
    
    return NextResponse.json({ xp: currentXP });
  } catch (error) {
    console.error('Error fetching user XP:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user XP' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { earnedXP } = await request.json();
    
    if (typeof earnedXP !== 'number' || earnedXP < 0) {
      return NextResponse.json(
        { error: 'Invalid XP amount' },
        { status: 400 }
      );
    }

    const currentXP = userXPStore.get(userId) || 0;
    const newTotalXP = currentXP + earnedXP;
    
    userXPStore.set(userId, newTotalXP);
    
    return NextResponse.json({ 
      xp: newTotalXP,
      earnedXP: earnedXP,
      previousXP: currentXP
    });
  } catch (error) {
    console.error('Error updating user XP:', error);
    return NextResponse.json(
      { error: 'Failed to update user XP' },
      { status: 500 }
    );
  }
} 