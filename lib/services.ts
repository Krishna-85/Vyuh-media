export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  focus: string[];
};

/**
 * The ten practices of VYUH MEDIA.
 * Descriptions state how work is conducted — never outcomes, reach or results.
 */
export const services: Service[] = [
  {
    id: "political-pr-digital-branding",
    number: "01",
    title: "Political Public Relations & Digital Branding",
    summary: "Reputation, identity and narrative for public figures and political organisations.",
    description:
      "Public standing is built deliberately. We shape how leaders, parties and public figures are understood — aligning identity, messaging and conduct across the surfaces where reputation is actually formed: the press, search results, social platforms and public events.",
    focus: [
      "Positioning and message architecture",
      "Brand identity systems for leaders and parties",
      "Media readiness and spokesperson preparation",
      "Narrative documents and communication guidelines",
    ],
  },
  {
    id: "social-media-management",
    number: "02",
    title: "Political Social Media Management",
    summary: "Disciplined publishing, community management and channel stewardship.",
    description:
      "We plan, produce and publish for the platforms political audiences actually use, at a cadence that sustains attention without exhausting it. Day-to-day publishing, community management and escalation are handled to a defined editorial standard.",
    focus: [
      "Channel strategy and editorial calendars",
      "Day-to-day publishing and community management",
      "Platform-native content and formatting",
      "Reporting on activity and response",
    ],
  },
  {
    id: "graphic-design-creative-communication",
    number: "03",
    title: "Political Graphic Design & Creative Communication",
    summary: "Visual systems that make public communication instantly recognisable.",
    description:
      "From campaign identities to daily social collateral, we build visual systems that remain consistent across print, outdoor and digital — so every piece of communication reads as part of one considered whole.",
    focus: [
      "Campaign and personal identity systems",
      "Posters, print and digital collateral",
      "Infographics and data presentation",
      "Design guidelines and template libraries",
    ],
  },
  {
    id: "video-reels-production",
    number: "04",
    title: "Video Editing & Reels Production",
    summary: "Short-form video edited for the way audiences actually scroll.",
    description:
      "We edit and finish short-form video — reels, shorts and campaign films — with close attention to pacing, subtitles, sound and format. Work is built for each platform's conventions rather than resized from a single master.",
    focus: [
      "Reels, shorts and short-form edits",
      "Motion graphics, titles and subtitles",
      "Colour and sound finishing",
      "Multi-format adaptation across platforms",
    ],
  },
  {
    id: "digital-advertising",
    number: "05",
    title: "Digital Advertising Management",
    summary: "Paid distribution planned, paced and reported with discipline.",
    description:
      "We plan and manage digital advertising across social and search: audience definition, creative variants, budget pacing and placement monitoring — with transparent reporting on what was spent and what was observed.",
    focus: [
      "Campaign planning and audience segmentation",
      "Creative variants and controlled testing",
      "Budget pacing and placement monitoring",
      "Transparent spend and activity reporting",
    ],
  },
  {
    id: "campaign-creative-development",
    number: "06",
    title: "Campaign Creative Development",
    summary: "The organising idea of a campaign, carried through every medium.",
    description:
      "Election and issue campaigns are held together by one clear creative idea. We develop the theme, the visual language and the formats that carry it — from launch through the final week.",
    focus: [
      "Campaign theme and creative platform",
      "Key visuals, lines and message frames",
      "Rollout across print, outdoor and digital",
      "Rapid-response creative support",
    ],
  },
  {
    id: "content-strategy-copywriting",
    number: "07",
    title: "Political Content Strategy & Copywriting",
    summary: "Words written for public life — measured, clear and on-message.",
    description:
      "We decide what should be said, where and how often — then write it. Statements, speeches, op-eds, press notes and social copy are produced against a documented message framework, in a consistent voice.",
    focus: [
      "Content strategy and editorial planning",
      "Statements, speeches and op-eds",
      "Press notes and media copy",
      "Social and campaign copywriting",
    ],
  },
  {
    id: "website-development",
    number: "08",
    title: "Website Development & Digital Presence",
    summary: "Fast, credible websites that hold up under scrutiny.",
    description:
      "We design and build campaign sites, personal websites and landing pages that load quickly, read clearly and work on every device — the durable centre of a considered digital presence.",
    focus: [
      "Campaign and personal websites",
      "Landing pages for drives and announcements",
      "Performance, accessibility and on-page SEO",
      "Maintenance and content updates",
    ],
  },
  {
    id: "media-coordination",
    number: "09",
    title: "Media Coordination",
    summary: "Considered, professional relationships with the press.",
    description:
      "We coordinate the interface between principals and the media — press notes, interview preparation, journalist liaison and coverage tracking — so communication with the press stays timely, accurate and consistent.",
    focus: [
      "Press note and release coordination",
      "Interview and briefing preparation",
      "Journalist liaison and media list building",
      "Coverage tracking and clippings",
    ],
  },
  {
    id: "online-reputation-management",
    number: "10",
    title: "Online Reputation Management",
    summary: "Monitoring, response and resilience for digital reputation.",
    description:
      "We monitor what is being said, structure how it is answered, and address inaccurate or hostile content through legitimate channels — building the resilience to withstand scrutiny over time.",
    focus: [
      "Conversation and search-result monitoring",
      "Response frameworks and approval flows",
      "Profile and presence hygiene",
      "Preparedness for reputational incidents",
    ],
  },
];
