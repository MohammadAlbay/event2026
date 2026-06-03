
export class TimeRemaining { days: number = 0; hours: number = 0; minutes: number = 0; seconds: number = 0 }
export interface ICountDown {
    getTimeRemaining(): TimeRemaining;
    setContinuesUpdateCallback(callback: (timeRemaining: TimeRemaining) => void): void;
    stop(): void;
}
export class CountDown implements ICountDown {

    public static InvalidInstance: CountDown = Object.create(CountDown.prototype);

    private targetDate!: Date;
    private timeRemaining: TimeRemaining = new TimeRemaining();
    private interVal?: NodeJS.Timeout;
    private dummy: boolean = false;
    private continuesUpdateCallback?: (timeRemaining: TimeRemaining) => void = () => {};

    public constructor(options: { targetDate: Date, timeInterval: number }, dummy: boolean = false) {
        if (dummy) {
            this.dummy = true;
            this.targetDate = new Date();
            return;
        }

        // console.log('CountDown constructor called with options: ', options);
        this.targetDate = options.targetDate;
        this.calculateTimeRemaining();

        this.interVal = setInterval(() => {
            this.calculateTimeRemaining();
            if (this.continuesUpdateCallback) {
                this.continuesUpdateCallback(this.timeRemaining);
            }
        }, options.timeInterval);
    }

    private calculateTimeRemaining() {
        const now = new Date();
            const timeDifference = this.targetDate.getTime() - now.getTime();
            //console.log(this.dummy, timeDifference, this.targetDate, now);
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);

            this.timeRemaining.days = days;
            this.timeRemaining.hours = hours;
            this.timeRemaining.minutes = minutes;
            this.timeRemaining.seconds = seconds;
    }
    public setContinuesUpdateCallback(callback: (timeRemaining: TimeRemaining) => void = () => {}) {
        this.continuesUpdateCallback = callback;
    }
    public stop() {
        clearInterval(this.interVal);
    }

    public getTimeRemaining(): TimeRemaining {
        return this.timeRemaining;
    }
}