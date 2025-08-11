// soundManager.js - إدارة الأصوات والتأثيرات الصوتية

class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.7;
        this.audioContext = null;
        this.init();
    }
    
    init() {
        // إنشاء AudioContext للتحكم في الأصوات
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
        
        // تحميل الأصوات المُولدة برمجياً
        this.generateSounds();
    }
    
    // توليد الأصوات برمجياً باستخدام Web Audio API
    generateSounds() {
        if (!this.audioContext) return;
        
        // صوت الإجابة الصحيحة
        this.sounds.correct = this.createTone(800, 0.2, 'sine');
        
        // صوت الإجابة الخاطئة
        this.sounds.incorrect = this.createTone(200, 0.3, 'sawtooth');
        
        // صوت إكمال المستوى
        this.sounds.levelComplete = this.createMelody([
            { freq: 523, duration: 0.2 }, // C5
            { freq: 659, duration: 0.2 }, // E5
            { freq: 784, duration: 0.3 }  // G5
        ]);
        
        // صوت النقر
        this.sounds.click = this.createTone(1000, 0.1, 'square');
        
        // صوت الكتابة
        this.sounds.type = this.createTone(400, 0.05, 'sine');
        
        // صوت التحذير
        this.sounds.warning = this.createTone(300, 0.5, 'triangle');
    }
    
    // إنشاء نغمة بسيطة
    createTone(frequency, duration, waveType = 'sine') {
        if (!this.audioContext) return null;
        
        return () => {
            if (!this.enabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = waveType;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    // إنشاء لحن من عدة نغمات
    createMelody(notes) {
        if (!this.audioContext) return null;
        
        return () => {
            if (!this.enabled) return;
            
            let currentTime = this.audioContext.currentTime;
            
            notes.forEach(note => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration);
                
                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration);
                
                currentTime += note.duration;
            });
        };
    }
    
    // تشغيل صوت معين
    play(soundName) {
        if (!this.enabled || !this.sounds[soundName]) return;
        
        try {
            // استئناف AudioContext إذا كان متوقفاً
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            this.sounds[soundName]();
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }
    
    // تفعيل/إلغاء تفعيل الأصوات
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    
    // تعديل مستوى الصوت
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    // تشغيل صوت الكتابة مع تأثير عشوائي
    playTypingSound() {
        if (!this.enabled || !this.audioContext) return;
        
        // تنويع طفيف في التردد لجعل الصوت أكثر طبيعية
        const baseFreq = 400;
        const variation = (Math.random() - 0.5) * 100;
        const frequency = baseFreq + variation;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
    
    // تشغيل صوت تأكيد الإجابة الصحيحة مع تأثير إضافي
    playCorrectAnswer() {
        this.play('correct');
        
        // إضافة تأثير بصري مع الصوت
        this.createVisualFeedback('correct');
    }
    
    // تشغيل صوت الإجابة الخاطئة مع تأثير إضافي
    playIncorrectAnswer() {
        this.play('incorrect');
        
        // إضافة تأثير بصري مع الصوت
        this.createVisualFeedback('incorrect');
    }
    
    // تشغيل صوت إكمال المستوى مع احتفال
    playLevelComplete() {
        this.play('levelComplete');
        
        // إضافة تأثير بصري احتفالي
        this.createVisualFeedback('celebration');
    }
    
    // إنشاء تأثيرات بصرية مصاحبة للأصوات
    createVisualFeedback(type) {
        const body = document.body;
        
        switch (type) {
            case 'correct':
                body.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                setTimeout(() => {
                    body.style.backgroundColor = '';
                }, 200);
                break;
                
            case 'incorrect':
                body.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                setTimeout(() => {
                    body.style.backgroundColor = '';
                }, 300);
                break;
                
            case 'celebration':
                // تأثير احتفالي بسيط
                body.classList.add('celebration');
                setTimeout(() => {
                    body.classList.remove('celebration');
                }, 1000);
                break;
        }
    }
    
    // تشغيل موسيقى خلفية هادئة (اختيارية)
    playBackgroundMusic() {
        if (!this.enabled || !this.audioContext) return;
        
        // لحن هادئ ومتكرر للخلفية
        const melody = [
            { freq: 261.63, duration: 1 }, // C4
            { freq: 293.66, duration: 1 }, // D4
            { freq: 329.63, duration: 1 }, // E4
            { freq: 293.66, duration: 1 }, // D4
        ];
        
        const playMelody = () => {
            if (!this.enabled) return;
            
            let currentTime = this.audioContext.currentTime;
            
            melody.forEach(note => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(this.volume * 0.05, currentTime + 0.1);
                gainNode.gain.linearRampToValueAtTime(this.volume * 0.05, currentTime + note.duration - 0.1);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);
                
                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration);
                
                currentTime += note.duration;
            });
            
            // إعادة تشغيل اللحن بعد انتهائه
            setTimeout(playMelody, melody.reduce((sum, note) => sum + note.duration, 0) * 1000 + 2000);
        };
        
        playMelody();
    }
    
    // إيقاف جميع الأصوات
    stopAll() {
        if (this.audioContext) {
            this.audioContext.suspend();
        }
    }
    
    // استئناف الأصوات
    resumeAll() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// إنشاء مثيل عام لإدارة الأصوات
window.soundManager = new SoundManager();

// إضافة CSS للتأثيرات البصرية
const style = document.createElement('style');
style.textContent = `
    .celebration {
        animation: celebrate 1s ease-in-out;
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.02); }
        50% { transform: scale(1.01); }
        75% { transform: scale(1.02); }
    }
    
    .sound-wave {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(76, 175, 80, 0.3);
        transform: translate(-50%, -50%);
        animation: soundWave 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 9999;
    }
    
    @keyframes soundWave {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

