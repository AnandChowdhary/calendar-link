interface CalendarEvent {
    title: string;
    start: Date;
    end?: Date;
    duration?: number;
    description?: string;
    location?: string;
    busy?: boolean;
    guests?: string[];
}
export default class CalendarLink {
    constructor(event: CalendarEvent);
    google(event: CalendarEvent): string;
    yahoo(event: CalendarEvent): string;
    outlook(event: CalendarEvent): string;
}
export {};
