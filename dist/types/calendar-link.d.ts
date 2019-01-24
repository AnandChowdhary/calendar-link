interface CalendarEvent {
    title: string;
    start: any;
    end?: any;
    duration?: (string | number)[];
    description?: string;
    location?: string;
    busy?: boolean;
    guests?: string[];
}
export default class CalendarLink {
    google(event: CalendarEvent): string;
    outlook(event: CalendarEvent): string;
    yahoo(event: CalendarEvent): string;
}
export {};
