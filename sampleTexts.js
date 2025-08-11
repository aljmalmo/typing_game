// sampleTexts.js - بيانات النصوص والمستويات

const sampleTexts = {
    // نصوص للتدريب الحر
    practice: {
        arabic: [
            "الكتابة مهارة مهمة للجميع.",
            "التدريب المستمر يحسن السرعة والدقة.",
            "اقرأ النص بعناية قبل أن تبدأ.",
            "السرعة بدون دقة ليست مفيدة.",
            "حافظ على تركيزك أثناء الكتابة.",
            "التعلم رحلة ممتعة ومفيدة.",
            "الصبر والمثابرة مفتاح النجاح.",
            "كل حرف تكتبه يقربك من الإتقان.",
            "الممارسة اليومية تصنع الفرق.",
            "تعلم شيئًا جديدًا كل يوم."
        ],
        english: [
            "The quick brown fox jumps over the lazy dog.",
            "Typing is a useful skill for everyone.",
            "Practice makes perfect in typing.",
            "Speed and accuracy are both important.",
            "Keep your eyes on the screen while typing.",
            "Learning is a wonderful journey.",
            "Patience and persistence are key to success.",
            "Every letter you type brings you closer to mastery.",
            "Daily practice makes the difference.",
            "Learn something new every day."
        ]
    },
    
    // المستويات التدريجية (20 مستوى)
    levels: [
        // المرحلة الأولى: الأساسيات (المستويات 1-5)
        {
            level: 1,
            language: "arabic",
            title: "الحروف الأساسية",
            text: "أ ب ت ث ج ح خ د ذ ر",
            difficulty: "مبتدئ",
            description: "تعلم الحروف العربية الأساسية"
        },
        {
            level: 2,
            language: "english",
            title: "Basic Letters",
            text: "a s d f g h j k l",
            difficulty: "Beginner",
            description: "Learn basic English letters"
        },
        {
            level: 3,
            language: "arabic",
            title: "كلمات بسيطة",
            text: "باب دار قلم كتاب شمس قمر",
            difficulty: "مبتدئ",
            description: "كلمات عربية بسيطة"
        },
        {
            level: 4,
            language: "english",
            title: "Simple Words",
            text: "cat dog sun pen book moon star",
            difficulty: "Beginner",
            description: "Simple English words"
        },
        {
            level: 5,
            language: "mixed",
            title: "كلمات مختلطة - Mixed Words",
            text: "بيت house شجرة tree ماء water نار fire",
            difficulty: "مبتدئ - Beginner",
            description: "مزيج من الكلمات العربية والإنجليزية"
        },
        
        // المرحلة الثانية: بناء الجمل (المستويات 6-10)
        {
            level: 6,
            language: "arabic",
            title: "جمل بسيطة",
            text: "هذا بيت. هذه شمس. أنا طالب.",
            difficulty: "متوسط",
            description: "جمل عربية بسيطة"
        },
        {
            level: 7,
            language: "english",
            title: "Simple Sentences",
            text: "This is a cat. That is a dog. I am happy.",
            difficulty: "Intermediate",
            description: "Simple English sentences"
        },
        {
            level: 8,
            language: "arabic",
            title: "جمل أطول",
            text: "أنا أحب القراءة. السماء زرقاء وجميلة. الطيور تغرد في الصباح.",
            difficulty: "متوسط",
            description: "جمل عربية أطول قليلاً"
        },
        {
            level: 9,
            language: "english",
            title: "Longer Sentences",
            text: "I like to read books. The sky is blue and beautiful. Birds sing in the morning.",
            difficulty: "Intermediate",
            description: "Longer English sentences"
        },
        {
            level: 10,
            language: "mixed",
            title: "جمل مختلطة - Mixed Sentences",
            text: "أنا أحب الـ computer. I study العربية. Technology تساعد في التعلم.",
            difficulty: "متوسط - Intermediate",
            description: "جمل تحتوي على كلمات من اللغتين"
        },
        
        // المرحلة الثالثة: علامات الترقيم والأرقام (المستويات 11-15)
        {
            level: 11,
            language: "arabic",
            title: "علامات الترقيم",
            text: "كيف حالك؟ أنا بخير! هل تحب القراءة؟ نعم، أحبها كثيراً.",
            difficulty: "متوسط",
            description: "جمل مع علامات ترقيم عربية"
        },
        {
            level: 12,
            language: "english",
            title: "Punctuation Marks",
            text: "How are you? I am fine! Do you like reading? Yes, I love it very much.",
            difficulty: "Intermediate",
            description: "Sentences with English punctuation"
        },
        {
            level: 13,
            language: "arabic",
            title: "الأرقام والتواريخ",
            text: "لدي 5 كتب. الساعة 3:30. اليوم هو 15 يناير 2024.",
            difficulty: "متوسط",
            description: "جمل تحتوي على أرقام وتواريخ"
        },
        {
            level: 14,
            language: "english",
            title: "Numbers and Dates",
            text: "I have 10 apples. It's 7:45 AM. Today is January 15th, 2024.",
            difficulty: "Intermediate",
            description: "Sentences with numbers and dates"
        },
        {
            level: 15,
            language: "mixed",
            title: "أرقام وترقيم مختلط",
            text: "عندي 3 books و 5 أقلام. الـ meeting في 2:00 PM. هاتفي: 123-456-7890.",
            difficulty: "متوسط - Intermediate",
            description: "أرقام وعلامات ترقيم باللغتين"
        },
        
        // المرحلة الرابعة: نصوص متنوعة ومعقدة (المستويات 16-20)
        {
            level: 16,
            language: "arabic",
            title: "فقرة وصفية",
            text: "في الصباح الباكر، تشرق الشمس من خلف الجبال، وتنتشر أشعتها الذهبية عبر الوادي الأخضر. تغرد الطيور بألحان جميلة، وتتراقص الأوراق مع النسيم العليل.",
            difficulty: "متقدم",
            description: "نص وصفي عن الطبيعة"
        },
        {
            level: 17,
            language: "english",
            title: "Descriptive Paragraph",
            text: "Technology has revolutionized the way we communicate, learn, and work. From smartphones to artificial intelligence, these innovations have made our lives more connected and efficient than ever before.",
            difficulty: "Advanced",
            description: "A paragraph about technology"
        },
        {
            level: 18,
            language: "arabic",
            title: "نص أدبي",
            text: "قال الحكيم: 'العلم نور يضيء طريق الحياة، والجهل ظلام يحجب الرؤية.' فمن طلب العلم وجد، ومن اجتهد نال مراده. إن طريق المعرفة طويل، لكن ثماره حلوة.",
            difficulty: "متقدم",
            description: "نص أدبي مع اقتباسات"
        },
        {
            level: 19,
            language: "english",
            title: "Literary Text",
            text: "As Shakespeare once wrote: 'All the world's a stage, and all the men and women merely players.' This profound observation reminds us that life is a performance, and we each have our roles to play.",
            difficulty: "Advanced",
            description: "Literary text with quotations"
        },
        {
            level: 20,
            language: "mixed",
            title: "نص متقدم مختلط",
            text: "في عصر الـ digital transformation، أصبح التعلم الـ online ضرورة. الـ AI والـ machine learning يغيران مستقبل التعليم. 'التعلم رحلة، ليس وجهة' - Learning is a journey, not a destination.",
            difficulty: "متقدم - Advanced",
            description: "نص معقد يجمع بين اللغتين والمصطلحات التقنية"
        }
    ],
    
    // نصوص للوضع الموقوت
    timed: {
        arabic: [
            "في زمن التكنولوجيا الحديثة، أصبحت مهارة الكتابة السريعة والدقيقة أكثر أهمية من أي وقت مضى. سواء كنت طالباً أو موظفاً أو رائد أعمال، فإن قدرتك على التعبير عن أفكارك بوضوح وسرعة تؤثر على نجاحك في الحياة.",
            "التعلم المستمر هو مفتاح النجاح في عالم متغير. كل يوم يحمل فرصاً جديدة لاكتساب معرفة أو مهارة جديدة. المهم هو أن نبقى فضوليين ومنفتحين على التجارب الجديدة، وأن نتذكر أن الفشل جزء طبيعي من رحلة التعلم.",
            "الصداقة كنز ثمين لا يقدر بمال. الأصدقاء الحقيقيون يقفون معنا في السراء والضراء، يشاركوننا أفراحنا وأحزاننا، ويقدمون لنا الدعم والمشورة عندما نحتاجها. إن وجود أصدقاء مخلصين يجعل الحياة أكثر جمالاً ومعنى."
        ],
        english: [
            "In today's fast-paced digital world, the ability to type quickly and accurately has become more important than ever. Whether you're a student, professional, or entrepreneur, your ability to express ideas clearly and efficiently can significantly impact your success and productivity.",
            "Continuous learning is the key to success in an ever-changing world. Each day brings new opportunities to acquire knowledge or develop new skills. The important thing is to remain curious and open to new experiences, remembering that failure is a natural part of the learning journey.",
            "Friendship is a precious treasure that cannot be valued in money. True friends stand by us through good times and bad, sharing our joys and sorrows, and offering support and advice when we need it most. Having loyal friends makes life more beautiful and meaningful."
        ]
    }
};

// إعدادات المستويات
const levelSettings = {
    // الحد الأدنى للدقة لإكمال المستوى
    minAccuracy: 85,
    
    // الحد الأدنى للسرعة (كلمة في الدقيقة) لكل مستوى
    minWPM: {
        1: 5,   2: 8,   3: 10,  4: 12,  5: 15,
        6: 18,  7: 20,  8: 22,  9: 25,  10: 28,
        11: 30, 12: 32, 13: 35, 14: 38, 15: 40,
        16: 42, 17: 45, 18: 48, 19: 50, 20: 55
    },
    
    // وقت التحدي للوضع الموقوت (بالثواني)
    timedModeDuration: 60,
    
    // عدد النجوم المطلوبة لكل مستوى (بناءً على الأداء)
    starRequirements: {
        1: { wpm: 10, accuracy: 90 },  // نجمة واحدة
        2: { wpm: 15, accuracy: 95 },  // نجمتان
        3: { wpm: 20, accuracy: 98 }   // ثلاث نجوم
    }
};

// رسائل التشجيع والتحفيز
const motivationalMessages = {
    arabic: {
        excellent: ["ممتاز!", "رائع جداً!", "أداء مذهل!", "أحسنت!", "عمل رائع!"],
        good: ["جيد جداً!", "أداء جيد!", "استمر هكذا!", "تحسن ملحوظ!", "على الطريق الصحيح!"],
        needsImprovement: ["يمكنك تحسين أدائك!", "حاول مرة أخرى!", "لا تستسلم!", "التدريب يصنع الفرق!", "ستتحسن مع الوقت!"]
    },
    english: {
        excellent: ["Excellent!", "Amazing!", "Outstanding!", "Well done!", "Great job!"],
        good: ["Very good!", "Good job!", "Keep it up!", "Nice improvement!", "On the right track!"],
        needsImprovement: ["You can improve!", "Try again!", "Don't give up!", "Practice makes perfect!", "You'll get better!"]
    }
};

// تصدير البيانات للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sampleTexts, levelSettings, motivationalMessages };
}

