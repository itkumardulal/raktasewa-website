/**
 * RaktaSewa How-it-works manual (bilingual).
 * Reflects real platform flow: donor pending→available, request new→unsettled→settled,
 * recognition from settled donations, admin coordination.
 */

export const HOW_IT_WORKS = {
  en: {
    eyebrow: "Manual",
    title: "How RaktaSewa works",
    subtitle:
      "A clear guide for donors, requesters, hospitals, and admins — how data is recorded, how matching works, and what to do when no donor is found.",
    disclaimer:
      "RaktaSewa is not a blood bank. We do not store or sell blood. Always take the patient to a hospital and follow medical advice. Final donor eligibility is decided by hospital screening.",
    emergencyTitle: "If no donor is found",
    emergencyBody:
      "After searching, if no compatible donor responds: (1) stay with hospital emergency care, (2) call RaktaSewa admin for backup coordination, (3) ask admin to contact partner organizations. Admin emergency line:",
    emergencyPhone: "9741667448",
    emergencyEmail: "support@raktasewa.com",
    sections: [
      {
        id: "overview",
        title: "1. Big picture",
        paragraphs: [
          "RaktaSewa connects three sides: voluntary donors, people requesting blood for a patient, and admin/hospital partners who verify and record successful donations.",
          "Every important step is saved in the system so the same story can be followed: who requested, who was contacted, who donated, and who is celebrated in Donor Recognition.",
        ],
        steps: [
          "Donor applies online → Admin reviews & calls → Donor becomes available in the network",
          "Requester submits a blood need → System finds compatible donors by blood group & area details → Calls / WhatsApp coordination",
          "Donation happens at a hospital → Admin marks the request Settled → Record links donor ↔ patient request → Recognition & rewards update on the website",
        ],
      },
      {
        id: "become-donor",
        title: "2. How to become a donor (and how data is recorded)",
        paragraphs: [
          "Anyone who wants to donate voluntarily submits the Become a Donor form on the website.",
        ],
        steps: [
          "Fill the form: name, age, gender, blood group, phone, address/area, and agreement.",
          "The system saves you as a Pending donor (not public for matching yet).",
          "An admin sees you under Pending Donors, calls you, and checks basic details.",
          "After verification, admin marks you Available. You enter the live donor network.",
          "Your phone is used for coordination only when needed — recognition pages do not publish private contacts.",
        ],
      },
      {
        id: "request-blood",
        title: "3. How to request blood (requester journey)",
        paragraphs: [
          "Use Request Blood when a patient needs blood. Always start with hospital emergency care.",
        ],
        steps: [
          "Submit patient blood group, urgency, hospital name/address, city/district, and requester contact numbers.",
          "The request is recorded as New in the admin system.",
          "The platform looks for compatible donors (exact and compatible blood groups) who are Available.",
          "Location fields (city/district, hospital address) help admins prioritize nearby donors. Exact GPS distance on a map may expand over time; area and hospital details are already used for coordination.",
          "Matched donors can be called or messaged (WhatsApp) with request details.",
          "If a donor agrees and donates at the hospital after medical screening, admin records the settlement.",
        ],
      },
      {
        id: "statuses",
        title: "4. New, Unsettled, and Settled — what they mean",
        paragraphs: [
          "Request status is how the team tracks progress. Understanding this keeps everyone aligned.",
        ],
        steps: [
          "New: Fresh requests still in the active short window (about the last 3 days). Admins try matching and contacting donors quickly.",
          "Unsettled: Still open — either no successful donation yet, or the request aged past the New window and needs continued outreach (donors, organizations, emergency coordination).",
          "Settled: A donation was completed and recorded. The system stores who donated for which request, with date/time.",
          "Assigned donor: After settle, that donor is marked Assigned and enters a waiting period before the next donation (commonly ~90 days for men / ~120 days for women for whole blood).",
        ],
      },
      {
        id: "matching",
        title: "5. How donors are discovered",
        paragraphs: [
          "Matching is medical-first (blood compatibility), then practical (availability and location details).",
        ],
        steps: [
          "Exact match: same blood group as the patient, status Available.",
          "Compatible match: other groups that can safely donate to the patient (for example O− can help many types).",
          "Pending donors may be contacted only after admin approval into Available.",
          "Admins can also contact partner organizations when donor lists are empty or time is critical.",
        ],
      },
      {
        id: "donation-record",
        title: "6. After donation — recording & recognition",
        paragraphs: [
          "When blood is given at the hospital and confirmed, admin settles the request.",
        ],
        steps: [
          "Admin selects the donor who donated and confirms Settle.",
          "System saves: request + donor + settled time (who donated for whom).",
          "Request moves to Settled; donor moves to Assigned with a waiting-day counter.",
          "Website Donor Recognition uses settled donation counts for badges, tiers, and “lives saved” highlights.",
          "This is the reward/recognition program: consistent safe giving earns higher tiers — never by donating too often.",
        ],
      },
      {
        id: "no-match",
        title: "7. If nobody is found — what you can do",
        paragraphs: [
          "Sometimes compatible donors are busy, resting, or far away. Do not wait only on the app.",
        ],
        steps: [
          "Keep the patient under hospital care — that is always first.",
          "Call RaktaSewa admin (number below) and share request ID / patient blood group / hospital.",
          "Ask admin to escalate to partner organizations and repeat outreach.",
          "Update the request if urgency, location, or amount changes.",
          "Check again later — New and Unsettled queues are watched by the admin team.",
        ],
      },
      {
        id: "admin",
        title: "8. What admins do (operations checklist)",
        paragraphs: [
          "The admin workspace is where verification, contact, settle, and reporting happen.",
        ],
        steps: [
          "Approve Pending donors after a call/check → Available.",
          "Work New requests (recent) with match lists, Call/WhatsApp, and settle when donation succeeds.",
          "Continue Unsettled requests with donor matches + organization emergency messages.",
          "Use Assigned Donors to track waiting days; mark Available again when safe.",
          "Use Reports & Export for filtered CSV/PDF of requests, donors, settlements, and organizations.",
          "Use Notifications (bell + Refresh) to catch new requests and new donor applications.",
        ],
      },
      {
        id: "safety",
        title: "9. Safety rules everyone should follow",
        paragraphs: [],
        steps: [
          "Hospital screening decides if a donor may give blood that day.",
          "Respect waiting gaps between whole-blood donations.",
          "Never pay for blood through RaktaSewa — we do not sell blood.",
          "Share only needed contact details for coordination.",
          "In life-threatening emergencies, call national/local emergency services first.",
        ],
      },
    ],
  },
  ne: {
    eyebrow: "म्यानुअल",
    title: "रक्तसेवा कसरी काम गर्छ",
    subtitle:
      "रक्तदाता, अनुरोधकर्ता, अस्पताल र एडमिनका लागि स्पष्ट गाइड — डाटा कसरी रेकर्ड हुन्छ, मिलान कसरी हुन्छ, र रक्तदाता नभेट्दा के गर्ने।",
    disclaimer:
      "रक्तसेवा रक्त बैंक होइन। हामी रगत भण्डारण वा बिक्री गर्दैनौं। बिरामीलाई अस्पताल लैजानुहोस् र चिकित्सा सल्लाह पालना गर्नुहोस्। अन्तिम योग्यता अस्पताल जाँचले निर्धारण गर्छ।",
    emergencyTitle: "यदि रक्तदाता भेटिएन भने",
    emergencyBody:
      "खोजिसकेपछि पनि मिल्दो रक्तदाता नआए: (१) अस्पतालको आपतकालीन हेरचाहमा रहनुहोस्, (२) रक्तसेवा एडमिनलाई कल गर्नुहोस्, (३) साझेदार संस्थालाई सम्पर्क गर्न भन्नुहोस्। एडमिन आपतकालीन नम्बर:",
    emergencyPhone: "9741667448",
    emergencyEmail: "support@raktasewa.com",
    sections: [
      {
        id: "overview",
        title: "१. समग्र प्रक्रिया",
        paragraphs: [
          "रक्तसेवाले तीन पक्ष जोड्छ: स्वयंसेवी रक्तदाता, बिरामीका लागि रगत खोज्ने अनुरोधकर्ता, र दान प्रमाणित/रेकर्ड गर्ने एडमिन–अस्पताल साझेदार।",
          "महत्वपूर्ण चरण प्रणालीमा बचत हुन्छ: कसले अनुरोध गर्‍यो, कसलाई सम्पर्क गरियो, कसले दान गर्‍यो, र Donor Recognition मा कसलाई सम्मान गरिन्छ।",
        ],
        steps: [
          "रक्तदाता अनलाइन आवेदन → एडमिन समीक्षा/कल → उपलब्ध (Available) नेटवर्कमा प्रवेश",
          "अनुरोधकर्ताले रगत आवश्यकता पेस → रगत समूह र क्षेत्रअनुसार मिलान → कल/WhatsApp समन्वय",
          "अस्पतालमा दान → एडमिन Settled गर्छ → रक्तदाता↔अनुरोध रेकर्ड → वेबसाइटमा सम्मान/रिवार्ड अपडेट",
        ],
      },
      {
        id: "become-donor",
        title: "२. रक्तदाता बन्ने तरिका (डाटा रेकर्ड)",
        paragraphs: [
          "स्वयंसेवी बन्न चाहनेले वेबसाइटको Become a Donor फारम भर्नुहोस्।",
        ],
        steps: [
          "नाम, उमेर, लिङ्ग, रगत समूह, फोन, ठेगाना/क्षेत्र र सहमति भर्नुहोस्।",
          "प्रणालीले तपाईंलाई Pending रक्तदाताका रूपमा बचत गर्छ (अहिले मिलानमा सार्वजनिक हुँदैन)।",
          "एडमिन Pending Donors मा देख्छ, कल गर्छ र विवरण जाँच्छ।",
          "प्रमाणित भएपछि Available बनाइन्छ — त्यसपछि लाइभ नेटवर्कमा हुनुहुन्छ।",
          "फोन समन्वयका लागि मात्र प्रयोग हुन्छ; सम्मान पृष्ठमा निजी सम्पर्क सार्वजनिक हुँदैन।",
        ],
      },
      {
        id: "request-blood",
        title: "३. रगत अनुरोध (अनुरोधकर्ता यात्रा)",
        paragraphs: [
          "बिरामीलाई रगत चाहिँदा Request Blood प्रयोग गर्नुहोस्। पहिले अस्पतालको आपतकालीन हेरचाह अनिवार्य।",
        ],
        steps: [
          "बिरामीको रगत समूह, जरुरी अवस्था, अस्पताल, शहर/जिल्ला र सम्पर्क नम्बर पेस गर्नुहोस्।",
          "अनुरोध एडमिन प्रणालीमा New का रूपमा रेकर्ड हुन्छ।",
          "प्लेटफर्मले Available मिल्दो/अनुकूल रक्तदाता खोज्छ।",
          "स्थान (शहर/जिल्ला, अस्पताल ठेगाना) ले नजिकका दाता प्राथमिकता दिन मद्दत गर्छ। GPS दूरी विस्तार हुन सक्छ; अहिले क्षेत्र/अस्पताल विवरण समन्वयमा प्रयोग हुन्छ।",
          "मिल्दो दातालाई कल वा WhatsApp गर्न सकिन्छ।",
          "अस्पताल जाँचपछि दान सफल भए एडमिनले Settle रेकर्ड गर्छ।",
        ],
      },
      {
        id: "statuses",
        title: "४. New, Unsettled र Settled को अर्थ",
        paragraphs: ["अनुरोधको स्थितिले टोलीलाई प्रगति ट्र्याक गर्न मद्दत गर्छ।"],
        steps: [
          "New: करिब पछिल्ला ३ दिनका सक्रिय नयाँ अनुरोध — छिटो मिलान र सम्पर्क।",
          "Unsettled: अझै खुला — दान भइसकेको छैन वा New अवधि सकिएर निरन्तर समन्वय चाहिन्छ।",
          "Settled: दान पूरा भई रेकर्ड भयो — कसले कसका लागि दान गर्‍यो र कहिले भन्ने बचत हुन्छ।",
          "Assigned: Settle पछि दाता Assigned हुन्छ र अर्को दानअघि पर्खाइ अवधि (पुरुष ~९० दिन / महिला ~१२० दिन) लागू हुन्छ।",
        ],
      },
      {
        id: "matching",
        title: "५. रक्तदाता कसरी भेटिन्छन्",
        paragraphs: ["पहिले चिकित्सा अनुकूलता, त्यसपछि उपलब्धता र स्थान विवरण।"],
        steps: [
          "Exact match: बिरामीसँग उही रगत समूह, Available।",
          "Compatible match: बिरामीलाई दिन मिल्ने अन्य समूह (जस्तै O− धेरैलाई सहयोगी)।",
          "Pending दाता एडमिन स्वीकृत भएपछि मात्र Available मिलानमा आउँछन्।",
          "सूची रित्तो/जरुरी भए साझेदार संस्थालाई पनि सम्पर्क गर्न सकिन्छ।",
        ],
      },
      {
        id: "donation-record",
        title: "६. दानपछि — रेकर्ड र सम्मान",
        paragraphs: ["अस्पतालमा दान पुष्टि भएपछि एडमिनले Settle गर्छ।"],
        steps: [
          "एडमिनले दान गर्ने दाता चयन गरी Confirm/Settle गर्छ।",
          "प्रणालीले अनुरोध + दाता + समय बचत गर्छ।",
          "अनुरोध Settled, दाता Assigned र पर्खाइ काउन्टर सुरु।",
          "वेबसाइट Donor Recognition ले settled दान संख्याबाट ब्याज/टियर र “बचेका जीवन” देखाउँछ।",
          "यो नै सम्मान/रिवार्ड कार्यक्रम हो — सुरक्षित नियमित दानले स्तर बढ्छ, छिटो–छिटो दान होइन।",
        ],
      },
      {
        id: "no-match",
        title: "७. कोही नभेटिए के गर्ने",
        paragraphs: ["कहिलेकाहीं मिल्दो दाता व्यस्त/आराममा हुन सक्छन्। एपमा मात्र पर्खनु हुँदैन।"],
        steps: [
          "बिरामीलाई अस्पताल हेरचाहमा राख्नुहोस् — पहिलो प्राथमिकता।",
          "रक्तसेवा एडमिनलाई कल गरी रगत समूह/अस्पताल/अनुरोध विवरण दिनुहोस्।",
          "साझेदार संस्था र थप सम्पर्कका लागि एडमिनलाई भन्नुहोस्।",
          "जरुरी अवस्था/स्थान परिवर्तन भए अपडेट गर्नुहोस्।",
          "पछि फेरि जाँच गर्नुहोस् — New/Unsettled कतार एडमिनले हेर्छ।",
        ],
      },
      {
        id: "admin",
        title: "८. एडमिनले के गर्छ (सञ्चालन)",
        paragraphs: ["एडमिन प्यानलमा प्रमाणीकरण, सम्पर्क, Settle र रिपोर्ट हुन्छ।"],
        steps: [
          "Pending दाता कल/जाँचपछि Available।",
          "New अनुरोधमा मिलान, कल/WhatsApp, सफल दानपछि Settle।",
          "Unsettled मा निरन्तर दाता/संस्था समन्वय।",
          "Assigned Donors मा पर्खाइ दिन ट्र्याक; सुरक्षित हुँदा Available।",
          "Reports बाट CSV/PDF निर्यात।",
          "सूचना घण्टी + Refresh बाट नयाँ अनुरोध/दाता आवेदन।",
        ],
      },
      {
        id: "safety",
        title: "९. सुरक्षा नियम",
        paragraphs: [],
        steps: [
          "त्यही दिन दान गर्न मिल्छ कि मिल्दैन अस्पताल जाँचले तय गर्छ।",
          "पूर्ण रक्त दानबीचको पर्खाइ अवधि पालना गर्नुहोस्।",
          "रक्तसेवा मार्फत रगत किन्न/बेच्न हुँदैन।",
          "समन्वयका लागि आवश्यक सम्पर्क मात्र साझा गर्नुहोस्।",
          "जीवन जोखिममा भए राष्ट्रिय/स्थानीय आपतकालीन सेवा पहिले कल गर्नुहोस्।",
        ],
      },
    ],
  },
};

/** Admin-facing extras (English ops checklist) */
export const ADMIN_MANUAL_EXTRA = {
  title: "Admin quick reference",
  items: [
    {
      title: "Donor pipeline",
      body: "Website form → Pending Donors → call & verify → Available (Enrolled). After Settle → Assigned (waiting counter) → Make available again when eligible.",
    },
    {
      title: "Request pipeline",
      body: "Website Request Blood → New (≈3 days) → match/call/settle. Older open needs → Unsettled (continue outreach + orgs). Success → Settled (donor↔request record).",
    },
    {
      title: "Recognition",
      body: "Only settled donations raise public tiers / “lives saved”. Do not settle until donation is real and hospital-confirmed.",
    },
    {
      title: "No-match playbook",
      body: "Use Unsettled match panel → Call/WhatsApp donors → Organization emergency message → keep requester updated via Contact tools.",
    },
  ],
};
