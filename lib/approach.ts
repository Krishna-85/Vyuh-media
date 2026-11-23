/**
 * The VYUH MEDIA method. Shared by the Approach page and the home page
 * preview so the two never drift apart.
 */
export type Stage = {
  number: string;
  title: string;
  summary: string;
  detail: string;
};

export const stages: Stage[] = [
  {
    number: "01",
    title: "Study",
    summary: "Understand the field before speaking to it.",
    detail:
      "Every engagement opens with listening: the audience, the opposition, the existing perception and the internal constraints. We map what is already being said, where it is being said, and where the gaps are — so that communication responds to the actual situation rather than an assumed one.",
  },
  {
    number: "02",
    title: "Frame",
    summary: "Decide what is to be said, to whom, and why it will hold.",
    detail:
      "Positioning and message architecture come next. We define the central idea, the proof that supports it and the language that carries it, then document it so that everyone speaking on behalf of the principal works from the same framework.",
  },
  {
    number: "03",
    title: "Build",
    summary: "Produce the system, not just the assets.",
    detail:
      "Identity, editorial plans, content, design systems and platform formats are produced against the framework. Work is built as a coherent system so that a statement, a poster and a reel all read as one considered voice.",
  },
  {
    number: "04",
    title: "Deploy",
    summary: "Publish with cadence and coordinate the interfaces.",
    detail:
      "Execution runs to a defined rhythm: publishing schedules, media coordination, campaign rollouts and response protocols. Roles, approvals and timing are settled in advance so the work stays calm under pressure.",
  },
  {
    number: "05",
    title: "Refine",
    summary: "Observe, report honestly, and adjust.",
    detail:
      "Activity and response are reviewed against the framework that was agreed at the start. What is working is continued, what is not is corrected, and the reporting stays factual — including what did not perform as expected.",
  },
];
