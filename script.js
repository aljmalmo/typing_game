// script.js - منطق اللعبة الرئيسي

class TypingGame {
    constructor() {
        this.currentScreen = 'start';
        this.currentLanguage = 'ar';
        this.currentMode = null;
        this.currentLevel = 1;
        this.currentText = '';
        this.userInput = '';
        this.startTime = null;
        this.endTime = null;
        this.errors = 0;
        this.totalChars = 0;
        this.currentCharIndex = 0;
        this.isGameActive = false;
        this.timer = null;
        this.timeElapsed = 0;
        this.soundEnabled = true;
        this.theme = 'light';
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.updateLanguage();
        this.loadProgress();
        this.showScreen('start');
    }
    
    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // أزرار اللغة
        document.getElementById('arabicBtn').addEventListener('click', () => {
            this.playClickSound();
            this.setLanguage('ar');
        });
        document.getElementById('englishBtn').addEventListener('click', () => {
            this.playClickSound();
            this.setLanguage('en');
        });
        
        // أزرار أوضاع اللعب
        document.getElementById('practiceBtn').addEventListener('click', () => {
            this.playClickSound();
            this.startMode('practice');
        });
        document.getElementById('levelsBtn').addEventListener('click', () => {
            this.playClickSound();
            this.showLevels();
        });
        document.getElementById('timedBtn').addEventListener('click', () => {
            this.playClickSound();
            this.startMode('timed');
        });
        
        // أزرار الإعدادات
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.playClickSound();
            this.toggleTheme();
        });
        document.getElementById('soundToggle').addEventListener('click', () => {
            this.toggleSound();
        });
        
        // أزرار التنقل
        document.getElementById('backToStart').addEventListener('click', () => {
            this.playClickSound();
            this.showScreen('start');
        });
        document.getElementById('backToLevels').addEventListener('click', () => {
            this.playClickSound();
            this.showLevels();
        });
        
        // منطقة الكتابة
        document.getElementById('typingInput').addEventListener('input', (e) => this.handleInput(e));
        document.getElementById('typingInput').addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // أزرار النتائج
        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            this.playClickSound();
            this.nextLevel();
        });
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.playClickSound();
            this.retryLevel();
        });
        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            this.playClickSound();
            this.showScreen('start');
        });
        
        // منع النقر بالزر الأيمن على منطقة الكتابة
        document.getElementById('typingInput').addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    // تشغيل صوت النقر
    playClickSound() {
        if (this.soundEnabled && window.soundManager) {
            window.soundManager.play('click');
        }
    }
    
    // تحديد اللغة
    setLanguage(lang) {
        this.currentLanguage = lang;
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // تحديث أزرار اللغة
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(lang === 'ar' ? 'arabicBtn' : 'englishBtn').classList.add('active');
        
        this.updateLanguage();
        this.saveSettings();
    }
    
    // تحديث النصوص حسب اللغة
    updateLanguage() {
        const texts = {
            ar: {
                gameTitle: 'لعبة تعلم الحروف العربية',
                gameSubtitle: 'تعلم الكتابة بطريقة ممتعة وتفاعلية',
                practiceMode: 'وضع التدريب',
                practiceDesc: 'تدرب على الكتابة بحرية',
                levelsMode: 'وضع المستويات',
                levelsDesc: '20 مستوى تدريجي',
                timedMode: 'وضع الوقت',
                timedDesc: 'تحدي الدقيقة الواحدة',
                chooseLevel: 'اختر المستوى',
                back: '← العودة',
                level: 'المستوى',
                wpm: 'كلمة/دقيقة',
                accuracy: 'دقة',
                speed: 'السرعة',
                time: 'الوقت',
                nextLevel: 'المستوى التالي',
                retry: 'إعادة المحاولة',
                mainMenu: 'القائمة الرئيسية',
                excellent: 'ممتاز!',
                good: 'جيد!',
                needsImprovement: 'يمكنك التحسن!',
                startTyping: 'ابدأ الكتابة هنا...'
            },
            en: {
                gameTitle: 'Arabic Letters Learning Game',
                gameSubtitle: 'Learn typing in a fun and interactive way',
                practiceMode: 'Practice Mode',
                practiceDesc: 'Practice typing freely',
                levelsMode: 'Levels Mode',
                levelsDesc: '20 progressive levels',
                timedMode: 'Timed Mode',
                timedDesc: 'One minute challenge',
                chooseLevel: 'Choose Level',
                back: '← Back',
                level: 'Level',
                wpm: 'WPM',
                accuracy: 'Accuracy',
                speed: 'Speed',
                time: 'Time',
                nextLevel: 'Next Level',
                retry: 'Retry',
                mainMenu: 'Main Menu',
                excellent: 'Excellent!',
                good: 'Good!',
                needsImprovement: 'You can improve!',
                startTyping: 'Start typing here...'
            }
        };
        
        const currentTexts = texts[this.currentLanguage];
        
        // تحديث النصوص في الواجهة
        document.querySelector('.game-title').textContent = currentTexts.gameTitle;
        document.querySelector('.game-subtitle').textContent = currentTexts.gameSubtitle;
        
        // تحديث أوضاع اللعب
        document.querySelector('#practiceBtn .mode-title').textContent = currentTexts.practiceMode;
        document.querySelector('#practiceBtn .mode-desc').textContent = currentTexts.practiceDesc;
        document.querySelector('#levelsBtn .mode-title').textContent = currentTexts.levelsMode;
        document.querySelector('#levelsBtn .mode-desc').textContent = currentTexts.levelsDesc;
        document.querySelector('#timedBtn .mode-title').textContent = currentTexts.timedMode;
        document.querySelector('#timedBtn .mode-desc').textContent = currentTexts.timedDesc;
        
        // تحديث placeholder
        document.getElementById('typingInput').placeholder = currentTexts.startTyping;
    }
    
    // تبديل المظهر
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        document.getElementById('themeToggle').textContent = this.theme === 'light' ? '🌙' : '☀️';
        this.saveSettings();
    }
    
    // تبديل الصوت
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        document.getElementById('soundToggle').textContent = this.soundEnabled ? '🔊' : '🔇';
        this.saveSettings();
    }
    
    // عرض شاشة معينة
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenName + 'Screen').classList.add('active');
        this.currentScreen = screenName;
        
        if (screenName === 'game') {
            setTimeout(() => document.getElementById('typingInput').focus(), 100);
        }
    }
    
    // بدء وضع لعب معين
    startMode(mode) {
        this.currentMode = mode;
        
        if (mode === 'practice') {
            this.startPracticeMode();
        } else if (mode === 'timed') {
            this.startTimedMode();
        }
    }
    
    // بدء وضع التدريب
    startPracticeMode() {
        const texts = sampleTexts.practice[this.currentLanguage];
        this.currentText = texts[Math.floor(Math.random() * texts.length)];
        this.currentLevel = 0; // وضع التدريب ليس له مستوى محدد
        this.startGame();
    }
    
    // بدء الوضع الموقوت
    startTimedMode() {
        const texts = sampleTexts.timed[this.currentLanguage];
        this.currentText = texts[Math.floor(Math.random() * texts.length)];
        this.currentLevel = 0; // الوضع الموقوت ليس له مستوى محدد
        this.startGame(true);
    }
    
    // عرض شاشة المستويات
    showLevels() {
        this.showScreen('level');
        this.renderLevels();
    }
    
    // رسم المستويات
    renderLevels() {
        const levelsGrid = document.getElementById('levelsGrid');
        levelsGrid.innerHTML = '';
        
        const unlockedLevels = this.getUnlockedLevels();
        
        sampleTexts.levels.forEach((level, index) => {
            const levelBtn = document.createElement('button');
            levelBtn.className = 'level-btn';
            
            const isUnlocked = unlockedLevels.includes(level.level);
            const isCompleted = this.isLevelCompleted(level.level);
            
            if (!isUnlocked) {
                levelBtn.classList.add('locked');
            } else if (isCompleted) {
                levelBtn.classList.add('completed');
            }
            
            levelBtn.innerHTML = `
                <span class="level-number">${level.level}</span>
                <span class="level-lang">${level.language === 'arabic' ? 'عربي' : level.language === 'english' ? 'English' : 'مختلط'}</span>
            `;
            
            if (isUnlocked) {
                levelBtn.addEventListener('click', () => this.startLevel(level.level));
            }
            
            levelsGrid.appendChild(levelBtn);
        });
    }
    
    // بدء مستوى معين
    startLevel(levelNumber) {
        this.currentLevel = levelNumber;
        const level = sampleTexts.levels.find(l => l.level === levelNumber);
        this.currentText = level.text;
        this.currentMode = 'levels';
        this.startGame();
    }
    
    // بدء اللعبة
    startGame(isTimed = false) {
        this.showScreen('game');
        this.resetGame();
        this.displayText();
        this.updateGameInfo();
        
        if (isTimed) {
            this.startTimer(levelSettings.timedModeDuration);
        }
    }
    
    // إعادة تعيين اللعبة
    resetGame() {
        this.userInput = '';
        this.currentCharIndex = 0;
        this.errors = 0;
        this.totalChars = 0;
        this.startTime = null;
        this.endTime = null;
        this.isGameActive = false;
        this.timeElapsed = 0;
        
        document.getElementById('typingInput').value = '';
        document.getElementById('progressFill').style.width = '0%';
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    // عرض النص
    displayText() {
        const textDisplay = document.getElementById('textDisplay');
        textDisplay.innerHTML = '';
        
        for (let i = 0; i < this.currentText.length; i++) {
            const char = document.createElement('span');
            char.className = 'char';
            char.textContent = this.currentText[i];
            
            if (i === 0) {
                char.classList.add('current');
            }
            
            textDisplay.appendChild(char);
        }
    }
    
    // معالجة الإدخال
    handleInput(e) {
        if (!this.isGameActive) {
            this.startTime = Date.now();
            this.isGameActive = true;
        }
        
        const newInput = e.target.value;
        const lastChar = newInput[newInput.length - 1];
        const expectedChar = this.currentText[newInput.length - 1];
        
        // تشغيل صوت الكتابة
        if (newInput.length > this.userInput.length && window.soundManager) {
            window.soundManager.playTypingSound();
            
            // تشغيل صوت الإجابة الصحيحة أو الخاطئة
            if (lastChar === expectedChar) {
                window.soundManager.play('correct');
            } else {
                window.soundManager.play('incorrect');
            }
        }
        
        this.userInput = newInput;
        this.updateDisplay();
        this.updateStats();
        
        // التحقق من اكتمال النص
        if (this.userInput.length === this.currentText.length) {
            this.endGame();
        }
    }
    
    // معالجة ضغط المفاتيح
    handleKeyDown(e) {
        // منع بعض المفاتيح غير المرغوب فيها
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    }
    
    // تحديث العرض
    updateDisplay() {
        const chars = document.querySelectorAll('.char');
        
        chars.forEach((char, index) => {
            char.classList.remove('correct', 'incorrect', 'current');
            
            if (index < this.userInput.length) {
                if (this.userInput[index] === this.currentText[index]) {
                    char.classList.add('correct');
                } else {
                    char.classList.add('incorrect');
                }
            } else if (index === this.userInput.length) {
                char.classList.add('current');
            }
        });
        
        // تحديث شريط التقدم
        const progress = (this.userInput.length / this.currentText.length) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    // تحديث الإحصائيات
    updateStats() {
        if (!this.startTime) return;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // بالدقائق
        const wordsTyped = this.userInput.trim().split(' ').length;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        
        // حساب الأخطاء
        let errors = 0;
        for (let i = 0; i < this.userInput.length; i++) {
            if (this.userInput[i] !== this.currentText[i]) {
                errors++;
            }
        }
        
        const accuracy = this.userInput.length > 0 ? Math.round(((this.userInput.length - errors) / this.userInput.length) * 100) : 100;
        
        // تحديث العرض
        document.getElementById('wpm').textContent = `${wpm} ${this.currentLanguage === 'ar' ? 'كلمة/دقيقة' : 'WPM'}`;
        document.getElementById('accuracy').textContent = `${accuracy}% ${this.currentLanguage === 'ar' ? 'دقة' : 'Accuracy'}`;
        
        this.errors = errors;
    }
    
    // تحديث معلومات اللعبة
    updateGameInfo() {
        let levelText = '';
        
        if (this.currentMode === 'levels' && this.currentLevel > 0) {
            levelText = `${this.currentLanguage === 'ar' ? 'المستوى' : 'Level'} ${this.currentLevel}`;
        } else if (this.currentMode === 'practice') {
            levelText = this.currentLanguage === 'ar' ? 'وضع التدريب' : 'Practice Mode';
        } else if (this.currentMode === 'timed') {
            levelText = this.currentLanguage === 'ar' ? 'وضع الوقت' : 'Timed Mode';
        } else {
            levelText = this.currentLanguage === 'ar' ? 'اللعبة' : 'Game';
        }
            
        document.getElementById('currentLevel').textContent = levelText;
    }
    
    // بدء المؤقت
    startTimer(duration) {
        let timeLeft = duration;
        
        this.timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                this.endGame();
            }
            
            timeLeft--;
        }, 1000);
    }
    
    // إنهاء اللعبة
    endGame() {
        this.isGameActive = false;
        this.endTime = Date.now();
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.calculateResults();
        this.showResults();
        
        if (this.currentMode === 'levels') {
            this.updateProgress();
        }
    }
    
    // حساب النتائج
    calculateResults() {
        const timeElapsed = (this.endTime - this.startTime) / 1000; // بالثواني
        const timeInMinutes = timeElapsed / 60;
        const wordsTyped = this.userInput.trim().split(' ').length;
        const wpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;
        const accuracy = this.userInput.length > 0 ? Math.round(((this.userInput.length - this.errors) / this.userInput.length) * 100) : 100;
        
        this.finalWPM = wpm;
        this.finalAccuracy = accuracy;
        this.finalTime = this.formatTime(timeElapsed);
    }
    
    // عرض النتائج
    showResults() {
        this.showScreen('result');
        
        // تحديد رسالة التشجيع
        let message = '';
        if (this.finalAccuracy >= 95 && this.finalWPM >= 30) {
            message = motivationalMessages[this.currentLanguage].excellent[Math.floor(Math.random() * motivationalMessages[this.currentLanguage].excellent.length)];
        } else if (this.finalAccuracy >= 85 && this.finalWPM >= 20) {
            message = motivationalMessages[this.currentLanguage].good[Math.floor(Math.random() * motivationalMessages[this.currentLanguage].good.length)];
        } else {
            message = motivationalMessages[this.currentLanguage].needsImprovement[Math.floor(Math.random() * motivationalMessages[this.currentLanguage].needsImprovement.length)];
        }
        
        document.getElementById('resultTitle').textContent = message;
        document.getElementById('finalWPM').textContent = `${this.finalWPM} ${this.currentLanguage === 'ar' ? 'كلمة/دقيقة' : 'WPM'}`;
        document.getElementById('finalAccuracy').textContent = `${this.finalAccuracy}%`;
        document.getElementById('finalTime').textContent = this.finalTime;
        
        // إظهار/إخفاء زر المستوى التالي
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        if (this.currentMode === 'levels' && this.canAdvanceToNextLevel()) {
            nextLevelBtn.style.display = 'block';
        } else {
            nextLevelBtn.style.display = 'none';
        }
        
        // تشغيل صوت النتيجة
        this.playResultSound();
    }
    
    // التحقق من إمكانية الانتقال للمستوى التالي
    canAdvanceToNextLevel() {
        const minAccuracy = levelSettings.minAccuracy;
        const minWPM = levelSettings.minWPM[this.currentLevel] || 10;
        
        return this.finalAccuracy >= minAccuracy && this.finalWPM >= minWPM && this.currentLevel < sampleTexts.levels.length;
    }
    
    // الانتقال للمستوى التالي
    nextLevel() {
        if (this.currentLevel < sampleTexts.levels.length) {
            this.currentLevel++;
            this.startLevel(this.currentLevel);
        }
    }
    
    // إعادة المحاولة
    retryLevel() {
        if (this.currentMode === 'levels') {
            this.startLevel(this.currentLevel);
        } else if (this.currentMode === 'practice') {
            this.startPracticeMode();
        } else if (this.currentMode === 'timed') {
            this.startTimedMode();
        }
    }
    
    // تحديث التقدم
    updateProgress() {
        if (this.canAdvanceToNextLevel()) {
            const unlockedLevels = this.getUnlockedLevels();
            if (!unlockedLevels.includes(this.currentLevel + 1) && this.currentLevel < sampleTexts.levels.length) {
                unlockedLevels.push(this.currentLevel + 1);
                this.saveUnlockedLevels(unlockedLevels);
            }
            
            // حفظ إكمال المستوى الحالي
            this.markLevelCompleted(this.currentLevel);
        }
    }
    
    // الحصول على المستويات المفتوحة
    getUnlockedLevels() {
        const saved = localStorage.getItem('unlockedLevels');
        return saved ? JSON.parse(saved) : [1];
    }
    
    // حفظ المستويات المفتوحة
    saveUnlockedLevels(levels) {
        localStorage.setItem('unlockedLevels', JSON.stringify(levels));
    }
    
    // التحقق من إكمال المستوى
    isLevelCompleted(level) {
        const completed = localStorage.getItem('completedLevels');
        const completedLevels = completed ? JSON.parse(completed) : [];
        return completedLevels.includes(level);
    }
    
    // تمييز المستوى كمكتمل
    markLevelCompleted(level) {
        const completed = localStorage.getItem('completedLevels');
        const completedLevels = completed ? JSON.parse(completed) : [];
        if (!completedLevels.includes(level)) {
            completedLevels.push(level);
            localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
        }
    }
    
    // تحميل التقدم
    loadProgress() {
        // تحميل المستويات المفتوحة والمكتملة من localStorage
        const unlockedLevels = this.getUnlockedLevels();
        if (unlockedLevels.length === 0) {
            this.saveUnlockedLevels([1]);
        }
    }
    
    // تنسيق الوقت
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // تشغيل صوت النتيجة
    playResultSound() {
        if (!this.soundEnabled || !window.soundManager) return;
        
        // تشغيل صوت إكمال المستوى
        window.soundManager.playLevelComplete();
        
        // تأثيرات بصرية إضافية
        if (this.finalAccuracy >= 95) {
            document.getElementById('resultScreen').classList.add('bounce');
            setTimeout(() => {
                document.getElementById('resultScreen').classList.remove('bounce');
            }, 600);
        }
    }
    
    // حفظ الإعدادات
    saveSettings() {
        const settings = {
            language: this.currentLanguage,
            theme: this.theme,
            soundEnabled: this.soundEnabled
        };
        localStorage.setItem('gameSettings', JSON.stringify(settings));
    }
    
    // تحميل الإعدادات
    loadSettings() {
        const saved = localStorage.getItem('gameSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.currentLanguage = settings.language || 'ar';
            this.theme = settings.theme || 'light';
            this.soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true;
            
            // تطبيق الإعدادات
            document.documentElement.setAttribute('data-theme', this.theme);
            document.getElementById('themeToggle').textContent = this.theme === 'light' ? '🌙' : '☀️';
            document.getElementById('soundToggle').textContent = this.soundEnabled ? '🔊' : '🔇';
        }
    }
}

// بدء اللعبة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.typingGame = new TypingGame();
});

// منع النسخ واللصق في منطقة الكتابة
document.addEventListener('DOMContentLoaded', () => {
    const typingInput = document.getElementById('typingInput');
    
    typingInput.addEventListener('paste', (e) => {
        e.preventDefault();
        return false;
    });
    
    typingInput.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
    });
    
    typingInput.addEventListener('cut', (e) => {
        e.preventDefault();
        return false;
    });
});

