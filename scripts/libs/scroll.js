class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
        once: true
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        // Object.assign(第1引数, 第2引数);
        // このメソッドは、第一引数に指定したオブジェクトに第二引数以降の全てのオブジェクトのプロパティを第一引数に指定したオブジェクトにそのままコピー（＝　マージ）してくれる。
        this._init();
    }
    _init() {
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.cb(entry.target, true);   // ここでの cb関数は　上段に記述している
                    if(this.once){
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };
        this.io = new IntersectionObserver(callback.bind(this), this.options);

        this.io.POLL_INTERVAL = 100; // IntersectionObserverが効かないブラウザのときに、scrollイベントに対する監視の間隔を100msごとに行う。
        this.els.forEach(el => this.io.observe(el));
    }

    destory() {
        this.io.disconnect();
    }
}