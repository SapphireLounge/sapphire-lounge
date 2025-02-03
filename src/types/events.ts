// src/types/events.ts

export interface Event {
    id: string;
    name: string;
    date: Date;
    location: string;
}

export interface UserEvent extends Event {
    userId: string;
}

export interface SystemEvent extends Event {
    systemId: string;
    severity: 'info' | 'warning' | 'error';
}

export interface EventData {
    eventId: string;
    eventTitle: string;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    guests: number;
    specialRequests?: string;
    qrCode?: string;
}
