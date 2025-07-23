"use server";
import { db } from "@/firebase/admin";

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (e) {
    console.error(`Error fetching interviews for userId ${userId}:`, e);
    return null;
  }
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  try {
    const {userId, limit = 20} = params;
    const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where('finalised', '==', true)
      .where('userId', '!=', userId)
      .limit(limit)
      .get();
    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (e) {
    console.error(`Error fetching latest interviews:`, e);
    return null;
  }
}

export async function getInterviewDetailsById(
  id: string
): Promise<Interview | null> {
  try {
    const interview = await db
      .collection("interviews")
      .doc(id)
      .get();
    return interview.data() as Interview | null;
  } catch (e) {
    console.error(`Error fetching interviews for userId ${id}:`, e);
    return null;
  }
}