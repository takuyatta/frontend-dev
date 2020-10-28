document.addEventListener('DOMContentLoaded',function(){  // HTMLの読み込みが済んだ時点で、以下を発動。
    const main = new Main();  // Mainクラスのインスタンスが生成される
});
    class Main {
    constructor(){
        this.header = document.querySelector('.header');
        this.sides = document.querySelectorAll('.side');
        this._observers = [];
        this._init();
    }

    set observers(val) {
        this._observers.push(val);
    }
    get observers() {
        return this._observers;
    }

    _init() {
        new MobileMenu();
        this.hero = new HeroSlider('.swiper-container');
        Pace.on('done',this._paceDone.bind(this)); // はじめのロード'DOMContentLoaded'が完了した'done'ところで、ようやく_scrollInit()を呼び出し、メインページのアニメーション効果を開始する。
    }

    _paceDone(){
        this._scrollInit(); // メインページのスクロール監視のアニメーション効果を開始
    }

    _scrollInit(){
        this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false}); // once: falseで何度でも呼び出すように設定
        this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation); // .cover-slideのセレクタの要素を　_inviewAnimationで監視する状態にしている
        this.observers = new ScrollObserver('.appear', this._inviewAnimation);     // .appearのセレクタの要素を　_inviewAnimationで監視する状態にしている               
        this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation, {rootMargin: "-200px 0px"});                    
        this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});  // once: falseで何度でも呼び出すように設定           
        this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});                    
    }

    _navAnimation(el, inview) {  // elは監視するセレクタ要素のDOM。ここではisIntersectingを　inviewと名付けることにする
        if(inview) {
            this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');    
        }
    }
    
    _sideAnimation(el, inview) {  // elは監視するセレクタ要素のDOM。ここではisIntersectingを　inviewと名付けることにする
        if(inview) {
            this.sides.forEach(side => side.classList.add('inview'));    
        } else {
            this.sides.forEach(side => side.classList.remove('inview'));    
        }
    }
    
    _inviewAnimation(el, inview) {  // elは監視するセレクタ要素のDOM。ここではisIntersectingを　inviewと名付けることにする
        if(inview) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }

    _textAnimation(el, inview) {
        if(inview){
            const ta = new TweenTextAnimation(el);
            ta.animate();
            }  
    }
    
    _toggleSlideAnimation(el, inview) {  // elは監視するセレクタ要素のDOM。ここではisIntersectingを　inviewと名付けることにする
        if(inview) {
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }


}


