"use server";

import { College,User,Course } from "../models/models";
import { connectDB } from "../mongo";

export async function executeTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  await connectDB();

  switch (name) {
    case "findUniversities":
      return findUniversities(args);
    case "compareUniversities":
      return compareUniversities(args);
    case "fetchCourseDetails":
      return fetchCourseDetails(args);
    case "searchBySpecialization":
      return searchBySpecialization(args);
    case "getUserProfile":
      return getUserProfile(args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ─── 1. Find universities by name / location / filters ───────────────────────

async function findUniversities(args: Record<string, unknown>) {
  const {
    names,
    location,
    type,
    accreditation,
    placement_tier,
    max_annual_fee_inr,
    hostel_required,
  } = args as {
    names?: string[];
    location?: string;
    type?: string;
    accreditation?: string;
    placement_tier?: "tier1" | "tier2" | "tier3";
    max_annual_fee_inr?: number;
    hostel_required?: boolean;
  };

  const query: Record<string, unknown> = {};

  if (names?.length) {
    query.name = { $in: names.map((n) => new RegExp(n, "i")) };
  }
  if (location) {
    query.$or = [
      { location: new RegExp(location, "i") },
      { location_tag: new RegExp(location, "i") },
    ];
  }
  if (type) query.type = new RegExp(type, "i");
  if (accreditation) query.accreditation = new RegExp(accreditation, "i");
  if (placement_tier) query.placement_tier = placement_tier;
  if (hostel_required === true) query.hostel_available = true;
  if (max_annual_fee_inr) {
    query["specializations_offered.annual_fee_inr"] = {
      $lte: max_annual_fee_inr,
    };
  }

  const colleges = await College.find(query)
    .select(
      "college_id name location location_tag type accreditation placement_tier placements hostel_available hostel_fee_inr top_recruiters website facilities specializations_offered"
    )
    .limit(5)
    .lean();

  return colleges;
}

// ─── 2. Compare universities side by side ────────────────────────────────────

async function compareUniversities(args: Record<string, unknown>) {
  const { names, college_ids } = args as {
    names?: string[];
    college_ids?: string[];
  };

  const query: Record<string, unknown> = {};

  if (college_ids?.length) {
    query.college_id = { $in: college_ids };
  } else if (names?.length) {
    query.name = { $in: names.map((n) => new RegExp(n, "i")) };
  } else {
    return { error: "Provide names or college_ids to compare." };
  }

  const colleges = await College.find(query)
    .select(
      "college_id name location type accreditation placement_tier placements hostel_available hostel_fee_inr top_recruiters facilities specializations_offered"
    )
    .lean();

  // Shape into a comparison-friendly structure
  return colleges.map((c) => ({
    college_id: c.college_id,
    name: c.name,
    location: c.location,
    type: c.type,
    accreditation: c.accreditation,
    placement_tier: c.placement_tier,
    avg_placement_lpa: c.placements?.average_lpa,
    highest_placement_lpa: c.placements?.highest_lpa,
    median_placement_lpa: c.placements?.median_lpa,
    hostel_available: c.hostel_available,
    hostel_fee_inr: c.hostel_fee_inr,
    top_recruiters: c.top_recruiters?.slice(0, 5),
    facilities: c.facilities,
    programs_count: c.specializations_offered?.length ?? 0,
    fee_range_inr: {
      min: Math.min(
        ...(c.specializations_offered?.map((s: { annual_fee_inr: number }) => s.annual_fee_inr).filter(Boolean) ?? [0])
      ),
      max: Math.max(
        ...(c.specializations_offered?.map((s: { annual_fee_inr: number }) => s.annual_fee_inr).filter(Boolean) ?? [0])
      ),
    },
  }));
}

// ─── 3. Fetch course / specialization details for a college ──────────────────

async function fetchCourseDetails(args: Record<string, unknown>) {
  const { college_id, course_name, stream, specialization_name } = args as {
    college_id: string;
    course_name?: string;
    stream?: string;
    specialization_name?: string;
  };

  const college = await College.findOne({ college_id }).lean();
  if (!college) return { error: `College ${college_id} not found.` };

  let specializations = college.specializations_offered ?? [];

  if (course_name) {
    specializations = specializations.filter((s: { course_name: string }) =>
      new RegExp(course_name, "i").test(s.course_name)
    );
  }
  if (stream) {
    specializations = specializations.filter((s: { stream: string }) =>
      new RegExp(stream, "i").test(s.stream)
    );
  }
  if (specialization_name) {
    specializations = specializations.filter((s: { specialization_name: string }) =>
      new RegExp(specialization_name, "i").test(s.specialization_name)
    );
  }

  return {
    college_id: college.college_id,
    name: college.name,
    specializations,
  };
}

// ─── 4. Search colleges by specialization / career path / trait ──────────────

async function searchBySpecialization(args: Record<string, unknown>) {
  const {
    specialization_name,
    career_path,
    psychometric_trait,
    stream,
    entrance_exam,
    max_annual_fee_inr,
  } = args as {
    specialization_name?: string;
    career_path?: string;
    psychometric_trait?: string;
    stream?: string;
    entrance_exam?: string;
    max_annual_fee_inr?: number;
  };

  // Build top-level query — each condition targets the array independently
  const query: Record<string, unknown> = {};

  if (specialization_name) {
    query["specializations_offered.specialization_name"] = new RegExp(specialization_name, "i");
  }
  if (stream) {
    query["specializations_offered.stream"] = new RegExp(stream, "i");
  }
  if (career_path) {
    query["specializations_offered.career_paths"] = new RegExp(career_path, "i");
  }
  if (psychometric_trait) {
    query["specializations_offered.psychometric_traits"] = new RegExp(psychometric_trait, "i");
  }
  if (entrance_exam) {
    query["specializations_offered.entrance_exams"] = new RegExp(entrance_exam, "i");
  }
  if (max_annual_fee_inr) {
    query["specializations_offered.annual_fee_inr"] = { $lte: max_annual_fee_inr };
  }

  console.log("searchBySpecialization query:", JSON.stringify(query, null, 2));

  const colleges = await College.find(query)
    .select(
      "college_id name location accreditation placement_tier placements specializations_offered"
    )
    .limit(6)
    .lean();

  console.log(`searchBySpecialization found ${colleges.length} colleges`);

  if (!colleges.length) return [];

  // Filter down to only the matching specializations per college
  return colleges.map((c) => {
    const matched = (c.specializations_offered ?? []).filter((s: {
      specialization_name: string;
      stream: string;
      career_paths: string[];
      psychometric_traits: string[];
      entrance_exams: string[];
      annual_fee_inr: number;
    }) => {
      if (specialization_name && !new RegExp(specialization_name, "i").test(s.specialization_name ?? "")) return false;
      if (stream && !new RegExp(stream, "i").test(s.stream ?? "")) return false;
      if (career_path && !s.career_paths?.some((p) => new RegExp(career_path, "i").test(p))) return false;
      if (psychometric_trait && !s.psychometric_traits?.some((t) => new RegExp(psychometric_trait, "i").test(t))) return false;
      if (entrance_exam && !s.entrance_exams?.some((e) => new RegExp(entrance_exam, "i").test(e))) return false;
      if (max_annual_fee_inr && s.annual_fee_inr > max_annual_fee_inr) return false;
      return true;
    });

    return {
      college_id: c.college_id,
      name: c.name,
      location: c.location,
      accreditation: c.accreditation,
      placement_tier: c.placement_tier,
      avg_placement_lpa: c.placements?.average_lpa,
      highest_placement_lpa: c.placements?.highest_lpa,
      matched_specializations: matched,
      total_matched: matched.length,
    };
  }).filter((c) => c.total_matched > 0); // drop colleges where post-filter removed everything
}

// ─── 5. Get current user profile from DB ─────────────────────────────────────

async function getUserProfile(args: Record<string, unknown>) {
  const { clerkUserId } = args as { clerkUserId: string };

  const user = await User.findOne({ clerkUserId })
    .select("firstName lastName email role preferences onboardingStatus")
    .lean();

  if (!user) return { error: "User profile not found." };

  return {
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    email: user.email,
    role: user.role,
    onboarding_complete: user.onboardingStatus === "complete",
    interests: user.preferences?.interests ?? [],
    streams: user.preferences?.streams ?? [],
    career_goals: user.preferences?.careerGoals ?? [],
  };
}