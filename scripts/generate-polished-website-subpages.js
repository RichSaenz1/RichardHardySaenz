const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const calendlyHref = 'https://calendly.com/thefuturestudio-info/30min';
const whatsappHref = 'https://wa.me/50766753870?text=Hi%20The%20Future%20Studio%2C%20I%20would%20like%20to%20book%20a%20demo.';
const emailHref = 'mailto:info@thefuturestudio.online';

const pages = [
  {
    output: 'systems/website-ai-assistant/index.html',
    title: 'Website + AI Assistant',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: 'A WEBSITE THAT EXPLAINS, QUALIFIES, AND CAPTURES LEADS',
    description: 'A conversion-focused website with an AI assistant that answers questions, explains your services, captures contact details, and moves visitors toward booking, WhatsApp, or email.',
    primaryCta: 'Book a Free Website Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      ['FRONT DOOR', 'Website + assistant'],
      ['24/7', 'Visitor support'],
      ['EN/ES', 'Bilingual ready'],
      ['YOURS', 'Owned system']
    ],
    image: '/assets/funnel-images/digital-product-dashboard-mockup-wide.png',
    imageAlt: 'Website dashboard and AI assistant interface across laptop, tablet, and phone.',
    videoTitle: 'SEE THE WEBSITE SYSTEM',
    videoBody: 'Watch how the page, assistant, forms, and handoff work together before you commit to a larger build.',
    installedTitle: 'A DIGITAL FRONT DOOR WITH REAL INTAKE LOGIC',
    installedIntro: 'This is not just a prettier website. It is a clearer first layer for trust, questions, lead capture, and the next action.',
    features: [
      ['Offer clarity', 'The page explains what you do, who it is for, and why a visitor should take the next step.'],
      ['AI assistant', 'The assistant answers common questions and helps visitors understand the offer without waiting for a human reply.'],
      ['Lead capture', 'Contact details, intent, and service interest are collected in a cleaner format for your team.'],
      ['WhatsApp handoff', 'Qualified visitors can move into WhatsApp with better context already captured.'],
      ['Booking path', 'The system can route people to a calendar, inquiry form, or direct contact path.'],
      ['SEO foundation', 'The page is structured so the business has a stronger search-ready base from day one.']
    ],
    trustTitle: 'YOUR WEBSITE SHOULD DO MORE THAN LOOK PROFESSIONAL',
    trustBody: 'Most service businesses lose trust when the website is unclear, slow to answer questions, or disconnected from the next step. This build gives your visitors a clearer path and gives your team cleaner enquiries.',
    process: [
      ['Map the offer', 'Discovery', 'We identify what visitors need to understand before they feel ready to contact you.'],
      ['Design the page', 'Structure', 'We build the page around trust, service clarity, proof, and the strongest conversion path.'],
      ['Train the assistant', 'AI setup', 'We shape the assistant around your FAQs, tone, services, and handoff rules.'],
      ['Connect the flow', 'Integration', 'We connect contact forms, WhatsApp, calendar, email, or CRM where needed.'],
      ['Launch and refine', 'Go live', 'We review the first interactions and adjust the content, assistant, and handoff logic.']
    ],
    pricingTitle: 'CHOOSE THE WEBSITE BUILD THAT FITS YOUR STAGE',
    pricingBody: 'Start with the level of front door your business needs now. Each option is designed to make the offer clearer and the first enquiry easier to capture.',
    pricing: [
      ['Starter Website', 'from $3,250', ['One conversion-focused website page', 'AI assistant trained on your offer', 'Lead capture and WhatsApp handoff', 'Basic SEO setup'], 'Book a Demo'],
      ['Website + Assistant System', 'from $4,500', ['Multi-section website structure', 'Assistant logic for FAQs and qualification', 'Booking or form handoff', 'Launch support and refinement'], 'Book a Build Call', true],
      ['Website + Full Front Door', 'custom', ['Multi-page website', 'Assistant, CRM, WhatsApp, and booking logic', 'Content and SEO support', 'Deeper conversion architecture'], 'Discuss Scope']
    ],
    faqs: [
      ['What do I receive?', 'You receive a designed website experience, an AI assistant layer, lead capture paths, and the first handoff logic your team needs to respond faster.'],
      ['Is this a chatbot?', 'No. The assistant is shaped around your services, common questions, tone, and next steps so it supports the buying journey rather than just answering random prompts.'],
      ['Can it connect to WhatsApp?', 'Yes. The site can route interested visitors to WhatsApp with clearer context and a stronger first message.'],
      ['Can it work in English and Spanish?', 'Yes. The page and assistant can be built for English, Spanish, or a bilingual flow.'],
      ['How long does it take?', 'A focused website and AI assistant build usually takes 4 to 7 weeks depending on content, integrations, and approval speed.'],
      ['Do I own the website?', 'Yes. The goal is to build a system you can use and grow, not trap you inside a temporary demo.'],
      ['What happens after launch?', 'We review the first interactions, check where visitors hesitate, and refine the page or assistant logic where needed.']
    ],
    finalTitle: "LET'S BUILD YOUR DIGITAL FRONT DOOR.",
    finalBody: 'Book a free demo and we will show you what your website and assistant should solve first.'
  },
  {
    output: 'systems/whatsapp-automation-agent/index.html',
    title: 'WhatsApp Automation Agent',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: 'WHATSAPP THAT RESPONDS, QUALIFIES, AND FOLLOWS UP',
    description: 'An automated WhatsApp system for enquiries, intake, reminders, follow-up, and handoff so your team stops chasing every message manually.',
    primaryCta: 'Book a Free WhatsApp Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      ['FAST', 'First response'],
      ['INTAKE', 'Cleaner details'],
      ['FOLLOW-UP', 'Less chasing'],
      ['EN/ES', 'Bilingual ready']
    ],
    image: '/assets/funnel-images/team-whatsapp-automation-consulting-wide.png',
    imageAlt: 'Business team reviewing WhatsApp automation and client follow-up dashboard.',
    videoTitle: 'SEE THE WHATSAPP FLOW',
    videoBody: 'Watch how WhatsApp can collect details, answer common questions, and move clients to the next step without adding admin work.',
    installedTitle: 'A MESSAGE SYSTEM THAT DOES THE FIRST CHASE FOR YOU',
    installedIntro: 'The goal is simple: faster replies, cleaner intake, and fewer opportunities disappearing inside message threads.',
    features: [
      ['Instant reply', 'New enquiries receive a useful first response before trust drops.'],
      ['Intake questions', 'The flow collects the details your team usually has to ask for manually.'],
      ['Lead qualification', 'The agent identifies intent, urgency, fit, and the right next step.'],
      ['Reminder logic', 'Follow-up can be timed around bookings, missing documents, or incomplete enquiries.'],
      ['Human handoff', 'When the conversation needs a person, the team receives the useful context first.'],
      ['Reporting view', 'You can see what people ask, where they drop off, and which flows need improvement.']
    ],
    trustTitle: 'SLOW WHATSAPP REPLIES COST TRUST FAST',
    trustBody: 'If clients wait too long, they start looking elsewhere. This system protects the first response and makes every follow-up feel more organised.',
    process: [
      ['Map conversations', 'Discovery', 'We identify the repeated questions, missing details, and moments where prospects usually stall.'],
      ['Write the flow', 'Design', 'We create the message sequence, questions, options, fallback replies, and escalation rules.'],
      ['Connect tools', 'Implementation', 'We connect WhatsApp to forms, bookings, CRM, email, or team notifications where needed.'],
      ['Test scenarios', 'Quality control', 'We test real enquiry types, urgent cases, no-shows, missing info, and handoff points.'],
      ['Launch and tune', 'Go live', 'We review early conversations and improve the flow based on what clients actually ask.']
    ],
    pricingTitle: 'CHOOSE THE WHATSAPP SYSTEM YOUR TEAM NEEDS',
    pricingBody: 'Start with a simple response layer or build a deeper automation flow for intake, reminders, and team handoff.',
    pricing: [
      ['WhatsApp Intake Foundation', 'from $1,500', ['Core enquiry flow', 'FAQ response logic', 'Basic qualification questions', 'Team handoff message'], 'Reserve Build'],
      ['WhatsApp Follow-Up System', 'from $2,500', ['Intake plus follow-up sequences', 'Reminder and missing-info logic', 'Booking or form handoff', 'Conversation improvement pass'], 'Book a Build Call', true],
      ['Multi-Flow WhatsApp System', 'custom', ['Multiple services or departments', 'Advanced routing and tags', 'CRM or dashboard layer', 'Ongoing optimisation plan'], 'Discuss Scope']
    ],
    finalTitle: "LET'S CLEAN UP YOUR WHATSAPP INTAKE.",
    finalBody: 'Book a free demo and we will show you the first message flow your business should automate.'
  },
  {
    output: 'systems/booking-agent/index.html',
    title: 'Booking Agent',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: 'A BOOKING FLOW THAT CONFIRMS, REMINDS, AND REDUCES NO-SHOWS',
    description: 'A booking system that connects forms, calendars, reminders, confirmations, and follow-up so appointments stop depending on manual coordination.',
    primaryCta: 'Book a Free Booking Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      ['CALENDAR', 'Connected'],
      ['REMINDERS', 'Automated'],
      ['NO-SHOWS', 'Reduced'],
      ['HANDOFF', 'Cleaner']
    ],
    image: '/assets/funnel-images/calendar-dashboard-workspace-wide.png',
    imageAlt: 'Laptop and calendar dashboard showing automated booking and reminder workflow.',
    videoTitle: 'SEE THE BOOKING FLOW',
    videoBody: 'Watch how enquiries can move from interest to confirmed booking with less back-and-forth.',
    installedTitle: 'A SCHEDULING SYSTEM THAT PROTECTS THE APPOINTMENT',
    installedIntro: 'The system helps people book faster, receive the right reminders, and arrive with clearer expectations.',
    features: [
      ['Booking path', 'Clients move from interest to available time slots without manual searching.'],
      ['Confirmation flow', 'The system confirms the booking and sets expectations clearly.'],
      ['Reminder sequence', 'Timed reminders reduce no-shows and forgotten appointments.'],
      ['Reschedule path', 'Clients get a cleaner way to adjust a booking without creating chaos for the team.'],
      ['Intake capture', 'Forms collect key details before the appointment.'],
      ['Team notification', 'Your staff receives booking context without digging through messages.']
    ],
    trustTitle: 'GOOD BOOKINGS NEED MORE THAN A CALENDAR LINK',
    trustBody: 'A calendar link alone does not solve reminders, intake, confirmation, or follow-up. This system turns scheduling into a cleaner client experience.',
    process: [
      ['Map appointment types', 'Discovery', 'We identify the booking types, availability rules, and information needed before each appointment.'],
      ['Design the flow', 'Structure', 'We set up the route from inquiry to booking, confirmation, reminder, and handoff.'],
      ['Connect calendars', 'Integration', 'We connect the calendar, forms, notifications, WhatsApp, or CRM where needed.'],
      ['Test reminders', 'Quality control', 'We test confirmations, reminders, reschedules, cancellations, and staff alerts.'],
      ['Launch and refine', 'Go live', 'We adjust timing, message clarity, and handoff details after real bookings begin.']
    ],
    pricingTitle: 'CHOOSE THE BOOKING SYSTEM THAT FITS YOUR OPERATIONS',
    pricingBody: 'Start with appointment capture or build a fuller flow that supports reminders, intake, and client communication.',
    pricing: [
      ['Booking Foundation', 'from $2,000', ['Calendar setup and booking path', 'Confirmation messages', 'Basic reminder sequence', 'Team notification handoff'], 'Reserve Build'],
      ['Booking + Intake System', 'from $3,000', ['Booking plus intake forms', 'WhatsApp or email reminders', 'Reschedule and cancellation logic', 'Cleaner appointment handoff'], 'Book a Build Call', true],
      ['Multi-Service Booking System', 'custom', ['Multiple appointment types', 'Staff or location routing', 'CRM or reporting connection', 'Ongoing optimisation'], 'Discuss Scope']
    ],
    finalTitle: "LET'S MAKE BOOKING FEEL CLEANER.",
    finalBody: 'Book a free demo and we will show you where your current scheduling flow is leaking time.'
  },
  {
    output: 'systems/lead-pipeline-automation/index.html',
    title: 'Lead Pipeline Automation',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: 'A PIPELINE THAT CAPTURES, SCORES, AND MOVES LEADS',
    description: 'A lead pipeline system that captures enquiries, qualifies intent, routes ownership, creates follow-up tasks, and keeps opportunities visible.',
    primaryCta: 'Book a Free Pipeline Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      ['CAPTURE', 'Every source'],
      ['SCORE', 'Priority leads'],
      ['ROUTE', 'Clear owner'],
      ['FOLLOW-UP', 'Less leakage']
    ],
    image: '/assets/funnel-images/team-analytics-planning-wide.png',
    imageAlt: 'Team reviewing lead analytics and pipeline automation dashboard.',
    videoTitle: 'SEE THE PIPELINE SYSTEM',
    videoBody: 'Watch how leads can move from form, call, WhatsApp, or website into one clearer follow-up path.',
    installedTitle: 'A SALES RECOVERY LAYER FOR MISSED OPPORTUNITIES',
    installedIntro: 'This system helps your team stop losing leads because nobody knows who should reply, what was asked, or what should happen next.',
    features: [
      ['Lead capture', 'Enquiries from forms, website, WhatsApp, calls, and email can enter one cleaner pipeline.'],
      ['Qualification logic', 'The system identifies intent, urgency, service interest, and fit before the lead gets lost.'],
      ['Scoring', 'High-priority opportunities can be flagged so the team knows what to handle first.'],
      ['Routing', 'Leads can be assigned to the right person, department, or next action.'],
      ['Follow-up tasks', 'The system creates reminders or tasks so warm leads do not go cold.'],
      ['Visibility layer', 'You can see what came in, what moved, what stalled, and where revenue may be leaking.']
    ],
    trustTitle: 'LEADS DO NOT JUST DISAPPEAR. THEY GET UNOWNED.',
    trustBody: 'Most businesses already generate more opportunities than they properly track. This system makes the next step visible so the team can respond faster and follow up with more discipline.',
    process: [
      ['Map lead sources', 'Discovery', 'We identify every place enquiries arrive and where they currently get stuck.'],
      ['Define pipeline stages', 'Structure', 'We create clear stages, scores, owners, and next actions.'],
      ['Connect tools', 'Implementation', 'We connect forms, CRM, WhatsApp, email, calls, or dashboards depending on your stack.'],
      ['Test handoff', 'Quality control', 'We test new leads, urgent leads, cold leads, missed replies, and team notifications.'],
      ['Launch and improve', 'Go live', 'We review early pipeline behaviour and refine scoring, routing, and follow-up rules.']
    ],
    pricingTitle: 'CHOOSE THE PIPELINE BUILD YOUR BUSINESS NEEDS',
    pricingBody: 'Start with basic capture or build a deeper recovery system that shows your team which leads deserve attention first.',
    pricing: [
      ['Lead Capture Foundation', 'from $1,200', ['Lead intake structure', 'Basic qualification', 'Notification handoff', 'Cleaner first follow-up'], 'Reserve Build'],
      ['Follow-Up + Pipeline System', 'from $2,600', ['Lead stages and scoring', 'Automated follow-up logic', 'Team handoff rules', 'Clearer visibility layer'], 'Book a Build Call', true],
      ['Sales Recovery Dashboard', 'from $4,200', ['Multi-channel capture', 'Advanced scoring', 'Dashboard layer', 'Ongoing optimisation'], 'Discuss Scope']
    ],
    finalTitle: "LET'S STOP LEADS FALLING THROUGH THE CRACKS.",
    finalBody: 'Book a free demo and we will map the first pipeline layer your business should automate.'
  },
  {
    output: 'systems/ai-content-agent/index.html',
    title: 'AI Content Agent',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: 'A CONTENT SYSTEM THAT TURNS IDEAS INTO CONSISTENT OUTPUT',
    description: 'An AI content workflow for planning, repurposing, captions, post angles, campaign ideas, and publishing support without losing your brand voice.',
    primaryCta: 'Book a Free Content Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      ['90D', 'Content rhythm'],
      ['FAST', 'Idea turn'],
      ['EN/ES', 'Publishing flow'],
      ['YOURS', 'Brand logic']
    ],
    image: '/assets/funnel-images/content-calendar-devices-wide.png',
    imageAlt: 'Content calendar and publishing workflow shown across laptop, tablet, and phone.',
    videoTitle: 'SEE THE CONTENT SYSTEM',
    videoBody: 'Watch how content ideas become reusable prompts, post angles, captions, and publishing support.',
    installedTitle: 'A CONTENT OPERATING SYSTEM, NOT RANDOM PROMPTS',
    installedIntro: 'This build helps your team create with more structure so content becomes easier to plan, repurpose, and publish.',
    features: [
      ['Topic planning', 'The system turns business priorities into content themes and post ideas.'],
      ['Offer-aligned prompts', 'Prompts are shaped around your services, audience, objections, and sales story.'],
      ['Caption support', 'The agent helps draft captions, hooks, and post variations in your tone.'],
      ['Repurposing flow', 'Long ideas can become short posts, scripts, FAQs, and campaign angles.'],
      ['Calendar structure', 'The system helps maintain a publishing rhythm instead of starting from blank pages.'],
      ['Brand consistency', 'Content stays closer to the message your business actually needs to be known for.']
    ],
    trustTitle: 'CONTENT WORKS BETTER WHEN THE SYSTEM IS CLEAR',
    trustBody: 'The bottleneck is rarely only writing. It is usually the lack of a repeatable system for ideas, positioning, repurposing, and where each post should fit inside the bigger sales story.',
    process: [
      ['Map the message', 'Discovery', 'We identify the offer, audience, objections, proof points, and recurring content needs.'],
      ['Build the prompt logic', 'Design', 'We create prompts and workflows that match your business voice and market.'],
      ['Create the content flow', 'Implementation', 'We connect ideas, briefs, captions, calendars, and repurposing steps.'],
      ['Test outputs', 'Quality control', 'We review content quality, tone, usefulness, and whether the posts support the offer.'],
      ['Launch the rhythm', 'Go live', 'We help you move from sporadic posting to a clearer publishing cadence.']
    ],
    pricingTitle: 'CHOOSE THE CONTENT SYSTEM THAT FITS YOUR TEAM',
    pricingBody: 'Start with planning and prompt support, or build a deeper content workflow that supports campaigns and repurposing.',
    pricing: [
      ['Content Planning Foundation', 'from $1,500', ['Topic planning support', 'Offer-aligned prompts', 'Caption and hook examples', 'Simple publishing structure'], 'Reserve Build'],
      ['Content Agent System', 'from $2,500', ['Prompt library and workflow', 'Repurposing logic', 'Calendar support', 'Brand voice guidance'], 'Book a Build Call', true],
      ['Campaign Content System', 'custom', ['Multi-channel content flow', 'Video and social repurposing', 'Team workflow layer', 'Ongoing optimisation'], 'Discuss Scope']
    ],
    finalTitle: "LET'S MAKE CONTENT EASIER TO PRODUCE.",
    finalBody: 'Book a free demo and we will show you the first content workflow your business should install.'
  },
  {
    output: 'systems/marketing-video-system/index.html',
    title: 'Marketing Video System',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: 'A VIDEO SYSTEM FOR CONSISTENT MARKETING ASSETS',
    description: 'An AI-assisted video production workflow for short-form videos, education clips, authority content, and campaign assets without building a full production team.',
    primaryCta: 'Book a Free Video Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      ['SHORTS', 'Campaign ready'],
      ['SCRIPTS', 'Structured'],
      ['AI', 'Assisted visuals'],
      ['FAST', 'Production flow']
    ],
    image: '/assets/funnel-images/course-video-planning-workspace-wide.png',
    imageAlt: 'Planning desk for video production workflow with laptop and notes.',
    videoTitle: 'SEE THE VIDEO SYSTEM',
    videoBody: 'Watch how ideas move into scripts, visuals, captions, edits, and repeatable campaign assets.',
    installedTitle: 'VIDEO WORKS BETTER WHEN THE SYSTEM IS CLEAR',
    installedIntro: 'The build gives your team a repeatable way to create useful video assets instead of starting from scratch each time.',
    features: [
      ['Concept planning', 'Ideas are shaped into video concepts that support the business goal.'],
      ['Script support', 'The system helps create hooks, scripts, outlines, and talking points.'],
      ['AI visual flow', 'Where appropriate, AI tools support visuals, avatars, or creative assets.'],
      ['Short-form edits', 'Assets can be shaped for Reels, Shorts, TikTok, ads, or education clips.'],
      ['Caption workflow', 'Captions and supporting copy are created around the video message.'],
      ['Campaign reuse', 'One idea can become multiple clips and post formats.']
    ],
    trustTitle: 'VIDEO SHOULD SUPPORT SALES, NOT JUST LOOK BUSY',
    trustBody: 'A strong video system gives your business a clearer way to explain, educate, and build trust. The value is not one clip. It is a repeatable production rhythm.',
    process: [
      ['Choose the video role', 'Discovery', 'We identify whether video should educate, sell, explain, reassure, or build authority.'],
      ['Design the format', 'Structure', 'We build the repeatable format, script pattern, and asset style.'],
      ['Create the workflow', 'Implementation', 'We connect prompts, scripts, visuals, edit steps, and publishing support.'],
      ['Review quality', 'Quality control', 'We check clarity, brand fit, pacing, and whether the video supports the offer.'],
      ['Launch the system', 'Go live', 'We refine based on the first videos and make the process easier to repeat.']
    ],
    pricingTitle: 'CHOOSE THE VIDEO SYSTEM THAT FITS YOUR OUTPUT GOAL',
    pricingBody: 'Start with scripts and concepts or build a fuller production workflow for recurring campaign assets.',
    pricing: [
      ['Video Planning Foundation', 'from $1,500', ['Concept and script structure', 'Short-form format plan', 'Caption support', 'Initial production workflow'], 'Reserve Build'],
      ['Marketing Video System', 'from $3,000', ['Repeatable video workflow', 'AI-assisted asset logic', 'Campaign repurposing support', 'Publishing support'], 'Book a Build Call', true],
      ['Video Campaign Engine', 'custom', ['Multi-format video system', 'Advanced AI visuals or avatars', 'Team workflow and review layer', 'Ongoing optimisation'], 'Discuss Scope']
    ],
    finalTitle: "LET'S BUILD YOUR VIDEO SYSTEM.",
    finalBody: 'Book a free demo and we will show you how your business can create stronger video assets with less friction.'
  },
  {
    output: 'systems/custom-apps-dashboards/index.html',
    title: 'Custom Apps + Dashboards',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: 'CUSTOM APPS AND DASHBOARDS BUILT AROUND YOUR WORKFLOW',
    description: 'A custom interface, dashboard, portal, or internal tool that connects the information your team needs and reduces manual reporting.',
    primaryCta: 'Book a Free App Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      ['CUSTOM', 'Your workflow'],
      ['DATA', 'Connected'],
      ['DASHBOARD', 'Visible'],
      ['YOURS', 'Owned build']
    ],
    image: '/assets/funnel-images/team-automation-dashboard-review-wide.png',
    imageAlt: 'Team reviewing a custom automation dashboard and reporting workflow.',
    videoTitle: 'SEE THE CUSTOM BUILD LOGIC',
    videoBody: 'Watch how a messy workflow can become a cleaner dashboard, portal, or operational app.',
    installedTitle: 'A CUSTOM TOOL FOR THE WAY YOUR BUSINESS ACTUALLY RUNS',
    installedIntro: 'This is for businesses that have outgrown spreadsheets, scattered tools, or manual status updates.',
    features: [
      ['Workflow mapping', 'We map how work currently moves and where the team loses time.'],
      ['Custom interface', 'The app is designed around the actions your team actually needs.'],
      ['Database logic', 'Information is structured so it can be stored, updated, filtered, and reported cleanly.'],
      ['Dashboard view', 'Important numbers, tasks, or statuses become easier to see.'],
      ['Automation layer', 'Manual steps can be reduced with notifications, handoffs, or triggered workflows.'],
      ['Team handover', 'Your team receives a clearer walkthrough so the system can be used confidently.']
    ],
    trustTitle: 'IF THE WORKFLOW IS UNIQUE, THE TOOL SHOULD FIT IT',
    trustBody: 'Generic tools often force the team to work around the software. A custom build lets the system reflect the real workflow and gives the business a cleaner operating layer.',
    process: [
      ['Map the workflow', 'Discovery', 'We identify the process, data, users, pain points, and decisions the tool needs to support.'],
      ['Design the interface', 'Structure', 'We create a clean interface around the main actions and information hierarchy.'],
      ['Build and connect', 'Implementation', 'We connect data, forms, dashboards, automations, and integrations where needed.'],
      ['Test with real scenarios', 'Quality control', 'We test the workflow against actual business cases before launch.'],
      ['Train and improve', 'Go live', 'We hand over the system and refine the parts that need adjustment after real use.']
    ],
    pricingTitle: 'CHOOSE THE CUSTOM BUILD THAT FITS YOUR OPERATION',
    pricingBody: 'Start with a focused dashboard or build a more advanced app around your internal workflow.',
    pricing: [
      ['Dashboard Foundation', 'from $3,500', ['Custom dashboard view', 'Basic data structure', 'Manual or simple source connection', 'Team walkthrough'], 'Reserve Build'],
      ['Custom App System', 'from $6,500', ['Custom interface and database', 'Forms, roles, and workflow logic', 'Reporting layer', 'Automation handoff'], 'Book a Build Call', true],
      ['Advanced Platform Build', 'custom', ['Multiple user roles', 'External APIs and integrations', 'Client portal or internal app', 'Ongoing product support'], 'Discuss Scope']
    ],
    finalTitle: "LET'S BUILD THE TOOL YOUR TEAM ACTUALLY NEEDS.",
    finalBody: 'Book a free demo and we will map the first workflow that deserves a custom dashboard or app.'
  },
  {
    output: 'systems/voice-agent/index.html',
    title: 'Voice Agent',
    eyebrow: 'READY-TO-INSTALL AI SYSTEM',
    hero: "AI VOICE AGENTS THAT ANSWER WHEN YOUR TEAM CAN'T",
    description: 'A custom AI voice agent for service businesses that answers missed calls, qualifies leads, routes urgent conversations, and sends clean summaries to your team.',
    primaryCta: 'Book a Free Voice Agent Demo',
    secondaryCta: 'Try the Voice Agent',
    secondaryHref: '#live-demo',
    stats: [
      ['24/7', 'Call coverage'],
      ['LIVE FAST', '7-21 days'],
      ['BILINGUAL', 'By design'],
      ['OWNED', 'No lock-in']
    ],
    image: '/assets/funnel-images/voice-agent-trust-dashboard.png',
    imageAlt: 'Business owner reviewing a client response and automation dashboard on a tablet.',
    videoTitle: 'WATCH THE VOICE AGENT VIDEO',
    videoBody: 'See how the voice agent answers, qualifies, routes, and prepares a cleaner handoff before you build.',
    installedTitle: 'A CALL SYSTEM WITH REAL LOGIC',
    installedIntro: 'The voice agent should not just answer. It should collect the right context, decide what matters, route the conversation, and leave your team with something useful.',
    features: [
      ['Call answering', 'The agent answers when your team is unavailable, handles common questions, and captures the reason for the call clearly.'],
      ['Lead qualification', 'It asks the right questions, identifies intent, urgency, budget or fit, and helps your team focus on the best opportunities first.'],
      ['Human handoff', 'Sensitive, urgent, or high-value calls can be escalated to a person with the context already captured.'],
      ['Booking flow', 'Where appropriate, the voice agent can route people to booking links, callback windows, intake forms, or the next best step.'],
      ['Clean summaries', 'Every useful conversation can generate a transcript, summary, action list, and contact record for your team.'],
      ['Performance view', 'You can see call volume, common questions, missed-call recovery, caller quality, and what should be improved next.']
    ],
    trustTitle: 'THE FIRST RESPONSE IS WHERE TRUST STARTS',
    trustBody: 'Most service businesses do not lose opportunities because they cannot do the work. They lose them because calls arrive at the wrong time, details are incomplete, and follow-up happens too late.',
    process: [
      ['Call map', 'Discovery', 'We map call types, caller intent, common questions, urgent scenarios, and the information your team needs after every call.'],
      ['Voice logic', 'Design', 'We write the conversation flow, qualification rules, tone, fallback responses, and handoff logic so the agent sounds useful, not robotic.'],
      ['Build and connect', 'Implementation', 'We connect the number, voice layer, summaries, notifications, booking links, WhatsApp, CRM, or email handoff.'],
      ['Test calls', 'Quality control', 'We test confused callers, urgent requests, Spanish calls, no-shows, objections, and human escalation.'],
      ['Launch and tune', 'Go live', 'After launch, we review transcripts, adjust weak responses, and improve the agent based on real callers.']
    ],
    pricingTitle: 'CHOOSE THE VOICE SYSTEM YOUR BUSINESS NEEDS',
    pricingBody: 'Start with the first reliable call flow, or build a deeper voice and follow-up system that protects more of the client journey.',
    pricing: [
      ['Voice Agent Foundation', 'from $1,999', ['One main call flow', 'Bilingual voice option', 'Call summaries and transcripts', 'Email or WhatsApp handoff'], 'Reserve Build'],
      ['Voice + Follow-Up System', 'from $2,999', ['Voice agent plus follow-up messages', 'Lead qualification logic', 'Human escalation rules', 'Booking, CRM, or form handoff'], 'Book a Build Call', true],
      ['Multi-Flow Voice System', 'from $4,999', ['Multiple departments or locations', 'Advanced routing and reporting', 'Dashboard or custom app layer', 'Ongoing optimisation plan'], 'Discuss Scope']
    ],
    includeVoiceDemo: true,
    faqs: [
      ['What exactly does the voice agent do?', 'It answers calls, asks structured questions, captures details, qualifies the caller, routes urgent or high-value enquiries, and sends your team a summary or transcript.'],
      ['Will it replace my staff?', 'No. It protects the moments when your team is busy, unavailable, or overloaded. Humans still handle the conversations that need judgement.'],
      ['Can it work in English and Spanish?', 'Yes. The voice logic can be designed for English, Spanish, or bilingual routing depending on your callers.'],
      ['Can it book appointments?', 'Yes, if booking is part of the agreed scope. It can route callers to a booking path or prepare a callback with the right context.'],
      ['Can I review what callers said?', 'Yes. The setup can include transcripts, summaries, and action notes depending on the tools and consent requirements agreed before launch.'],
      ['How long does it take?', 'A focused voice agent can usually be live in 7 to 21 days depending on call complexity, integrations, and testing.'],
      ['What happens after launch?', 'We review real calls, improve weak answers, tune routing, and refine the agent based on what callers actually ask.']
    ],
    finalTitle: "LET'S BUILD YOUR VOICE AGENT.",
    finalBody: 'Book a free demo and we will show you the first call flow your business should automate.'
  }
];

const packagePages = [
  {
    output: 'packages/starter/index.html',
    title: 'Starter Package',
    eyebrow: 'AI SYSTEM PACKAGE',
    hero: 'START WITH A CLEAN DIGITAL FRONT DOOR',
    description: 'A focused starter package for businesses that need a professional one-page website, a simple AI assistant, and a clearer way to capture enquiries.',
    primaryCta: 'Book a Free Starter Demo',
    secondaryCta: 'WhatsApp About Starter',
    stats: [['ONE PAGE', 'Website'], ['AI', 'Assistant'], ['WHATSAPP', 'Handoff'], ['BASIC SEO', 'Included']],
    image: '/assets/funnel-images/digital-product-dashboard-mockup-wide.png',
    imageAlt: 'Digital front door with website and AI assistant shown across devices.',
    videoTitle: 'SEE THE STARTER PACKAGE',
    videoBody: 'See how the starter package gives your business a cleaner first impression and a better enquiry path.',
    installedTitle: 'WHAT YOU RECEIVE IN THE STARTER PACKAGE',
    installedIntro: 'This package gives you the essential digital layer before you invest in deeper automation.',
    features: [
      ['One-page website', 'A clean page that explains the business, offer, trust points, and next step.'],
      ['AI assistant', 'A simple assistant that answers common questions and supports visitor enquiries.'],
      ['Lead capture', 'Clear contact, form, WhatsApp, or booking paths so people know what to do next.'],
      ['WhatsApp handoff', 'Visitors can move from the site into WhatsApp with less friction.'],
      ['Mobile layout', 'The experience is designed to work cleanly on phones and desktop.'],
      ['Basic SEO setup', 'The page includes a stronger technical foundation for search visibility.']
    ],
    trustTitle: 'THE STARTER PACKAGE IS FOR CLARITY FIRST',
    trustBody: 'If your business needs a better first impression and a cleaner enquiry path, this gives you the first useful layer without overbuilding.',
    process: [
      ['Map the offer', 'Discovery', 'We clarify the services, audience, proof points, and strongest first CTA.'],
      ['Build the page', 'Design', 'We create the page structure, visual direction, and conversion path.'],
      ['Set up the assistant', 'Implementation', 'We configure the AI assistant around FAQs and basic lead capture.'],
      ['Connect handoff', 'Quality control', 'We test contact, WhatsApp, email, and booking links.'],
      ['Launch', 'Go live', 'We publish the page and make the first refinements after review.']
    ],
    pricingTitle: 'STARTER PACKAGE OPTIONS',
    pricingBody: 'The starter package is designed to create the first reliable digital layer for the business.',
    pricing: [
      ['Starter Core', 'from $3,250', ['Premium one-page website', 'Web AI assistant', 'WhatsApp handoff', 'Basic SEO setup'], 'Start This Package', true],
      ['Starter Plus', 'custom', ['Extra content sections', 'Additional FAQ logic', 'Booking integration', 'Launch support'], 'Discuss Scope'],
      ['Starter to Growth', 'custom', ['Upgrade path to multi-page site', 'Service page expansion', 'SEO structure', 'Automation planning'], 'Book a Demo']
    ],
    finalTitle: "LET'S BUILD YOUR STARTER SYSTEM.",
    finalBody: 'Book a free demo and we will show you whether Starter is the right first step.'
  },
  {
    output: 'packages/growth/index.html',
    title: 'Growth Package',
    eyebrow: 'AI SYSTEM PACKAGE',
    hero: 'BUILD A STRONGER WEBSITE AND AI ASSISTANT SYSTEM',
    description: 'A growth package for businesses that need a multi-page website, stronger SEO structure, and an AI assistant that supports enquiries across service pages.',
    primaryCta: 'Book a Free Growth Demo',
    secondaryCta: 'WhatsApp About Growth',
    stats: [['MULTI-PAGE', 'Website'], ['SEO', 'Structure'], ['AI', 'Assistant'], ['GROWTH', 'Ready']],
    image: '/assets/funnel-images/team-client-automation-strategy-wide.png',
    imageAlt: 'Strategy team planning a multi-page website and AI assistant system.',
    videoTitle: 'SEE THE GROWTH PACKAGE',
    videoBody: 'See how the growth package builds a more complete digital front door around service pages, SEO, and enquiry capture.',
    installedTitle: 'WHAT YOU RECEIVE IN THE GROWTH PACKAGE',
    installedIntro: 'This package is for businesses that need more than one page and want the site to support better trust, search, and lead capture.',
    features: [
      ['Multi-page website', 'Homepage, service pages, about page, and inquiry paths built with a clearer structure.'],
      ['SEO architecture', 'The site is organised so search engines and clients understand the services more clearly.'],
      ['AI assistant', 'The assistant supports service questions, FAQs, and guided next steps.'],
      ['Lead capture logic', 'Forms, WhatsApp, booking, or email paths are structured around real buying intent.'],
      ['Content hierarchy', 'The page copy and layout help people understand value faster.'],
      ['Launch refinement', 'We review the first version and adjust clarity, CTA flow, and handoff.']
    ],
    trustTitle: 'GROWTH NEEDS MORE THAN A HOMEPAGE',
    trustBody: 'If people need to compare services, understand proof, and find you through search, the business needs a stronger website system rather than one general page.',
    process: [
      ['Define the structure', 'Discovery', 'We decide which pages, services, and proof points need their own space.'],
      ['Design the website', 'Design', 'We build the visual system and conversion hierarchy across the site.'],
      ['Add AI support', 'Implementation', 'We train the assistant around the pages, FAQs, and lead paths.'],
      ['Connect the stack', 'Quality control', 'We test forms, WhatsApp, booking, SEO basics, and mobile layouts.'],
      ['Launch and refine', 'Go live', 'We publish and improve the first friction points after review.']
    ],
    pricingTitle: 'GROWTH PACKAGE OPTIONS',
    pricingBody: 'Growth is designed for businesses that need stronger public trust, search structure, and a more complete enquiry system.',
    pricing: [
      ['Growth Core', 'from $5,500', ['Multi-page website', 'AI assistant', 'SEO structure', 'Lead capture paths'], 'Start This Package', true],
      ['Growth Plus', 'custom', ['Extra service pages', 'Expanded assistant logic', 'Content support', 'Booking or CRM handoff'], 'Discuss Scope'],
      ['Growth to Premium', 'custom', ['Add voice agent', 'Add video system', 'Add deeper automation', 'Full front-office plan'], 'Book a Demo']
    ],
    finalTitle: "LET'S BUILD YOUR GROWTH SYSTEM.",
    finalBody: 'Book a free demo and we will show you the right growth build for your business.'
  },
  {
    output: 'packages/premium/index.html',
    title: 'Premium Package',
    eyebrow: 'AI SYSTEM PACKAGE',
    hero: 'A COMPLETE AI FRONT OFFICE FOR SERVICE BUSINESSES',
    description: 'A premium package for businesses that want website, AI assistant, call agent, WhatsApp, automation, and content support working as one connected system.',
    primaryCta: 'Book a Free Premium Demo',
    secondaryCta: 'WhatsApp About Premium',
    stats: [['FULL STACK', 'Front office'], ['VOICE', 'Call agent'], ['WHATSAPP', 'Automation'], ['VIDEO', 'AI content']],
    image: '/assets/funnel-images/team-automation-dashboard-review-wide.png',
    imageAlt: 'Team reviewing a complete AI front office dashboard and automation system.',
    videoTitle: 'SEE THE PREMIUM PACKAGE',
    videoBody: 'See how website, voice, WhatsApp, content, and dashboards can work together as one business system.',
    installedTitle: 'WHAT YOU RECEIVE IN THE PREMIUM PACKAGE',
    installedIntro: 'This package is for businesses that want the full visible and operational AI layer, not isolated tools.',
    features: [
      ['Multi-page website', 'A complete digital front door with stronger service pages and conversion flow.'],
      ['AI assistant', 'A web assistant that explains, qualifies, captures, and routes visitors.'],
      ['Voice agent', 'A call answering and qualification layer for missed calls and busy periods.'],
      ['WhatsApp automation', 'Message flows for intake, follow-up, reminders, and human handoff.'],
      ['Content or video system', 'Support for stronger visibility and authority after the system is live.'],
      ['Dashboard layer', 'A clearer way to see lead flow, activity, and performance signals.']
    ],
    trustTitle: 'PREMIUM IS FOR THE BUSINESS READY TO CONNECT THE WHOLE FRONT OFFICE',
    trustBody: 'When website, calls, messages, booking, and follow-up all live separately, revenue leaks between the gaps. Premium connects the system around how your business actually sells or books.',
    process: [
      ['Map the full journey', 'Discovery', 'We map how a prospect moves from first touch to booking, sale, follow-up, and reporting.'],
      ['Design the system', 'Structure', 'We decide which layers need to be built first and how they should connect.'],
      ['Build in phases', 'Implementation', 'We install website, assistants, voice, WhatsApp, content, or dashboards in a practical order.'],
      ['Test the handoffs', 'Quality control', 'We test the full journey across channels and fix weak transitions.'],
      ['Launch and optimise', 'Go live', 'We refine the system based on real enquiries, calls, and team feedback.']
    ],
    pricingTitle: 'PREMIUM PACKAGE OPTIONS',
    pricingBody: 'Premium is scoped around the level of system your business needs and the number of channels we connect.',
    pricing: [
      ['Premium Front Office', 'from $9,500', ['Multi-page website', 'AI assistant', 'Voice or WhatsApp automation', 'Launch support'], 'Start This Package', true],
      ['Premium Growth System', 'custom', ['Website, voice, WhatsApp, booking', 'Content or video workflow', 'Reporting layer', 'Team handover'], 'Discuss Scope'],
      ['Premium Operating Layer', 'custom', ['Custom app or dashboard', 'Advanced routing and automations', 'Multiple departments or locations', 'Ongoing optimisation'], 'Book a Demo']
    ],
    finalTitle: "LET'S BUILD YOUR AI FRONT OFFICE.",
    finalBody: 'Book a free demo and we will map the right premium system for your business.'
  }
];

const academy = {
  output: 'academy/index.html',
  title: 'Future Studio Academy',
  eyebrow: 'AI ACADEMY',
  hero: 'JOIN THE FUTURE STUDIO ACADEMY',
  description: 'Live AI learning for founders, creatives, operators, and teams who want practical skills, guided workflows, and studio-level feedback instead of passive courses.',
  primaryCta: 'Book an Academy Demo',
  secondaryCta: 'WhatsApp About Academy',
  stats: [['LIVE', 'Guided sessions'], ['EN/ES', 'Bilingual'], ['TOOLS', 'Applied workflows'], ['YOURS', 'Practical outputs']],
  image: '/assets/funnel-images/ai-systems-workshop-presentation-wide.png',
  imageAlt: 'Instructor explaining an AI workflow during a business workshop.',
  videoTitle: 'SEE THE ACADEMY FORMAT',
  videoBody: 'See how the Academy turns AI curiosity into guided practice, repeatable workflows, and practical outputs.',
  installedTitle: 'AI ACADEMY BUILT FOR REAL WORK',
  installedIntro: 'The Academy is designed for people who want to use AI with more skill, taste, and practical confidence.',
  features: [
    ['Design, Branding & AI', 'Build stronger brand identity, visual systems, and presentations with AI as a creative partner.'],
    ['AI for Creatives & Business', 'Use AI to plan websites, launch assets, workflows, and business communication.'],
    ['Portfolio & Personal Branding', 'Shape a clearer professional presence with better structure, story, and visual direction.'],
    ['Visual Storytelling & Branding', 'Use AI-assisted storyboarding, motion, image direction, and narrative planning.'],
    ['Workflow Design', 'Connect prompts, tools, steps, and review systems into reusable workflows.'],
    ['Business Application', 'Learn how to turn AI experiments into useful systems, assets, and decisions.']
  ],
  trustTitle: 'THE ACADEMY IS BUILT FOR APPLICATION, NOT JUST INSPIRATION',
  trustBody: 'The goal is for people to leave with clearer skills and usable outputs. Every format is designed around applied work, guided feedback, and practical next steps.',
  process: [
    ['Choose your format', 'Discovery', 'Pick a single workshop, studio pass, or full studio program.'],
    ['Select a track', 'Design', 'Choose the area that matters most now: design, business workflows, storytelling, branding, or implementation.'],
    ['Learn live', 'Implementation', 'Work through practical examples, prompts, tools, and guided exercises.'],
    ['Apply the output', 'Quality control', 'Use feedback and templates to improve the work until it is usable.'],
    ['Keep building', 'Go live', 'Move into deeper formats or implementation once the first skill layer is active.']
  ],
  pricingTitle: 'CHOOSE YOUR ACADEMY FORMAT',
  pricingBody: 'Pick the level of depth that fits your current stage: one focused workshop, a studio pass, or the full guided program.',
  pricing: [
    ['Single Workshop', 'from $175', ['One focused live session', 'Topic-specific guidance', 'Selected templates or prompts', 'Recording or recap where available'], 'Enroll Now'],
    ['Studio Pass', 'from $499', ['Four live studio sessions', 'Session recordings', 'Module-specific templates', 'Community access'], 'Enroll Now', true],
    ['Full Studio Program', 'from $1,500', ['Guided learning journey', 'Up to 8-10 live sessions', 'Personalised feedback', 'All templates and resources'], 'Enroll Now']
  ],
  finalTitle: "LET'S BUILD YOUR AI CAPABILITY.",
  finalBody: 'Book a free Academy demo and we will help you choose the right learning format.'
};

const allPages = [...pages, ...packagePages, academy];

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderFeatureCards(items) {
  return items.map((item, index) => `
          <article class="feature-card">
            <div class="feature-num">${String(index + 1).padStart(2, '0')}</div>
            <h3>${esc(item[0])}</h3>
            <p>${esc(item[1])}</p>
          </article>`).join('');
}

function renderProcess(items) {
  return items.map((item, index) => `
        <div class="process-row">
          <div class="process-num">${String(index + 1).padStart(2, '0')}</div>
          <div class="process-name">
            <h3>${esc(item[0])}</h3>
            <span>${esc(item[1])}</span>
          </div>
          <p>${esc(item[2])}</p>
          <div class="process-slash">/</div>
        </div>`).join('');
}

function renderPricing(items) {
  return items.map((item) => `
          <article class="price-card${item[4] ? ' featured' : ''}">
            <span class="price-badge">${item[4] ? 'Recommended' : 'Build option'}</span>
            <h3>${esc(item[0])}</h3>
            <div class="price">${esc(item[1])}</div>
            <ul>${item[2].map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>
            <a class="btn btn-grad" href="${calendlyHref}" target="_blank" rel="noopener">${esc(item[3])}</a>
          </article>`).join('');
}

function renderFaqs(page) {
  const faqs = page.faqs || [
    ['What do I receive?', `You receive the planned ${page.title} system, the workflow logic, launch support, and a clear handoff so your team understands how to use it.`],
    ['Is this custom or a template?', 'The structure is proven, but the content, logic, handoff, and tool connections are adapted to your business.'],
    ['Can it work in English and Spanish?', 'Yes. The system can be built for English, Spanish, or a bilingual workflow.'],
    ['How long does it take?', 'Most focused systems take 1 to 4 weeks. Larger builds can take longer depending on integrations and approval speed.'],
    ['Can this connect to my existing tools?', 'Usually yes. We map your current stack first and only connect the tools that make sense for the workflow.'],
    ['Do I own the system?', 'Yes. The goal is to create a usable business asset, not a temporary demo you cannot control.'],
    ['What happens after launch?', 'We review the first real use, refine weak points, and help your team understand the next improvement layer.']
  ];

  return faqs.map((faq) => `
        <details>
          <summary><span>${esc(faq[0])}</span><span>+</span></summary>
          <p>${esc(faq[1])}</p>
        </details>`).join('');
}

function renderVoiceDemo(page) {
  if (!page.includeVoiceDemo) return '';
  return `
  <section id="live-demo" class="section light-section">
    <div class="container demo-grid">
      <div>
        <p class="eyebrow">Live prototype</p>
        <h2 class="headline-md">TRY THE<br>VOICE AGENT<br>BEFORE YOU BUILD</h2>
        <p class="body-lg">Use the prototype to understand the flow: call handling, live transcript, call timer, and the same Vapi demo logic used in the working example.</p>
        <a class="btn btn-grad" href="${calendlyHref}" target="_blank" rel="noopener">Book a Free Voice Agent Demo</a>
      </div>
      <div class="demo-shell">
        <div class="demo-top">
          <div class="pulse-dot"></div>
          <div class="audio-bars"><span></span><span></span><span></span><span></span></div>
          <strong>Live Voice Session</strong>
        </div>
        <div class="transcript" id="transcript-container">
          <div class="voice-message ai">Hi, I am the demo voice agent. I can answer calls, ask the right questions, and prepare a clear handoff for your team.</div>
          <div class="voice-message user">A live transcript will appear here when the prototype is connected.</div>
        </div>
        <button id="btn-llamar-silice" class="btn btn-grad voice-call-btn" type="button">Call the Voice Agent</button>
        <div class="demo-meta"><span>Real-time transcript</span><span>Live call timer</span><span>Same Vapi demo logic</span></div>
      </div>
    </div>
  </section>
  <script type="module">
    import Vapi from 'https://esm.sh/@vapi-ai/web';
    const callBtn = document.getElementById('btn-llamar-silice');
    const container = document.getElementById('transcript-container');
    const assistantId = '9c25af7d-c8d5-44e0-a1a7-d90f7c18f682';
    let active = false;
    let vapi;
    function add(role, text) {
      const el = document.createElement('div');
      el.className = 'voice-message ' + role;
      el.textContent = text;
      container.appendChild(el);
      container.scrollTop = container.scrollHeight;
    }
    try {
      vapi = new Vapi('64a2be75-0aeb-461e-a456-eed7b1010fa6');
      callBtn.addEventListener('click', async () => {
        if (active) {
          vapi.stop();
          return;
        }
        callBtn.textContent = 'Connecting...';
        await vapi.start(assistantId);
      });
      vapi.on('call-start', () => {
        active = true;
        callBtn.textContent = 'End Call';
        add('ai', 'Call connected. Ask a question as if you were a real client.');
      });
      vapi.on('call-end', () => {
        active = false;
        callBtn.textContent = 'Call the Voice Agent';
        add('ai', 'Call ended. Your team would receive the useful summary after this point.');
      });
      vapi.on('message', (message) => {
        if (message.type !== 'transcript' || message.transcriptType !== 'final' || !message.transcript) return;
        add(message.role === 'user' ? 'user' : 'ai', message.transcript);
      });
      vapi.on('error', () => {
        active = false;
        callBtn.textContent = 'Call the Voice Agent';
        add('ai', 'The live demo could not connect. Please book a demo and we will walk you through it.');
      });
    } catch (error) {
      callBtn.addEventListener('click', () => add('ai', 'The live demo is unavailable in this browser. Please book a free demo.'));
    }
  </script>`;
}

function renderPage(page) {
  const metaDescription = `${page.title} from The Future Studio. ${page.description}`;
  const secondaryHref = page.secondaryHref || whatsappHref;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)} | The Future Studio</title>
  <meta name="description" content="${esc(metaDescription)}">
  <link rel="canonical" href="https://thefuturestudio.online/${page.output.replace(/index\.html$/, '')}">
  <meta property="og:title" content="${esc(page.title)} | The Future Studio">
  <meta property="og:description" content="${esc(metaDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://thefuturestudio.online/${page.output.replace(/index\.html$/, '')}">
  <meta property="og:image" content="https://thefuturestudio.online${page.image}">
  <link rel="icon" href="/future-studio-favicon.png">
  <style>
    :root{--black:#050505;--white:#fffaf5;--paper:#fff7f1;--muted:#5e5e64;--line:#111;--cyan:#11d4c1;--blue:#42b8f5;--purple:#9b55ff;--grad:linear-gradient(120deg,var(--cyan),var(--blue),var(--purple));--font-condensed:"Arial Narrow","Impact",sans-serif;--font-body:"Trebuchet MS","Segoe UI",sans-serif}
    *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--paper);color:var(--black);font-family:var(--font-body);overflow-x:hidden} a{color:inherit;text-decoration:none} img{max-width:100%;display:block}
    .page-bg{position:fixed;inset:0;z-index:-2;background:radial-gradient(circle at 8% 12%,rgba(17,212,193,.42),transparent 18%),radial-gradient(circle at 84% 22%,rgba(155,85,255,.16),transparent 18%),radial-gradient(circle at 72% 75%,rgba(66,184,245,.16),transparent 22%),var(--paper)}
    .container{width:min(1440px,calc(100% - 64px));margin:0 auto}.section{padding:clamp(82px,8vw,132px) 0}.light-section{background:rgba(255,250,245,.68)}.dark-section{background:var(--black);color:var(--white)}
    .site-header{height:96px;background:rgba(255,250,245,.92);border-bottom:1px solid rgba(0,0,0,.12);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 34px;position:relative;z-index:20}.nav-left,.nav-right{display:flex;align-items:center;gap:30px}.nav-right{justify-content:flex-end}.nav-left a,.lang-toggle,.btn{font-family:var(--font-condensed);font-weight:900;text-transform:uppercase;letter-spacing:.1em}.brand-logo img{height:64px;width:auto}.lang-toggle{display:flex;border:2px solid var(--black)}.lang-toggle span{padding:9px 12px}.lang-toggle span:first-child{background:var(--black);color:var(--white)}
    .mobile-menu{display:none;width:56px;height:56px;border:2px solid var(--black);background:transparent;place-items:center}.mobile-menu span,.mobile-menu:before,.mobile-menu:after{content:"";display:block;width:24px;height:2px;background:var(--black);margin:4px 0}
    .btn{display:inline-flex;align-items:center;justify-content:center;min-height:58px;padding:18px 30px;border:2px solid var(--black);font-size:15px;line-height:1;background:transparent;cursor:pointer}.btn-grad{background:var(--grad);color:var(--black);border-color:transparent}.btn-grad:hover,.btn-dark:hover{background:var(--white);color:var(--black);border-color:var(--black)}.btn-dark{background:var(--black);color:var(--white)}.btn-white{background:var(--white);color:var(--black)}
    .hero{min-height:calc(100vh - 96px);display:flex;align-items:center;padding:72px 0 0}.hero-inner{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr);gap:60px;align-items:center}.eyebrow{font-family:var(--font-condensed);font-weight:900;text-transform:uppercase;letter-spacing:.32em;color:var(--cyan);font-size:16px}.eyebrow:before{content:"";display:inline-block;width:64px;height:3px;background:var(--grad);margin-right:18px;vertical-align:middle}.headline-xl,.headline-lg,.headline-md{font-family:var(--font-condensed);font-style:italic;font-weight:900;text-transform:uppercase;line-height:.88;margin:0}.headline-xl{font-size:clamp(68px,8.8vw,168px);letter-spacing:-.04em}.headline-lg{font-size:clamp(56px,6vw,116px);letter-spacing:-.035em}.headline-md{font-size:clamp(44px,4.5vw,84px);letter-spacing:-.03em}.grad-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}.body-lg{font-size:clamp(20px,1.7vw,28px);line-height:1.55;color:#3f3f46;max-width:820px}.body-md,.feature-card p,.price-card li,.faq p{font-size:18px;line-height:1.65;color:#34343b}.hero-actions{display:flex;gap:16px;flex-wrap:wrap;margin-top:34px}
    .hero-visual{border:2px solid var(--black);background:var(--black);box-shadow:14px 14px 0 var(--cyan);overflow:hidden}.hero-visual img{width:100%;height:460px;object-fit:cover;object-position:center}
    .stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:2px solid var(--black);border-bottom:2px solid var(--black);background:rgba(255,250,245,.72)}.stat{padding:30px 20px;text-align:center;border-right:1px solid rgba(0,0,0,.16)}.stat:last-child{border-right:0}.stat strong{display:block;font-family:var(--font-condensed);font-style:italic;font-size:34px;text-transform:uppercase}.stat:nth-child(odd) strong{color:var(--cyan)}.stat:nth-child(even) strong{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}.stat span{font-family:var(--font-condensed);text-transform:uppercase;letter-spacing:.16em;color:#8b8b91;font-size:12px}
    .video-section{background:#07070a;color:var(--white);padding:110px 0}.video-heading{text-align:center;max-width:940px;margin:0 auto 56px}.video-heading p{color:#b9bac1}.video-card{width:min(920px,100%);margin:0 auto;border:2px solid #222;background:#111;position:relative;overflow:hidden}.video-card img{width:100%;height:520px;object-fit:cover;opacity:.55}.play{position:absolute;inset:0;display:grid;place-items:center}.play span{width:88px;height:88px;border-radius:50%;background:var(--grad);display:grid;place-items:center;color:#fff;font-size:34px}
    .marquee{border-top:2px solid var(--black);border-bottom:2px solid var(--black);overflow:hidden;background:var(--paper);white-space:nowrap}.marquee-track{display:inline-flex;gap:34px;align-items:center;padding:22px 0;animation:marquee 28s linear infinite}.marquee span{font-family:var(--font-condensed);font-weight:900;text-transform:uppercase;letter-spacing:.12em;font-size:26px}.marquee .accent{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .section-head{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:58px}.section-head p{max-width:640px}.feature-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--cyan);background:var(--white)}.feature-card{min-height:300px;padding:56px 46px;border-right:1px solid var(--cyan);border-bottom:1px solid var(--cyan);transition:.22s ease}.feature-card:nth-child(3n){border-right:0}.feature-card:nth-last-child(-n+3){border-bottom:0}.feature-card:hover{background:var(--grad);box-shadow:10px 10px 0 var(--black);transform:translate(-4px,-4px)}.feature-num,.process-num{font-family:var(--font-condensed);font-style:italic;font-weight:900;font-size:48px;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}.feature-card:hover .feature-num{color:var(--white);background:none}.feature-card h3,.process-title,.price-card h3{font-family:var(--font-condensed);font-style:italic;font-size:34px;line-height:.95;text-transform:uppercase}.feature-card p{margin:0}
    .trust-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:stretch}.trust-image,.trust-copy{background:var(--black);border:2px solid var(--black);box-shadow:14px 14px 0 var(--cyan)}.trust-image{overflow:hidden}.trust-image img{width:100%;height:100%;min-height:520px;object-fit:cover;object-position:center}.trust-copy{padding:70px;color:var(--white);box-shadow:14px 14px 0 transparent;border-image:linear-gradient(120deg,var(--cyan),var(--blue),var(--purple)) 1}.trust-copy p{color:#d7d7dd}
    .process{background:var(--white);background-image:linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px);background-size:120px 120px}.process-row{display:grid;grid-template-columns:120px 1fr 1.4fr 48px;gap:32px;align-items:center;border-top:2px solid var(--black);padding:40px 0}.process-row:last-child{border-bottom:2px solid var(--black)}.process-name span{font-family:var(--font-condensed);text-transform:uppercase;letter-spacing:.2em;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:900}.process-row p{font-size:20px;color:#555965;line-height:1.5}.process-slash{font-size:44px;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
    .pricing-wrap{text-align:center;max-width:940px;margin:0 auto 58px}.pricing-wrap p{margin-left:auto;margin-right:auto;color:#bfc0c7}.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #242428}.price-card{text-align:left;padding:46px;border-right:1px solid #242428;min-height:560px;display:flex;flex-direction:column}.price-card:last-child{border-right:0}.price-card.featured{background:linear-gradient(145deg,rgba(17,212,193,.12),rgba(155,85,255,.14));border:1px solid var(--cyan)}.price-badge{align-self:flex-start;background:rgba(17,212,193,.14);color:var(--cyan);font-family:var(--font-condensed);font-weight:900;text-transform:uppercase;letter-spacing:.12em;padding:10px 13px}.price{font-family:var(--font-condensed);font-style:italic;font-weight:900;font-size:56px;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}.price-card ul{list-style:none;padding:0;margin:20px 0 34px}.price-card li{color:#d8d8de;margin:10px 0}.price-card li:before{content:"";display:inline-block;width:10px;height:10px;background:var(--cyan);margin-right:12px}.price-card .btn{margin-top:auto;width:100%}
    .faq-list{max-width:1040px;margin:50px auto 0}.faq-list details{border-top:1px solid rgba(0,0,0,.18);padding:22px 0}.faq-list details:last-child{border-bottom:1px solid rgba(0,0,0,.18)}.faq-list summary{cursor:pointer;display:flex;justify-content:space-between;gap:20px;font-family:var(--font-condensed);font-style:italic;font-weight:900;text-transform:uppercase;font-size:24px}.faq-list p{max-width:980px}
    .final-cta{background:var(--grad);text-align:center;padding:115px 24px}.final-cta p{margin-left:auto;margin-right:auto;color:#202026}.final-actions{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}.email-row{margin-top:24px}.email-row a{text-decoration:underline;font-weight:700}
    .site-footer{background:var(--black);color:var(--white);padding:74px 0 34px}.footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:70px}.footer-logo img{height:86px;width:auto;object-fit:contain}.footer-grid h4{font-family:var(--font-condensed);text-transform:uppercase;letter-spacing:.18em;color:var(--cyan)}.footer-grid ul{list-style:none;padding:0;margin:0}.footer-grid li{margin:12px 0}.footer-bottom{border-top:1px solid #252529;margin-top:52px;padding-top:28px;text-align:center;color:#8d8f99}.float-ai{position:fixed;left:22px;bottom:22px;background:#050505;color:var(--cyan);border-radius:999px;padding:15px 20px;font-weight:900;z-index:50;box-shadow:0 8px 24px rgba(0,0,0,.22)}.float-wa{position:fixed;right:22px;bottom:22px;width:58px;height:58px;border-radius:50%;background:#25d366;color:#fff;display:grid;place-items:center;font-weight:900;z-index:50}.to-top{position:fixed;right:34px;bottom:96px;color:#fff;font-size:30px;z-index:50}
    .demo-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:58px;align-items:center}.demo-shell{border:2px solid var(--black);background:var(--white);box-shadow:14px 14px 0 var(--cyan)}.demo-top{height:74px;background:var(--black);color:var(--white);display:flex;align-items:center;gap:14px;padding:0 28px;font-family:var(--font-condensed);text-transform:uppercase;letter-spacing:.12em}.pulse-dot{width:22px;height:22px;border-radius:50%;background:var(--cyan);box-shadow:0 0 22px var(--cyan)}.audio-bars span{display:inline-block;width:5px;background:#888;margin-right:3px;vertical-align:bottom}.audio-bars span:nth-child(1){height:14px}.audio-bars span:nth-child(2){height:24px}.audio-bars span:nth-child(3){height:18px}.audio-bars span:nth-child(4){height:30px}.transcript{min-height:300px;max-height:390px;overflow:auto;padding:28px;display:grid;gap:14px}.voice-message{padding:16px 18px;border:2px solid var(--black);background:var(--white)}.voice-message.ai{box-shadow:8px 8px 0 rgba(17,212,193,.24)}.voice-message.user{background:var(--black);color:var(--white);justify-self:end}.voice-call-btn{width:calc(100% - 56px);margin:0 28px 22px}.demo-meta{display:flex;gap:10px;padding:0 28px 28px;flex-wrap:wrap}.demo-meta span{background:#eef8f6;padding:9px 12px;font-size:13px;font-weight:800}
    @media (max-width: 980px){.site-header{grid-template-columns:1fr auto 1fr;height:104px;padding:0 18px}.nav-left,.nav-right{display:none}.mobile-menu{display:grid;justify-self:end}.brand-logo img{height:64px}.hero{min-height:auto;padding:56px 0 0}.hero-inner,.section-head,.trust-grid,.demo-grid{grid-template-columns:1fr}.container{width:min(100% - 34px,720px)}.hero-copy{text-align:center}.eyebrow:before{display:none}.headline-xl{font-size:clamp(50px,14vw,86px)}.hero-actions{justify-content:center}.hero-visual img,.trust-image img,.video-card img{height:auto;min-height:0}.stats{grid-template-columns:repeat(2,1fr)}.feature-grid,.pricing-grid{grid-template-columns:1fr}.feature-card,.feature-card:nth-child(3n),.feature-card:nth-last-child(-n+3),.price-card{border-right:0;border-bottom:1px solid var(--cyan)}.process-row{grid-template-columns:1fr;text-align:center}.footer-grid{grid-template-columns:1fr;text-align:center}.footer-logo img{margin:0 auto}.section{padding:72px 0}.float-ai{display:none}.final-actions{flex-direction:column}.btn{width:100%}}
  </style>
</head>
<body>
  <div class="page-bg"></div>
  <header class="site-header">
    <nav class="nav-left" aria-label="Main navigation">
      <a href="/#services">Services</a>
      <a href="/academy/">Academy</a>
      <a href="/#packages">Packages</a>
      <a href="/#faq">FAQ</a>
    </nav>
    <a class="brand-logo" href="/" aria-label="The Future Studio home"><img src="/assets/future-studio-logo.png" alt="The Future Studio"></a>
    <div class="nav-right">
      <div class="lang-toggle" aria-label="Language"><span>EN</span><span>ES</span></div>
      <a class="btn btn-grad" href="${calendlyHref}" target="_blank" rel="noopener">Book a Free Demo</a>
    </div>
    <button class="mobile-menu" aria-label="Open menu"><span></span></button>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">${esc(page.eyebrow)}</p>
          <h1 class="headline-xl">${esc(page.hero).replace(/ (THAT|WITH|AND|FOR|TO) /, ' <span class="grad-text">$1</span> ')}</h1>
          <p class="body-lg">${esc(page.description)}</p>
          <div class="hero-actions">
            <a class="btn btn-grad" href="${calendlyHref}" target="_blank" rel="noopener">${esc(page.primaryCta)}</a>
            <a class="btn btn-white" href="${secondaryHref}">${esc(page.secondaryCta)}</a>
          </div>
        </div>
        <div class="hero-visual"><img src="${page.image}" alt="${esc(page.imageAlt)}"></div>
      </div>
    </section>

    <div class="stats">
      ${page.stats.map((stat) => `<div class="stat"><strong>${esc(stat[0])}</strong><span>${esc(stat[1])}</span></div>`).join('')}
    </div>

    <section class="video-section" id="video">
      <div class="container">
        <div class="video-heading">
          <p class="eyebrow">${esc(page.title)} walkthrough</p>
          <h2 class="headline-lg">${esc(page.videoTitle)}</h2>
          <p class="body-lg">${esc(page.videoBody)}</p>
          <a class="btn btn-grad" href="${calendlyHref}" target="_blank" rel="noopener">Watch the Product Video</a>
        </div>
        <div class="video-card">
          <img src="${page.image}" alt="${esc(page.imageAlt)}">
          <div class="play"><span>Play</span></div>
        </div>
      </div>
    </section>

    <div class="marquee" aria-hidden="true"><div class="marquee-track">
      ${[...page.stats, ...page.stats, ...page.stats].map((stat, i) => `<span class="${i % 2 === 0 ? 'accent' : ''}">${esc(stat[0])} ${esc(stat[1])}</span>`).join('')}
    </div></div>

    ${renderVoiceDemo(page)}

    <section class="section" id="features">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">What gets installed</p>
            <h2 class="headline-lg">${esc(page.installedTitle)}</h2>
          </div>
          <p class="body-lg">${esc(page.installedIntro)}</p>
        </div>
        <div class="feature-grid">
          ${renderFeatureCards(page.features)}
        </div>
      </div>
    </section>

    <section class="section dark-section">
      <div class="container trust-grid">
        <div class="trust-image"><img src="${page.image}" alt="${esc(page.imageAlt)}"></div>
        <div class="trust-copy">
          <p class="eyebrow">Why it matters</p>
          <h2 class="headline-md">${esc(page.trustTitle)}</h2>
          <p class="body-lg">${esc(page.trustBody)}</p>
        </div>
      </div>
    </section>

    <section class="section process" id="process">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">The process</p>
            <h2 class="headline-lg">HOW THE<br>SYSTEM<br>GETS BUILT</h2>
          </div>
          <p class="body-lg">A practical path from first conversation to a working system your team can understand and use.</p>
        </div>
        ${renderProcess(page.process)}
      </div>
    </section>

    <section class="section dark-section" id="buy">
      <div class="container">
        <div class="pricing-wrap">
          <p class="eyebrow">Build options</p>
          <h2 class="headline-lg">${esc(page.pricingTitle)}</h2>
          <p class="body-lg">${esc(page.pricingBody)}</p>
        </div>
        <div class="pricing-grid">${renderPricing(page.pricing)}</div>
      </div>
    </section>

    <section class="section light-section" id="faq">
      <div class="container">
        <div class="pricing-wrap">
          <p class="eyebrow">Common questions</p>
          <h2 class="headline-lg">FREQUENTLY<br>ASKED</h2>
        </div>
        <div class="faq-list">${renderFaqs(page)}</div>
      </div>
    </section>

    <section class="final-cta">
      <p class="eyebrow">Ready to start?</p>
      <h2 class="headline-lg">${esc(page.finalTitle)}</h2>
      <p class="body-lg">${esc(page.finalBody)}</p>
      <div class="final-actions">
        <a class="btn btn-dark" href="${calendlyHref}" target="_blank" rel="noopener">Book a Free Demo</a>
        <a class="btn" href="${whatsappHref}">WhatsApp Us</a>
        <a class="btn btn-white" href="${emailHref}">Email Us</a>
      </div>
      <div class="email-row">Or email <a href="${emailHref}">info@thefuturestudio.online</a></div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="footer-logo" href="/"><img src="/assets/future-studio-logo-white.png" alt="The Future Studio"></a>
          <p>AI systems for service businesses, internationally.</p>
          <p>Precision-built. Results-driven.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="/systems/voice-agent/">Voice Agents</a></li>
            <li><a href="/systems/whatsapp-automation-agent/">WhatsApp Automation</a></li>
            <li><a href="/systems/booking-agent/">Booking Flows</a></li>
            <li><a href="/academy/">Academy</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="${calendlyHref}" target="_blank" rel="noopener">Watch a Free Demo</a></li>
            <li><a href="${whatsappHref}">WhatsApp</a></li>
            <li><a href="${emailHref}">Email</a></li>
            <li><a href="/">thefuturestudio.online</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">&copy; 2026 The Future Studio - Richard Hardy Saenz. All rights reserved.</div>
    </div>
  </footer>
  <a class="float-ai" href="/#talk-with-ai">Talk with AI</a>
  <a class="float-wa" href="${whatsappHref}" aria-label="WhatsApp">WA</a>
  <a class="to-top" href="#" aria-label="Back to top">Top</a>
</body>
</html>`;
}

function writePage(page) {
  const fullPath = path.join(root, page.output);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, renderPage(page), 'utf8');
  console.log(`Wrote ${page.output}`);
}

function updateSitemap() {
  const sitemapPath = path.join(root, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = allPages.map((page) => `  <url>
    <loc>https://thefuturestudio.online/${page.output.replace(/index\.html$/, '')}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://thefuturestudio.online/${page.output.replace(/index\.html$/, '')}"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://thefuturestudio.online/${page.output.replace(/index\.html$/, '')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://thefuturestudio.online/${page.output.replace(/index\.html$/, '')}"/>
  </url>`).join('\n\n');

  for (const page of allPages) {
    const loc = `https://thefuturestudio.online/${page.output.replace(/index\.html$/, '')}`;
    sitemap = sitemap.replace(new RegExp(`\\s*<url>\\s*<loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>[\\s\\S]*?</url>`, 'g'), '');
  }
  sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n\n${urls}\n\n</urlset>\n`);
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('Updated sitemap.xml');
}

for (const page of allPages) writePage(page);
updateSitemap();
