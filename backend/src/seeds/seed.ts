import { connectDatabase, disconnectDatabase } from "../config/db.js";
import {
  JobRequestModel,
  type JobRequest,
} from "../models/JobRequest.js";

type SeedJobRequest = Omit<JobRequest, "createdAt" | "status"> & {
  status?: JobRequest["status"];
};

const sampleJobs: SeedJobRequest[] = [
  {
    title: "Leaking kitchen tap needs a plumber",
    description:
      "The kitchen mixer tap has a constant drip and water is pooling below the sink cabinet.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "Amelia Grant",
    contactEmail: "amelia.grant@example.com",
  },
  {
    title: "Install new hallway light fitting",
    description:
      "Looking for an electrician to replace an old hallway pendant with a new flush ceiling light.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "Ryan Fraser",
    contactEmail: "ryan.fraser@example.com",
    status: "In Progress",
  },
  {
    title: "Paint two bedroom walls",
    description:
      "Two bedroom feature walls need sanding, priming, and repainting before the weekend.",
    category: "Painting",
    location: "Paisley",
    contactName: "Sophie Kerr",
    contactEmail: "sophie.kerr@example.com",
  },
  {
    title: "Repair sticking back door",
    description:
      "Wooden back door is difficult to close and may need planing or hinge adjustment.",
    category: "Joinery",
    location: "Dundee",
    contactName: "Callum Reid",
    contactEmail: "callum.reid@example.com",
  },
  {
    title: "Bathroom extractor fan stopped working",
    description:
      "Extractor fan no longer switches on with the bathroom light and needs diagnosis.",
    category: "Electrical",
    location: "Glasgow",
    contactName: "Nadia Ali",
    contactEmail: "nadia.ali@example.com",
  },
  {
    title: "Fix cracked plaster in living room",
    description:
      "A visible crack has appeared above the living room window and needs repair before painting.",
    category: "Painting",
    location: "Stirling",
    contactName: "Mark Douglas",
    contactEmail: "mark.douglas@example.com",
    status: "Closed",
  },
  {
    title: "Replace broken cupboard hinge",
    description:
      "Kitchen wall cupboard door is hanging loose because one concealed hinge has snapped.",
    category: "Joinery",
    location: "Perth",
    contactName: "Eilidh Scott",
    contactEmail: "eilidh.scott@example.com",
  },
  {
    title: "Blocked bathroom sink drain",
    description:
      "Bathroom sink drains very slowly and basic household unblocker has not solved it.",
    category: "Plumbing",
    location: "Aberdeen",
    contactName: "Lewis Campbell",
    contactEmail: "lewis.campbell@example.com",
  },
];

async function seedJobRequests(): Promise<void> {
  await connectDatabase();

  // Keep repeated seed runs predictable during local development.
  await JobRequestModel.deleteMany({});
  const insertedJobs = await JobRequestModel.insertMany(sampleJobs, {
    ordered: true,
  });

  console.log(`Seeded ${insertedJobs.length} job requests.`);
}

seedJobRequests()
  .catch((error: unknown) => {
    console.error("Failed to seed job requests.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
