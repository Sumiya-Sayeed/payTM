import { NextResponse } from 'next/server';
import { PrismaClient } from '@repo/db/client';
import Error from 'next/error';

const client = new PrismaClient();

export const GET = async () => {
  const existingUser = await client.user.findUnique({
    where: {
      number: '1234567890' // Replace with the actual number you are trying to insert
    }
  });

  if (existingUser) {
    // Handle the case where the user already exists
    console.error('A user with this number already exists.');
    return; // or throw an error, or return a response indicating the conflict
  }

  // Proceed to create the user if no conflict
  try {
    await client.user.create({
      data: {
        email: 'asd@example.com',
        name: 'John Doe',
        number: '1111111111', // Ensure this is unique
        password: 'yourSecurePassword'
      }
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint violation error code
      console.error('Unique constraint violation:', error.meta.target);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }

  return NextResponse.json({
    message: 'hi there'
  });
};
