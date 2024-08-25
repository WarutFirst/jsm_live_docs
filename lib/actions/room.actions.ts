'use server';

import { nanoid } from 'nanoid'
import { liveblocks } from '../liveblock';
import { revalidatePath } from 'next/cache';

export const createDocument = async ({ userId, email }:
    CreateDocumentParams) => {
        const roomId = nanoid();
  
    
   try {
    const metadata = {
        createorId: userId,
        email,
        title: 'Untitled'
    }
    const usersAccesses: RoomAccesses = {
        [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
       metadata,
       usersAccesses,
       defaultAccesses: []
      });

      revalidatePath('/');
   }
   catch (error) {
    console.log(`Error happed while create a room: ${error}`)
   }

}