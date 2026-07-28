/** Static bilingual blog articles (not from API) */
export const BLOG_POSTS = [
  {
    slug: "why-blood-donation-saves-lives",
    image: "/images/blood-donation.jpg",
    category: { en: "Awareness", ne: "सचेतना" },
    readingMinutes: 5,
    author: "RaktaSewa Editorial",
    date: "2025-11-12",
    title: { en: "Why Blood Donation Saves Lives", ne: "रक्तदानले किन जीवन बचाउँछ" },
    summary: {
      en: "A single voluntary donation can support trauma care, surgery, childbirth complications, and chronic illness treatment.",
      ne: "एउटा स्वयंसेवी दानले चोटपटक, शल्यक्रिया, प्रसूति जटिलता र दीर्घरोग उपचारमा सहयोग गर्न सक्छ।",
    },
    body: {
      en: [
        "Blood cannot be manufactured at scale. Every unit used in hospitals comes from a human donor.",
        "In emergencies—road accidents, postpartum hemorrhage, surgical bleeding—timely transfusion can be decisive.",
        "RaktaSewa helps communities mobilize voluntary donors quickly when hospital stocks are insufficient.",
        "Donation through authorized medical channels remains essential for safety and quality.",
      ],
      ne: [
        "रगत ठूलो मात्रामा कारखानामा बनाउन सकिँदैन। अस्पतालमा प्रयोग हुने हरेक एकाइ मानव रक्तदाताबाट आउँछ।",
        "सडक दुर्घटना, प्रसूति रक्तस्राव, शल्यक्रिया जस्ता आपतकालमा समयमै ट्रान्सफ्युजन निर्णायक हुन सक्छ।",
        "अस्पताल भण्डार अपर्याप्त हुँदा रक्तसेवाले स्वयंसेवी रक्तदाता छिटो जुटाउन सहयोग गर्छ।",
        "सुरक्षाका लागि अधिकृत चिकित्सा मार्गबाट दान अनिवार्य रहन्छ।",
      ],
    },
  },
  {
    slug: "blood-donation-myths",
    image: "/images/nepal-himalaya.jpg",
    category: { en: "Myths", ne: "भ्रम" },
    readingMinutes: 6,
    author: "RaktaSewa Editorial",
    date: "2025-11-18",
    title: { en: "Blood Donation Myths—And the Facts", ne: "रक्तदानसम्बन्धी भ्रम र तथ्य" },
    summary: {
      en: "Fear and misinformation keep eligible donors away. Here are common myths clarified.",
      ne: "डर र गलत जानकारीले योग्य रक्तदातालाई रोक्छ। यहाँ सामान्य भ्रम स्पष्ट पारिएको छ।",
    },
    body: {
      en: [
        "Myth: Donation makes you permanently weak. Fact: Healthy adults recover with rest, fluids, and a normal meal.",
        "Myth: You can catch diseases from donating. Fact: Sterile single-use equipment is standard in proper facilities.",
        "Myth: Only rare groups matter. Fact: Common groups are needed every day in large volumes.",
        "Always follow local screening rules—your safety and the patient’s safety come first.",
      ],
      ne: [
        "भ्रम: दानले सधैं कमजोर बनाउँछ। तथ्य: स्वस्थ वयस्क आराम, पानी र खानासँगै निको हुन्छन्।",
        "भ्रम: दान गर्दा रोग सर्छ। तथ्य: उचित स्थलमा बाँझो एकपटक प्रयोग हुने उपकरण प्रयोग हुन्छ।",
        "भ्रम: दुर्लभ समूह मात्र महत्वपूर्ण। तथ्य: सामान्य समूह पनि दैनिक ठूलो मात्रामा चाहिन्छ।",
        "स्थानीय जाँच नियम पालना गर्नुहोस्—तपाईं र बिरामी दुवैको सुरक्षा पहिले।",
      ],
    },
  },
  {
    slug: "preparing-for-blood-donation",
    image: "/images/healthcare.jpg",
    category: { en: "Preparation", ne: "तयारी" },
    readingMinutes: 4,
    author: "RaktaSewa Editorial",
    date: "2025-12-01",
    title: { en: "Preparing for Blood Donation", ne: "रक्तदानको तयारी" },
    summary: {
      en: "Hydration, rest, and honest health disclosure improve a safe donation experience.",
      ne: "पानी पिउने, आराम र इमानदार स्वास्थ्य जानकारीले सुरक्षित दान अनुभव सुधार्छ।",
    },
    body: {
      en: [
        "Sleep well the night before and drink water regularly.",
        "Eat a balanced meal; avoid heavy alcohol beforehand.",
        "Bring identification and share medications or recent illness honestly during screening.",
        "After donation, rest briefly and continue fluids.",
      ],
      ne: [
        "अघिल्लो रात राम्रोसँग सुत्नुहोस् र नियमित पानी पिउनुहोस्।",
        "सन्तुलित खाना खानुहोस्; अघिबाट मदिराबाट बच्नुहोस्।",
        "परिचयपत्र ल्याउनुहोस् र जाँचमा औषधि वा हालसालैको बिमारी इमानदारीपूर्वक बताउनुहोस्।",
        "दानपछि छोटो आराम गर्नुहोस् र पानी जारी राख्नुहोस्।",
      ],
    },
  },
  {
    slug: "rare-blood-groups",
    image: "/images/nepal-peaks.jpg",
    category: { en: "Science", ne: "विज्ञान" },
    readingMinutes: 5,
    author: "RaktaSewa Editorial",
    date: "2025-12-08",
    title: { en: "Rare Blood Groups in Emergency Care", ne: "आपतकालीन हेरचाहमा दुर्लभ रगत समूह" },
    summary: {
      en: "Rare phenotypes require wider networks. Community registries help locate compatible donors faster.",
      ne: "दुर्लभ फेनोटाइपका लागि फराकिलो नेटवर्क चाहिन्छ। समुदाय दर्ताले मिल्दो रक्तदाता छिटो खोज्न मद्दत गर्छ।",
    },
    body: {
      en: [
        "Rare blood needs may not be available in every district blood bank.",
        "A digital connection platform expands the search beyond a single facility.",
        "Donors with uncommon types are encouraged to stay reachable and donate when medically cleared.",
        "Clinical teams still confirm compatibility through standard laboratory protocols.",
      ],
      ne: [
        "दुर्लभ रगत हरेक जिल्लाको रक्त बैंकमा उपलब्ध नहुन सक्छ।",
        "डिजिटल जडान प्लेटफर्मले खोजी एउटा संस्थाभन्दा बाहिर फैल्याउँछ।",
        "असामान्य प्रकारका रक्तदाता सम्पर्कमा रहेर चिकित्सा अनुमतिमा दान गर्न प्रोत्साहित छन्।",
        "क्लिनिकल टोलीले प्रयोगशाला प्रोटोकलअनुसार अनुकूलता पुष्टि गर्छ।",
      ],
    },
  },
  {
    slug: "blood-compatibility-basics",
    image: "/images/nepal-mountains.jpg",
    category: { en: "Education", ne: "शिक्षा" },
    readingMinutes: 7,
    author: "RaktaSewa Editorial",
    date: "2026-01-05",
    title: { en: "Blood Compatibility Basics", ne: "रगत अनुकूलताका आधारभूत कुरा" },
    summary: {
      en: "ABO and Rh systems determine who can donate to whom. Learn the essentials.",
      ne: "ABO र Rh प्रणालीले कसले कसलाई दिन सक्छ निर्धारण गर्छ। आधारभूत कुरा जान्नुहोस्।",
    },
    body: {
      en: [
        "Type O negative is often used as emergency universal donor red cells.",
        "Type AB positive can typically receive red cells from more groups.",
        "Plasma and platelet compatibility rules can differ—clinicians decide.",
        "Use RaktaSewa’s blood group page as a quick public reference, not a substitute for medical advice.",
      ],
      ne: [
        "O नेगेटिभ प्रायः आपतकालीन युनिभर्सल डोनर रातो कोषिकाका रूपमा प्रयोग हुन्छ।",
        "AB पोजिटिभले सामान्यतया धेरै समूहबाट रातो कोषिका लिन सक्छ।",
        "प्लाज्मा र प्लेटलेट नियम फरक हुन सक्छ—चिकित्सकले निर्णय गर्छन्।",
        "रक्तसेवाको रगत समूह पृष्ठ द्रुत सन्दर्भ हो, चिकित्सा सल्लाहको विकल्प होइन।",
      ],
    },
  },
  {
    slug: "emergency-blood-requests",
    image: "/images/hospital-care.jpg",
    category: { en: "Emergency", ne: "आपतकाल" },
    readingMinutes: 5,
    author: "RaktaSewa Editorial",
    date: "2026-01-14",
    title: { en: "How Emergency Blood Requests Work", ne: "आपतकालीन रक्त अनुरोध कसरी काम गर्छ" },
    summary: {
      en: "Clear hospital details, blood group, and urgency help volunteers respond effectively.",
      ne: "स्पष्ट अस्पताल विवरण, रगत समूह र जरुरी अवस्थाले स्वयंसेवीलाई प्रभावकारी प्रतिक्रिया दिन मद्दत गर्छ।",
    },
    body: {
      en: [
        "Start clinical care at a hospital immediately—platforms support, they do not replace emergency rooms.",
        "Provide accurate blood group, units needed, and contact persons.",
        "Coordinate respectfully with donors; follow hospital instructions.",
        "Update request status when settled so the network stays accurate.",
      ],
      ne: [
        "तुरुन्त अस्पतालबाट क्लिनिकल हेरचाह सुरु गर्नुहोस्—प्लेटफर्म सहयोग हो, आपतकालीन कक्षको विकल्प होइन।",
        "सही रगत समूह, आवश्यक एकाइ र सम्पर्क व्यक्ति दिनुहोस्।",
        "रक्तदातासँग सम्मानपूर्वक समन्वय गर्नुहोस्; अस्पतालको निर्देशन पालना गर्नुहोस्।",
        "सफल भएपछि अनुरोध स्थिति अद्यावधिक गर्नुहोस् ताकि नेटवर्क सही रहोस्।",
      ],
    },
  },
  {
    slug: "how-hospitals-benefit",
    image: "/images/nepal-community.jpg",
    category: { en: "Hospitals", ne: "अस्पताल" },
    readingMinutes: 4,
    author: "RaktaSewa Editorial",
    date: "2026-01-22",
    title: { en: "How Hospitals Benefit from RaktaSewa", ne: "अस्पतालले रक्तसेवाबाट कसरी लाभ लिन्छन्" },
    summary: {
      en: "A volunteer connection layer complements blood bank inventory during surge demand.",
      ne: "माग बढ्दा स्वयंसेवी जडान तहले रक्त बैंक भण्डारलाई पूरक बनाउँछ।",
    },
    body: {
      en: [
        "Hospitals can mobilize additional voluntary donors when stocks are low.",
        "Clear digital requests reduce scattered phone-chain confusion.",
        "Partners and community organizers can amplify urgent needs responsibly.",
        "Clinical protocols and testing remain under hospital authority.",
      ],
      ne: [
        "भण्डार कम हुँदा अस्पतालले थप स्वयंसेवी रक्तदाता जुटाउन सक्छन्।",
        "स्पष्ट डिजिटल अनुरोधले छरिएको फोन चेन अन्योल घटाउँछ।",
        "साझेदार र समुदाय संयोजकले जरुरी आवश्यकता जिम्मेवारीपूर्वक फैलाउन सक्छन्।",
        "क्लिनिकल प्रोटोकल र परीक्षण अस्पतालको अधिकारमा रहन्छ।",
      ],
    },
  },
  {
    slug: "who-can-donate-blood",
    image: "/images/nepal-prayer-flags.jpg",
    category: { en: "Eligibility", ne: "योग्यता" },
    readingMinutes: 6,
    author: "RaktaSewa Editorial",
    date: "2026-02-02",
    title: { en: "Who Can Donate Blood?", ne: "कसले रक्तदान गर्न सक्छ?" },
    summary: {
      en: "Eligibility depends on age, weight, hemoglobin, recent illness, travel, and medications.",
      ne: "योग्यता उमेर, तौल, हिमोग्लोबिन, हालसालैको बिमारी, यात्रा र औषधिमा निर्भर गर्छ।",
    },
    body: {
      en: [
        "Screening protects both donor and recipient.",
        "Temporary deferrals are common and do not mean you can never donate.",
        "Ask the collecting facility for the latest national guidelines.",
        "If unsure, register on RaktaSewa and complete medical screening when called.",
      ],
      ne: [
        "जाँचले रक्तदाता र प्राप्तकर्ता दुवैलाई सुरक्षित राख्छ।",
        "अस्थायी स्थगन सामान्य हो—कहिल्यै दान गर्न नसकिने भन्ने होइन।",
        "नवीनतम राष्ट्रिय दिशानिर्देशका लागि सङ्कलन स्थलसँग सोध्नुहोस्।",
        "अनिश्चय भए रक्तसेवामा दर्ता गरी बोलाउँदा चिकित्सा जाँच पूरा गर्नुहोस्।",
      ],
    },
  },
  {
    slug: "blood-donation-safety",
    image: "/images/nepal-village.jpg",
    category: { en: "Safety", ne: "सुरक्षा" },
    readingMinutes: 5,
    author: "RaktaSewa Editorial",
    date: "2026-02-11",
    title: { en: "Blood Donation Safety Essentials", ne: "रक्तदान सुरक्षाका आधारहरू" },
    summary: {
      en: "Sterile equipment, trained staff, and screening are non-negotiable.",
      ne: "बाँझो उपकरण, तालिमप्राप्त कर्मचारी र जाँच अपरिहार्य छन्।",
    },
    body: {
      en: [
        "Donate only at recognized hospitals, blood centers, or organized camps with medical oversight.",
        "RaktaSewa connects people; clinical collection standards belong to licensed providers.",
        "Report unusual symptoms after donation to medical staff.",
        "Never pay or sell blood units through informal channels.",
      ],
      ne: [
        "मान्य अस्पताल, रक्त केन्द्र वा चिकित्सा निगरानी भएका शिविरमा मात्र दान गर्नुहोस्।",
        "रक्तसेवाले मानिस जोड्छ; क्लिनिकल सङ्कलन मापदण्ड इजाजतपत्र प्राप्त प्रदायकको हो।",
        "दानपछि असामान्य लक्षण भए चिकित्सा कर्मचारीलाई बताउनुहोस्।",
        "अनौपचारिक बाटोबाट रगत किन्ने/बेच्ने नगर्नुहोस्।",
      ],
    },
  },
  {
    slug: "benefits-of-regular-donation",
    image: "/images/nepal-valley.jpg",
    category: { en: "Lifestyle", ne: "जीवनशैली" },
    readingMinutes: 4,
    author: "RaktaSewa Editorial",
    date: "2026-02-20",
    title: { en: "Benefits of Regular Donation", ne: "नियमित दानका लाभ" },
    summary: {
      en: "Regular donors create predictable community capacity for emergencies.",
      ne: "नियमित रक्तदाताले आपतकालका लागि अनुमानयोग्य समुदाय क्षमता बनाउँछन्।",
    },
    body: {
      en: [
        "Habitual voluntary donation builds a reliable network.",
        "Health checkups during screening can flag issues early.",
        "Many donors describe a strong sense of purpose and community belonging.",
        "Follow interval guidelines between donations for recovery.",
      ],
      ne: [
        "नियमित स्वयंसेवी दानले भरपर्दो नेटवर्क बनाउँछ।",
        "जाँचका बेला स्वास्थ्य परीक्षणले समस्या चाँडै देखाउन सक्छ।",
        "धेरै रक्तदाताले उद्देश्य र समुदाय अपनत्व महसुस गर्छन्।",
        "निको हुन दानबीचको अन्तराल पालना गर्नुहोस्।",
      ],
    },
  },
  {
    slug: "understanding-blood-types",
    image: "/images/nepal-trek.jpg",
    category: { en: "Education", ne: "शिक्षा" },
    readingMinutes: 6,
    author: "RaktaSewa Editorial",
    date: "2026-03-01",
    title: { en: "Understanding Blood Types", ne: "रगत प्रकार बुझ्ने" },
    summary: {
      en: "Know your group, keep it recorded, and share it accurately during emergencies.",
      ne: "आफ्नो समूह जान्नुहोस्, रेकर्ड राख्नुहोस् र आपतकालमा सही बताउनुहोस्।",
    },
    body: {
      en: [
        "Ask a lab or hospital to confirm your blood type if you are unsure.",
        "Store the result digitally and with family members.",
        "Accurate type information speeds matching on RaktaSewa.",
        "Do not guess your type in a critical request.",
      ],
      ne: [
        "अनिश्चय भए प्रयोगशाला वा अस्पतालबाट रगत प्रकार पुष्टि गर्नुहोस्।",
        "नतिजा डिजिटल रूपमा र परिवारसँग राख्नुहोस्।",
        "सही प्रकार जानकारीले रक्तसेवामा मिलान छिटो बनाउँछ।",
        "गम्भीर अनुरोधमा अनुमान नगर्नुहोस्।",
      ],
    },
  },
  {
    slug: "organizing-blood-donation-camps",
    image: "/images/nepal-sunset.jpg",
    category: { en: "Community", ne: "समुदाय" },
    readingMinutes: 7,
    author: "RaktaSewa Editorial",
    date: "2026-03-10",
    title: { en: "Organizing Blood Donation Camps", ne: "रक्तदान शिविर आयोजना" },
    summary: {
      en: "Successful camps need medical partners, logistics, counseling, and clear follow-up.",
      ne: "सफल शिविरका लागि चिकित्सा साझेदार, व्यवस्थापन, परामर्श र स्पष्ट फलोअप चाहिन्छ।",
    },
    body: {
      en: [
        "Partner with licensed blood services or hospitals from day one.",
        "Plan crowd flow, refreshments, resting space, and emergency readiness.",
        "Educate attendees about eligibility to reduce deferrals on site.",
        "Invite donors to join RaktaSewa so the community stays connected after the camp.",
      ],
      ne: [
        "पहिलो दिनदेखि इजाजतपत्र प्राप्त रक्त सेवा वा अस्पतालसँग साझेदारी गर्नुहोस्।",
        "भीड व्यवस्थापन, खाजा, आराम ठाउँ र आपतकालीन तयारी योजना बनाउनुहोस्।",
        "स्थलगत स्थगन घटाउन योग्यताबारे सहभागीलाई शिक्षित गर्नुहोस्।",
        "शिविरपछि पनि जोडिएर रहन रक्तदातालाई रक्तसेवामा आउन आमन्त्रण गर्नुहोस्।",
      ],
    },
  },
];

export function getBlogBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
