import type { Module } from './types';

export const advancedModules: Module[] = [
  {
    id: 'source-code-investigation',
    title: 'חקירת קוד מקור (Source Code Investigation)',
    titleEn: 'Source Code Investigation',
    unit: 'נושאים מתקדמים',
    unitId: 'advanced',
    icon: 'FileCode',
    difficulty: 'advanced',
    duration: '75 דקות',
    description: 'קריאת קוד מקור של אתרים, חיפוש מפתחות API חשופים, וגילוי Endpoints נסתרים.',
    objectives: [
      'לדעת לקרוא ולנתח קוד מקור HTML/JavaScript של אתרים',
      'להכיר טכניקות לגילוי API Endpoints ומפתחות חשופים',
      'ללמוד להשתמש ב-GitHub Code Search למציאת מידע רגיש',
      'להבין איך DevTools חושפים את "הקרביים" של כל אתר',
    ],
    theory: `כל אתר אינטרנט בנוי מקוד — HTML למבנה, CSS לעיצוב, JavaScript ללוגיקה. כשאתם לוחצים "View Source" (Ctrl+U) או פותחים DevTools (F12), אתם רואים הכל. ולפעמים, "הכל" כולל מידע שלא היה אמור להיות שם.

מפתחי תוכנה טועים: משאירים API Keys בקוד, כותבים הערות עם סיסמאות, או חושפים Endpoints פנימיים. GitHub הוא מכרה זהב — חיפוש "password" או "api_key" בקוד ציבורי מחזיר אלפי תוצאות של מפתחות חשופים.

Tab ה-Network ב-DevTools מראה כל בקשה שהדפדפן שולח — כולל API Calls עם פרמטרים, Headers, ותשובות. חוקר OSINT שיודע לקרוא את הנתונים האלה יכול להבין את המבנה הפנימי של כל אפליקציית ווב.

כלים כמו Postman מאפשרים לשלוח בקשות API ישירות — בלי להשתמש בממשק של האתר. ככה אפשר לגשת לנתונים שהממשק לא מציג, או לבדוק אילו Endpoints קיימים.`,
    toolbox: [
      { name: 'Browser DevTools', description: 'כלי הפיתוח המובנים — View Source, Network tab, Console' },
      { name: 'GitHub Code Search', url: 'https://github.com/search', description: 'חיפוש בקוד ציבורי ב-GitHub — מוצא מפתחות, סיסמאות, ומידע רגיש' },
      { name: 'Postman', url: 'https://www.postman.com', description: 'כלי לשליחת בקשות API — בודק Endpoints ומנתח תשובות' },
      { name: 'URLScan.io', url: 'https://urlscan.io', description: 'סריקה מרחוק של אתרים — רואים מה האתר טוען ולאן הוא פונה' },
    ],
    mission: {
      title: 'משימה: מה מסתתר בקוד?',
      scenario: 'גלשו לאתר תרגול ומצאו מידע נסתר בקוד המקור — הערות מפתחים, API Endpoints, ומפתחות.',
      steps: [
        'פתחו אתר לבחירתכם ולחצו Ctrl+U (View Source). חפשו הערות HTML (<!-- -->).',
        'פתחו DevTools → Network tab. רעננו את הדף. אילו API Calls נשלחים?',
        'חפשו ב-GitHub: "site:github.com [שם החברה] api_key" — מה מופיע?',
        'השתמשו ב-URLScan.io לסריקת האתר — אילו דומיינים חיצוניים הוא פונה אליהם?',
        'תעדו את כל הממצאים: מה היה אמור להיות נסתר ומה חשוף?',
      ],
      hint: 'ב-DevTools, סננו את ה-Network tab ל-XHR/Fetch — אלו הבקשות המעניינות ביותר שמכילות נתונים.',
    },
    proTip: 'השתמשו ב-JavaScript Console כדי לחקור אובייקטים: הקלידו "window" ופתחו את העץ — תראו משתנים גלובליים שלפעמים מכילים מידע רגיש כמו tokens או הגדרות.',
    ethicsNote: 'קריאת קוד מקור ציבורי היא חוקית. אבל שימוש ב-API Keys שמצאתם כדי לגשת למערכות — זו פריצה. אם מצאתם מפתחות חשופים, דווחו לבעלים (Responsible Disclosure).',
  },
  {
    id: 'unshortening-links',
    title: 'פריסת קישורים מקוצרים (Unshortening Links)',
    titleEn: 'Unshortening Links',
    unit: 'נושאים מתקדמים',
    unitId: 'advanced',
    icon: 'ExternalLink',
    difficulty: 'beginner',
    duration: '30 דקות',
    description: 'קישורים מקוצרים מסתירים את היעד האמיתי — למדו לחשוף לאן הם באמת מובילים.',
    objectives: [
      'להבין איך שירותי קיצור URL עובדים (bit.ly, tinyurl)',
      'לדעת לחשוף את היעד האמיתי בלי ללחוץ על הקישור',
      'לזהות קישורים מקוצרים חשודים שמובילים לאתרי פישינג',
      'להבין מה Tracking Parameters חושפים על השולח',
    ],
    theory: `שירותי קיצור URL (כמו bit.ly, tinyurl, t.co) הופכים כתובת ארוכה לקצרה. זה נוח — אבל גם מסתיר את היעד האמיתי. תוקפים משתמשים בקישורים מקוצרים כדי להסתיר לינקים לאתרי פישינג, נוזקות, ודפי הונאה.

לחשוף את היעד בלי ללחוץ: כלים כמו CheckShortURL ו-Unshorten.it מרחיבים את הקישור ומראים לאן הוא מוביל — כולל כל שרשרת ההפניות (Redirect Chain). לפעמים הקישור עובר דרך 3-4 שרתים לפני שמגיע ליעד.

Tracking Parameters: הרבה קישורים מקוצרים מכילים פרמטרי מעקב (UTM). למשל: ?utm_source=email&utm_campaign=phishing. הפרמטרים האלה חושפים מאיפה הקישור נשלח, באיזה קמפיין, ולפעמים מי השולח.`,
    toolbox: [
      { name: 'CheckShortURL', url: 'https://checkshorturl.com', description: 'מרחיב קישורים מקוצרים ומראה את היעד האמיתי + צילום מסך' },
      { name: 'Unshorten.it', url: 'https://unshorten.it', description: 'חושף את שרשרת ההפניות המלאה של קישור מקוצר' },
      { name: 'VirusTotal', url: 'https://www.virustotal.com', description: 'בודק URLs מול עשרות מנועי אבטחה — מזהה קישורים זדוניים' },
    ],
    mission: {
      title: 'משימה: לאן הקישור באמת מוביל?',
      scenario: 'קיבלתם 5 קישורים מקוצרים. עליכם לחשוף את היעד האמיתי של כל אחד ולהחליט אם הוא בטוח.',
      steps: [
        'קחו כל קישור מקוצר והעתיקו אותו ל-CheckShortURL.',
        'בדקו את שרשרת ההפניות — כמה "קפיצות" הקישור עושה?',
        'זהו פרמטרי מעקב (UTM) — מה הם חושפים?',
        'בדקו את היעד הסופי ב-VirusTotal — האם הוא בטוח?',
        'כתבו המלצה: "בטוח / חשוד / מסוכן" לכל קישור ונמקו.',
      ],
      hint: 'ב-bit.ly, הוסיפו "+" בסוף הקישור (bit.ly/xyz+) כדי לראות סטטיסטיקות — כמה לחצו, מאיפה, מתי.',
    },
    proTip: 'שירותי bit.ly חושפים סטטיסטיקות בהוספת "+" לקישור. זה מראה כמה אנשים לחצו, מאילו מדינות, ובאילו שעות. מידע מצוין לחקירה!',
    ethicsNote: 'בדיקת קישורים מקוצרים היא פעולה הגנתית חיונית. אל תיצרו קישורים מקוצרים שמטעים אנשים — זו הנדסה חברתית שגובלת בהונאה.',
  },
  {
    id: 'header-analysis',
    title: 'ניתוח כותרות (Header Analysis)',
    titleEn: 'Header Analysis',
    unit: 'נושאים מתקדמים',
    unitId: 'advanced',
    icon: 'FileText',
    difficulty: 'intermediate',
    duration: '60 דקות',
    description: 'HTTP Headers ו-Email Headers — מטא-דאטה שחושפת את האמת מאחורי כל הודעה ובקשה.',
    objectives: [
      'להבין מהם HTTP Headers ומה הם חושפים על שרתים',
      'לדעת לקרוא ולנתח Email Headers לגילוי מקור ההודעה',
      'להכיר כלים לניתוח Headers אוטומטי',
      'ללמוד לזהות מיילים מזויפים (Spoofed) דרך Headers',
    ],
    theory: `כל בקשת HTTP מלווה ב-Headers — מטא-דאטה שמתאר את הבקשה ואת התגובה. Response Headers חושפים: סוג שרת (Apache, Nginx, IIS), טכנולוגיות (PHP, ASP.NET), הגדרות אבטחה (CORS, CSP), וזמנים.

Email Headers הם עוד יותר מעניינים. כל מייל מכיל Headers נסתרים שמתעדים את כל המסלול שלו: מאיזה שרת נשלח, דרך אילו שרתים עבר, מהי כתובת ה-IP של השולח האמיתי, האם המייל עבר בדיקות SPF/DKIM/DMARC.

זיהוי מיילים מזויפים: ב-Email Spoofing, התוקף מזייף את שדה ה-"From". אבל ה-Headers חושפים את האמת — כתובת ה-IP של השולח האמיתי (שדה "Received"), תוצאות SPF (האם השרת מורשה לשלוח בשם הדומיין), ו-DKIM (חתימה דיגיטלית).`,
    toolbox: [
      { name: 'MXToolbox Header Analyzer', url: 'https://mxtoolbox.com/EmailHeaders.aspx', description: 'מנתח Email Headers — חושף מסלול, IP, ותוצאות אימות' },
      { name: 'Google Admin Toolbox', url: 'https://toolbox.googleapps.com/apps/messageheader/', description: 'כלי של Google לניתוח Email Headers' },
      { name: 'SecurityTrails', url: 'https://securitytrails.com', description: 'ניתוח DNS ו-HTTP Headers של אתרים' },
    ],
    mission: {
      title: 'משימה: מי באמת שלח את המייל?',
      scenario: 'קיבלתם מייל חשוד שנראה כמו הודעה רשמית מבנק. נתחו את ה-Headers כדי לגלות אם הוא אמיתי.',
      steps: [
        'פתחו את ה-Headers המלאים של מייל (ב-Gmail: שלוש נקודות → Show original).',
        'העתיקו את ה-Headers ל-MXToolbox Header Analyzer.',
        'מצאו את שדה "Received" — מאיזה IP המייל באמת נשלח?',
        'בדקו את תוצאות SPF, DKIM, DMARC — האם עברו?',
        'סכמו: האם המייל אותנטי או מזויף? מה הראיות?',
      ],
      hint: 'ה-"Received" התחתון ביותר (הראשון כרונולוגית) מכיל את כתובת ה-IP של השולח המקורי.',
    },
    proTip: 'כשאתם חוקרים אתר, השתמשו ב-curl -I (רק Headers) כדי לראות את Response Headers בלי להוריד את כל הדף. זה מהיר ולא משאיר עקבות בלוגים של האתר.',
    ethicsNote: 'ניתוח Headers של מיילים שקיבלתם הוא חוקי ומומלץ. אבל גישה ל-Headers של מיילים של אנשים אחרים — דורשת הרשאה. אל תגשו לתיבות מייל שלא שלכם.',
  },
  {
    id: 'content-code-analysis',
    title: 'ניתוח תוכן וקוד (Under the Hood)',
    titleEn: 'Content & Code Analysis',
    unit: 'נושאים מתקדמים',
    unitId: 'advanced',
    icon: 'Code2',
    difficulty: 'advanced',
    duration: '75 דקות',
    description: 'JavaScript מעמיק, Trackers נסתרים, ואלמנטים חבויים — מה באמת רץ מאחורי כל אתר.',
    objectives: [
      'לנתח JavaScript של אתר ולהבין את ההתנהגות שלו',
      'לזהות Trackers וסקריפטים של צד שלישי',
      'ללמוד לגלות אלמנטים חבויים ב-DOM',
      'להשתמש בכלי ניתוח טכנולוגיות לפרופיילינג אתרים',
    ],
    theory: `כל אתר מודרני טוען עשרות סקריפטים של צד שלישי: Google Analytics למעקב, Facebook Pixel לפרסום, Hotjar להקלטת סשנים, ועוד. כלי כמו Wappalyzer ו-BuiltWith חושפים את כל הטכנולוגיות שאתר משתמש בהן.

ניתוח DOM (Document Object Model) חושף אלמנטים נסתרים: שדות טופס מוסתרים (hidden inputs), הערות מפתחים, ואלמנטים עם display:none שמכילים מידע שלא אמור להיות גלוי.

URLScan.io מבצע סריקה מרחוק: מראה את כל המשאבים שהאתר טוען, את כל הדומיינים שהוא פונה אליהם, צילום מסך, ו-DOM מלא. מעולה לחקירת אתרים חשודים בלי לגלוש אליהם.`,
    toolbox: [
      { name: 'Wappalyzer', url: 'https://www.wappalyzer.com', description: 'תוסף שמזהה את כל הטכנולוגיות של כל אתר' },
      { name: 'BuiltWith', url: 'https://builtwith.com', description: 'פרופיל טכנולוגי מקיף של אתרים — כולל היסטוריה' },
      { name: 'URLScan.io', url: 'https://urlscan.io', description: 'סריקה מרחוק — רואים מה האתר טוען בלי לגשת אליו' },
      { name: 'Blacklight (Markup)', url: 'https://themarkup.org/blacklight', description: 'כלי פרטיות שחושף Trackers ו-Cookies של כל אתר' },
    ],
    mission: {
      title: 'משימה: חשיפת Trackers',
      scenario: 'בדקו 5 אתרים פופולריים וגלו כמה Trackers של צד שלישי כל אחד טוען.',
      steps: [
        'התקינו את Wappalyzer וגלשו ל-5 אתרים מובילים. רשמו את הטכנולוגיות.',
        'בדקו כל אתר ב-Blacklight — כמה Trackers נמצאו?',
        'סרקו אתר אחד ב-URLScan.io — לאילו דומיינים חיצוניים הוא פונה?',
        'פתחו DevTools → Network ובדקו: אילו בקשות הן של צד שלישי?',
        'דרגו את 5 האתרים מהכי "פרטי" לפחות. מי עוקב הכי הרבה?',
      ],
      hint: 'ב-DevTools Network tab, סננו לפי "Third-party" כדי לראות רק בקשות לדומיינים חיצוניים.',
    },
    proTip: 'השתמשו ב-Google Tag Assistant (תוסף Chrome) כדי לראות את כל ה-Google Tags באתר — Analytics, Ads, Tag Manager. ה-Google Analytics Property ID (UA-XXXXXX) מקשר בין אתרים של אותו בעלים.',
    ethicsNote: 'ניתוח טכנולוגי של אתרים ציבוריים הוא חוקי. אבל שימוש במידע טכנולוגי כדי לתקוף אתר (ניצול חולשות) הוא פלילי. חוקר OSINT מנתח — לא תוקף.',
  },
  {
    id: 'hightech-intro',
    title: 'מבוא לתעשיית ההייטק',
    titleEn: 'Introduction to the High-Tech Industry',
    unit: 'נושאים מתקדמים',
    unitId: 'advanced',
    icon: 'Rocket',
    difficulty: 'beginner',
    duration: '45 דקות',
    description: 'אקוסיסטם ההייטק הישראלי והעולמי — סטארטאפים, השקעות, ו-OSINT בתעשייה.',
    objectives: [
      'להכיר את אקוסיסטם ההייטק הישראלי (Startup Nation)',
      'להבין מושגי יסוד: סטארטאפ, VC, סבבי גיוס, Exit',
      'ללמוד לחקור חברות טכנולוגיה באמצעות מאגרים ציבוריים',
      'להבין את הרלוונטיות של OSINT בתעשיית ההייטק',
    ],
    theory: `ישראל נקראת "אומת הסטארטאפ" — עם כ-7,000 חברות טכנולוגיה פעילות, היא אחת המובילות בעולם ביחס לגודל האוכלוסייה. הבנת המערכת האקולוגית הזו חשובה לחוקר OSINT כי הרבה חקירות עסקיות מערבות חברות הייטק.

מושגי יסוד: סטארטאפ — חברה צעירה שמפתחת מוצר חדשני. VC (Venture Capital) — קרן השקעות שמשקיעה בסטארטאפים. סבבי גיוס (Seed, A, B, C) — שלבי המימון. Exit — מכירת החברה (M&A) או הנפקה (IPO).

מאגרי מידע על הייטק: Crunchbase מכיל מידע על מיליוני חברות — גיוסים, מייסדים, משקיעים. PitchBook מעמיק יותר (בתשלום). Start-Up Nation Central (בישראל) ממפה את כל אקוסיסטם ההייטק הישראלי.`,
    toolbox: [
      { name: 'Crunchbase', url: 'https://www.crunchbase.com', description: 'מאגר חברות טכנולוגיה — גיוסים, מייסדים, משקיעים' },
      { name: 'Start-Up Nation Finder', url: 'https://finder.startupnationcentral.org', description: 'מאגר סטארטאפים ישראלי מקיף' },
      { name: 'PitchBook', url: 'https://pitchbook.com', description: 'מאגר השקעות ו-M&A מקיף (חלקית בתשלום)' },
      { name: 'LinkedIn', url: 'https://linkedin.com', description: 'הרשת המקצועית — מיפוי עובדים, קשרים, ותפקידים' },
    ],
    mission: {
      title: 'משימה: חקירת סטארטאפ',
      scenario: 'חקרו סטארטאפ ישראלי ובנו פרופיל מלא — מייסדים, משקיעים, טכנולוגיה, ומתחרים.',
      steps: [
        'בחרו סטארטאפ ישראלי ב-Start-Up Nation Finder.',
        'חפשו ב-Crunchbase — כמה גייסו? מי המשקיעים? מי המייסדים?',
        'מצאו את המייסדים ב-LinkedIn — מה הרקע שלהם?',
        'זהו 3 מתחרים ישירים (חפשו את התחום ב-Crunchbase).',
        'בנו "One Pager" — סיכום של עמוד אחד על החברה.',
      ],
      hint: 'ב-Crunchbase, לחצו על שם המשקיע כדי לראות את כל ההשקעות שלו — ככה תגלו חברות קשורות.',
    },
    proTip: 'עקבו אחרי הערכות שווי (Valuations) של חברות לאורך סבבי הגיוס. ירידה בהערכה בין סבבים (Down Round) יכולה להעיד על בעיות — וזה מידע OSINT שימושי לחקירות עסקיות.',
    ethicsNote: 'מידע על חברות ציבוריות הוא פתוח. אבל מידע על חברות פרטיות מוגן יותר. אל תנסו להשיג מידע סודי (סודות מסחריים, קוד מקור, לקוחות) — זו ריגול תעשייתי.',
  },
  {
    id: 'osint-career',
    title: 'OSINT בשוק העבודה — בניית קריירה',
    titleEn: 'OSINT in the Job Market',
    unit: 'נושאים מתקדמים',
    unitId: 'advanced',
    icon: 'Briefcase',
    difficulty: 'beginner',
    duration: '45 דקות',
    description: 'מהקורס לקריירה — איך לבנות פרופיל מקצועי, פורטפוליו, ולהתחיל לעבוד בתחום.',
    objectives: [
      'להבין את מסלולי הקריירה ב-OSINT',
      'ללמוד לבנות פורטפוליו מקצועי',
      'להכיר הסמכות רלוונטיות (GOSI, SEC+)',
      'לדעת איך להתחיל לצבור ניסיון מעשי',
    ],
    theory: `קריירה ב-OSINT מתחילה בלבנות בסיס ידע ולהוכיח אותו. מעסיקים רוצים לראות יכולת מעשית — לא רק תעודות. הדרך הטובה ביותר: בנו פורטפוליו שמציג חקירות שביצעתם (על נושאים ציבוריים, כמובן).

כתבו Write-ups: כל אתגר CTF שפתרתם, כל חקירה שביצעתם — תעדו את התהליך. פרסמו בבלוג, ב-Medium, או ב-GitHub. מעסיקים בודקים את זה.

הסמכות שכדאי לשקול: GOSI (GIAC Open Source Intelligence) — ההסמכה המובילה. SEC+ — בסיס טוב לסייבר. OSCP — אם רוצים לשלב OSINT עם Penetration Testing.

צברו ניסיון: Trace Labs מארגנים CTF לחיפוש נעדרים — ניסיון אמיתי עם השפעה חברתית. OSINT quizzes ב-Twitter/X שיפרו מיומנויות. התנדבות בארגוני חקירות (Bellingcat, OCCRP) פותחת דלתות.`,
    toolbox: [
      { name: 'Trace Labs CTF', url: 'https://www.tracelabs.org', description: 'תחרויות OSINT לחיפוש נעדרים — ניסיון אמיתי' },
      { name: 'SANS GOSI', url: 'https://www.giac.org/certifications/open-source-intelligence-gosi/', description: 'הסמכת OSINT מובילה מ-SANS/GIAC' },
      { name: 'Medium', url: 'https://medium.com', description: 'פלטפורמת בלוגים — מקום מעולה לפרסם Write-ups' },
    ],
    mission: {
      title: 'משימה: בניית פורטפוליו',
      scenario: 'צרו את הבסיס לפורטפוליו OSINT מקצועי שיעזור לכם למצוא עבודה.',
      steps: [
        'כתבו Write-up של משימה אחת מהקורס — תעדו כל שלב.',
        'צרו פרופיל GitHub ופרסמו את ה-Write-up שם.',
        'צרו/עדכנו פרופיל LinkedIn עם כישורי OSINT.',
        'הירשמו לאירוע Trace Labs הבא.',
      ],
      hint: 'ב-Write-up, הדגישו את תהליך החשיבה — לא רק את התוצאה. מעסיקים רוצים לראות איך אתם חושבים.',
    },
    proTip: 'בנו "נוכחות מקצועית" עקבית: פרסמו תוכן OSINT אחת לשבוע, ענו על שאלות בקהילות, והשתתפו ב-CTFs. תוך חצי שנה, תהיו מוכרים בקהילה.',
    ethicsNote: 'בפורטפוליו, לעולם אל תפרסמו מידע אישי של אנשים אמיתיים. השתמשו בתרחישים פיקטיביים או בנושאים ציבוריים. פורטפוליו שפוגע בפרטיות יפגע בקריירה שלכם.',
  },
  {
    id: 'linkedin-workshop',
    title: 'סדנת LinkedIn',
    titleEn: 'LinkedIn Workshop',
    unit: 'נושאים מתקדמים',
    unitId: 'advanced',
    icon: 'Linkedin',
    difficulty: 'beginner',
    duration: '60 דקות',
    description: 'LinkedIn כפלטפורמה מקצועית וככלי OSINT — אופטימיזציה של הפרופיל ומחקר ארגוני.',
    objectives: [
      'לדעת לבנות פרופיל LinkedIn מקצועי ומשכנע',
      'להכיר טכניקות OSINT ב-LinkedIn — חיפוש מתקדם ומיפוי ארגונים',
      'להבין את האלגוריתם של LinkedIn ואיך לנצל אותו',
      'ללמוד ליצור רשת קשרים מקצועית (Networking) אפקטיבית',
    ],
    theory: `LinkedIn הוא כלי OSINT עוצמתי וגם פלטפורמת קריירה חיונית. מצד אחד, אתם בונים נוכחות מקצועית. מצד שני, אתם משתמשים בו לחקירות — מיפוי ארגונים, זיהוי עובדים, הבנת מבנה חברות.

חיפוש מתקדם ב-LinkedIn: השתמשו בפילטרים (מיקום, חברה, תפקיד, בית ספר) כדי למצוא אנשים ספציפיים. Google Dork "site:linkedin.com/in/ [חברה] [תפקיד]" עוקף את מגבלות החיפוש של LinkedIn.

לבניית פרופיל מקצועי: כותרת ברורה ("OSINT Analyst | Cyber Intelligence Researcher"), סיכום שמספר סיפור, ניסיון רלוונטי (כולל פרויקטים אישיים ו-CTFs), וכישורים מתויגים (OSINT, Intelligence Analysis, Threat Intelligence).`,
    toolbox: [
      { name: 'LinkedIn', url: 'https://linkedin.com', description: 'הפלטפורמה עצמה — בניית פרופיל וחיפוש' },
      { name: 'LinkedIn Sales Navigator', url: 'https://business.linkedin.com/sales-solutions', description: 'גרסה מתקדמת עם חיפוש מורחב (ניסיון חינמי)' },
      { name: 'LinkedIn X-Ray Search', description: 'Google Dork: site:linkedin.com/in/ — חיפוש חיצוני ללא מגבלות' },
    ],
    mission: {
      title: 'משימה: מיפוי ארגון דרך LinkedIn',
      scenario: 'השתמשו ב-LinkedIn כדי למפות את מבנה הצוות של חברת טכנולוגיה.',
      steps: [
        'בחרו חברת טכנולוגיה ישראלית וחפשו אותה ב-LinkedIn.',
        'מצאו את עמוד החברה — כמה עובדים? איפה הם?',
        'מפו את ההנהלה: CEO, CTO, VP\'s — מי הם ומאיפה הגיעו?',
        'השתמשו ב-X-Ray Search (site:linkedin.com) למציאת עובדים ספציפיים.',
        'בנו תרשים ארגוני בסיסי מהממצאים.',
      ],
      hint: 'בדקו את הקשרים בין עובדים לבין חברות קודמות — לפעמים תגלו שצוותים שלמים עברו מחברה אחת לאחרת.',
    },
    proTip: 'כשאתם מחפשים ב-LinkedIn לצורכי OSINT, השתמשו בחשבון חקירתי — לא בחשבון האישי. LinkedIn מודיע לאנשים מי צפה בפרופיל שלהם!',
    ethicsNote: 'LinkedIn הוא כלי OSINT לגיטימי — המידע שם ציבורי מרצון. אבל: אל תיצרו פרופילים מזויפים כדי להתחבר לאנשים, אל תשלחו הודעות מטעות, ואל תאספו מידע אישי בצורה שיטתית ללא הצדקה.',
  },
];
