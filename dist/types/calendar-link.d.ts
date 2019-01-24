interface CalendarEvent {
    start: Date;
    end?: Date;
    duration?: number;
    title: string;
}
export default class CalendarLink {
    constructor(event: CalendarEvent);
    google(event: CalendarEvent): string;
    yahoo(event: CalendarEvent): string;
    outlook(event: CalendarEvent): string;
}
export {};
