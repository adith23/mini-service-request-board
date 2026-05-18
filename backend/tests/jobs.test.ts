import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  find: vi.fn(),
  findByIdAndUpdate: vi.fn(),
}));

vi.mock("../src/models/JobRequest.js", () => ({
  JOB_STATUSES: ["Open", "In Progress", "Closed"],
  JobRequestModel: {
    find: mocks.find,
    findByIdAndUpdate: mocks.findByIdAndUpdate,
  },
}));

const { default: app } = await import("../src/app.js");

const jobId = "507f1f77bcf86cd799439011";
const sampleJob = {
  _id: jobId,
  title: "Need plumber for leaking tap",
  description: "Kitchen tap has a steady leak under the sink.",
  category: "Plumbing",
  location: "Glasgow",
  contactName: "Alex",
  contactEmail: "alex@example.com",
  status: "Open",
  createdAt: "2026-05-18T00:00:00.000Z",
};

describe("job API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists jobs with category, status, and keyword filters", async () => {
    const lean = vi.fn().mockResolvedValue([sampleJob]);
    const sort = vi.fn().mockReturnValue({ lean });

    mocks.find.mockReturnValue({ sort });

    const response = await request(app)
      .get("/api/jobs")
      .query({ category: "Plumbing", status: "Open", search: "tap" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([sampleJob]);
    expect(mocks.find).toHaveBeenCalledWith({
      category: "Plumbing",
      status: "Open",
      $text: { $search: "tap" },
    });
    expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
  });

  it("updates only the job status", async () => {
    const updatedJob = { ...sampleJob, status: "In Progress" };
    const lean = vi.fn().mockResolvedValue(updatedJob);

    mocks.findByIdAndUpdate.mockReturnValue({ lean });

    const response = await request(app)
      .patch(`/api/jobs/${jobId}`)
      .send({ status: "In Progress" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("In Progress");
    expect(mocks.findByIdAndUpdate).toHaveBeenCalledWith(
      jobId,
      { status: "In Progress" },
      { new: true, runValidators: true },
    );
  });

  it("rejects create requests without authentication", async () => {
    const response = await request(app).post("/api/jobs").send({
      title: "Need painter",
      description: "Bedroom wall needs repainting before next week.",
    });

    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Authentication required");
  });

  it("returns validation errors for invalid job ids", async () => {
    const response = await request(app).get("/api/jobs/not-a-valid-id");

    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe("Validation failed");
  });
});
